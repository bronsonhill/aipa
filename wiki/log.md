# Content Log

Append-only chronological history of ingests, lints, and queries.

## [2026-08-04] ingest | Week 1 — pre-recorded videos, Week 1a, Week 1b

Batch ingest of all week 1 material: six pre-recorded YouTube videos, both live
lectures (transcripts), and both pre-release slide handouts.

- **Source pages:** `wiki/sources/w01-prerecorded-ai-overview.md`,
  `wiki/sources/w01a-introduction-to-ai.md`,
  `wiki/sources/w01b-introduction-to-planning.md`
- **New concept pages:** classical-planning, conformant-planning,
  markov-decision-process, partially-observable-mdp, models-and-solvers,
  control-problem, rational-agent, turing-test, theories-as-programs,
  search-and-inference, closed-world-assumption, lifted-representation,
  planning-complexity, satisficing-and-optimal-planning, plan-validation,
  boolean-satisfiability, constraint-satisfaction-problem
- **New entity pages:** strips, pddl, blocksworld, shakey-the-robot,
  nir-lipovetzky, guang-hu, dartmouth-workshop,
  international-planning-competition, val, editor-planning-domains,
  remote-agent-experiment
- **Updated pages:** sources/index, concepts/index, entities/index
- **Notes:** transcripts and slide text were processed in a scratch directory
  outside the repo and not committed, per `source_policy: link-only`. A
  COMP90083 (Computational Modelling and Simulation) transcript supplied in the
  same batch was set aside as belonging to a different subject.

## [2026-08-04] lint | post-ingest check

- 37 pages scanned, 0 issues. Report: `wiki/lint-reports/2026-08-04.md`

## [2026-08-05] ingest | Tutorial 1 — Classical planning model

- **Source page:** `wiki/sources/t01-classical-planning-model.md`
- **New concept pages:** state-space-modelling
- **New material pages:** tsp-state-space-model
- **Updated pages:** classical-planning, planning-complexity,
  w01b-introduction-to-planning, sources/index, concepts/index, materials/index
- **Notes:** state counts in the TSP write-up were verified by exhaustive
  enumeration with BFS reachability for n = 2..6, not asserted. Tutorial PDF read
  for understanding only and not committed, per `source_policy: link-only`.
  Naming: tutorials use a `tNN-` prefix, extending the schema's `wNNx-` lecture
  convention.

## [2026-08-10] ingest | Week 2 — blind search, width/novelty, and week 4 complexity pre-release

Batch ingest: two week 2 live lecture transcripts (Monday: blind search and its
properties; Friday: factored representations, novelty, and iterative width),
three week 2 pre-recorded videos (search fundamentals), two week 4 pre-recorded
videos released early (complexity, computational approaches), and two further
week 1 pre-recorded videos (search intro, search terminology) that extend the
existing week 1 pre-recorded source page.

- **Source pages:** `wiki/sources/w02a-blind-search-properties.md`,
  `wiki/sources/w02b-width-and-iterative-search.md`,
  `wiki/sources/w02-prerecorded-search-fundamentals.md`,
  `wiki/sources/w04-prerecorded-planning-complexity.md`
- **New concept pages:** search-node, blind-search, breadth-first-search,
  depth-first-search, iterative-deepening-search, novelty, iterative-width-search,
  planning-computational-approaches
- **New entity pages:** general-problem-solver, jorg-hoffmann
- **Updated pages:** w01-prerecorded-ai-overview (added videos 7–8),
  state-space-modelling, planning-complexity, satisficing-and-optimal-planning,
  search-and-inference, blocksworld, international-planning-competition,
  editor-planning-domains, sources/index, concepts/index, entities/index
- **Notes:** a third transcript supplied in the same batch ("Summary so far",
  ~2 minutes) was identified as the same video already catalogued as video 6 of
  `w01-prerecorded-ai-overview.md` — its content (research-agenda summary,
  scaling routes) matches that page's existing coverage, so no duplicate source
  page was created. The two week 2 live-lecture transcripts were supplied as
  local files without recording links; the Canvas link on both source pages
  points to the public handbook entry, consistent with `source_policy:
  link-only` and the convention on `w01a`/`w01b`. Transcripts for the seven
  YouTube videos were pulled via `yt-dlp` auto-captions (not the video pages
  themselves, which do not expose transcript text to a static fetch) and
  processed in a scratch directory outside the repo, not committed.

## [2026-08-10] lint | post-ingest check

- 58 pages scanned, 0 issues. Report: `wiki/lint-reports/2026-08-10.md`

## [2026-08-10] cue-cards | Week 2 search deck

- **Material page:** `wiki/materials/week-02-search-cue-cards.md` (Obsidian Spaced Repetition format, 36 cards)
- **Anki export:** `wiki/materials/week-02-search-cue-cards.anki.tsv` (gitignored, regenerable)
- **Source pages covered:** w02a-blind-search-properties, w02b-width-and-iterative-search, w02-prerecorded-search-fundamentals
- **Concept pages covered:** search-node, blind-search, breadth-first-search, depth-first-search, iterative-deepening-search, novelty, iterative-width-search, plus week-2-relevant sections of state-space-modelling and satisficing-and-optimal-planning
- **Updated pages:** materials/index
- **Notes:** week 1 and week 4 content (also in the wiki) was deliberately excluded from this deck's scope per the user's request; every algorithm (BFS/DFS/IDS/IW/SIW) has both a mechanism card and at least one contrast/failure-mode card.

## [2026-08-16] ingest | Week 3 — heuristic search algorithms

- **Source pages:** `wiki/sources/w03-prerecorded-heuristic-search.md`,
  `wiki/sources/w03a-heuristic-functions-properties.md`,
  `wiki/sources/w03b-local-search-and-bfws.md`
- **New concept pages:** heuristic-function, heuristic-properties,
  greedy-best-first-search, a-star-search, weighted-a-star, ida-star, local-search,
  hill-climbing, enforced-hill-climbing, best-first-width-search,
  planning-with-simulators
- **New entity pages:** sebastian-thrun, darpa-grand-challenge,
  arcade-learning-environment, lapkt, jeff-orkin
- **Updated pages:** blind-search, breadth-first-search, iterative-deepening-search,
  search-node, novelty, iterative-width-search, satisficing-and-optimal-planning,
  shakey-the-robot, international-planning-competition, nir-lipovetzky, sources/index,
  concepts/index, entities/index
- **Notes:** the nine pre-lecture videos are public on YouTube, so the source page links
  them directly rather than pointing at Canvas; the two live-lecture transcripts were
  supplied as local files without recording links, so those pages carry the handbook
  link as on w01/w02. Auto-captions for the eight available videos were pulled with
  `yt-dlp` into a scratch directory outside the repo and not committed; captions for
  video 1 (Heuristic Functions) were unavailable, and its content is covered by the
  slides and the Monday live lecture instead. The slide deck is copyright course
  material and was read for understanding only.

## [2026-08-16] lint | post-ingest check

- 78 pages scanned, 0 issues. Report: `wiki/lint-reports/2026-08-16.md`
