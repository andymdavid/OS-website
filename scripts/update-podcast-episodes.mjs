import { writeFile } from "node:fs/promises";

const CHANNEL_ID = "UCGVpiP_odkzPHkX0x1GMX1w";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const OUTPUT_PATH = "public/podcast-episodes.json";
const MAX_ITEMS = 12;

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

const normalizeDescription = (value) => {
  const cleaned = value.replace(/\s+/g, " ").trim();
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

const main = async () => {
  const xml = await fetchFeed();
  const entries = parseEntries(xml)
    .map(parseEntry)
    .filter((entry) => entry.title && entry.link)
    .filter((entry) => /^Good Stuff\\s+\\d+\\s*-/i.test(entry.title))
    .slice(0, MAX_ITEMS);

  const payload = {
    channelId: CHANNEL_ID,
    updatedAt: new Date().toISOString(),
    items: entries,
  };

  await writeFile(OUTPUT_PATH, JSON.stringify(payload, null, 2));
  console.log(`Wrote ${entries.length} episodes to ${OUTPUT_PATH}`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
