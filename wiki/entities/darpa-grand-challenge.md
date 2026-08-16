---
title: DARPA Grand Challenge
type: entity
entity_type: organisation
tags: [robotics, autonomy, history, week-03]
date: 2026-08-16
---

# DARPA Grand Challenge

A series of prize competitions run by the US Defense Advanced Research Projects Agency
from 2004 to build autonomous self-driving vehicles, and one of the competitions
credited in the subject with driving AI research forward.

## Key facts

- Began in 2004–2005. For the first several runnings no team finished the course at all.
- The first completion was by the Stanford team led by [[sebastian-thrun]].
- The later Urban Challenge added city-driving conditions, including obstacles visible only when nearby, requiring continual re-planning.
- The winning system combined SLAM for localisation with [[a-star-search]] for path re-planning, using a straight-line Euclidean distance heuristic and planning in under 10 milliseconds per query.
- The A\* search trees in the recorded footage are not grid trees: each step combines a turning angle with a forward motion, and reversing is a distinct action.

## Relevance to AI Planning for Autonomy

The challenge is the subject's standing example that search algorithms are a core
component of real autonomous systems rather than a classroom exercise. The lecture uses
it twice: as the backdrop for introducing A\*, and as evidence of continuity, since the
algorithm invented in the 1970s from the [[shakey-the-robot|Shakey]] project's unsolved
problems is the one driving the car forty years later. It also motivates a scope
correction — the planner searches an abstract discretisation and high-level manoeuvres,
while the continuous motion model belongs to a separate control layer.

## Sources

- [[w03a-heuristic-functions-properties]] — the challenge as backdrop, and SLAM alongside A\* in the winning system
- [[w03-prerecorded-heuristic-search]] — Thrun's footage of the maze, barrier turnaround, and reverse park
