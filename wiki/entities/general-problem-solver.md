---
title: General Problem Solver (GPS)
type: entity
entity_type: model
tags: [planning-history, week-04]
date: 2026-08-10
---

# General Problem Solver (GPS)

The earliest general-purpose planning system, built by Allen Newell and Herbert Simon —
both founders of AI. It combined a STRIPS-style problem representation with
means-ends analysis and regression-based problem decomposition, and dominated planning
research into the 1980s.

## Key facts

- Newell and Simon are also associated with the founding of AI as a field; GPS predates the STRIPS/[[shakey-the-robot]] work by name but shares its representational assumptions.
- Uses means-ends analysis: an early form of goal-counting heuristic, comparing the current state to the goal and selecting actions that reduce the difference.
- Decomposes problems via regression — working backward from the goal — and solves sub-problems separately, similar in spirit to dynamic programming but without a clean decomposition guarantee.
- Superseded from the 1980s by partial-order causal-link planning, then from the 1990s by GraphPlan, SATPlan, and heuristic search planning.

## Relevance to AI Planning for Autonomy

GPS is the historical starting point for the survey of computational approaches the
subject gives before focusing on heuristic search planning, the approach most of the
following weeks build on. It illustrates the regression-based paradigm that the 1990s
approaches moved away from.

## Sources

- [[w04-prerecorded-planning-complexity]] — introduces GPS, means-ends analysis, and its place at the start of the planning-computational-approaches survey
