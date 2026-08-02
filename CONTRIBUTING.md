# Contributing to AI Planning for Autonomy

## Why contribute

- **It's a real, public artefact you can point to.** A well-written concept page
  or a clean set of practice-exam questions is something you can link on a
  resume or portfolio.
- Writing notes up and taking responsibility for the wiki quality will help you while you help others.
- **Compounding effort.** Every source you ingest saves the next contributor
  (including future-you, revising for the exam) from starting cold. The wiki
  gets more useful with every contribution.

## What to contribute

- **A source page**: ingest a lecture, reading, or paper you've gone through
  (see the `ingest` skill).
- **A concept or entity page**: fill in or improve an existing page, add a `## Formula` section, or fix a definition that's unclear or wrong.
- **Material**: worked examples, a synthesis comparing two concepts, revision
  notes, or a generated practice exam / cue-card deck you found useful.
- **Wiki health**: run `lint` and fix what it finds (dangling links,
  orphan pages, missing frontmatter).

You don't need to be an AI/agent power-user to contribute: plain Markdown edits
in Obsidian or any editor are just as welcome as agent-assisted ones.

## Content conventions

Full schema: [`.claude/wiki-schema.md`](.claude/wiki-schema.md). Quick
reference: [`RULES.md`](RULES.md). The essentials:

- Pages live under `wiki/{sources,entities,concepts,materials}/`, kebab-case
  filenames, YAML frontmatter with at least `title`, `type`, `tags`, `date`.
- Use `[[wikilinks]]` for cross-references; both Obsidian and the Quartz-built
  site resolve them.
- **No copyrighted material.** Course lecture slides, PDFs, and recordings are
  copyright. Never commit the original file or a copy-pasted excerpt. Source
  pages hold a `link` to the original (e.g. the Canvas URL) plus an original
  summary.
- Run the lint check before opening a PR. Ask the agent for `lint`, or run the
  script directly once the plugin is installed:
  ```bash
  python3 ~/.claude/plugins/marketplaces/wiki-skills/plugins/wiki/skills/lint/lint.py
  ```

## Using the AI agents

This is explicitly an *agentic* wiki (in the spirit of Andrej Karpathy's
append-only LLM wiki pattern). The skills that automate most of the mechanical work
live in the [wiki-skills](https://github.com/bronsonhill/wiki-skills) plugin, shared with other wikis; this repo supplies only
the configuration they read, in [`.claude/wiki-schema.md`](.claude/wiki-schema.md).

| Skill | Use it to... |
|---|---|
| `ingest` | Turn a source (lecture, paper, video) into a source page + linked concept/entity pages, transcribing recordings first |
| `content-digest` | Turn ingested material into a layered digest you can read instead of watching |
| `lint` | Check the wiki's health before/after a PR |
| `query` | Ask a question across the wiki and get a cited answer |
| `cue-cards` | Generate spaced-repetition flashcards (Obsidian Spaced Repetition + Anki export) from any page |
| `practice-exam` | Generate a typeset LaTeX practice exam from wiki content |

Claude Code picks the plugin up automatically from `.claude/settings.json` when you open
this repo, prompting you to trust the marketplace the first time. To install it by hand:

```
/plugin marketplace add bronsonhill/wiki-skills
/plugin install wiki@wiki-skills
```

With the plugin installed, just
describe what you want ("ingest this lecture", "make cue cards on A* search")
and the relevant skill takes over. You're still the reviewer. So check the
output before it goes in a PR, especially for factual accuracy.

You don't need an AI agent to contribute. Hand-written pages that follow the same
conventions are equally welcome.

## Local dev setup

```bash
npm install
npx quartz build --serve
```

This serves the built site locally so you can preview how your content renders.
Requires Node ≥ 22 (see `.node-version`). Alternatively, just open `wiki/` in
Obsidian or VS Code — it's a plain Markdown vault, no build step needed to read
or edit it.

## PR / git workflow

1. Fork the repo (or branch, if you have write access).
2. Make your changes under `wiki/` (and, if you're changing the schema, under
   `.claude/`). Changes to the skills themselves go to the [wiki-skills](https://github.com/bronsonhill/wiki-skills) repo.
3. Run `python3 ~/.claude/plugins/marketplaces/wiki-skills/plugins/wiki/skills/lint/lint.py` and resolve what it flags.
4. Commit with a clear, scoped message, e.g.:
   ```
   ingest: A* Search lecture — added 4 concepts, 2 entities
   ```
5. Open a PR against `main`. Briefly describe what you added/changed and which
   lecture/source it's based on.
6. Don't push directly to `main` — even small fixes go through a PR, so changes
   are visible and reviewable.

Questions or stuck on something? Open an issue. This is meant to be a living,
collaborative resource, not a finished product.
