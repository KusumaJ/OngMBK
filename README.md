# ONG MBK static site

## Edit the source

- `data/site.json` contains the site name, footer details, page routes, and navigation map.
- `content/` contains one HTML content fragment for each page.
- `templates/page.html` is the shared HTML shell.
- `templates/site-components.js` is the shared navigation/header/footer template.
- `files/main_style.css` contains the shared styling.

## Build the site

Run:

```powershell
npm run build
```

This regenerates the root HTML files, including `index.html`, `m41.html`, and every other published route. Do not edit those generated root pages directly; edit the source files above and build again.
