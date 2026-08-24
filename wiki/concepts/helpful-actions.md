---
title: Helpful Actions
type: concept
tags: [heuristics, week-04, delete-relaxation]
date: 2026-08-24
---

# Helpful Actions

The subset of actions applicable in the current search state that also appear in the
relaxed plan extracted while computing the [[relaxed-plan-heuristic]] $h^\text{FF}$.

## How it works

Relaxed plan extraction produces, as a side effect, a concrete set of actions believed
relevant to reaching the goal from the current state. Intersecting that set with the
actions actually applicable right now (rather than applicable only in the relaxed
world) gives the helpful actions — a filtered, typically much smaller successor set
than the full applicable-action set.

## Why it matters

Restricting search to only helpful actions cuts branching factor dramatically, but
loses completeness: a plan that genuinely requires an action outside the current
relaxed plan may never be found. FF, which introduced the notion, restricts enforced
hill-climbing to expand only helpful actions, accepting the completeness loss in
exchange for speed. Other planners take a softer approach, treating helpful actions as
**preferred operators**: nodes reached via a helpful action are expanded first, but the
full action set remains available, preserving completeness while still biasing search
toward what the relaxed plan suggests.

## Relationships

- A byproduct of [[relaxed-plan-heuristic]] extraction
- Used to restrict [[enforced-hill-climbing]] in the FF planner
- Used as a preferred-operator signal (not a restriction) in other planners such as
  LAMA

## Sources

- [[w04b-delete-relaxation-heuristics]] — definition, FF's restriction of enforced hill-climbing, the preferred-operators alternative
