---
title: Max Heuristic
type: concept
tags: [heuristics, week-04, delete-relaxation]
date: 2026-08-24
---

# Max Heuristic ($h^\text{max}$)

An admissible but typically uninformative approximation of $h^+$: it estimates the
cost of achieving a set of facts by the cost of the single most expensive fact in the
set, treating sub-goals as if they could be achieved independently and taking the
worst case.

## Formula

$h^\text{max}(s) := h^\text{max}(s, G)$, where $h^\text{max}(s, g)$ is the point-wise
greatest function satisfying:

$$
h^\text{max}(s,g) =
\begin{cases}
0 & g \subseteq s \\
\min_{a \in A,\ g \in add_a} c(a) + h^\text{max}(s, pre_a) & |g| = 1 \\
\max_{g' \in g} h^\text{max}(s, \{g'\}) & |g| > 1
\end{cases}
$$

This is a Bellman-Ford-style recursive equation, evaluated bottom-up from facts already
true in $s$ (cost 0).

## How it works

The definition bottoms out at facts already true in $s$, and for a single-fact goal
recurses through the cheapest action achieving it plus the estimated cost of that
action's own preconditions. The only place $h^\text{max}$ differs from
[[additive-heuristic]] is the case of a multi-fact goal ($|g| > 1$): $h^\text{max}$
takes the **max** over the individual sub-goal costs, implicitly assuming the hardest
sub-goal dominates and the rest come free once it is solved.

## Why it matters

$h^\text{max} \le h^+ \le h^*$ always, so it is admissible — usable in optimal search.
But in practice it is typically far too optimistic to guide search well: taking the
max over sub-goals throws away the fact that different sub-goals usually require
genuinely separate work, so $h^\text{max}$ systematically underestimates by ignoring
that cost. It is, however, exactly what generates a *closed, well-founded*
best-supporter function whenever action costs are strictly positive, which is the
mechanism the [[relaxed-plan-heuristic]] uses to extract an actual relaxed plan.

## Relationships

- One of the two classical approximations of $h^+$ (see [[delete-relaxation]]),
  alongside [[additive-heuristic]]
- Provides the best-supporter function underlying [[relaxed-plan-heuristic]]
  extraction, alongside $h^\text{add}$
- Admissible, unlike $h^\text{add}$ and $h^\text{FF}$; contrast with
  [[heuristic-properties]]

## Sources

- [[w04b-delete-relaxation-heuristics]] — formal definition, optimism proof ($h^\text{max} \le h^+$), and the "far too optimistic in practice" verdict
