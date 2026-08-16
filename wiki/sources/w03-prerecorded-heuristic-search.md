---
title: Week 3 Pre-recorded Heuristic Search Algorithms
type: source
source_type: video
link: https://www.youtube.com/watch?v=wlYSyLCYAt4
tags: [week-03, search, heuristics, a-star, local-search]
date: 2026-08-16
---

# Week 3 Pre-recorded Heuristic Search Algorithms

Nine short videos released before the week 3 live lectures, presented by
[[nir-lipovetzky]] and hosted publicly on YouTube. The link above points at the first;
the rest are listed below. Together they walk the whole heuristic-search toolkit, from
the definition of a heuristic function through to the hybrid of local and systematic
search that dominated planners until roughly 2012.

## Overview

The sequence opens by defining a heuristic function as an estimator of the cost
remaining from a state to the nearest goal, then names the four properties used all
subject to reason about them: safe, goal-aware, admissible, and consistent. The
properties are not independent. Consistency together with goal-awareness entails
admissibility, admissibility entails goal-awareness, and admissibility entails safety;
the videos state these implications and leave the proofs as an exercise, noting that no
further implication holds.

The algorithm videos are deliberately built as a chain of one-line variations on a
single template. Greedy best-first search is a priority queue ordered by $h$, with a
closed list for duplicate detection and a rule that never inserts a node whose $h$ is
infinite. A\* changes exactly two things: the queue is ordered by $f = g + h$ rather
than $h$, and a state already in the closed list is re-expanded when the current path
reaches it with a strictly better $g$. Weighted A\* changes one more: the ordering
becomes $g + W \cdot h$, with $W$ acting as a dial that turns the same code into
Dijkstra's algorithm at $W = 0$, A\* at $W = 1$, and greedy best-first search as
$W \to \infty$.

Local search is then introduced on the argument that its memory footprint is small.
Hill-climbing keeps a single node, expands it, commits to the successor minimising $h$,
and discards every other branch permanently; it is presented explicitly as the
discrete-space analogue of gradient descent, with a drawn landscape showing how a
plateau of zero heuristic values at non-goal states defeats it. Enforced hill-climbing
replaces the one-step look at successors with a breadth-first search that returns the
first state found with a strictly better $h$ than the current one, then commits to that
path and forgets the rest of the layer, which gives a systematic way of escaping a
local minimum as long as the minimum is shallow enough that the breadth-first search
does not exhaust memory first.

The final video covers IDA\*, which the summary table lists but the live lectures do
not discuss. It is iterative deepening with the depth limit replaced by an $f$-limit:
the first limit is $f$ of the initial state, nodes whose $f$ exceeds the current limit
are pruned, and the next limit is the minimum $f$ over the pruned nodes rather than a
fixed increment. With an admissible heuristic it is optimal, it keeps iterative
deepening's linear space bound, and it expands fewer nodes than plain iterative
deepening.

An extended demonstration sits in the middle of the sequence: a hand-traced A\*
expansion over a small graph, followed by Sebastian Thrun's own footage of Stanford's
DARPA Urban Challenge car planning with A\* over a maze, a barrier requiring a
multi-point turn, and a reverse park. Lipovetzky's commentary afterwards makes the
scope precise. A\* there searches an abstract discretisation of the space, not the
continuous motion, and the heuristic used is straight-line Euclidean distance; the
motion model is a separate, lower-level concern. The point of the clip is that the
algorithm invented for [[shakey-the-robot|Shakey]] in the 1970s is the same one driving
a self-driving car forty years later.

## Videos

1. Heuristic Functions (14:30) — https://www.youtube.com/watch?v=wlYSyLCYAt4
2. Heuristic Function Properties (4:59) — https://www.youtube.com/watch?v=Xd43DqmDnqg
3. Greedy Best-First Search (6:04) — https://www.youtube.com/watch?v=OI_urviXsbI
4. A\* (4:39) — https://www.youtube.com/watch?v=hIam0NVNPOQ
5. A\* in Action (9:10) — https://www.youtube.com/watch?v=Z8BrU1W0_aA
6. Weighted A\* (4:32) — https://www.youtube.com/watch?v=Pht6p_O3ONg
7. Hill-Climbing (4:42) — https://www.youtube.com/watch?v=kUTQO5LWA5U
8. Enforced Hill-Climbing (6:53) — https://www.youtube.com/watch?v=6CO2-8ERKhI
9. IDA\* (2:57) — https://www.youtube.com/watch?v=XXFvguum5rw

