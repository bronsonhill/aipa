---
title: Depth-First Search
type: concept
tags: [search, algorithms, week-02]
date: 2026-08-10
---

# Depth-First Search

A [[blind-search]] strategy that always expands the deepest node on the open list
first, implemented with a LIFO stack, backtracking once a branch is exhausted.

## How it works

The search descends along one branch as far as it can go; when a node has no
unexplored successors (or the search chooses to give up on that branch), it backtracks
to the most recently generated ancestor with unexplored children and descends again
down a different branch.

**Completeness.** Depth-first search is complete only if repeated states (cycles) are
tracked and excluded from re-expansion. Without that, an unlucky ordering can send the
search around a cycle forever, exploring only a fraction of the graph. Even with cycle
detection scoped correctly, this is not automatic — see the space-complexity trade-off
below.

**Optimality.** Depth-first search is never guaranteed optimal. Nothing prevents it
from descending into a deep, expensive branch before a shallow, cheap solution one step
away from the root, if the deep branch happens to be explored first.

**Complexity.** Because backtracking discards everything outside the current branch, a
node need not be kept in memory once none of its descendants can still be reached —
only the current path from root to frontier does. This gives space complexity
$O(b \cdot m)$, where $m$ is the depth of the *deepest branch explored* (not the
shallowest solution depth $d$, which need not be discovered until deep search elsewhere
has been exhausted). This is the sole practical advantage over
[[breadth-first-search]]'s $O(b^d)$. The saving depends on cycle detection being scoped
to the current branch only: tracking every visited state ever, to guarantee
completeness in the presence of cycles, reintroduces an exponential space requirement
and cancels the benefit that motivated using depth-first search in the first place.

## Why it matters

Depth-first search trades away both of breadth-first search's guarantees
(completeness in general graphs, optimality) for a space bound that is linear rather
than exponential in the relevant depth. It is the right choice when memory is the
binding constraint and either the solution is known to be deep, or completeness and
optimality are not required. Its main descendant in this subject is
[[iterative-deepening-search]], which recovers completeness and (under uniform cost)
optimality while keeping the linear space bound.

## Relationships

- A [[blind-search]] strategy, expanded via [[search-node]]s and an open list implemented as a stack
- Contrasted with [[breadth-first-search]] (FIFO, shallowest-first)
- Underlies [[iterative-deepening-search]]

## Sources

- [[w02-prerecorded-search-fundamentals]] — introduces deepest-first, LIFO expansion and backtracking, poses completeness/optimality as open questions
- [[w02a-blind-search-properties]] — resolves completeness (only with correctly scoped cycle detection), optimality (never guaranteed), and derives the $O(bm)$ space bound
