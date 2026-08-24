---
title: Additive Heuristic
type: concept
tags: [heuristics, week-04, delete-relaxation]
date: 2026-08-24
---

# Additive Heuristic ($h^\text{add}$)

An inadmissible but typically far more informative approximation of $h^+$: it estimates
the cost of achieving a set of facts by summing the estimated cost of achieving each
one independently, over-counting whenever different sub-goals share work.

## Formula

$h^\text{add}(s) := h^\text{add}(s, G)$, where $h^\text{add}(s, g)$ is the point-wise
greatest function satisfying:

$$
h^\text{add}(s,g) =
\begin{cases}
0 & g \subseteq s \\
\min_{a \in A,\ g \in add_a} c(a) + h^\text{add}(s, pre_a) & |g| = 1 \\
\sum_{g' \in g} h^\text{add}(s, \{g'\}) & |g| > 1
\end{cases}
$$

Identical to [[max-heuristic]] except for the $|g| > 1$ case, which sums rather than
takes the max over sub-goal costs.

## How it works

Both $h^\text{add}$ and $h^\text{max}$ approximate $h^+$ by assuming singleton
sub-goals can be achieved independently; they differ only in how the independent
estimates get combined. Summing is a pessimistic assumption — it treats every sub-goal
as needing its own separate work, even when the same action sequence would achieve
several sub-goals at once. On a logistics task where several packages must all travel
through the same intermediate city, $h^\text{add}$ counts the cost of moving the truck
to that city once for *every* package that needs it, rather than once overall — a
worked example in the source lecture shows this compounding badly as the number of
shared-route packages grows.

## Why it matters

$h^\text{add} \ge h^+$ always, and there exist tasks where $h^\text{add}(s) > h^*(s)$,
so it is not admissible and cannot be used for optimal search. But it is typically much
more informative than $h^\text{max}$ in practice, because summing preserves more signal
about how much total work remains than taking a single max does — this trade-off is
exactly why the [[relaxed-plan-heuristic]] exists: it keeps $h^\text{add}$'s
informativeness while removing most of its over-counting, by only ever collecting a
shared action into the extracted plan once.

## Relationships

- One of the two classical approximations of $h^+$ (see [[delete-relaxation]]),
  alongside [[max-heuristic]]
- Provides one of the two candidate best-supporter functions used to extract the
  [[relaxed-plan-heuristic]] $h^\text{FF}$
- Used directly as search control in the HSP planner (greedy best-first search on
  $h^\text{add}$)

## Sources

- [[w04b-delete-relaxation-heuristics]] — formal definition, pessimism proof, the logistics over-counting example, HSP's use of $h^\text{add}$