## Key concepts

- [[heuristic-function]]
- [[heuristic-properties]]
- [[greedy-best-first-search]]
- [[a-star-search]]
- [[weighted-a-star]]
- [[local-search]]
- [[hill-climbing]]
- [[enforced-hill-climbing]]
- [[ida-star]]

## Key entities

- [[nir-lipovetzky]]
- [[sebastian-thrun]]
- [[darpa-grand-challenge]]

## Topics covered (revision checklist)

- Heuristic function as an estimator of remaining cost; $h : S \mapsto \mathbb{R}_0^+ \cup \{\infty\}$
- The perfect heuristic $h^*$ and why computing it per state is as hard as solving the problem
- Informedness (how closely $h$ tracks $h^*$) versus the computational cost of evaluating $h$
- $h = 0$ everywhere as the blind heuristic, reducing informed search to blind search
- Safe: $h(s) = \infty$ implies $h^*(s) = \infty$
- Goal-aware: $h(s) = 0$ for every goal state
- Admissible: $h(s) \le h^*(s)$ for every state
- Consistent: $h(s) \le h(s') + c(a)$ for every transition $s \xrightarrow{a} s'$
- The implications between the four properties, and that no others hold
- Greedy best-first search: priority queue on $h$, closed list, no insertion of infinite-$h$ nodes
- The three operators every search algorithm needs: `init()`, `is-goal()`, `succ()`
- Open list as frontier, closed list as already-expanded interior
- A\*: ordering by $f = g + h$; $g$ as cost-so-far, $h$ as cost-to-go
- A\* re-opening: re-expand a closed state when reached with a strictly better $g$
- Hand-traced A\* expansion over a worked graph
- A\* in the DARPA Urban Challenge car; Euclidean-distance heuristic; abstract discretisation versus motion model
- Weighted A\*: $g + W \cdot h$; $W = 0$ gives Dijkstra, $W = 1$ gives A\*, large $W$ gives greedy best-first search
- Bounded suboptimality of weighted A\* for $W > 1$ with an admissible heuristic
- Local search motivated by memory footprint; systematic search keeps all branches, local search commits
- Hill-climbing as discrete gradient descent; the landscape picture and the zero-heuristic plateau
- Enforced hill-climbing: `improve` as a breadth-first search for a strictly better $h$; commit and discard
- Why enforced hill-climbing is a local/systematic hybrid, and how it escapes shallow local minima
- IDA\*: $f$-limit initialised to $f(s_0)$, updated to the minimum $f$ over pruned nodes
- IDA\* optimality under an admissible heuristic, and its linear space bound

## Notable claims / results

- Consistent and goal-aware together entail admissible; admissible entails goal-aware; admissible entails safe. No other implication among the four properties can be proved.
- The value of a heuristic is a trade-off, not a maximisation: $h^*$ is perfectly informed but requires solving an exponential problem at every state, so a useful heuristic approximates $h^*$ closely while staying cheap to evaluate.
- Weighted A\* with $W > 1$ and an admissible heuristic is bounded suboptimal — the returned solution costs at most $W$ times the optimal.
- Hill-climbing and enforced hill-climbing only make sense when $h(s) > 0$ for every non-goal state, because a zero heuristic at a non-goal state is an inescapable attractor.
- Enforced hill-climbing was the main algorithm in essentially every planner until around 2012, and is still used in applications such as UAV and underwater-vehicle planning.
- IDA\* was the algorithm that first solved Rubik's Cube; it expands fewer nodes than iterative deepening and keeps linear space.
- A\* with a Euclidean-distance heuristic planned the Stanford DARPA car's paths in under 10 milliseconds per query, faster than any other team's planner known to Thrun.

## Connections

- Continues [[w02-prerecorded-search-fundamentals]], which established the open/closed-list vocabulary these algorithms all reuse.
- Resolved live in [[w03a-heuristic-functions-properties]] (heuristic properties, greedy best-first search, A\*) and [[w03b-local-search-and-bfws]] (weighted A\*, hill-climbing, enforced hill-climbing, BFWS).
- IDA\* extends [[iterative-deepening-search]] from [[w02a-blind-search-properties]].
- The $W = 0$ case restates the uniform-cost search named in [[w02a-blind-search-properties]].
