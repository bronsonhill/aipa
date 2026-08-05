# Rules

Lightweight formatting and workflow rules for editing `wiki/` (Obsidian-flavoured
Markdown, built with Quartz). Read `.claude/wiki-schema.md` for the full page
schema; this file is the quick-reference version for day-to-day edits, human or
agent.

## LaTeX / math

- Inline math: `$x^2 + y^2 = z^2$`
- Block math, on its own lines:
  ```
  $$
  P(\text{next state} = 1 \mid n_{\text{alive}}) = \mathbb{1}[n_{\text{alive}} \in \{2,3\}]
  $$
  ```
- Use proper LaTeX commands (`\exp`, `\log`, `\sigma`, `\frac`, subscripts `_`,
  superscripts `^`). Never mix a plain-text variable name with math — keep every
  symbol inside `$...$`.

## Markdown conventions

- Wikilinks: `[[page-name]]` or `[[page-name|Display Text]]`. Use bare filenames
  (no folder prefix) — Quartz/Obsidian resolve them across the vault.
- Tags: frontmatter `tags: [tag1, tag2]`.
- Frontmatter: every content page starts with a `---` YAML block containing at
  least `title`, `type`, `tags`, `date` (see `.claude/wiki-schema.md` for the
  per-type fields, e.g. `link` on source pages). No colons in `title` — an
  unquoted colon is invalid YAML and silently breaks the whole block.
- Headings: start with `# Title` matching the page's title.
- Lists: `-` for bullets, `1.` for numbered steps.
- Emphasis: `**bold**`, `*italic*` (avoid `_..._` for italics).
- Code: inline `` `code` ``, fenced blocks with a language tag.
- Prefer Markdown tables over HTML tables.

## Content standards

- Every concept/entity page ends with a `## Sources` or `## Relationships` section
  linking related pages.
- Never paste copyrighted course material (slides, PDFs, video transcripts) into
  `wiki/`. Source pages hold a link + an original summary — see `source_policy`
  in `.claude/wiki-schema.md`.
- After editing `wiki/`, run `lint`
  (`python3 ~/.claude/plugins/marketplaces/wiki-skills/plugins/wiki/skills/lint/lint.py`) before committing/opening a PR.

## Spaced repetition

Cue-card decks in `wiki/materials/` are shared content, not a personal review log.
Reviewing a deck in Obsidian with the Spaced Repetition plugin writes per-card
`<!--SR:...-->` scheduling comments straight into the tracked file — never commit
those. Use the deck's generated Anki `.tsv` export for personal review instead
(state stays in Anki's local collection, outside git); see
the `cue-cards` skill for the `--skip-worktree` alternative if you
want to review in Obsidian directly.

## Git

- `wiki/` is versioned in this same repo (not a separate wiki repo) — normal
  branch + PR workflow, see `CONTRIBUTING.md`.
- Don't push directly to `main`; open a PR even for small content fixes.
- Keep commits scoped to one logical change (one ingest, one lint pass, one fix).

## Writing new content

1. Keep the lead paragraph of any page to 1-2 sentences.
2. Use `##` sections consistently: `How it works`, `Formula`, `Why it matters`,
   `Relationships`, `Sources` (concepts); `Key facts`, `Relevance to AI Planning
   for Autonomy`, `Sources` (entities).
3. Always include a `## Formula` section (proper Obsidian LaTeX) for any concept
   with a key mathematical or algorithmic definition (search/planning algorithms,
   state-transition models, cost functions, etc).
4. Prefer `\exp` / `\log` over `e^` / `ln`; keep variable names consistent across
   related pages.
