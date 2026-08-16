---
title: Breadth-First Search
type: concept
tags: [search, algorithms, week-02]
date: 2026-08-10
---

# Breadth-First Search

A [[blind-search]] strategy that always expands the shallowest node on the open list
first, implemented with a FIFO queue.

## How it works

Nodes are generated and placed on the open list in the order their parents were
expanded; because the queue is first-in-first-out, every node at depth $k$ is expanded
before any node at depth $k+1$. On a tree drawn with the root at depth 0, this produces
a strict layer-by-layer expansion order.

**Completeness.** Breadth-first search is complete whenever the portion of the graph
reachable from the initial state and containing a solution is connected. Cycles do not
trap it: since a cycle's states are re-encountered at ever-increasing depth, breadth-
first search simply unrolls a cycle into a deeper and deeper tree rather than looping,
while continuing to explore every other branch in parallel.

**Optimality.** Breadth-first search is optimal only under uniform edge (action) cost.
If every action costs the same, the shallowest goal is also the cheapest, so
shallowest-first expansion finds it first. Under non-uniform cost this breaks: a
higher-cost path at a shallow depth can be returned before a cheaper path one level
deeper is even generated. The fix, named but not covered in depth, is Dijkstra's
algorithm (uniform-cost search) — breadth-first search with the queue replaced by a
priority queue ordered on accumulated cost $g(n)$.

**Complexity.** Counting nodes layer by layer as a geometric progression gives both
time and space complexity as $O(b^d)$, where $b$ is the branching factor and $d$ is the
depth of the shallowest goal — the progression is dominated by its final term, so the
big-O result is the same as if only the last layer existed. Because every node
generated must be kept until it is either expanded or is confirmed not needed, space
complexity matches time complexity: the whole frontier, layer by layer, must fit in
memory.

**Implementation detail.** Whether the goal test runs at node *generation* or node
*expansion* time is not cosmetic: checking at expansion requires generating one entire
extra layer of nodes (to have something to expand and then test) before the algorithm
can terminate, changing the exponent from $d$ to $d+1$.

## Why it matters

Breadth-first search is the default choice whenever completeness is required and edge
costs are uniform, since it finds the shortest — and therefore cheapest — solution by
construction. Its failure mode is purely a memory problem: with $b=10$ and 10,000
nodes/second, a goal at depth 10 already needs roughly 3 hours and 100+ gigabytes, which
is why deeper problems force a move to [[depth-first-search]] or
[[iterative-deepening-search]].

## Relationships

- A [[blind-search]] strategy, expanded via [[search-node]]s and an open list implemented as a queue
- Contrasted with [[depth-first-search]] (LIFO, deepest-first)
- Subsumed by [[iterative-deepening-search]], which recovers BFS's guarantees with DFS's space bound
- The pruned variant used in [[iterative-width-search]] is also breadth-first, restricted by novelty rather than depth
- Used as the `improve` step inside [[enforced-hill-climbing]], where committing to the improving path is what bounds the memory cost

## Sources

- [[w02-prerecorded-search-fundamentals]] — introduces shallowest-first expansion and poses completeness/optimality as open questions
- [[w02a-blind-search-properties]] — resolves completeness (yes, given connectedness) and optimality (only under uniform cost), derives $O(b^d)$ complexity, and covers the generation-versus-expansion goal-test detail
- [[w03b-local-search-and-bfws]] — its space problem as the reason enforced hill-climbing discards each generated layer after committing
