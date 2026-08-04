---
title: Blocksworld
type: entity
entity_type: dataset
tags: [benchmarks, planning, week-01]
date: 2026-08-04
---

# Blocksworld

The canonical toy domain of classical planning: a set of blocks on a table and a single
robot hand, with the task of rearranging them from one configuration into another.

## Key facts

- A *toy problem* in the technical sense — it strips away noise and incidental complexity to leave the essence of what makes a class of problems hard. A scientific field without one has a communication problem.
- The realistic counterpart is a shipyard rearranging containers with a crane, or any single-resource stacking problem.
- Predicates: `on(x,y)`, `onTable(x)`, `clear(x)`, `holding(x)`, `armEmpty()`.
- Actions: `stack(x,y)`, `unstack(x,y)`, `pickup(x)`, `putdown(x)`. The pickup/putdown pair operates on blocks on the table; stack/unstack operate on blocks resting on other blocks.
- Introduced as a standard PDDL domain around 2000 and available prebuilt in [[editor-planning-domains]].
- Plan existence is in P, while bounded-length plan existence is NP-complete — one of the standard examples where PlanEx and PlanLen come apart. See [[planning-complexity]].

## State space growth

With $n$ blocks and one hand:

| Blocks | States | Blocks | States |
|---:|---:|---:|---:|
| 3 | 13 | 9 | 4,596,553 |
| 5 | 501 | 10 | 58,941,091 |
| 7 | 37,633 | 12 | 12,470,162,233 |
| 8 | 394,353 | 13 | 202,976,401,213 |

Thirteen blocks is a domain a child can describe, and it already has more states than
any solver can enumerate. This is the point the numbers are shown to make.

## Modelling stack(x, y)

The lecture derives this action from the room. See [[strips]] for the general form.

| List | Contents |
|---|---|
| $\mathit{Pre}$ | $\{\mathrm{holding}(x),\ \mathrm{clear}(y)\}$ |
| $\mathit{Add}$ | $\{\mathrm{on}(x,y),\ \mathrm{armEmpty}(),\ \mathrm{clear}(x)\}$ |
| $\mathit{Del}$ | $\{\mathrm{holding}(x),\ \mathrm{clear}(y)\}$ |

Omitting `clear(y)` from the delete list is the domain's most instructive bug. It does
not make `stack` inapplicable and it is not harmless bookkeeping. Since `clear(y)` stays
true after stacking, the planner may stack a second block onto $y$, and a third, and the
model now admits states in which several distinct blocks sit on the same block. Nothing
in the syntax is wrong and no tool reports an error — it is caught only by testing the
model. See [[plan-validation]].

## Relevance to AI Planning for Autonomy

Blocksworld is where the subject's first PDDL modelling is done, and it recurs as the
worked example for heuristics and search in later weeks. It also carries two arguments
that generalise well beyond it: that state spaces explode faster than intuition
suggests, and that a semantically wrong model looks exactly like a correct one from the
outside.

## Sources

- [[w01b-introduction-to-planning]] — the worked `stack` modelling, the missing `clear(y)` exercise, the state-count table, and the PlanEx/PlanLen separation
