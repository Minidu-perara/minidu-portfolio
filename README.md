# minidu-portfolio

Personal site of Minidu Perera: a landing page and a single-page portfolio
(education, work experience, projects, skills). Writing lives on
[Substack](https://minidu.substack.com/).

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack), React 19, TypeScript (strict)
- Tailwind CSS 4 (CSS-first config in `src/app/globals.css`)
- Every page is statically prerendered; the only client JavaScript is the
  header, the particle background, the portfolio scroll-spy and the photo lightbox.

## Getting started

Requires Node.js 20.9+ (see `.nvmrc`).

```bash
npm ci
npm run dev        # http://localhost:3000
```

| Script              | What it does                                   |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Start the dev server                           |
| `npm run build`     | Production build (type-checks as part of it)   |
| `npm run start`     | Serve the production build                     |
| `npm run lint`      | ESLint (Next.js core-web-vitals + TypeScript)  |
| `npm run typecheck` | Generate route types and run `tsc`             |
| `npm run check`     | Lint, type-check and build: what CI runs       |

## Editing content

All copy is in **`src/content/profile.ts`**: name, tagline, links, education,
experience, projects and skills. Pages only handle layout, so most updates
are a change to that one file.

- **Photos** live in `src/assets/` and are imported statically, so Next.js
  sizes, optimises and blurs them automatically. Strip EXIF/GPS metadata
  from phone photos before adding them.
- **Resume**: replace `public/resume.pdf` and update `profile.resume.updated`.

## Project layout

```
src/
  app/                 routes: / and /portfolio, plus 404, sitemap, robots, favicon
  components/          shared UI (header, social links, particle background, …)
    portfolio/         portfolio-only pieces (section nav, lightbox, section wrapper)
  content/profile.ts   all site content, typed
  lib/site.ts          canonical site URL
  assets/              images imported by content
public/resume.pdf
```

## Deployment

Deployed on Vercel. The canonical URL used for metadata, `sitemap.xml` and
`robots.txt` comes from `NEXT_PUBLIC_SITE_URL` if set, otherwise from Vercel's
production domain. Set `NEXT_PUBLIC_SITE_URL` when a custom domain is added.

Old routes from the previous version of the site (`/about`, `/projects`,
`/skills`, `/contact`, `/socials`, `/notes/*`, `/writing/*` and the old resume
filename) redirect to their new home; see `next.config.ts`.
