import { mkdir, readFile, writeFile } from "node:fs/promises";

const PUBLIC_OUTPUT_PATH = "public/newsletter-issues.json";
const GENERATED_OUTPUT_PATH = "src/generated/newsletter-issues.json";
const SEO_OVERRIDES_PATH = "src/content/newsletter-seo-overrides.json";
const MAX_ITEMS = 12;

const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
const apiKey = process.env.BEEHIIV_API_KEY;

const fallbackPayload = {
  publicationId: publicationId || null,
  updatedAt: new Date().toISOString(),
  configured: false,
  items: [],
};

const loadSeoOverrides = async () => {
  try {
    const raw = await readFile(SEO_OVERRIDES_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};

const loadExistingPayload = async () => {
  for (const payloadPath of [GENERATED_OUTPUT_PATH, PUBLIC_OUTPUT_PATH]) {
    try {
      const raw = await readFile(payloadPath, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed?.items) && parsed.items.length > 0) {
        return parsed;
      }
    } catch {
      // Keep trying the next generated payload location.
    }
  }

  return null;
};

const writeUnavailablePayload = async (reason) => {
  const existingPayload = await loadExistingPayload();

  if (existingPayload) {
    await writePayload(existingPayload);
    console.warn(
      `${reason}. Preserved ${existingPayload.items.length} existing newsletter issues in ${PUBLIC_OUTPUT_PATH} and ${GENERATED_OUTPUT_PATH}`,
    );
    return;
  }

  await writePayload(fallbackPayload);
  console.warn(
    `${reason}. No existing newsletter payload found, so wrote an empty payload to ${PUBLIC_OUTPUT_PATH} and ${GENERATED_OUTPUT_PATH}`,
  );
};

const normalizeOverrideText = (value) =>
  typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";

const formatDisplayDate = (value) => {
  if (!value) return "";

  const normalizedValue =
    typeof value === "number" ? value * 1000 : value;

  const date = new Date(normalizedValue);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
};

const normalizeTimestamp = (value) => {
  if (!value) return "";

  if (typeof value === "number") {
    return new Date(value * 1000).toISOString();
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toISOString();
};

const stripHtml = (value) =>
  value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();

const deriveSlug = (post) => {
  if (post.slug && typeof post.slug === "string") {
    return post.slug.trim();
  }

  try {
    const webUrl = post.web_url ? new URL(post.web_url) : null;
    const lastSegment = webUrl?.pathname.split("/").filter(Boolean).at(-1);
    if (lastSegment) {
      return lastSegment;
    }
  } catch {
    // Ignore malformed URLs and fall back to title-derived slug.
  }

  return String(post.title || post.id || "newsletter-issue")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const extractContentHtml = (post) => {
  const html = post?.content?.free?.web;
  if (!html || typeof html !== "string") {
    return "";
  }

  const withoutDoctype = html.replace(/<!doctype[^>]*>/gi, "").trim();
  const bodyMatch = withoutDoctype.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const content = bodyMatch ? bodyMatch[1] : withoutDoctype;

  return content
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .trim();
};

const removeTrackingParams = (rawUrl) => {
  try {
    const url = new URL(rawUrl);
    const paramsToRemove = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
    ];

    paramsToRemove.forEach((key) => url.searchParams.delete(key));
    return url.toString();
  } catch {
    return rawUrl;
  }
};

const stripAttribute = (html, attributeName) =>
  html.replace(
    new RegExp(`\\s${attributeName}=(["']).*?\\1`, "gi"),
    "",
  );

const extractAttributeValue = (attributes, name) => {
  const patterns = [
    new RegExp(`${name}\\s*=\\s*"([^"]*)"`, "i"),
    new RegExp(`${name}\\s*=\\s*'([^']*)'`, "i"),
    new RegExp(`${name}\\s*=\\s*([^\\s>]+)`, "i"),
  ];

  for (const pattern of patterns) {
    const match = attributes.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return "";
};

const sanitizeContentHtml = (html) => {
  if (!html) return "";

  let cleaned = html;

  cleaned = cleaned.replace(/^[\s\S]*?<div[^>]*id=(["'])content-blocks\1>/i, "");
  cleaned = cleaned.replace(
    /<div[^>]*>\s*<div[^>]*border-top:[^>]*>\s*<\/div>\s*<\/div>/gi,
    "<hr />",
  );
  cleaned = cleaned.replace(/<\/?(html|body|div)[^>]*>/gi, "");
  cleaned = cleaned.replace(/<([a-z0-9]+)\b([^>]*)>/gi, (match, tagName, attributes) => {
    const tag = tagName.toLowerCase();
    const allowedSimpleTags = new Set([
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "li",
      "blockquote",
      "figure",
      "figcaption",
      "strong",
      "em",
      "b",
      "i",
      "br",
    ]);

    if (allowedSimpleTags.has(tag)) {
      return `<${tag}>`;
    }

    if (tag === "hr") {
      return "<hr />";
    }

    if (tag === "ol") {
      const start = extractAttributeValue(attributes, "start");
      return start ? `<ol start="${start}">` : "<ol>";
    }

    if (tag === "a") {
      const href = removeTrackingParams(extractAttributeValue(attributes, "href"));
      const target = extractAttributeValue(attributes, "target");
      const rel = extractAttributeValue(attributes, "rel");
      const relParts = rel
        .split(/\s+/)
        .filter(Boolean)
        .filter((part, index, arr) => arr.indexOf(part) === index)
        .sort();
      const targetAttr = target ? ` target="${target}"` : "";
      const relAttr = relParts.length > 0 ? ` rel="${relParts.join(" ")}"` : "";
      return href ? `<a href="${href}"${targetAttr}${relAttr}>` : "<a>";
    }

    if (tag === "img") {
      const src = extractAttributeValue(attributes, "src");
      const alt = extractAttributeValue(attributes, "alt");
      if (!src) return "";
      return `<img src="${src}" alt="${alt}" />`;
    }

    if (tag === "iframe") {
      const src = extractAttributeValue(attributes, "src");
      const allow = extractAttributeValue(attributes, "allow");
      const allowFullScreen = /allowfullscreen/i.test(attributes)
        ? " allowfullscreen"
        : "";
      const allowAttr = allow ? ` allow="${allow}"` : "";
      return src ? `<iframe src="${src}"${allowAttr}${allowFullScreen}>` : "";
    }

    return "";
  });
  cleaned = cleaned.replace(/<\/([a-z0-9]+)>/gi, (match, tagName) => {
    const tag = tagName.toLowerCase();
    const allowedClosingTags = new Set([
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "blockquote",
      "figure",
      "figcaption",
      "iframe",
      "strong",
      "em",
      "b",
      "i",
      "a",
    ]);

    if (allowedClosingTags.has(tag)) {
      return `</${tag}>`;
    }

    return "";
  });
  cleaned = cleaned.replace(
    /^\s*<p>[\s\S]{0,300}?(?:Estimated Reading Time|Andy David|Pete & Andy|[A-Z][a-z]+\s+\d{1,2},\s+\d{4}|[A-Z][a-z]+\s+\d{4})[\s\S]*?<\/p>\s*/i,
    "",
  );
  cleaned = cleaned.replace(/^(?:\s*<a\b[\s\S]*?<\/a>\s*){1,8}/i, "");
  cleaned = cleaned.replace(/<a([^>]*?)href=(["'])(.*?)\2([^>]*)>/gi, (_, before, quote, href, after) => {
    const normalizedHref = removeTrackingParams(href);
    return `<a${before}href=${quote}${normalizedHref}${quote}${after}>`;
  });
  cleaned = cleaned.replace(/<a([^>]*?)rel=(["'])(.*?)\2([^>]*)>/gi, (_, before, quote, relValue, after) => {
    const relParts = relValue
      .split(/\s+/)
      .filter(Boolean)
      .filter((part, index, arr) => arr.indexOf(part) === index)
      .sort();
    return `<a${before}rel=${quote}${relParts.join(" ")}${quote}${after}>`;
  });
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n");
  cleaned = cleaned.replace(/>\s+</g, "><");

  return cleaned.trim();
};

const formatReadTime = (html, fallbackText = "") => {
  const text = stripHtml(html || fallbackText);
  const wordCount = text ? text.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(wordCount / 225));
  return `${minutes} min read`;
};

const normalizeExcerpt = (post) => {
  const excerpt =
    post.meta_default_description ||
    post.subtitle ||
    post.preview_text ||
    stripHtml(extractContentHtml(post));
  const cleaned = excerpt.replace(/\s+/g, " ").trim();

  if (cleaned.length <= 180) return cleaned;
  return `${cleaned.slice(0, 177)}...`;
};

const fetchPosts = async () => {
  const url = new URL(
    `https://api.beehiiv.com/v2/publications/${publicationId}/posts`,
  );

  url.searchParams.set("limit", String(MAX_ITEMS));
  url.searchParams.set("page", "1");
  url.searchParams.set("status", "confirmed");
  url.searchParams.set("direction", "desc");
  url.searchParams.set("order_by", "publish_date");
  url.searchParams.set("hidden_from_feed", "false");
  url.searchParams.append("expand", "free_web_content");

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Beehiiv posts (${response.status})`);
  }

  return response.json();
};

const normalizePost = (post, override = {}) => {
  const published = normalizeTimestamp(
    post.displayed_date || post.publish_date || post.created,
  );
  const html = sanitizeContentHtml(extractContentHtml(post));
  const slug = deriveSlug(post);
  const description =
    normalizeOverrideText(override.description) || normalizeExcerpt(post);
  const seoDescription =
    normalizeOverrideText(override.seoDescription) || description;
  const intro =
    normalizeOverrideText(override.intro) ||
    (post.subtitle || description || "").replace(/\s+/g, " ").trim();
  const seoTitle =
    normalizeOverrideText(override.seoTitle) ||
    normalizeOverrideText(override.title) ||
    post.title;

  return {
    id: post.id,
    slug,
    path: `/newsletter/${slug}`,
    title: post.title,
    seoTitle,
    subtitle: post.subtitle || "",
    intro: intro || description,
    description,
    seoDescription,
    thumbnail: post.thumbnail_url || "",
    ogImage: post.thumbnail_url || "",
    webUrl: post.web_url || "",
    published,
    displayDate: formatDisplayDate(published),
    authors: Array.isArray(override.authors)
      ? override.authors
      : Array.isArray(post.authors)
        ? post.authors
        : [],
    tags: Array.isArray(override.tags)
      ? override.tags
      : Array.isArray(post.content_tags)
        ? post.content_tags
        : [],
    readTime: formatReadTime(html, description),
    noindex: Boolean(override.noindex),
    html,
  };
};

const writePayload = async (payload) => {
  await mkdir("src/generated", { recursive: true });
  await Promise.all([
    writeFile(PUBLIC_OUTPUT_PATH, JSON.stringify(payload, null, 2)),
    writeFile(GENERATED_OUTPUT_PATH, JSON.stringify(payload, null, 2)),
  ]);
};

const main = async () => {
  const seoOverrides = await loadSeoOverrides();

  if (!publicationId || !apiKey) {
    await writeUnavailablePayload("Missing Beehiiv configuration");
    return;
  }

  const response = await fetchPosts();
  const items = Array.isArray(response.data)
    ? response.data
        .map((post) => normalizePost(post, seoOverrides[deriveSlug(post)] || {}))
        .filter((post) => post.title && post.webUrl)
        .filter((post) => !post.published || new Date(post.published).getTime() <= Date.now())
    : [];

  const payload = {
    publicationId,
    updatedAt: new Date().toISOString(),
    configured: true,
    items,
  };

  await writePayload(payload);
  console.log(
    `Wrote ${items.length} newsletter issues to ${PUBLIC_OUTPUT_PATH} and ${GENERATED_OUTPUT_PATH}`,
  );
};

main().catch(async (error) => {
  console.error(error);
  await writeUnavailablePayload("Beehiiv sync failed");
});
