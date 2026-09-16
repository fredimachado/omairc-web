# omairc-web

Landing site for [Omairc](https://github.com/fredimachado/omairc), a small IRC client for [Omarchy](https://omarchy.org).

The site is plain HTML (`index.html`, `omairc.svg`, `_headers`). There is no build step. `install.sh` is not checked in: each deploy fetches the latest copy from the omairc repo so the one-liner always pipes in a current installer.

Live at [omairc.app](https://omairc.app).

## Preview

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Then open http://127.0.0.1:4173. The install command on the page is built from the origin you are on, so a local preview points at `/install.sh` on that same server.

## Tests

```sh
npm install
npx playwright install chromium
npm test
```

Playwright serves the same local origin and checks the landing page: hero, nav, install copy buttons, and outbound links.
