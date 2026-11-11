import { readdirSync, readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function sanitizeUrl(rawUrl) {
  const trimmed = rawUrl.trim().replaceAll("\\&", "&");

  if (!trimmed) {
    return "#";
  }

  if (
    trimmed.startsWith("/") ||
    trimmed.startsWith("#") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("http://")
  ) {
    return escapeHtml(trimmed);
  }

  return "#";
}

function parseFrontmatter(fileContents) {
  const match = fileContents.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!match) {
    throw new Error("Missing frontmatter block.");
  }

  const [, frontmatterBlock, body] = match;
  const data = {};

  frontmatterBlock.split("\n").forEach((line) => {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) return;
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    data[key] = value;
  });

  return { data, body: body.trim() };
}

function formatDate(dateValue) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${dateValue}T00:00:00`));
}

function renderInline(markdown) {
  const escaped = escapeHtml(markdown);

  return escaped
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => `<a href="${sanitizeUrl(href)}">${label}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function tableCells(line) {
  return line.trim().replace(/^\|/, '').replace(/(?<!\\)\|$/, '').split(/(?<!\\)\|/).map(cell => cell.trim().replaceAll('\\|', '|'));
}
function isTableStart(lines, index) {
  if (!lines[index]?.includes('|') || !lines[index + 1]) return false;
  const cells = tableCells(lines[index]);
  const separators = tableCells(lines[index + 1]);
  return cells.length > 1 && cells.length === separators.length && separators.every(cell => /^:?-{3,}:?$/.test(cell));
}

export function renderMarkdown(markdown) {
  const lines = markdown.split("\n");
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (isTableStart(lines, index)) {
      const headers = tableCells(line);
      index += 2;
      const rows = [];
      while (index < lines.length && lines[index].trim() && lines[index].includes('|')) {
        const cells = tableCells(lines[index]);
        if (cells.length !== headers.length) break;
        rows.push(`<tr>${cells.map(cell => `<td>${renderInline(cell)}</td>`).join('')}</tr>`);
        index += 1;
      }
      blocks.push(`<div class="writing-post-table" role="region" aria-label="Article table" tabindex="0"><table><thead><tr>${headers.map(cell => `<th scope="col">${renderInline(cell)}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`);
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push(`<h2>${renderInline(line.slice(3).trim())}</h2>`);
      index += 1;
      continue;
    }

    if (line.startsWith("# ")) {
      blocks.push(`<h1>${renderInline(line.slice(2).trim())}</h1>`);
      index += 1;
      continue;
    }

    if (line === "{{VALUE_TRAP_CHART}}") {
      blocks.push('<div data-embed="value-trap-chart"></div>');
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push(`<h3>${renderInline(line.slice(4).trim())}</h3>`);
      index += 1;
      continue;
    }

    if (line.startsWith(">")) {
      const quoteLines = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push(`<blockquote><p>${renderInline(quoteLines.join(" "))}</p></blockquote>`);
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      const items = [];
      while (
        index < lines.length &&
        (lines[index].trim().startsWith("- ") || lines[index].trim().startsWith("* "))
      ) {
        items.push(`<li>${renderInline(lines[index].trim().slice(2).trim())}</li>`);
        index += 1;
      }
      blocks.push(`<ul>\n${items.join("\n")}\n</ul>`);
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items = [];
      while (index < lines.length && /^\d+\.\s/.test(lines[index].trim())) {
        items.push(`<li>${renderInline(lines[index].trim().replace(/^\d+\.\s/, "").trim())}</li>`);
        index += 1;
      }
      blocks.push(`<ol>\n${items.join("\n")}\n</ol>`);
      continue;
    }

    const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      const [, alt, src] = imageMatch;
      const caption = alt ? `<figcaption>${escapeHtml(alt)}</figcaption>` : "";
      blocks.push(
        `<figure><img src="${sanitizeUrl(src)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async" />${caption}</figure>`,
      );
      index += 1;
      continue;
    }

    const paragraphLines = [];
    while (index < lines.length && lines[index].trim()) {
      const currentLine = lines[index].trim();
      if (
        isTableStart(lines, index) ||
        currentLine.startsWith("# ") ||
        currentLine.startsWith("## ") ||
        currentLine.startsWith("### ") ||
        currentLine === "{{VALUE_TRAP_CHART}}" ||
        currentLine.startsWith(">") ||
        currentLine.startsWith("- ") ||
        currentLine.startsWith("* ") ||
        /^\d+\.\s/.test(currentLine)
      ) {
        break;
      }
      if (currentLine.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)) {
        break;
      }
      paragraphLines.push(currentLine);
      index += 1;
    }

    if (paragraphLines.length > 0) {
      blocks.push(`<p>${renderInline(paragraphLines.join(" "))}</p>`);
    }
  }

  return `${blocks.join("\n")}\n`;
}


export function readWritingPosts(rootDir = process.cwd()) {
 const contentDir = resolve(rootDir, 'content/writing');
 const posts = readdirSync(contentDir)
  .filter((file) => file.endsWith(".md") && file !== "README.md")
  .map((file) => {
    const { data, body } = parseFrontmatter(readFileSync(resolve(contentDir, file), "utf8"));
    const tags = (data.tags || "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    return {
      slug: data.slug || basename(file, ".md"),
      title: data.title,
      description: data.description,
      intro: data.intro,
      date: data.date,
      displayDate: formatDate(data.date),
      readTime: data.readTime,
      tags,
      author: data.author || "Other Stuff",
      thumbnail: data.thumbnail || "/Hero-Background.webp",
      ogImage: data.ogImage || "/og-default.png",
      html: renderMarkdown(body),
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


 const seen = new Set();
 for (const post of posts) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) throw new Error('Invalid writing slug: '+post.slug);
  if (seen.has(post.slug)) throw new Error('Duplicate writing slug: '+post.slug);
  seen.add(post.slug);
  for (const field of ['title','description','intro','date','readTime']) if (!post[field]?.trim()) throw new Error(post.slug+': missing '+field);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(post.date) || Number.isNaN(Date.parse(post.date))) throw new Error(post.slug+': invalid date');
 }
 return posts;
}
