# Smartech Synergys SEO launch checklist

Keep the production-domain SEO changes local until `https://smartechsynergys.com/` is connected to the intended hosting and serves the website over HTTPS.

## After the custom domain is connected

- Confirm `https://smartechsynergys.com/` loads the production website over HTTPS without certificate warnings.
- Deploy the prepared production metadata so the canonical URL, Open Graph URL, structured-data URL, robots sitemap reference, and sitemap entry all use `https://smartechsynergys.com/`.
- Confirm `/robots.txt`, `/sitemap.xml`, and `/images/vision-collaboration.png` return HTTP 200 on the custom domain.
- Configure a permanent redirect from the old Vercel hostname to the matching URL on `https://smartechsynergys.com/`. Do not activate the redirect before the custom domain works.
- Choose one preferred hostname (`https://smartechsynergys.com/` is prepared here) and permanently redirect any `www` variant to it.
- Verify ownership of the custom domain in Google Search Console.
- Submit `https://smartechsynergys.com/sitemap.xml` in Google Search Console.
- Use URL Inspection on the homepage, test the live URL, and request indexing after the deployed canonical is confirmed.
- Review Page Indexing and Crawl Stats for canonical conflicts, redirects, blocked resources, or crawl errors.
- Test the homepage URL in social-sharing preview tools and confirm the title, description, and image render correctly.
- Replace the current square social image with a purpose-built, branded 1200 x 630 image when an approved asset is available, then update its metadata dimensions.

## Client confirmations

- Confirm the listed service region is Kuala Lumpur and Selangor.
- Confirm the published phone number, email address, and Sunway Visio Tower postal address are current and may be shown to search engines.
