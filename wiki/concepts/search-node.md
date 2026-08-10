---
title: Search Node
type: concept
tags: [search, foundations, week-02]
date: 2026-08-10
---

# Search Node

The unit a search algorithm actually manipulates: a state plus the bookkeeping needed
to recover how the search reached it and to reconstruct a plan once a goal is found.
Distinct from a bare state, which by itself cannot answer "how did I get here?".

## How it works

A search node bundles a state with three pieces of path information: a pointer to the
**parent** node, the **action** applied to the parent to produce this node, and
$g(n)$, the accumulated cost of the path from the initial state to $n$. A related but
distinct quantity, $g^*(n)$, is the cost of the *cheapest* path to the state underlying
$n$ — the two coincide only once a search has confirmed optimality for that state.

Given a goal node, the parent pointers form a chain back to the root; reading off the
actions along that chain, in reverse, reconstructs the plan. This is the entire reason
parent and action are stored — neither is needed to decide what to do next, only to
report the answer once search is over.

Three operations act on nodes. **Node expansion** takes a node off the frontier and
generates all of its children by applying every action the applicability function
returns as legal in that state. The **search strategy** is the single decision every
search algorithm differs on: given the current frontier, which node does it choose to
expand next? Everything that distinguishes [[breadth-first-search]] from
[[depth-first-search]] from best-first search is this one choice.

The frontier and the interior of the search tree are named separately. The **open
list** is the set of generated-but-not-yet-expanded nodes — the leaves of the tree, the
current candidates for expansion. The **closed list** is the set of already-expanded
nodes — the internal, non-leaf nodes. Implementation choice of open-list data structure
(queue, stack, priority queue) is what a search strategy reduces to in code: see
[[breadth-first-search]] and [[depth-first-search]].

## Why it matters

Search-node vocabulary is what makes the four evaluation properties in
[[blind-search]] precise. "Time complexity" means counting generated nodes; "space
complexity" means counting nodes that must be held (open list, or open plus closed,
depending on the algorithm); $g(n)$ is what a cost-sensitive strategy like uniform-cost
search sorts its open list by. Whether a goal test happens at node generation or node
expansion time also has a measurable effect on complexity — checking at expansion
inflates the exponent by one layer, since one extra full layer of nodes must be
generated before any of them is tested.

## Relationships

- Underlies [[blind-search]], [[breadth-first-search]], [[depth-first-search]], [[iterative-deepening-search]]
- The state a node wraps is defined by [[state-space-modelling]]
- Novelty, used by [[iterative-width-search]], is a further property computed over the atoms of a node's state

## Sources

- [[w02-prerecorded-search-fundamentals]] — defines the search node, $g(n)$, $g^*(n)$, node expansion, search strategy, open list, and closed list
- [[w01-prerecorded-ai-overview]] — video 8 introduces the same terminology
- [[w02a-blind-search-properties]] — applies the vocabulary to derive BFS/DFS complexity, including the generation-versus-expansion goal-test distinction
