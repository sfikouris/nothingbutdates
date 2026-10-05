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
2. Copy `.env.example` to `.env.local` and set `VITE_ORDER_FORM_ENDPOINT` as described below.
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

## Order notifications to your personal inbox (no domain required)

Checkout submits directly to a Formspree form. No Render server, Gmail password,
SMTP credentials, or email API key is needed for the published site. The legacy
`server.ts` SMTP endpoint is not used by checkout.

1. Create a free account at https://formspree.io using the personal email address
   where you want order notifications. Verify your email address.
2. Create a form named **Nothing But Dates Orders**. Configure its email
   notifications to your verified personal address and enable notifications.
3. The configured endpoint is `https://formspree.io/f/mljgereb`. It works locally
   and in GitHub Pages builds without additional configuration.
4. To use a different form, optionally open GitHub **Settings → Secrets and
   variables → Actions → Variables** and add a **repository variable** named
   `VITE_ORDER_FORM_ENDPOINT`, with the new endpoint as its value. This overrides
   the default URL. It is intentionally public; do not enter a key or password.
5. Push the checkout changes and run **Deploy to GitHub Pages**. Changes to the
   variable require a new build; rerunning the workflow also rebuilds the site.
6. Place a small test order on the published site. Confirm it appears in your
   Formspree submissions dashboard and in your inbox (also check spam).

The notification includes the order reference, customer name, telephone, optional
email, pickup date, product quantities, totals, and special requests. A customer
email is used as reply-to when provided; no automatic customer email is configured.
The success screen means Formspree accepted the request, not guaranteed inbox
delivery or an agreed collection date. Failed requests show an error and keep the
basket. Network failures can leave submission status uncertain: check before
resubmitting to avoid duplicate orders.

Formspree currently allows 50 submissions/month on its free plan and keeps a
30-day submission archive. Test orders and spam can consume the allowance. This
fits approximately 1–7 orders/week, but check usage in the dashboard. Its pricing
page describes Free as intended for testing and development; check current terms
and limits before relying on it for live orders: https://formspree.io/plans.

Enable the service's available spam protection and restrict submissions to
`https://sfikouris.github.io` in the form settings. Endpoint IDs are public, not
authentication secrets. Orders and prices submitted from the browser are customer
requests: review totals against the shop prices before confirming by telephone.
Customer details are processed by Formspree and your email provider.

For local testing, the default endpoint works without an environment file. To
override it, set `VITE_ORDER_FORM_ENDPOINT` in `.env.local` (already ignored by Git).
If domain restrictions are enabled, allow your local origin temporarily or test
on the published site instead. Never commit credentials or real customer details.
