# minidu-portfolio

Personal site of Minidu Perera, software engineer (backend): a single page
covering highlights, about, experience, projects, skills, education, writing
and contact. On large screens a sticky
intro column (identity, primary actions, section nav) sits beside the
scrolling content; on small screens it becomes a hero with a sticky section bar.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack), React 19, TypeScript (strict)
- Tailwind CSS 4 (CSS-first config in `src/app/globals.css`)
- The page is statically prerendered and revalidated daily. Client JavaScript
  is limited to the scroll-spy nav, scroll reveal, copy-email button and
  photo lightbox.
- The Writing section lists the latest posts from the Substack RSS feed
  (`src/lib/substack.ts`). If the feed can't be reached, it falls back to a
  link, so builds never fail because of it.

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
| `npm test`          | Unit tests (Node's built-in test runner)       |
| `npm run check`     | Lint, type-check, test and build: what CI runs |

## Editing content

All copy is in **`src/content/profile.ts`**: name, role, pitch, highlights,
about text, links, experience, projects, skills, education and contact copy.
Keep every claim consistent with the CV in `public/resume.pdf`. Components only handle
layout, so most updates are a change to that one file. The section order and
nav labels are in `src/app/page.tsx`.

- **Photos** live in `src/assets/` and are imported statically, so Next.js
  sizes, optimises and blurs them automatically. Strip EXIF/GPS metadata
  from phone photos before adding them.
- **CV**: replace `public/resume.pdf` (the public copy should not include a
  home address or phone number).
- **Project links**: add `links: { repo, demo, caseStudy }` to a project;
  only link repos whose README explains what they do and how to run them.

## Project layout

```
src/
  app/                 the page, layout, 404, sitemap, robots, favicon
  components/
    sections/          one component per page section (intro, about, experience, …)
    ui/                shared primitives: section wrapper, tag list, button styles
    section-nav.tsx    scroll-spy nav (desktop sidebar + mobile bar)
    …                  lightbox, copy-email button, reveal
  content/profile.ts   all site content, typed
  lib/                 site URL, Substack feed reader (+ tests)
  assets/              images imported by content
public/resume.pdf
```

## Deployment

Deployed on Vercel at **https://miniduperera.cv** (`miniduperera.vercel.app`
redirects there). The canonical URL used for metadata, canonical links,
`sitemap.xml` and `robots.txt` is `profile.website` in
`src/content/profile.ts`; set `NEXT_PUBLIC_SITE_URL` only to override it.

Old routes from previous versions of the site (`/portfolio`, `/about`,
`/projects`, `/skills`, `/contact`, `/socials`, `/notes/*`, `/writing/*` and
the old résumé filename) redirect to the matching section or to Substack; see
`next.config.ts`.
