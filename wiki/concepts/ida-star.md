---
title: IDA* Search
type: concept
tags: [search, heuristics, algorithms, week-03]
date: 2026-08-16
---

# IDA* Search

Iterative-deepening A\*: [[iterative-deepening-search]] in which the cutoff is an
$f$-value rather than a depth, giving A\*'s optimality guarantee with linear space.

## Formula

The initial limit is the $f$-value of the initial state,

$$\mathrm{lim}_0 = f(s_0) = g(s_0) + h(s_0),$$

and after an iteration that pruned a set $S_P$ of nodes without finding a solution, the
next limit is

$$\mathrm{lim}_{i+1} = \min_{s \in S_P} f(s).$$

## How it works

The search is a depth-first search, exactly as in iterative deepening, but a node is
pruned when its $f$-value exceeds the current limit rather than when its depth does.
If the iteration finds a solution, the search is over; otherwise the limit is raised —
not by a fixed increment, but to the smallest $f$-value among the nodes just pruned, so
the next iteration admits exactly the cheapest nodes that were previously out of reach
and no others.

With an admissible heuristic, IDA\* is optimal. Because the underlying search is
depth-first, its space requirement is linear in the depth explored, not exponential in
it, and it expands fewer nodes than plain iterative deepening because the $f$-based
cutoff prunes branches that a depth cutoff would explore.

## Why it matters

IDA\* is what makes optimal search feasible on problems whose A\* frontier would not fit
in memory. It was the algorithm that first solved Rubik's Cube, and it remains the
standard answer for large combinatorial problems where an admissible heuristic is
available but memory is the binding constraint. It appears in the week 3 properties
summary table but is left as self-study in the live lectures.

## Relationships

- Combines [[iterative-deepening-search]]'s limit-raising loop with [[a-star-search]]'s evaluation function
- Optimality requires admissibility, from [[heuristic-properties]]
- Its space advantage over A\* mirrors [[depth-first-search]]'s over [[breadth-first-search]]

## Sources

- [[w03-prerecorded-heuristic-search]] — the limit initialisation and update rules, and the optimality and node-count claims
- [[w03b-local-search-and-bfws]] — flagged in the summary table as self-study, with its Rubik's Cube history
