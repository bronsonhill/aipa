---
title: International Planning Competition (IPC)
type: entity
entity_type: organisation
tags: [benchmarks, methodology, week-01]
date: 2026-08-04
---

# International Planning Competition (IPC)

A recurring competition in which planners are run on benchmark problems devised by the
organisers, with awards to the most effective. It is the mechanism by which automated
planning made its evaluation empirical.

## Key facts

- Held in 1998, 2000, 2002, 2004, 2006, 2008, 2011, 2014, 2018, 2019.
- [[pddl]] was created for the first competition in 1998 and has been extended alongside it since — PDDL 2.1 in 2003 added numeric fluents and durative actions.
- Separate tracks for satisficing and optimal planning, reflecting that the two problems need different techniques. See [[satisficing-and-optimal-planning]].
- Benchmarks are devised fresh by the organisers so that solvers cannot be tuned to problems they have already seen. This is what makes the competition a test of generality rather than of fitting.

## Selected winners

| Year | Satisficing | Optimal |
|---|---|---|
| 2000 | FF, heuristic search | |
| 2002 | LPG, heuristic search | |
| 2004 | SGPlan, heuristic search | SATPLAN, compilation to SAT |
| 2006 | SGPlan, heuristic search | SATPLAN, compilation to SAT |
| 2008 | LAMA, heuristic search | Gamer, symbolic search |

The pattern is worth noting: satisficing tracks are dominated by heuristic search with
inadmissible heuristics, while optimal tracks have gone to quite different technologies.

## The caveat

If planners $x$ and $y$ both compete and $x$ wins, is $x$ better than $y$? Only on those
benchmarks, and only by that year's scoring criteria. On other domains or under other
criteria the ordering may reverse. A competition result is evidence, not a ranking of
planners in general.

## Relevance to AI Planning for Autonomy

The IPC is the concrete answer to the methodological failure described in
[[theories-as-programs]]. A theory expressed as a program could always blame failure on
missing knowledge; a planner entered into a competition on unseen benchmarks makes a
claim that can fail publicly. Standardising the language was the precondition — before
1998 every group had its own language and solver and nothing could be compared with
anything.

## Sources

- [[w01b-introduction-to-planning]] — competition history, winners by track, and the disclaimer on interpreting results
- [[w01-prerecorded-ai-overview]] — video 3 explains benchmarks and competitions as the field's empirical methodology
