---
title: A* Search
type: concept
tags: [search, heuristics, algorithms, week-03]
date: 2026-08-16
---

# A* Search

A systematic heuristic search that expands open nodes in order of $f = g + h$,
combining the cost already paid to reach a state with the estimated cost remaining. The
most popular algorithm in optimal planning, and rarely used for satisficing planning.

## Formula

$$f(s) := g(s) + h(s)$$

where $g(s)$ is the cost of the path from the initial state to $s$ recorded in the
search node, and $h(s)$ is the [[heuristic-function]] estimate of the cost to go.

## How it works

```
open := new priority queue ordered by ascending g(σ) + h(state(σ))
open.insert(make-root-node(init()))
closed := ∅ ;  best-g := ∅
while not open.empty():
    σ := open.pop-min()
    if state(σ) ∉ closed or g(σ) < best-g(state(σ)):
        closed := closed ∪ {state(σ)}
        best-g(state(σ)) := g(σ)
        if is-goal(state(σ)): return extract-solution(σ)
        for each (a, s') ∈ succ(state(σ)):
            σ' := make-node(σ, a, s')
            if h(state(σ')) < ∞: open.insert(σ')
return unsolvable
```

Two things separate this from [[greedy-best-first-search]]. The queue is keyed on
$g + h$ rather than $h$, which is why the $g$ value must be stored in each
[[search-node]]. And a state already in the closed list is *re-opened* when the current
node reaches it with a strictly smaller $g$ than the best previously recorded: a shorter
path to a state can change everything downstream of it, so the state must be expanded
again. Nodes for the same state carrying a worse $g$ sit behind this one in the queue
and are skipped when their turn comes.

### Terminology

- **$f$-value** of a state: $f(s) = g(s) + h(s)$.
- **Generated nodes**: nodes inserted into open at some point.
- **Expanded nodes**: nodes popped from open that pass the closed and distance test.
- **Re-expanded (re-opened) nodes**: expanded nodes whose state was already in closed.

**Completeness.** As for greedy best-first search: the infinite-$h$ test is the only
place a branch is discarded, so a safe heuristic suffices.

**Optimality.** A\* is optimal when $h$ is admissible. The proof rests on the theorem
that A\* expands every node whose $f$-value is at most $g^*$, the cost of an optimal
solution. For A\* to miss every optimal solution, each optimal trajectory would need a
state pushed outside that region, meaning $g(s) + h(s) > g^*$. The $g$ term is fixed by
the problem and cannot be inflated, so only $h$ can do it, and an admissible heuristic
by definition never overestimates. Admissibility is therefore exactly what rules the
failure out.

**Implementation notes.** Ties on $f$ are commonly broken by preferring the smaller
$h$. If $h$ is both admissible and consistent, A\* never re-opens a state, so the
`best-g` bookkeeping can be dropped. Checking duplicates at the wrong point is a common
and hard-to-spot bug, and Russell and Norvig are criticised in the source lecture for
being imprecise about it.

## Why it matters

A\* is the default for optimal planning and, far outside planning, the standard
path-finding algorithm. It was invented in the 1970s by the researchers who had built
[[shakey-the-robot|Shakey]], from problems they had failed to solve at the time, and
used for around two decades before the theory relating heuristic properties to its
guarantees existed. Forty years later the same algorithm, with a straight-line Euclidean
heuristic, planned the paths of Stanford's [[darpa-grand-challenge|DARPA]] car —
including a multi-point turn at a barrier and a reverse park — in under 10 milliseconds
per query. That planner searched an abstract discretisation of the space, not the
continuous motion; the motion model is a separate, lower-level layer.

## Relationships

- Extends [[greedy-best-first-search]] with the $g$ term; generalised by [[weighted-a-star]]
- Guarantees follow from [[heuristic-properties]] — safe for completeness, admissible for optimality
- The linear-space variant is [[ida-star]], which builds on [[iterative-deepening-search]]
- At $h = 0$ it degenerates to Dijkstra's algorithm, the uniform-cost search of [[blind-search]]

## Sources

- [[w03-prerecorded-heuristic-search]] — the two differences from greedy best-first search, a hand-traced expansion, and the DARPA footage
- [[w03a-heuristic-functions-properties]] — the invention history and the first half of the optimality proof
- [[w03b-local-search-and-bfws]] — completing the proof: admissibility is the required property
