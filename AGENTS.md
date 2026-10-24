# Idea Shuffle

## Project

A minimal Next.js web app for exploring startup ideas one at a time. It runs locally and is intended for eventual deployment to Vercel. The project directory is `random_ideas/`.

On load, show a random idea's headline and description. Clicking **Shuffle** or pressing **Space** selects another random idea. Keep the current idea visible until the user requests another. Avoid consecutive repeats when multiple ideas exist; ideas seen earlier may appear again. Each eligible idea should have an equal chance of selection.

## Stack and files

- Next.js App Router, React, JavaScript/JSX, and plain CSS. Requires Node.js 22 or newer.
- `app/page.jsx`: client component, collection loading, random selection, keyboard shortcut, loading and retry behavior.
- `app/globals.css`: responsive layout and styling.
- `app/layout.jsx`: root layout and page metadata.
- `app/icon.svg`: favicon.
- `public/ideas.json`: collection used directly by the app. Contains an `ideas` array with 2,473 records, each with `id`, `headline`, and `description`. IDs preserve original spreadsheet row numbers; do not assume they start at zero or are array indexes.
- `Technical_Problems_Preferences.xlsx`: original source, retained for reference. There is no runtime or build dependency on the spreadsheet, Python, or an Excel importer.
- `README.md`: local setup and deployment instructions.

## Design requirements

Preserve the user's explicitly requested minimal interface:

- Show only the headline, description, and Shuffle button during normal use.
- Keep the white card, subtle border and shadow, warm off-white background, and purple button.
- Use large, readable headline and description text.
- Center the headline and description on mobile (viewport widths up to 600px).
- Place Shuffle directly below the card with a small gap; keep the card and button together.
- Fit the content and button on one screen, especially on phones. All current ideas were checked at 320 × 568, 375 × 667, and 390 × 844, as well as desktop.
- Do not add branding, introductory text, counters, labels, footers, or visible keyboard hints unless requested.
- Keep full idea text readable. Do not truncate or hide content to satisfy viewport checks. Allow scrolling if future content or accessibility settings need more space.
- Retain accessible button focus, live announcements, loading state, retry behavior, and mobile safe-area spacing.

## Commands

Run commands from this directory:

```bash
npm install
npm run dev
```

The local app runs at `http://localhost:3000`.

```bash
npm run build
npm start
```

For an alternate preview port, use `npm start -- --port 3001` or `npm run dev -- --port 3001`. Check for an existing server before starting another and avoid stopping unrelated processes.

## Data and validation

Edit `public/ideas.json` directly when changing the collection. Preserve complete headline/description pairs and unique IDs. Do not add spreadsheet import dependencies unless requested.

After code changes, run `npm run build`. For layout changes, check representative phone and desktop viewports, including the longest ideas, and verify that the button stays visible. For interaction changes, verify Shuffle, Space, no immediate repeats, stable content without input, and retry behavior. There is currently no dedicated test script.

## Deployment

The user plans to deploy to Vercel later. Keep the project compatible with standard Next.js deployment. Set the Vercel Root Directory to this project's path within the repository. Include `public/ideas.json`; no database, secrets, or environment variables are required. Collection changes require redeployment to appear on the hosted app. Do not deploy unless requested.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
