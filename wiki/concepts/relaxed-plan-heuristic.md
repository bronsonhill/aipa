---
title: Relaxed Plan Heuristic
type: concept
tags: [heuristics, week-04, delete-relaxation]
date: 2026-08-24
---

# Relaxed Plan Heuristic ($h^\text{FF}$)

A heuristic that extracts one concrete relaxed plan by backward-chaining from the
goals over a best-supporter function, and sums the cost of the actions it collects.
Named for the FF planner that introduced it, it keeps most of
[[additive-heuristic]]'s informativeness while removing most of its over-counting.

## How it works

The construction has two parts. A **best-supporter function** $bs$ assigns each
non-true fact $p$ the single cheapest action achieving it, ranked by either
[[max-heuristic]] or [[additive-heuristic]] values: $bs_s(p) := \arg\min_{a \in A,\
p \in add_a} c(a) + h(s, pre_a)$. For backward chaining from $bs$ to actually terminate
at a valid plan, $bs$ must be **closed** — defined for every fact that has a path to a
goal in its own support graph — and **well-founded** — that support graph (facts and
actions as vertices, precondition and support edges) must be acyclic. Both the
$h^\text{max}$- and $h^\text{add}$-derived best-supporter functions are provably closed
and well-founded whenever every action cost is strictly positive; a well-founded
support graph always resolves cleanly back to facts already true in $s$, while a cyclic
one can leave backward chaining stuck without ever reaching $s$.

**Relaxed plan extraction** then does exactly one backward pass: starting from the
unmet top-level goals as the open set, repeatedly pick an open fact, pull its best
supporter into the plan, add that action's own preconditions (that aren't already true
or already handled) to the open set, and stop once the open set is empty. This runs in
time bounded by the number of facts, each step near-constant. $h^\text{FF}(s)$ is
defined as the sum of the costs of the actions collected this way (or $\infty$ if no
relaxed plan exists).

## Why it matters

Because relaxed plan extraction only ever collects a given supporting action into the
plan once, no matter how many sub-goals it happens to support, $h^\text{FF}$ avoids
most of the double-counting that makes $h^\text{add}$ badly over-estimate on tasks with
shared sub-plans (the logistics example with many packages sharing a route). It is
provably $\ge h^+$, and agrees with $h^+$ exactly on $\infty$ (both correctly detect
unsolvability), so it can be inadmissible in principle, but in practice it typically
does not over-estimate $h^*$ by much. This combination — fast, usually well-informed,
not admissible — is why $h^\text{FF}$ (or a variant of it) is the search control inside
most of the real planners the subject names: FF itself, LAMA, and BFWS.

A side effect of extraction is the set of **[[helpful-actions]]**: the actions
applicable in the current state that also appear in the extracted relaxed plan.

## Relationships

- Built from a best-supporter function derived from [[max-heuristic]] or
  [[additive-heuristic]] (see [[delete-relaxation]])
- Produces [[helpful-actions]] as a byproduct of extraction
- Used as search control by FF (with helpful-action pruning), LAMA (combined with a
  landmarks heuristic), and a variant in BFWS — see [[best-first-width-search]]
- Judged, like $h^\text{add}$, against [[heuristic-properties]] — pessimistic but not
  formally admissible

## Sources

- [[w04b-delete-relaxation-heuristics]] — best-supporter functions, closedness/well-foundedness, extraction algorithm, $h^\text{FF} \ge h^+$ proof, the example-systems table
