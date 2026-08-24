---
title: Relaxation
type: concept
tags: [heuristics, week-04]
date: 2026-08-24
---

# Relaxation

A general methodology for deriving a heuristic function automatically from a problem
description: simplify the problem, solve the simplified version optimally (or
approximately), and use that cost as the heuristic estimate for the original.

## How it works

A relaxation of $h^*$ is formalised as a triple $\mathcal{R} = (\mathcal{P}', r,
h'^*)$: a transformation $r$ mapping instances of the original problem family
$\mathcal{P}$ into a simplified family $\mathcal{P}'$, together with a function
$h'^*$ computing (or approximating) the perfect heuristic of the simplified problem.
The relaxation heuristic is $h^{\mathcal{R}}(\Pi) := h'^*(r(\Pi))$, and admissibility —
$h^{\mathcal{R}} \le h^*$ — follows directly from $\mathcal{P}'$ being genuinely
simpler: an optimal solution to a simplified version of a problem can never cost more
than an optimal solution to the original.

Three properties classify a given relaxation, none of them a strict requirement for
usefulness:

- **Native** if $\mathcal{P}' \subseteq \mathcal{P}$ and $h'^*$ uses the same
  computational method as $h^*$ (not necessarily the same values). Goal counting is
  native, because a STRIPS task with empty preconditions and deletes is still a STRIPS
  task; treating route-finding as flight-distance-for-birds is not, because a
  fully-connected straight-line graph is not itself an instance of road-based
  route-finding.
- **Efficiently constructible** if $r$ runs in polynomial time.
- **Efficiently computable** if $h'^*$ runs in polynomial time on the simplified
  problem.

When a relaxation fails constructibility or computability, the standard response is to
approximate the failing piece (or, less commonly, redesign it so it is typically
feasible without a formal guarantee, or accept the cost). [[goal-counting-heuristic]]
is exactly this: it is native and efficiently constructible, but the underlying
simplified problem — STRIPS with empty preconditions and deletes — is still NP-hard to
solve optimally once an action can add more than two facts (reducible from minimum set
cover), so goal counting approximates that problem's true optimal cost by simply
counting unmet goal propositions, discarding all information about the actions
actually needed.

During search, the relaxation is invoked once per generated state $s$: the task
$\Pi_s$ is $\Pi$ with its initial state replaced by $s$, and the heuristic value used
is $h^{\mathcal{R}}(s) = h'^*(r(\Pi_s))$. The relaxation plays no other role in the
search — a point that is easy to misread for native relaxations, where the simplified
dynamics can look like they are somehow governing the real search rather than just
producing a number.

## Why it matters

Relaxation is what lets a heuristic search planner accept an arbitrary PDDL input and
derive a usable heuristic without a human hand-designing one for that specific domain —
preserving the generality, autonomy, and rapid-prototyping properties the subject sets
up as planning's core selling points. [[delete-relaxation]], the most widely used
relaxation family in modern planners, and the earlier [[goal-counting-heuristic]] are
both instances of this same triple structure.

## Relationships

- Generalises [[goal-counting-heuristic]] and [[delete-relaxation]] as specific
  instances of the same construction
- Produces functions consumed as [[heuristic-function]] values, judged by the criteria
  in [[heuristic-properties]]
- Distinct from [[novelty]], which orders search by history rather than estimating
  remaining cost

## Sources

- [[w04-prerecorded-relaxation-heuristics]] — motivation, informal route-finding and goal-counting examples, native/efficiently-constructible/efficiently-computable properties
- [[w04a-generating-heuristic-functions]] — formal triple definition, the $\Pi_s$ notation, and how a relaxation plugs into search
