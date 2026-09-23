import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

export interface Release {
  tag: string;
  rawTag: string;
  name: string;
  url: string;
  date: string;
  prerelease: boolean;
  bodyHtml: string;
}

interface GitHubRelease {
  tag_name: string;
  name: string | null;
  html_url: string;
  published_at: string | null;
  prerelease: boolean;
  draft: boolean;
  body: string | null;
}

let releasePromise: Promise<{ releases: Release[]; error?: string }> | undefined;

export function getReleases() {
  releasePromise ??= loadReleases();
  return releasePromise;
}

async function loadReleases(): Promise<{ releases: Release[]; error?: string }> {
  try {
    const headers: HeadersInit = { Accept: 'application/vnd.github+json', 'User-Agent': 'omairc-web' };
    if (process.env.GH_TOKEN) headers.Authorization = `Bearer ${process.env.GH_TOKEN}`;
    const [response, changelog] = await Promise.all([
      fetch('https://api.github.com/repos/fredimachado/omairc/releases?per_page=100', { headers }),
      loadChangelog(),
    ]);
    if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
    const source = await response.json() as GitHubRelease[];
    const releases = source
      .filter((release) => !release.draft && release.published_at)
      .sort((a, b) => Date.parse(b.published_at!) - Date.parse(a.published_at!))
      .map((release) => {
        const rawTag = release.tag_name;
        const tag = rawTag.replace(/^v/, '');
        const releaseNotes = release.body || '';
        const isCurated = /^## (?!What's Changed\s*$)/m.test(releaseNotes) || /^### /m.test(releaseNotes);
        const notes = isCurated
          ? releaseNotes
          : changelog.get(tag) || releaseNotes || 'No release notes were provided.';
        const rendered = marked.parse(notes, { async: false });
        return {
          tag,
          rawTag,
          name: release.name && release.name !== rawTag ? release.name : '',
          url: release.html_url,
          date: release.published_at!,
          prerelease: release.prerelease,
          bodyHtml: sanitizeHtml(rendered, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'img']),
            allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, img: ['src', 'alt', 'title'] },
            allowedSchemes: ['http', 'https', 'mailto'],
          }),
        };
      });
    return { releases };
  } catch (error) {
    return { releases: [], error: error instanceof Error ? error.message : 'Unable to load releases' };
  }
}

async function loadChangelog() {
  const sections = new Map<string, string>();
  try {
    const response = await fetch('https://raw.githubusercontent.com/fredimachado/omairc/master/CHANGELOG.md');
    if (!response.ok) return sections;
    const source = await response.text();
    const releasePattern = /^## \[([^\]]+)] - \d{4}-\d{2}-\d{2}\s*$([\s\S]*?)(?=^## \[|(?![\s\S]))/gm;
    for (const match of source.matchAll(releasePattern)) {
      sections.set(match[1], match[2].trim());
    }
  } catch {
    // GitHub Release bodies remain a complete fallback when the curated file
    // cannot be fetched during a build.
  }
  return sections;
}
