# Idea Shuffle

Next.js app for exploring your spreadsheet's startup ideas, one random pick at a time. Requires Node.js 22 or newer.

```bash
git clone https://github.com/Lemer99/random-ideas.git
cd random-ideas
npm install
npm run dev
```

Open http://localhost:3000. Click **Shuffle ideas** (or press **Space**) for another random headline and description. Each idea stays visible until you shuffle. Consecutive picks never repeat when there are multiple ideas; earlier ideas can appear again.

The app reads `public/ideas.json`, a plain JSON file containing all 2,473 ideas transferred from the spreadsheet. Each entry has an `id` (the original spreadsheet row), `headline`, and `description`. Add or edit entries directly in that file. Refresh the page to load changes locally; redeploy to publish changes. The spreadsheet is retained as the original source but is not needed to run or deploy the app.

For a local production build, run `npm run build` followed by `npm start`. Stop the server with Ctrl+C.

To deploy later, push this folder to a Git repository and import it in Vercel. If it lives inside a larger repository, set the Vercel project's Root Directory to `random_ideas` (or its full path within that repository). Vercel detects Next.js and runs `npm run build`. Include `public/ideas.json` in the repository. No environment variables or database are needed. The deployed collection is accessible to anyone who can access the app.
