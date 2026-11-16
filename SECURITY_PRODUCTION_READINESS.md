# Security and production handover

## Account ownership and developer access

- The client should own the domain registrar, Cloudflare, Web3Forms, source-control, and destination-email accounts.
- Invite developers as individual users with the minimum permissions needed. Do not share account passwords, recovery codes, API tokens, or email credentials.
- Remove access when work ends and keep multi-factor authentication enabled on owner and developer accounts.

## Cloudflare Pages configuration

- Framework preset: Vite.
- Build command: `npm run build`.
- Build output directory: `dist`.
- Production environment variable: `VITE_WEB3FORMS_ACCESS_KEY` with the existing Web3Forms public access key.
- Add the variable to Preview only when form submissions from preview deployments are intentionally allowed.
- Do not put private server credentials in variables beginning with `VITE_`; Vite embeds those values in browser JavaScript.

Cloudflare should be connected to the client's source repository or deployed by an authorised team member. Rebuild with `npm ci` followed by `npm run build`. Never upload `.env`, repository metadata, local audit reports, or `node_modules`.

## Contact form verification

1. In Web3Forms, confirm the access key belongs to the client's account and delivers to the approved recipient.
2. Review any available domain restriction, spam filtering, rate limiting, and access-key rotation settings in the Web3Forms dashboard.
3. After the production domain is live, submit one clearly labelled test using realistic field lengths.
4. Confirm the success message appears only after a successful API response and that exactly one email arrives with every expected field.
5. Test an API failure separately and confirm entered information remains in the form.
6. Do not include real customer personal data in routine tests.

## Ongoing maintenance

- Run `npm audit --omit=dev` for production dependencies and `npm audit` for the full toolchain before releases.
- Review findings for actual runtime exposure before upgrading. Do not use `npm audit fix --force` without testing the resulting major upgrades.
- Apply supported patch and minor updates in a branch, then rebuild and regression-test navigation, animations, responsive layouts, and the contact form.
- Recalculate the JSON-LD SHA-256 value in `public/_headers` whenever the inline structured-data block in `index.html` changes.

## DNS, HTTPS, and security headers

- After connecting the domain, confirm both the intended hostname and HTTPS certificate work without warnings before advertising the URL.
- Confirm HTTP redirects permanently to the chosen HTTPS hostname and that no redirect loop exists.
- Inspect the deployed document response to verify the CSP, Permissions Policy, Referrer Policy, frame protection, and MIME-sniffing protection are present.
- Check the browser console for CSP violations while exercising navigation, images, animations, fonts, and Web3Forms submission.
- The prepared HSTS lifetime is deliberately limited to one day for launch validation. Increase it only after HTTPS and all required hostnames have remained reliable. Do not enable `includeSubDomains` or preload until every affected subdomain is verified.
- Verify `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/favicon.svg`, and the Open Graph image return the correct content and status.
