---
title: Weighted A* Search
type: concept
tags: [search, heuristics, algorithms, week-03]
date: 2026-08-16
---

# Weighted A* Search

[[a-star-search]] with a constant multiplier on the heuristic term, giving a single
parameter that trades solution quality against search effort.

## Formula

$$f(s) := g(s) + W \cdot h(s), \qquad W \in \mathbb{R}_0^+$$

Everything else — the priority queue, duplicate detection, re-opening on a better $g$ —
is unchanged from A\*.

## How it works

The weight behaves as a dial across three algorithms already covered:

- $W = 0$: the heuristic term vanishes and nodes are ordered on accumulated cost alone.
  This is uniform-cost search, that is, Dijkstra's algorithm — a blind search that
  always expands the node reached most cheaply so far.
- $W = 1$: exactly [[a-star-search]].
- $W \to \infty$: the $g$ term becomes negligible against the weighted heuristic, so
  ordering is effectively on $h$ alone, giving [[greedy-best-first-search]].

For $W > 1$ with an admissible heuristic, weighted A\* is **bounded suboptimal**: the
solution returned costs at most $W$ times the optimal cost. Setting $W = 2$ guarantees a
plan no worse than twice optimal, and so on. Completeness is unaffected and still
follows from safety.

A common pattern in solvers exploits the dial directly: run with a large $W$ to obtain
some solution quickly, use its cost as an upper bound on the path lengths worth
considering, then dial $W$ down and search again for a better one. This gives an
anytime behaviour, where a usable plan exists from early on and improves with time
spent.

## Why it matters

Weighted A\* is one of the three most popular algorithms in satisficing planning. It is
also the cleanest demonstration of a point made repeatedly in the subject: creating a
new search algorithm rarely requires new machinery, only a change to the priority
function deciding which node is expanded next.

## Relationships

- Generalises [[a-star-search]], and interpolates between it, [[greedy-best-first-search]], and Dijkstra's algorithm from [[blind-search]]
- The suboptimality bound requires admissibility, from [[heuristic-properties]]
- Belongs to the satisficing track described in [[satisficing-and-optimal-planning]]

## Sources

- [[w03-prerecorded-heuristic-search]] — the three limiting cases worked through and the bounded-suboptimality result
- [[w03b-local-search-and-bfws]] — the anytime pattern of running greedy first, then dialling $W$ down
