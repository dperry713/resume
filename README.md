# Dustin Perry — Résumé

A responsive, accessible résumé site for software engineering and cybersecurity roles. Built as a static site with no build step or runtime dependencies.

## Site structure

| File | Purpose |
| --- | --- |
| `index.html` | Resume content, project portfolio, structured Person metadata, and externally hosted credential embeds |
| `styles.css` | Design tokens, light/dark themes, responsive layout, and print stylesheet |
| `app.js` | Theme toggle, sticky-header state, scroll-spy navigation, and print action |
| `favicon.svg` | DP monogram favicon |
| `Dustin_Perry_Resume.pdf` | Downloadable PDF résumé |
| `.nojekyll` | Ensures GitHub Pages serves repository assets without Jekyll processing |

## Published repository

This repository is `dperry713/resume`.

- Source: https://github.com/dperry713/resume
- GitHub Pages URL (when Pages is enabled): https://dperry713.github.io/resume/

To enable or verify deployment, open **Settings → Pages** and configure **Deploy from a branch**, branch `main`, folder `/ (root)`. A successful Pages deployment is required before the public URL is considered live.

## Editing

Update the semantic sections in `index.html`. Preserve the section IDs used by the navigation and scroll-spy behavior: `skills`, `experience`, `projects`, `education`, and `credentials`.

The credential section contains live Credly and Accredible embeds. Keep their badge IDs, source URLs, and embed attributes intact when editing surrounding content. These embeds are externally hosted and may be subject to the providers' availability and privacy settings.

## Print and PDF

Use the **Print** control or the browser's print command, then select **Save as PDF**. The print stylesheet removes navigation and interactive controls and applies a high-contrast document layout. Replace `Dustin_Perry_Resume.pdf` in the repository when publishing a refreshed PDF.

## Accessibility and progressive enhancement

The page includes a skip link, semantic landmarks, visible keyboard focus, responsive layouts, reduced-motion support, and theme behavior that degrades gracefully when browser storage or JavaScript is unavailable.
