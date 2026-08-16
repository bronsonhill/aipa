---
title: LAPKT
type: entity
entity_type: software
tags: [tools, planners, width, week-03]
date: 2026-08-16
---

# LAPKT

The Lightweight Automated Planning ToolKiT (lapkt.org), a library of planning algorithms
and data structures from [[nir-lipovetzky]]'s research group, and the reference
implementation of the width-based planners covered in the subject.

## Key facts

- Provides the source for IW-ALE and BFWS among other planners; project documentation is at lapkt-dev.github.io/docs/projects/.
- Designed so that a planner is assembled from components — a search algorithm, an evaluation function, a state representation — rather than written from scratch, which is what makes variants such as BFWS($\langle w, h \rangle$) cheap to build.
- Supports planning over external procedures and simulators, not only declarative PDDL input, which is what allows the Atari work to reuse standard planning algorithms.
- Listed in the week 3 resources alongside the width-based planning literature index at nirlipo.github.io/project/width-based-planning/.

## Relevance to AI Planning for Autonomy

LAPKT is where the algorithms taught in weeks 2 and 3 exist as running code:
[[iterative-width-search]], [[best-first-width-search]], and the simulator-driven
variants described in [[planning-with-simulators]]. It is named as one of the four
strands of the lecturer's research (planning technology) and is the practical route for
students who want to work with these algorithms beyond the assignments.

## Sources

- [[w03b-local-search-and-bfws]] — listed in the closing resources for width-based planning
- [[w01a-introduction-to-ai]] — LAPKT named as part of the group's planning-technology research
