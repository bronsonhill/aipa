---
title: Iterative Deepening Search
type: concept
tags: [search, algorithms, week-02]
date: 2026-08-10
---

# Iterative Deepening Search

[[depth-first-search|Depth-first search]] re-run repeatedly with an increasing depth
limit: starting at limit 0, any node deeper than the limit is not expanded; if no
solution is found the limit is incremented and the search restarts from scratch.

## How it works

At depth limit $\ell$, the search behaves exactly like depth-first search except that
it refuses to expand any node at depth greater than $\ell$. If this fails to find a
goal, $\ell$ is increased by one and the whole search restarts. Because each iteration
discards everything from the previous one, only the current iteration's single active
branch needs to be held in memory at any time — the same $O(bm)$ bound as plain
depth-first search, with $m$ now bounded by the current depth limit.

**Completeness and optimality.** Restricting the depth limit removes depth-first
search's failure mode of descending forever down an unbounded or cyclic branch: a cycle
can be traversed only up to the current limit before the search is forced back to try
elsewhere. This restores completeness. Under uniform action cost, increasing the limit
one step at a time also restores optimality, because the search considers solutions one
step farther from the root only after every solution closer to the root has already
been ruled out — the first solution found is therefore the shallowest, and under
uniform cost, the cheapest.

**Complexity.** Repeating work across iterations looks wasteful — the initial state
alone is re-expanded once per iteration — but the node count is dominated by the final,
deepest iteration, since $b^d$ already exceeds the sum of every shallower iteration's
node count for any $b > 1$. Numerically, for $b=10$, $d=5$, the total across all
iterations is close to the single-iteration $b^d$ count, not a large multiple of it.

## Why it matters

Iterative deepening combines breadth-first search's completeness and (uniform-cost)
optimality guarantees with depth-first search's linear space bound, at negligible extra
time cost. It is presented as the practical default blind search algorithm as a result:
the guarantees of breadth-first search without breadth-first search's memory
requirement. It is credited with underpinning the first algorithmic solution to
Rubik's Cube and, combined with inference, the search techniques of the 1970s era that
produced [[shakey-the-robot|Shakey]]-adjacent planning work.

## Relationships

- Built from [[depth-first-search]], recovering the guarantees of [[breadth-first-search]]
- A [[blind-search]] algorithm, expanded via [[search-node]]s
- Contrasted with [[iterative-width-search]], which also runs an increasing-parameter sequence of bounded searches, but bounds novelty rather than depth

## Sources

- [[w02a-blind-search-properties]] — introduces the algorithm, its completeness/optimality argument, its $O(bm)$ space bound, and the historical notes on Rubik's Cube and 1970s search
