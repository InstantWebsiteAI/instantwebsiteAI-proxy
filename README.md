# instantwebsiteAI-proxy

Clean starter for an Instant Website preview generator.
- Static frontend (`index.html`) with a simple form
- Serverless API route (`/api/generate`) on Vercel
- No API keys required (stub preview link returned)
- Ready to swap in your AI HTML generator later

## Deploy (from scratch)
1. Create a new GitHub repo named **instantwebsiteAI-proxy** (public).
2. Upload the 4 files/folders from this zip:
   - `index.html`
   - `vercel.json`
   - `package.json`
   - `api/generate.js`
3. Go to Vercel → **New Project** → Import the repo → Framework: **Other** → Deploy.
4. Visit your site and test `/` (form) and `/api/generate` (should return 405 on GET).

## Connect to Shopify
Use your existing Custom Liquid section. Point your frontend fetch to your deployed `/api/generate` endpoint.
