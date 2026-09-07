# raphaellrenard_website
Website of Raphael L. Renard — adventure novels (static site, German).

## Structure

- `*.html` at root — German pages (URLs unchanged from the old Hostinger site, keeps SEO + the `.de` redirect 1:1)
- `/en/` (planned) — future English version
- `/css`, `/js`, `/img` — shared assets
- `manifest.webmanifest`, `CNAME` (added at go-live)

## Local preview

```
python -m http.server 8000
```

then open http://localhost:8000

## Deploy

GitHub Pages, custom domain `raphaellrenard.com` (DNS at Porkbun).
See `../DNS_hostinger/` (private project folder, not in this repo) for DNS history.
