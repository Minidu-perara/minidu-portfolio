# minidu-portfolio

Personal site of Minidu Perera, software engineer (backend): a single, dark,
motion-rich page built around one idea: he has already worked on a live
production system. The visual language borrows from that world (telemetry,
logs, deploys, regions).

| Section | What happens |
| --- | --- |
| Hero | WebGL "signal field" (contour lines of animated noise) that magnifies under the pointer and ripples on click; the name's letters swell in weight and width near the pointer; the role decodes like a terminal; live Colombo time |
| Highlights | Bento grid with pointer-following glow, count-up numbers, internship timeline, before/after bars |
| About | Holographic ID badge that tilts in 3D, with foil, glare and a canvas guilloche print |
| Experience | Role card and `tail -f career.log` pinned while scrolling; log lines appear as you scroll |
| Projects | Tilting cards, each with an animated SVG diagram of the project |
| Stack | Two-row marquee and grouped skill cards |
| Contact | Dotted globe from Natural Earth land data with arcs to remote-work cities; live working-hour overlap |

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack), React 19, TypeScript (strict)
- Tailwind CSS 4 (CSS-first config in `src/app/globals.css`), Mona Sans (variable
  weight and width) and Geist Mono via `next/font`
- No animation or 3D libraries: the effects are hand-written WebGL, canvas, CSS
  and SVG in `src/components/fx`, `globe.tsx`, `holo-badge.tsx` and
  `project-scenes.tsx`
- The page is statically prerendered. Every animation pauses off-screen and in
  background tabs, the WebGL field lowers its resolution if frames run slow, and
  everything is readable with reduced motion or without JavaScript.
- A Writing section that lists the latest posts from the Substack RSS feed is
  built (`src/components/sections/writing.tsx`, `src/lib/substack.ts`) but not
  shown yet; `src/app/page.tsx` explains how to switch it on.

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
    sections/          one component per page section (hero, highlights, about, …)
    fx/                reusable effects: WebGL field, kinetic name, decode text,
                       magnetic buttons, spotlight, tilt, count-up, reveal
    live/              live widgets: local time, degree progress, time-zone overlap
    ui/                shared primitives: section frame, tag list, button styles
    site-nav.tsx       floating nav, mobile menu, scroll progress
    globe.tsx, career-log.tsx, holo-badge.tsx, project-scenes.tsx
  content/profile.ts   all site content, typed
  lib/                 site URL, time zones, globe land dots, Substack reader (+ tests)
  assets/              images imported by content
public/resume.pdf
```

## Deployment

Deployed on Vercel at **https://miniduperera.tech** (`miniduperera.vercel.app` redirects there). The canonical URL used for metadata, canonical links,
`sitemap.xml` and `robots.txt` is `profile.website` in
`src/content/profile.ts`; set `NEXT_PUBLIC_SITE_URL` only to override it.

Old routes from previous versions of the site (`/portfolio`, `/about`,
`/projects`, `/skills`, `/contact`, `/socials`, `/notes/*`, `/writing/*` and
the old résumé filename) redirect to the matching section or to Substack; see
`next.config.ts`.
