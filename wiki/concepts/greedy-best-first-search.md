---
title: Greedy Best-First Search
type: concept
tags: [search, heuristics, algorithms, week-03]
date: 2026-08-16
---

# Greedy Best-First Search

A systematic heuristic search that always expands the open node with the smallest
heuristic value, ignoring the cost already paid to reach it. One of the three most
popular algorithms in satisficing planning.

## How it works

```
open := new priority queue ordered by ascending h(state(σ))
open.insert(make-root-node(init()))
closed := ∅
while not open.empty():
    σ := open.pop-min()
    if state(σ) ∉ closed:
        closed := closed ∪ {state(σ)}
        if is-goal(state(σ)): return extract-solution(σ)
        for each (a, s') ∈ succ(state(σ)):
            σ' := make-node(σ, a, s')
            if h(state(σ')) < ∞: open.insert(σ')
return unsolvable
```

The open list is the search frontier, implemented as a min-heap keyed on $h$; the
closed list holds already-expanded states and exists only to detect duplicates. The
duplicate check is placed after popping rather than during expansion purely so the
structure lines up with [[a-star-search]]; it could equally be done at generation time.

**Completeness.** The only line that discards part of the search space is the
`h < ∞` test on successors, so completeness reduces to whether that test can be
trusted. If $h$ is safe, an infinite value really does mean no solution lies that way,
and nothing reachable is lost. A safe heuristic is therefore sufficient for
completeness.

**Optimality.** Not guaranteed, and not recoverable by improving the heuristic. Take
two goal states, one reachable at cost 1 and one at cost one million, and run with the
perfect heuristic $h^*$. Both goals have $h = 0$, so the priority queue has no basis to
order them and the outcome depends entirely on tie-breaking. Since the algorithm
returns as soon as it pops a goal state, it can return the million-cost plan. No
combination of safety, goal-awareness, admissibility and consistency prevents this,
because the flaw is that $h$ alone ignores $g$.

**Invariance.** The expansion order is unchanged by any strictly monotonic
transformation of $h$ — scaling by a positive constant, or adding one — since only the
relative order of $h$-values matters.

## Why it matters

Despite having no optimality guarantee, greedy best-first search is the workhorse of
satisficing planning: state-of-the-art planners derive a heuristic automatically from
the problem and plug it in here, with extensions such as helpful actions and landmarks
narrowing the branching factor. Its weakness is that it is pure exploitation — it
follows the heuristic's lead unconditionally and gets stuck in local minima — which is
the shortcoming [[best-first-width-search]] is designed to address.

## Relationships

- Consumes a [[heuristic-function]]; guarantees follow from [[heuristic-properties]]
- Differs from [[a-star-search]] only in omitting the $g$ term, and is the $W \to \infty$ limit of [[weighted-a-star]]
- Its local-minimum weakness motivates [[best-first-width-search]]
- Uses the [[search-node]] and open/closed-list machinery shared with [[blind-search]]

## Sources

- [[w03-prerecorded-heuristic-search]] — line-by-line reading of the pseudocode
- [[w03a-heuristic-functions-properties]] — safety as sufficient for completeness, and the two-goal counterexample to optimality
- [[w03b-local-search-and-bfws]] — its role in state-of-the-art satisficing planners, and its exploitation-only weakness
