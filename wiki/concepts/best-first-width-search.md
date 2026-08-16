---
title: Best-First Width Search
type: concept
tags: [search, width, heuristics, algorithms, week-03]
date: 2026-08-16
---

# Best-First Width Search

A best-first search whose primary ordering is a novelty measure rather than a heuristic,
with ties broken by heuristics. It merges the structural exploration of
[[iterative-width-search]] with the goal-directed exploitation of
[[greedy-best-first-search]], and its variants have been the strongest satisficing
planners since 2018.

## Formula

BFWS($f$) for $f = \langle w, f_1, \dots, f_n \rangle$, where $w$ is a novelty measure,
is a plain best-first search in which nodes are ordered by $w$, with ties broken by the
functions $f_i$ in the order given.

The basic scheme is BFWS($\langle w, h \rangle$) with $h = h_{\mathrm{add}}$ or
$h_{\mathrm{ff}}$ and the novelty measure $w = w_h$, where

$$w_h(s) = \text{size of the smallest tuple of atoms made true by } s \text{ for the}$$
$$\text{first time, relative to previously generated } s' \text{ with } h(s) = h(s').$$

## How it works

Plain [[novelty]] asks whether a state contains some combination of atoms never seen
before anywhere in the search. The refinement in $w_h$ is that "seen before" is
restricted to states with the same heuristic value. A state with $h = 1$ is compared
only against the other $h = 1$ states already generated, not against every state in the
search history.

This is what mixes the two orderings rather than merely stacking them. Novelty computed
globally would soon rate everything as unnovel; computed per heuristic level, it keeps
asking "among the states that look equally close to the goal, which one shows me
something structurally new?" A simple and surprisingly effective instance orders on
novelty and breaks ties by goal counting — the number of unachieved goal atoms.

There are no optimality guarantees, and the source lecture declines to give completeness
results, since both depend on the width of the problem being solved. BFWS is the
preferred approach when a solution is needed and its cost does not have to be optimal.

## Why it matters

[[greedy-best-first-search]] is pure exploitation: it follows the heuristic without ever
distrusting it, and consequently gets stuck in local minima. Reinforcement learning and
MCTS treat exploration as mandatory for their guarantees, but explore flatly, sampling
actions without regard to what the state actually contains. Width-based exploration is
the third option, because novelty is computed from the factored structure of the state
and so directs exploration at structurally new territory rather than at random.

Empirically the combination beats either ingredient alone: BFWS($\langle w, h \rangle$)
is much stronger than greedy best-first search on the same $h$, and BFWS variants have
been the best performers in the agile and satisficing tracks of the
[[international-planning-competition]] since IPC-2018.

## Relationships

- Built on [[novelty]], refining it into the heuristic-relative measure $w_h$
- The best-first cousin of [[iterative-width-search]]
- Replaces [[greedy-best-first-search]] in state-of-the-art satisficing planners; consumes a [[heuristic-function]]
- Implemented in [[lapkt]]

## Sources

- [[w03b-local-search-and-bfws]] — the BFWS($f$) definition, the $w_h$ measure, the exploration/exploitation motivation, and the IPC results
