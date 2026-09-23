# Rebuild the website when Omairc releases

The changelog reads GitHub Releases during the Astro build. Add the adjacent workflow to the **`fredimachado/omairc` application repository** so publishing a release rebuilds this website and includes the new notes.

## Setup

1. Create a fine-grained GitHub personal access token with access only to `fredimachado/omairc-web` and **Actions: Read and write** permission.
2. In the `fredimachado/omairc` repository, add the token as an Actions secret named `WEBSITE_DISPATCH_TOKEN`.
3. Copy `workflow.yml` to `.github/workflows/rebuild-website.yml` in that application repository.
4. Run **Rebuild Omairc website on release** manually once. Confirm that `deploy-pages.yml` starts in `omairc-web` and that the Cloudflare deployment succeeds.

The token belongs in the application repository because its workflow initiates the cross-repository dispatch. The website build itself uses its ordinary `GITHUB_TOKEN` when reading releases, avoiding the unauthenticated GitHub API rate limit.

## Failure modes

- **HTTP 404 or workflow not found:** confirm the target filename is `deploy-pages.yml` and the branch is `main`.
- **Resource not accessible:** check that the fine-grained token grants Actions read/write on `omairc-web`.
- **Secret missing:** the first step fails deliberately instead of attempting an unauthenticated dispatch.
- **Release appears on GitHub but not the site:** inspect the dispatched website workflow and its release-fetch/build step.

Do not use a Cloudflare deploy hook for this setup: GitHub Actions owns the build because it also fetches and validates `install.sh` before upload.
