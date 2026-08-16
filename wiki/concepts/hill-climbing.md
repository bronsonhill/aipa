---
title: Hill-Climbing
type: concept
tags: [search, local-search, algorithms, week-03]
date: 2026-08-16
---

# Hill-Climbing

The simplest [[local-search]] algorithm: from the current node, generate all successors,
move to the one with the smallest heuristic value, discard everything else, repeat. The
discrete-state-space analogue of gradient descent.

## How it works

```
σ := make-root-node(init())
forever:
    if is-goal(state(σ)): return extract-solution(σ)
    Σ' := { make-node(σ, a, s') | (a, s') ∈ succ(state(σ)) }
    σ := an element of Σ' minimising h   /* random tie breaking */
```

There is no open list. The algorithm holds one node, expands it, keeps the best child
and deletes the rest from memory permanently, and never switches branch.

The algorithm only makes sense when $h(s) > 0$ for every non-goal state $s$. Drawing
the state space as a landscape with $h$ on the vertical axis makes the reason plain: a
non-goal state at $h = 0$ sits at the bottom of the landscape, and since every step
minimises $h$, the search settles there and cannot climb back out.

**Completeness.** Not guaranteed. Four failure modes come out of the week 3 discussion:

- A **dead-end region**. Once the search steps into a part of the space from which no
  goal is reachable, there is no mechanism for backing out — the alternatives were
  deleted.
- A **cycle**, but only under deterministic tie-breaking. If ties are always broken in
  a fixed order the search can loop forever; random tie-breaking escapes eventually.
  Fixed tie-break orders are also an adversarial risk, since whoever constructs the
  instance can play against a known order. Random tie-breaking costs something to
  implement, and is usually worth it.
- An **unsafe heuristic**, which can send the search into a region with no solution and
  leave no way back — the same hazard as a dead end, arriving by a different route. An
  adversarially chosen heuristic is the extreme case.
- A **directed** search space in general. On an undirected graph, or a problem where
  every action can be undone, a wrong step is recoverable and hill-climbing is much
  safer.

With the blind heuristic $h = 0$ everywhere and random tie-breaking, hill-climbing is
exactly a random walk, which on a connected undirected graph will reach a goal
eventually.

**Optimality.** Not guaranteed, on the same two-goal example that defeats
[[greedy-best-first-search]]: one goal at cost 1 and another at cost one million, both
with $h = 0$, and nothing to choose between them. As a general rule, an incomplete
algorithm is not optimal either, but the entailment does not strictly hold — an
algorithm that prunes symmetric solutions is incomplete by design and can still be
optimal.

## Why it matters

Hill-climbing is the reference point for what local search costs and buys. It has a
tiny memory footprint and no guarantees at all, and understanding exactly which
structures defeat it is what motivates [[enforced-hill-climbing]], the hybrid that
recovers a systematic escape from shallow local minima.

## Relationships

- The basic instance of [[local-search]]; extended by [[enforced-hill-climbing]]
- Shares its non-optimality counterexample with [[greedy-best-first-search]]
- The zero-heuristic-at-non-goal condition is stronger than goal-awareness in [[heuristic-properties]]

## Sources

- [[w03-prerecorded-heuristic-search]] — the algorithm, the gradient-descent analogy, and the landscape diagram
- [[w03b-local-search-and-bfws]] — the four-graph poll and the resulting failure modes; incompleteness versus non-optimality
