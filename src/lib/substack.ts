export type Post = {
  title: string;
  url: string;
  /** ISO 8601 publish date. */
  date: string;
  excerpt: string;
};

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

function decodeEntities(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
    if (entity[0] === "#") {
      const code = entity[1]?.toLowerCase() === "x" ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
      return Number.isNaN(code) ? match : String.fromCodePoint(code);
    }
    return ENTITIES[entity.toLowerCase()] ?? match;
  });
}

function readTag(item: string, tag: string): string {
  const match = item.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i"));
  if (!match?.[1]) return "";
  const raw = match[1].trim();
  const cdata = raw.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  return cdata?.[1] !== undefined ? cdata[1].trim() : decodeEntities(raw);
}

function toPlainText(html: string): string {
  return decodeEntities(html.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

/** Parses an RSS 2.0 feed (as served by Substack) into posts, newest first. */
export function parseFeed(xml: string): Post[] {
  const posts: Post[] = [];
  for (const [, item = ""] of xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)) {
    const title = toPlainText(readTag(item, "title"));
    const url = readTag(item, "link");
    const published = new Date(readTag(item, "pubDate"));
    // Only render links we can trust to be web URLs.
    if (!title || !/^https:\/\//i.test(url) || Number.isNaN(published.getTime())) continue;
    posts.push({
      title,
      url,
      date: published.toISOString(),
      excerpt: toPlainText(readTag(item, "description")),
    });
  }
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Latest posts from the Substack RSS feed, refreshed at most daily. Returns an
 * empty list if the feed is unreachable, so the page always builds and renders.
 */
export async function getLatestPosts(feedUrl: string, limit = 3): Promise<Post[]> {
  try {
    const response = await fetch(feedUrl, {
      next: { revalidate: 60 * 60 * 24 },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return [];
    return parseFeed(await response.text()).slice(0, limit);
  } catch {
    return [];
  }
}
