# omairc-web

Website and documentation for [Omairc](https://github.com/fredimachado/omairc), a small IRC client for [Omarchy](https://omarchy.org), Linux, macOS, and Windows.

The site is a static Astro app. Starlight renders the searchable documentation, and the changelog reads current GitHub Releases at build time. `install.sh` is not checked in: each deploy fetches and validates the latest copy from the Omairc repository.

Live at [omairc.app](https://omairc.app).

## Preview

```sh
npm install
npm run dev
```

Then open the local URL Astro prints. The landing page builds its installer command from that origin.

## Build

```sh
npm run build
npm run preview
```

The static output is in `dist/`. Set `GH_TOKEN` while building in CI to avoid GitHub's unauthenticated API limit for changelog data.

## Tests

```sh
npm install
npx playwright install chromium
npm test
```

Playwright starts Astro and checks landing-page navigation and copying, Starlight search, reference docs, the GitHub-backed changelog, and mobile navigation.

## Documentation and releases

- Read `AGENTS.md` and load `.agents/skills/authoring-omairc-docs` before changing product documentation.
- GitHub Releases are the changelog source of truth.
- `ops/auto-rebuild-on-release/` contains the application-repository workflow that dispatches a website rebuild after a release is published.
