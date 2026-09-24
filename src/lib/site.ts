/**
 * Absolute origin of the deployed site, used for metadata, the sitemap and
 * robots.txt. Set NEXT_PUBLIC_SITE_URL once a custom domain is in place;
 * until then Vercel's production URL is used, then localhost for local builds.
 */
export function getSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return new URL(explicit);

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return new URL(`https://${vercel}`);

  return new URL(`http://localhost:${process.env.PORT ?? 3000}`);
}
