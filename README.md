<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/a1a15df4-b4bf-4c2e-88ee-2832c97ed78e

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
    `npm run dev`

## Deploy to GitHub Pages

GitHub Pages must serve the compiled site, rather than the source `index.html`
that loads `/src/main.tsx`.

1. Upload this project to the repository, including `.github/workflows/deploy-pages.yml`.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push these changes to `main` or `master`. Alternatively, open **Actions → Deploy to GitHub Pages → Run workflow**.
4. Wait for both the build and deployment jobs to succeed, then open
   https://sfikouris.github.io/nothingbutdates/.

The workflow runs `npm ci` and `npm run build:pages`, then publishes only `dist/`.
Vite uses relative asset URLs so the compiled site loads under the repository path.
If your default branch has a different name, update the workflow's `branches` list.

To preview the static build locally:

```sh
npm run build:pages
npx vite preview
```

### Checkout email endpoint

GitHub Pages hosts static files and cannot run `server.ts`. The site's checkout
submits orders to `/api/order`, so sending orders requires deploying the Node.js
server to a host that supports it and connecting checkout to that backend.
Publishing to Pages alone enables the storefront, but not order emails.
