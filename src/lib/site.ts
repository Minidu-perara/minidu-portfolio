import { profile } from "@/content/profile";

/**
 * Canonical origin of the site, used for metadata, canonical links, the
 * sitemap and robots.txt. Always the production domain, so preview and
 * vercel.app deployments point search engines and link previews at it.
 * NEXT_PUBLIC_SITE_URL overrides it (for example to test a staging domain).
 */
export function getSiteUrl(): URL {
  return new URL(process.env.NEXT_PUBLIC_SITE_URL || profile.website);
}
