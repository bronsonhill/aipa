---
title: Shakey the Robot
type: entity
entity_type: model
tags: [history, robotics, week-01]
date: 2026-08-04
---

# Shakey the Robot

The first mobile robot able to reason about its own actions, built at Stanford Research
Institute around 1970. Its planner gave [[strips]] its name.

## Key facts

- Developed at Stanford Research Institute (SRI), with the widely circulated demonstration film dating from 1970.
- Combined perception (a TV camera feeding vision programs that enhanced edges and segmented scenes), navigation, and symbolic planning in one system.
- Effectively invented several research areas at once. Most of the fields an autonomous system draws on today have some line back to it.
- The planning component was STRIPS, which contributed an algorithm, a planner, and a language.
- What survived was the language. The algorithm is of historical interest; the fact/operator/add/delete representation is still in use as the `:strips` fragment of [[pddl]].

## Relevance to AI Planning for Autonomy

Shakey opens the week 1b lecture, and the question posed over the film — of the
algorithm, the planner, and the language, which one lasted? — sets up the lecture's
whole argument. The intuitive guess is the algorithm, since that is where the cleverness
appears to be. The answer being the language is what motivates the claim that
notation determines what can be represented and what can be computed, which is then
demonstrated with Roman numeral multiplication.

## Sources

- [[w01b-introduction-to-planning]] — the opening film and the survival question
