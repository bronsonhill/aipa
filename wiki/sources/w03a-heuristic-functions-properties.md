---
title: Week 3a Heuristic Functions and Their Properties
type: source
source_type: lecture
link: https://handbook.unimelb.edu.au/subjects/comp90054
tags: [week-03, heuristics, a-star, search]
date: 2026-08-16
---

# Week 3a Heuristic Functions and Their Properties

Slides and recording are on Canvas (COMP90054 LMS); the link above is the public
handbook entry, since Canvas is not publicly accessible.

## Overview

The first live lecture of week 3 sets out to make students able to judge a heuristic
function by its properties, and then to judge a search algorithm by the properties of
the heuristic it is given. [[nir-lipovetzky]] frames it historically: A\* was invented
in the 1970s by the same [[shakey-the-robot|Shakey]] researchers, out of problems they
had failed to solve while building the robot, and was used for roughly twenty years
before anyone established when it is optimal or complete. The theory connecting
heuristic properties to algorithm guarantees arrived in the 1980s and 1990s. The
motivating modern application is the DARPA Grand Challenge, where Stanford's car used
A\* for re-planning alongside SLAM for localisation.

Most of the lecture is spent on the four properties. Safe means the heuristic never
lies about dead ends: if $h(s) = \infty$ then $h^*(s) = \infty$. The implication runs
one way only, which the lecture stresses as the point students most often get wrong —
a safe heuristic is not a perfect dead-end detector, it is merely trustworthy when it
does claim one. Goal-aware means every goal state gets value 0. Admissible means the
heuristic is optimistic, never exceeding $h^*$. Consistent is the subtle one: across a
transition, the heuristic may not drop by more than the cost of the action taken. A
poll-and-discuss exercise applies all four to a three-node graph with unit action
costs, where the initial state has $h = 2$ but $h^* = 1$, a self-looping dead-end state
has $h = 1$ but $h^* = \infty$, and the goal has $h = 0$. The class agreed on goal-aware
but split on the rest; the resolution is that the heuristic is only goal-aware — it is
unsafe because it reports a finite value at a genuine dead end, inadmissible because
$2 > 1$ at the initial state, and inconsistent because $h$ drops by 2 across an
action of cost 1.

The lecture also gives the argument for why a perfect heuristic is not the goal. Since
planning is PSPACE-complete and therefore exponential on a deterministic machine,
querying $h^*$ at every state means solving an exponential problem at every state. At
the other extreme, $h = 0$ everywhere carries no information at all and reduces
heuristic search to blind search — the lecture notes the contrast with novelty, which
extracts information from the search's past rather than from an estimate of its future.

Greedy best-first search is then read line by line, with attention to the two lines
where heuristic properties actually enter: the check that discards successors with
$h = \infty$, and the goal test at expansion. Safety is what makes the first line
harmless, so a safe heuristic is enough for completeness. Optimality fails even with
$h^*$: a counterexample with two goal states, one reachable at cost 1 and the other at
cost one million, gives both $h = 0$, so the priority queue cannot order them and
tie-breaking decides which is returned. Since the algorithm returns as soon as it pops
a goal, the expensive goal can be returned first.

A\* is introduced as adding the cost-so-far term, $f = g + h$, and the lecture begins
the optimality proof rather than finishing it. The step given is the known result that
A\* expands every node whose $f$ is at most $g^*$, the optimal solution cost, so
missing an optimal solution requires pushing some state on every optimal path to an
$f$ strictly greater than $g^*$. Which property prevents that is left as the question
to answer on Friday.

## Key concepts

- [[heuristic-function]]
- [[heuristic-properties]]
- [[greedy-best-first-search]]
- [[a-star-search]]
- [[planning-complexity]]

## Key entities

- [[nir-lipovetzky]]
- [[darpa-grand-challenge]]
- [[sebastian-thrun]]
- [[shakey-the-robot]]

## Topics covered (revision checklist)

- History: A\* invented in the 1970s by the Shakey researchers; its properties established only decades later
- DARPA Grand Challenge, SLAM for localisation, A\* for re-planning
- Heuristic function as distance from a state to the nearest goal
- Search performance depends on informedness (how well $h$ approximates $h^*$) and on evaluation cost
- Why $h^*$ is impractical as a heuristic: planning is PSPACE-complete, exponential on deterministic machines
- $h = 0$ everywhere as the blind heuristic; contrast with novelty as past-derived rather than future-derived information
- Safe, goal-aware, admissible, consistent: definitions and the one-directional nature of safety
- Worked three-node exercise applying all four properties, with the class poll and its resolution
- Greedy best-first search read line by line: open list as priority queue on $h$, closed list, successor generation
- Which lines of the pseudocode carry the completeness and optimality arguments
- Safety as sufficient for completeness of greedy best-first search
- The two-goal counterexample showing greedy best-first search is not optimal even with $h^*$
- Tie-breaking as the deciding factor when two goals share a heuristic value
- A\*: $f = g + h$, cost-so-far plus cost-to-go
- The theorem that A\* expands every node with $f \le g^*$, and what missing an optimal solution would require

## Notable claims / results

- Safety is one-directional. A safe heuristic can be trusted when it reports $\infty$, but it is not a complete dead-end detector: it may report a finite value at a state with no solution.
- A safe heuristic is sufficient for greedy best-first search to be complete, because the only place the algorithm discards a branch is the infinite-$h$ test.
- Greedy best-first search is not optimal even given the perfect heuristic $h^*$, because two goal states both receive $h = 0$ and tie-breaking, not cost, decides which is returned.
- A\* expands every node whose $f$-value is at most the optimal solution cost $g^*$; therefore missing an optimal solution requires some state on every optimal path to have $f > g^*$.
- Because planning is PSPACE-complete, evaluating $h^*$ at every state would mean solving an exponential problem per state, which is why heuristics trade informedness against evaluation cost.

## Connections

- Formalises the algorithms introduced in [[w03-prerecorded-heuristic-search]].
- The A\* optimality proof is completed in [[w03b-local-search-and-bfws]], where admissibility turns out to be the required property.
- The blind-heuristic contrast draws on [[novelty]] from [[w02b-width-and-iterative-search]].
- The PSPACE argument comes from [[planning-complexity]], covered in [[w04-prerecorded-planning-complexity]].
