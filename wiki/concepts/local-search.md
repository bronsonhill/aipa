---
title: Local Search
type: concept
tags: [search, algorithms, week-03]
date: 2026-08-16
---

# Local Search

A class of search algorithms that work with one candidate solution (or a few) at a
time, committing to a choice and discarding the alternatives, rather than keeping a
frontier of many nodes open simultaneously.

## How it works

The defining contrast is with **systematic search**, which keeps a large number of
search nodes under consideration at once and takes care not to lose any branch that
might contain a solution. A local search takes a step, forgets the options it did not
take, and hopes for the best. The distinction is not black and white:
[[enforced-hill-climbing]] is a deliberate crossbreed, running a systematic search
inside each local step.

The argument for local search is memory. A systematic search must hold its whole
frontier, which for [[breadth-first-search]] is exponential in the solution depth; a
local search holds one node and its children. The cost is that the guarantees go away.
Neither completeness nor optimality survives in general, because a discarded branch is
gone permanently, and the standard failure modes — dead-end regions, cycles under fixed
tie-breaking, unsafe heuristics — all follow from that.

**What works where in planning.** For satisficing planning there are successful
instances of both systematic and local search. For optimal planning, systematic
algorithms are required.

**When local search is safest.** A directed search space is dangerous, because a step
into a region with no solution may be irreversible. On an undirected graph, or a
problem provably reversible in the sense that every action can be undone, a wrong
commitment can always be walked back, and local search is much less risky.

## Why it matters

Local search is how a planner buys tractability on problems whose frontier would not
fit in memory, and enforced hill-climbing — the best-known planning instance of it —
was the main algorithm inside essentially every planner until roughly 2012. It also
frames the exploration-versus-exploitation discussion: hill-climbing commits to the
heuristic's advice absolutely, which is exploitation carried to its limit.

## Relationships

- Contains [[hill-climbing]] and, as a hybrid with systematic search, [[enforced-hill-climbing]]
- Contrasted with the systematic [[a-star-search]], [[greedy-best-first-search]], [[breadth-first-search]]
- Memory motivation parallels the argument for [[iterative-deepening-search]]

## Sources

- [[w03-prerecorded-heuristic-search]] — memory footprint as the motivation for local search
- [[w03b-local-search-and-bfws]] — the systematic/local distinction, and the directed-versus-reversible danger criterion
