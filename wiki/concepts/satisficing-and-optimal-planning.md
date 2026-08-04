---
title: Satisficing and Optimal Planning
type: concept
tags: [planning, algorithms, week-01]
date: 2026-08-04
---

# Satisficing and Optimal Planning

The two algorithmic problems in classical planning. Satisficing planning returns any
valid plan; optimal planning returns a cheapest one. The techniques that succeed at one
are typically not the techniques that succeed at the other.

## How it works

**Satisficing planning** takes a planning task $P$ and outputs a plan for $P$, or
reports that none exists. Any plan will do, so a solver is free to use aggressive,
inadmissible guidance that commits to promising-looking regions of the search space and
never revisits the decision.

**Optimal planning** takes $P$ and outputs an optimal plan, or reports unsolvability.
Proving optimality requires establishing that no cheaper plan exists, which forces a
solver to use admissible heuristics — estimates that never overestimate the true cost to
the goal. Admissibility is a strong constraint and admissible heuristics are
correspondingly weaker as guidance, so optimal planners solve substantially smaller
problems.

This is why the two are separate research tracks with separate competition categories in
the [[international-planning-competition]], and why a satisficing planner is not simply
an optimal planner given less time.

## Formula

For a plan $\pi = a_0, \dots, a_{n-1}$ with cost

$$
c(\pi) = \sum_{i=0}^{n-1} c(a_i, s_i),
$$

satisficing planning requires any $\pi$ that is applicable and reaches $S_G$, while
optimal planning requires

$$
\pi^* \in \arg\min_{\pi \ \text{valid for}\ P} c(\pi).
$$

A heuristic $h$ is admissible when $h(s) \le h^*(s)$ for all $s$, where $h^*(s)$ is the
true optimal cost from $s$ to the nearest goal state. Admissibility is what licenses
A\* to return optimal solutions; satisficing search drops it.

The corresponding decision problems, PlanEx for satisficing and PlanLen for optimal, are
both PSPACE-complete in general — see [[planning-complexity]].

## Why it matters

Choosing between them is a modelling decision with a large practical consequence. If a
plan merely has to work, satisficing planners scale to problems that optimal planners
cannot touch. If plan cost is the thing being paid for — fuel, time, machine hours —
then the weaker guidance and smaller reachable problem sizes are the price of the
guarantee. The IPC competition results reflect this split directly: the winning
satisficing planners (FF, LPG, LAMA) are heuristic search systems with inadmissible
heuristics, while optimal winners have included compilation to SAT (SATPLAN) and symbolic
search (Gamer).

## Relationships

- Both problems are analysed in [[planning-complexity]]
- Defined over the plans of [[classical-planning]]
- Evaluated separately in the [[international-planning-competition]]
- The quality of guidance available is the subject of [[search-and-inference]]

## Sources

- [[w01b-introduction-to-planning]] — defines both algorithmic problems, notes that techniques do not transfer, and lists IPC winners by category
