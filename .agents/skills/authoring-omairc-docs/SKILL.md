---
name: authoring-omairc-docs
description: Authors and reviews comprehensive Omairc documentation from authoritative product sources. Use when creating or revising guides, references, tutorials, troubleshooting, release notes, or landing-page feature claims in omairc-web.
---

# Authoring Omairc Docs

Write task-oriented Omairc documentation that readers can follow without already understanding IRC internals.

## Research before writing

1. Classify the page as a tutorial, how-to guide, concept, command reference, configuration reference, platform guide, or troubleshooting article.
2. Verify behavior against the current `fredimachado/omairc` repository. Prefer, in order:
   - executable/runtime help and implementation;
   - focused tests and verification notes;
   - the newest release notes;
   - README summaries;
   - existing website copy.
3. Record platform and version boundaries. Linux/Omarchy, macOS, and Windows behavior is not interchangeable.
4. Check related pages before adding repeated explanations.
5. If evidence is missing or conflicting, narrow the claim or leave an explicit `<!-- TODO: verify ... -->`; do not guess.

## Page shapes

### Tutorial or getting started

Use: outcome, prerequisites, numbered steps, expected result, next steps.

### How-to guide

Use: goal, when to use it, prerequisites, shortest safe procedure, verification, common failure, related guides.

### Concept

Use: plain-language definition, why it matters, behavior and boundaries, concrete example, related tasks.

### Reference

Use concise tables or definition lists. Include exact syntax, defaults, limits, output, side effects, and errors. Do not pad reference pages with tutorial prose.

### Troubleshooting

Use: symptom, likely causes in diagnostic order, checks, fix, and what evidence to collect if unresolved.

## Voice and structure

- Open with what the feature does and when the reader should use it.
- Address the reader as “you” and use direct imperative steps.
- Prefer short paragraphs, exact commands, tables, and Starlight callouts.
- Define IRC-specific terms on first use when a newcomer may not know them.
- Put prerequisites before the action that needs them.
- Show an observable success condition after a procedure.
- Name the most common mistake where evidence supports one.
- End with a small “Next steps” or “Related” section when useful.
- Avoid filler, marketing superlatives, fake quotes, invented examples, and prose that merely repeats a code block.

## Omairc terminology and facts

- Spell the product `Omairc`; use `omairc` for the executable and package.
- A network is an IRC server profile. A conversation is a channel, direct message, or Status buffer.
- The CLI controls an already-running Omairc window over a same-user local socket; it does not create another IRC connection.
- CLI control commands produce one compact JSON object. `--help` and `--version` are plain text.
- Never recommend blindly retrying a CLI send whose response has `"uncertain": true`; read the target first.
- Distinguish GUI unread state from the CLI's independent unread cursor.
- Secrets use the platform credential store when available and remain session-only when secure storage fails.
- Omarchy live-theme watching and portal text scaling are Linux-specific. Native notification support differs by platform.

## Commands and examples

- Format commands, flags, paths, shortcuts, IRC capabilities, and slash commands as code.
- Use placeholders such as `<network-id>`, `<channel>`, and `<nick>` consistently.
- Do not invent network IDs or imply that display names can replace IDs in `--network`.
- Avoid destructive examples. Explain effects before commands that remove profiles, clear state, or expose credentials.
- Test commands that can run in the website repository. For product commands that require a live GUI/network, verify syntax from source and say what environment the example assumes.
- Make JSON examples structurally accurate but use obviously fictional hosts, nicks, IDs, and messages.

## Starlight authoring

- Every page needs `title` and `description` frontmatter.
- Use one `#` title only through frontmatter; begin page content below it.
- Keep heading levels sequential and descriptive because Pagefind indexes them.
- Use Starlight callouts for warnings, prerequisites, and important distinctions, not ordinary asides.
- Use root-relative internal links under `/docs/` and verify them in the production build.
- Keep one canonical explanation per concept and link to it from reference pages.

## Review before completion

Check each new or changed page for:

1. **Accuracy:** Every command, default, limit, shortcut, and platform claim matches current source.
2. **Reader success:** Prerequisites, sequence, expected result, and likely failure are clear.
3. **Consistency:** Terminology, links, headings, and examples match adjacent pages.
4. **Searchability:** Title, description, headings, and opening paragraph use the terms readers will search.
5. **Safety:** Examples do not expose secrets or encourage duplicate sends/destructive retries.
6. **Validation:** Run the Astro build and relevant tests; resolve broken links and invalid frontmatter.
