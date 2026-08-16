---
title: Blind Search
type: concept
tags: [search, algorithms, week-02]
date: 2026-08-10
---

# Blind Search

Search that uses no information about a problem beyond its formal definition: the
order in which states are expanded is fixed by the algorithm, not by any estimate of
which states are promising. Contrasted with heuristic (informed) search, which
additionally consults a heuristic function.

## How it works

A blind search algorithm needs nothing beyond the state model's `start`, `is_target`,
and `successor` functions (see [[state-space-modelling]]) — no problem-specific input,
no tuning. Its only design choice is the search strategy: the data structure and rule
that decide which node on the open list to expand next (see [[search-node]]). That one
choice yields [[breadth-first-search]] (queue, shallowest-first),
[[depth-first-search]] (stack, deepest-first), and [[iterative-deepening-search]]
(depth-first with an increasing depth cap).

Every blind search algorithm is judged on four properties:

- **Completeness** — guaranteed to find a solution if one exists, given unbounded time and memory.
- **Optimality** — the first solution returned is guaranteed to be cheapest.
- **Time complexity** — measured as the number of generated states, not wall-clock time, so results transfer across hardware.
- **Space complexity** — the number of states that must be held in memory at once.

The last two are conventionally expressed in two parameters: the **branching factor**
$b$ (average number of successors per node) and the **goal depth** $d$ (the depth of
the shallowest goal state) or, for algorithms that can search past $d$, the
**maximum depth explored** $m$.

## Why it matters

Blind search is the baseline every heuristic method is measured against, and its
guarantees are what a designer falls back on when no good heuristic is available or
when a guarantee (completeness, optimality) is non-negotiable. It costs nothing to set
up — no heuristic to design, no risk of an inadmissible or buggy heuristic — but that
same fixed expansion order is the whole reason it does not scale: a solution one step
away is found no faster than one buried arbitrarily deep, if the search strategy
happens to look elsewhere first. See [[w01-prerecorded-ai-overview]] (video 7) for the
explicit statement that heuristic search dominates blind search for satisficing
planning, while for optimal planning the two are closer, because admissible heuristics
are weaker guidance and carry their own computational cost.

Blind search is also systematic by construction — it explores the full frontier rather
than committing to one or a few candidates — which is what gives it completeness. Local
search algorithms (gradient descent, genetic algorithms) trade that guarantee away for
speed; see [[w01-prerecorded-ai-overview]] video 7 for the systematic/local
distinction.

## Relationships

- Realised as [[breadth-first-search]], [[depth-first-search]], [[iterative-deepening-search]]
- Built from [[search-node]]s and the state model of [[state-space-modelling]]
- Contrasted with heuristic search, part of [[search-and-inference]]
- Pruned by novelty in [[iterative-width-search]], which restricts which blind-search-generated states survive
- Discussed alongside [[satisficing-and-optimal-planning]]
- Contains uniform-cost search (Dijkstra's algorithm), recovered as the $W = 0$ case of [[weighted-a-star]]
- The informed counterpart, taking a [[heuristic-function]] rather than none, is [[greedy-best-first-search]]

## Sources

- [[w02-prerecorded-search-fundamentals]] — the blind-versus-informed pros/cons framing, and the four evaluation properties
- [[w02a-blind-search-properties]] — works out completeness, optimality, and complexity for each blind search algorithm in detail
- [[w01-prerecorded-ai-overview]] — video 7 states the systematic/local and blind/heuristic distinctions and their relative empirical performance
- [[w03-prerecorded-heuristic-search]] — identifies $h = 0$ everywhere as the blind heuristic, and $W = 0$ weighted A\* as Dijkstra's algorithm
