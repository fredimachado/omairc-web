# Omairc Website Agent Guide

This repository is the public website and documentation for [Omairc](https://github.com/fredimachado/omairc). Treat the Omairc application repository as the source of truth for product behavior. This repository owns presentation, information architecture, release rendering, and deployment.

## Required workflow

1. Read this file and load the repository-local `authoring-omairc-docs` skill before creating or substantially revising documentation.
2. Verify user-facing claims against `fredimachado/omairc` source, runtime help, tests, or current release notes. Do not infer behavior from this website's existing copy alone.
3. Keep the existing Tokyo Night color tokens unchanged. New layouts may use those tokens, but must not replace or reinterpret the palette.
4. Keep the landing page's section links as in-page anchors. `Docs` and `Changelog` are the only primary content routes.
5. Prefer static Astro and Starlight features. Add client-side JavaScript only for interaction that HTML and CSS cannot provide.
6. Run `npm run build` and `npm test` after relevant changes. For visual changes, inspect representative desktop and mobile screenshots.

## Project structure

- `src/pages/` — branded Astro pages such as the landing page and changelog.
- `src/content/docs/` — Starlight Markdown/MDX documentation.
- `src/components/` — shared site and Starlight override components.
- `src/layouts/` — branded page layouts.
- `src/styles/` — shared theme and page styles. The color variables in `theme.css` are the canonical palette.
- `src/lib/` — build-time adapters such as GitHub release loading.
- `public/` — static assets copied unchanged to the build.
- `.agents/skills/authoring-omairc-docs/` — documentation authoring contract.
- `ops/auto-rebuild-on-release/` — workflow template and setup notes for rebuilding this site when Omairc publishes a release.

## Documentation standards

- Organize pages around a reader's task, not the internal class structure.
- Start with what the feature does and when to use it.
- Use exact commands and option names. Test locally executable examples where practical.
- State prerequisites before steps and observable success criteria after them.
- Include the common mistake or failure mode when one is known.
- Link to related docs instead of duplicating long explanations.
- Qualify platform-specific behavior. Do not imply that Linux-only Omarchy integration exists on macOS or Windows.
- Never publish secrets, real credentials, private hosts, or invented output.
- If authoritative sources disagree, use the newest implementation/release evidence and make the qualification explicit.

## Astro and UI conventions

- Build output must remain fully static and deployable to Cloudflare Pages.
- Preserve accessible landmarks, keyboard operation, visible focus, and reduced-motion behavior.
- Use semantic links for navigation and buttons only for actions.
- Reuse the shared header/footer and theme tokens instead of duplicating their markup or colors.
- Keep docs search powered by Starlight/Pagefind; do not create a parallel search index.
- Sanitize any remote Markdown converted to HTML before rendering it.

## Release and deployment conventions

- GitHub Releases are the changelog source of truth.
- A release-triggered rebuild belongs in the Omairc source repository and dispatches this repository's existing deploy workflow.
- Never commit fetched `install.sh` or release API output. The deploy/build process fetches current data.
- Do not push, deploy, publish, create secrets, or alter repository settings without explicit user approval.
