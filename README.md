# Dustin Perry — Résumé site

Static, dependency-free résumé page: one `index.html`, one stylesheet, one small script.
It is designed to be served from GitHub Pages at the repository root.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The résumé: summary, skills, experience, projects, education, Person JSON-LD |
| `styles.css` | Design tokens, light/dark themes, responsive layout, print stylesheet |
| `app.js` | Theme toggle, sticky-header state, scroll-spy nav, print button |
| `favicon.svg` | Monogram favicon |
| `Dustin_Perry_Resume.pdf` | Downloadable source résumé |
| `.nojekyll` | Tells GitHub Pages to serve files as-is, skipping Jekyll |

## Publish on GitHub Pages

1. Create an empty public repository, for example `resume`:

   ```powershell
   gh repo create <owner>/resume --public --description "Résumé site for Dustin Perry"
   ```

2. Push this directory to it:

   ```powershell
   git remote add origin https://github.com/<owner>/resume.git
   git branch -M main
   git push -u origin main
   ```

3. Enable Pages from the `main` branch, root folder:

   ```powershell
   gh api -X POST repos/<owner>/resume/pages -f "source[branch]=main" -f "source[path]=/"
   ```

   Or in the browser: **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `/ (root)`**.

4. The site appears at `https://<owner>.github.io/resume/` after the first build (usually under a minute).

## Editing the content

All content lives in `index.html`. Keep the section order — summary, skills, experience, projects,
education — and keep each `id` (`#skills`, `#experience`, `#projects`, `#education`) because the nav
and the scroll-spy script depend on them. Remember to replace `Dustin_Perry_Resume.pdf` when the PDF
is updated.

## Print / PDF

The browser's print dialog produces a clean two-page document: navigation, buttons, and decorative
layers are hidden, colours are forced to black on white, and experience entries are kept whole across
page breaks. Use **Print → Save as PDF** to regenerate the downloadable PDF.
