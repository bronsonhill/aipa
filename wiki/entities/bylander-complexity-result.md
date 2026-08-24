---
title: Bylander's Complexity Classification
type: entity
entity_type: paper
tags: [complexity, week-04]
date: 2026-08-24
---

# Bylander's Complexity Classification

A complexity-theory paper, by Tom Bylander, that classifies which syntactic
restrictions of STRIPS planning remain solvable in polynomial time and which become
NP-hard, keyed on the number and polarity of preconditions and postconditions an
action is allowed to have.

## Key facts

- Cited in the week 4 material as the source for the claim that STRIPS planning with
  zero preconditions and at most two positive (add) postconditions per action stays
  polynomial, but becomes NP-complete once actions are allowed three preconditions.
- Listed as a recommended reading for week 4 of COMP90054.

## Relevance

Grounds the claim, made while deriving the [[goal-counting-heuristic]], that even the
maximally simplified relaxed problem (STRIPS with empty preconditions and deletes) is
still NP-hard to solve exactly once actions can add more than two facts — the reason
goal counting has to approximate rather than exactly solve its own relaxed problem.

## Sources

- [[w04-prerecorded-relaxation-heuristics]] — cited for the polynomial/NP-complete boundary on restricted STRIPS
