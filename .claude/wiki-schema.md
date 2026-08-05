---
title: Content Schema
version: 0.3
subject: AI Planning for Autonomy
wiki_root: wiki
source_policy: link-only
derived_dir: materials
index_style: per-section
domains: []
git_workflow: pr
---

# Content Schema

Defines structure, conventions, and workflows for the `wiki/` wiki in this repo
(the Karpathy agentic-wiki pattern, adapted for a single-subject, multi-contributor,
public repo). All content-editing skills must follow this.

The skills themselves live in the [wiki-skills](https://github.com/bronsonhill/wiki-skills)
plugin, which is shared with other wikis and holds no repo-specific paths. The
frontmatter above is the machine-readable configuration those skills read — in
particular `source_policy: link-only`, which is what enforces the copyright constraint
below, and `git_workflow: pr`, which routes ingests through pull requests.

## Directory structure

```
wiki/
├── index.md          # top-level catalog — links to each section
├── log.md            # append-only chronological history of ingests/lints/queries
├── sources/           # one page per external resource (Canvas link, paper, video) — NO copyrighted text or files, links only
├── entities/          # people, models, tools, papers, software (e.g. `pddl.md`)
├── concepts/           # ideas, mechanisms, algorithms (e.g. `a-star-search.md`)
└── materials/         # digests, worked examples, derived notes, syntheses, revision material
```

There is no `raw/` directory. Course materials are copyright — never copy the
original PDF/slide/video into this repo. Source pages hold a link plus an
original summary written in your own words.

That extends to transcripts. `ingest` fetches one when a source is a recording, but
under `source_policy: link-only` it writes it to a scratch directory outside the repo
and it is never committed. A transcript is closer to the source material than a summary
is, so it falls under the same constraint as the slides. What gets committed is what you
write from it.

## Page conventions

- **Naming:** kebab-case.md (e.g. `a-star-search.md`).
- **Source naming:** lecture sources are prefixed `wNNx-` where `NN` is the
  zero-padded week and `x` is a letter ordering the lectures within that week
  (`w01a-introduction.md`, `w01b-search-fundamentals.md`). Don't name the day of
  the week; the letter carries the ordering, and days shift between offerings.

  Tutorials are prefixed `tNN-` with the zero-padded week and no letter
  (`t01-classical-planning-model.md`), since there is one tutorial per week. Where
  a week's pre-recorded videos are a single resource distinct from its lectures,
  use `wNN-` with no letter (`w01-prerecorded-ai-overview.md`); it sorts ahead of
  the lettered lectures, which matches the order the material is meant to be
  consumed in.

  Titles match the prefix — `Week 1a Introduction`, `Tutorial 1 Classical Planning
  Model`. **Do not put a colon in a title.** An unquoted colon is invalid YAML and
  breaks the frontmatter block, and the failure is quiet: Quartz falls back to the
  filename rather than reporting an error. Use a space or a comma instead.
- **Frontmatter (YAML)**, required on every content page:
  ```yaml
  ---
  title: A* Search
  type: concept | entity | source | material
  tags: [search, heuristics]
  date: 2026-08-02
  ---
  ```
  `source` pages also carry `link: <url>` (the Canvas/paper/video URL) instead of a
  copy of the material.
- **Wikilinks:** use `[[page-name]]` for all cross-references, bidirectional where
  possible.
- **Citations:** claims on concept/entity/material pages should link back to the
  `[[sources/xxx]]` page(s) they came from.
- **Images:** only original diagrams you create, or images you have rights to use —
  never scrape copyrighted course slides. Store under `wiki/materials/assets/`.

No `domain` field — this wiki covers one subject, so section (`sources` / `entities` /
`concepts` / `materials`) is enough to scope content. That is what the empty `domains`
list in the frontmatter declares; the plugin's domain checks stay off as a result.
Multi-subject wikis sharing these skills set `domains` and require the field.

## Workflows (via the `wiki` plugin)

- **ingest** — add a new source: obtain a transcript if it's a recording, write
  the source stub (link + original summary), create/update concept and entity pages,
  refresh `wiki/*/index.md` and `wiki/log.md`.
- **content-digest** — turn ingested material into a layered digest built to be read
  instead of the original, filed under `wiki/materials/` and linked back to its source
  page. Calls `ingest` first when handed sources that aren't in the wiki yet.
- **query** — answer a question by reading `wiki/index.md` first, then
  synthesizing across pages with citations; file valuable outputs back to
  `wiki/materials/`.
- **lint** — check dangling links, orphans, index drift, frontmatter issues;
  update `wiki/log.md` and write a report to `wiki/lint-reports/`.
- **cue-cards** — generate spaced-repetition cards from any content page, output in
  Obsidian Spaced Repetition format with an Anki-importable export alongside it.
- **practice-exam** — generate a typeset practice exam (LaTeX/PDF) drawing questions
  from `wiki/`, optionally mimicking a real past-exam's structure.
- **Schema evolution** — update this file when conventions change; contributors and
  the agent co-maintain it. The skills and `lint.py` live in the [wiki-skills](https://github.com/bronsonhill/wiki-skills)
  repo, so a change to this schema that implies a script change needs a PR there too.

## Obsidian / Quartz integration

- The repo is a plain Obsidian vault at `wiki/` and is also built as a public
  static site with [Quartz](https://quartz.jzhao.xyz/) (`npx quartz build --serve`).
  Both consume the same `[[wikilinks]]` syntax — don't use Obsidian-only syntax that
  Quartz can't render (check `quartz/plugins/` if unsure).
- `wiki/` is versioned as part of this same git repo (not a separate wiki repo) —
  see `CONTRIBUTING.md` for the PR workflow.
- Repo-keeping pages are excluded from the published site via `ignorePatterns` in
  `quartz.config.ts`: `log.md` and `lint-reports/` are maintenance records for
  contributors, not content for readers. They stay in the vault and in git.

## Tips

- Ingest one source at a time; give a human (you, or a PR reviewer) a chance to
  sanity-check before scaling up.
- Run `lint` after every ingest and periodically (e.g. weekly, or as part of
  PR review) as the wiki grows.
- Start small — a couple of concept pages fleshed out well beat a dozen stubs.

This schema is co-evolved by contributors and the agent. Extend it as conventions
solidify.
