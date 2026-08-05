---
title: Planning Complexity
type: concept
tags: [complexity, theory, week-01]
date: 2026-08-04
---

# Planning Complexity

The computational difficulty of classical planning. Both deciding whether a plan exists
and deciding whether a plan of bounded length exists are PSPACE-complete, placing
planning strictly above SAT and CSP in worst-case hardness.

## How it works

Two decision problems are distinguished.

**PlanEx** asks, given a planning task $P$, whether any plan for $P$ exists. It
corresponds to satisficing planning.

**PlanLen** asks, given a task $P$ and an integer $B$, whether a plan of length at most
$B$ exists. It corresponds to optimal planning; see
[[satisficing-and-optimal-planning]].

Both are PSPACE-complete in general, which means at least as hard as any problem
solvable in polynomial space. The intuition for why planning exceeds NP is that a plan
may need to be exponentially long, so a plan is not in general a polynomial-size
certificate; what *is* bounded polynomially is the memory needed to walk a trajectory
one state at a time.

Within specific domains the picture changes, and PlanEx and PlanLen can come apart.
Blocksworld and Logistics are the standard examples: plan existence is in P (a simple
strategy always works — unstack everything onto the table and rebuild), while deciding
whether the goal can be reached in at most $B$ steps is NP-complete. Finding *a* plan is
easy; finding a *short* one is not.

## Formula

The state space induced by a [[strips]] task with fact set $F$ is

$$
|S| = 2^{|F|},
$$

so a description of size linear in $|F|$ denotes an exponentially large model. For
[[blocksworld]] with $n$ blocks and one hand, the number of reachable states grows as:

| Blocks | States | Blocks | States |
|---:|---:|---:|---:|
| 1 | 1 | 8 | 394,353 |
| 2 | 3 | 9 | 4,596,553 |
| 3 | 13 | 10 | 58,941,091 |
| 4 | 73 | 11 | 824,073,141 |
| 5 | 501 | 12 | 12,470,162,233 |
| 6 | 4,051 | 13 | 202,976,401,213 |
| 7 | 37,633 | | |

Complexity results:

$$
\textsf{PlanEx},\ \textsf{PlanLen} \in \text{PSPACE-complete}
\qquad\text{(Bylander, 1994)}
$$

with $\text{NP} \subseteq \text{PSPACE}$, so planning is at least as hard as the
NP-complete [[boolean-satisfiability]] and [[constraint-satisfaction-problem]].

## Why it matters

The hardness result is not a reason to give up, it is the reason the field's methodology
is what it is. Worst-case exponential behaviour is unavoidable, so progress is measured
empirically on benchmarks rather than proved, and the engineering effort goes into
[[search-and-inference]] — exploiting structure so that the problems people actually
pose are solved quickly even though the worst case remains out of reach. The gap between
domain-specific PlanEx and PlanLen also explains why satisficing and optimal planners
are genuinely different pieces of software rather than the same solver with a flag.

## Relationships

- Applies to [[classical-planning]]; the two decision problems correspond to [[satisficing-and-optimal-planning]]
- Where the exponent comes from in practice: [[state-space-modelling]]
- Compare with [[boolean-satisfiability]] and [[constraint-satisfaction-problem]], both NP-complete
- The practical response is [[search-and-inference]]
- Example domain: [[blocksworld]]

## Sources

- [[w01b-introduction-to-planning]] — defines PlanEx and PlanLen, states PSPACE-completeness, gives the blocksworld state counts and the domain-specific separation
- [[w01-prerecorded-ai-overview]] — video 4 states that planning is harder than SAT and CSP
