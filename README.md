# ki-kmu-schweiz.ch

Landing page for Jannick Oberbeck's KI consulting business.

**Live:** https://ki-kmu-schweiz.ch (after deployment)

## Stack

- Astro 4 + Tailwind CSS 3 + TypeScript
- Deployed on Vercel (hybrid, serverless API for contact form)
- Content Collections for case studies and FAQs (markdown)
- Email via Resend

## Development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # production build
npm run preview   # serve production build
```

## Environment Variables

Copy `.env.example` to `.env` and fill in real values.

## Content

- Case studies: `src/content/cases/*.md`
- FAQs: `src/content/faqs/*.md`

Edit markdown files and the page rebuilds automatically.

## Launch Checklist

Before opening the site to the public:

- [ ] Replace placeholder logos in `public/logos/` with real client logos (SVG preferred)
- [ ] Replace portrait placeholder (initials "JO") in `src/components/About.astro` and `src/components/Hero.astro` with real photo
- [ ] Verify anchor case numbers (cases 1, 4, 7, 8) match real delivered projects
- [ ] Fill in `[Adresse]` and `[PLZ Ort]` placeholders in `src/pages/datenschutz.astro` and `src/pages/impressum.astro`
- [ ] Add real UID in `src/pages/impressum.astro`
- [ ] Set production env vars in Vercel (RESEND_API_KEY, CONTACT_FORM_TO, PUBLIC_CALENDLY_URL, PUBLIC_WHATSAPP_NUMBER, PUBLIC_CONTACT_EMAIL, PUBLIC_CONTACT_PHONE)
- [ ] Test contact form end-to-end (real email arrives)
- [ ] Test Calendly link leads to real booking page
- [ ] Test WhatsApp link opens WhatsApp with prefilled text
- [ ] Run Lighthouse on production URL: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100
- [ ] Set up Plausible Analytics account (or enable Vercel Analytics) and uncomment script in `src/layouts/BaseLayout.astro`
- [ ] Configure DNS: `ki-kmu-schweiz.ch` → Vercel
- [ ] Submit sitemap to Google Search Console
- [ ] Convert `public/og-image.svg` to PNG (1200×630) for full OG compatibility on all social platforms
- [ ] Juristischer Quick-Check der Datenschutzerklärung vor Go-Live

## Deployment (manual, once)

```bash
vercel login
vercel link
vercel env add RESEND_API_KEY production
vercel env add CONTACT_FORM_TO production
vercel env add PUBLIC_CALENDLY_URL production
vercel env add PUBLIC_WHATSAPP_NUMBER production
vercel env add PUBLIC_CONTACT_EMAIL production
vercel env add PUBLIC_CONTACT_PHONE production
vercel --prod
```
