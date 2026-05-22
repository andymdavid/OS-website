import { writeFile } from "node:fs/promises";

const CHANNEL_ID = "UCGVpiP_odkzPHkX0x1GMX1w";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const CHANNEL_VIDEOS_URL = "https://www.youtube.com/@OtherStuffAI/videos";
const OUTPUT_PATH = "public/podcast-episodes.json";
const MAX_ITEMS = 100;
const FALLBACK_MAX_ITEMS = 25;

const textBetween = (source, startTag, endTag) => {
  const start = source.indexOf(startTag);
  if (start === -1) return "";
  const end = source.indexOf(endTag, start + startTag.length);
  if (end === -1) return "";
  return source.slice(start + startTag.length, end).trim();
};

const attrValue = (source, tagName, attr) => {
  const tagMatch = source.match(new RegExp(`<${tagName}[^>]*>`));
  if (!tagMatch) return "";
  const attrMatch = tagMatch[0].match(new RegExp(`${attr}="([^"]+)"`));
  return attrMatch ? attrMatch[1] : "";
};

const decodeEntities = (value) =>
  value
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const decodeJsonString = (value) => {
  try {
    return JSON.parse(`"${value}"`);
  } catch {
    return value;
  }
};

const normalizeDescription = (value) => {
  const cleaned = decodeEntities(value).replace(/\s+/g, " ").trim();
  if (cleaned.length <= 180) return cleaned;
  return `${cleaned.slice(0, 177)}...`;
};

const fetchFeed = async () => {
  const response = await fetch(FEED_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch YouTube feed (${response.status})`);
  }
  return response.text();
};

const fetchText = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url} (${response.status})`);
  }
  return response.text();
};

const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url} (${response.status})`);
  }
  return response.json();
};

const parseEntries = (xml) => {
  const entries = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;
  while ((match = entryRegex.exec(xml)) !== null) {
    entries.push(match[1]);
  }
  return entries;
};

const parseEntry = (entry) => {
  const title = textBetween(entry, "<title>", "</title>");
  const description =
    textBetween(entry, "<media:description>", "</media:description>") ||
    textBetween(entry, "<summary>", "</summary>");
  const videoId = textBetween(entry, "<yt:videoId>", "</yt:videoId>");
  const link = attrValue(entry, "link", "href");
  const thumbnail = attrValue(entry, "media:thumbnail", "url");
  const published = textBetween(entry, "<published>", "</published>");

  return {
    id: videoId || undefined,
    title,
    description: normalizeDescription(description),
    thumbnail,
    link,
    published,
  };
};

const parseChannelVideoIds = (html) => {
  const ids = [];
  const seen = new Set();
  const videoIdRegex = /"videoId":"([A-Za-z0-9_-]{11})"/g;
  let match;

  while ((match = videoIdRegex.exec(html)) !== null) {
    const id = match[1];
    if (seen.has(id)) continue;
    seen.add(id);
    ids.push(id);
  }

  return ids;
};

const parseWatchMetadata = (html) => {
  const published =
    textBetween(html, '"publishDate":"', '"') ||
    textBetween(html, '"uploadDate":"', '"');
  const structuredDescription = html.match(/"shortDescription":"((?:\\.|[^"\\])*)"/);
  const description = structuredDescription
    ? decodeJsonString(structuredDescription[1])
    : textBetween(html, '<meta name="description" content="', '">');

  return {
    published,
    description: normalizeDescription(description),
  };
};

const dedupeByEpisodeNumber = (episodes) => {
  const seen = new Set();

  return episodes.filter((episode) => {
    const match = episode.title.match(/\bGood Stuff\s+(\d+)/i);
    const key = match ? match[1] : episode.id;

    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const parseFallbackEpisode = async (videoId) => {
  const link = `https://www.youtube.com/watch?v=${videoId}`;
  const [oembed, watchHtml] = await Promise.all([
    fetchJson(`https://www.youtube.com/oembed?url=${encodeURIComponent(link)}&format=json`),
    fetchText(link),
  ]);
  const metadata = parseWatchMetadata(watchHtml);

  return {
    id: videoId,
    title: oembed.title,
    description: metadata.description,
    thumbnail: oembed.thumbnail_url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    link,
    published: metadata.published,
  };
};

const fetchFallbackEpisodes = async () => {
  const html = await fetchText(CHANNEL_VIDEOS_URL);
  const videoIds = parseChannelVideoIds(html).slice(0, FALLBACK_MAX_ITEMS);
  const episodes = [];

  for (const videoId of videoIds) {
    try {
      const episode = await parseFallbackEpisode(videoId);
      if (/Good Stuff\s+\d+\s*[\-–]/i.test(episode.title)) {
        episodes.push(episode);
      }
    } catch (error) {
      console.warn(`Skipped YouTube video ${videoId}: ${error.message}`);
    }
  }

  return dedupeByEpisodeNumber(episodes).slice(0, MAX_ITEMS);
};

const main = async () => {
  let parsedEntries = [];

  try {
    const xml = await fetchFeed();
    parsedEntries = parseEntries(xml)
      .map(parseEntry)
      .filter((entry) => entry.title && entry.link)
      .filter((entry) => /Good Stuff\s+\d+\s*[\-–]/i.test(entry.title))
      .slice(0, MAX_ITEMS);
    parsedEntries = dedupeByEpisodeNumber(parsedEntries);
  } catch (error) {
    console.warn(`${error.message}. Falling back to YouTube channel page.`);
    parsedEntries = await fetchFallbackEpisodes();
  }

  if (parsedEntries.length === 0) {
    console.warn("No matching episodes found.");
  }

  const payload = {
    channelId: CHANNEL_ID,
    updatedAt: new Date().toISOString(),
    items: parsedEntries,
  };

  await writeFile(OUTPUT_PATH, JSON.stringify(payload, null, 2));
  console.log(`Wrote ${parsedEntries.length} episodes to ${OUTPUT_PATH}`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
