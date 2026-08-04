---
title: Closed-World Assumption
type: concept
tags: [pddl, logic, modelling, week-01]
date: 2026-08-04
---

# Closed-World Assumption

In PDDL, any fact not listed in the initial state is taken to be false. There is no
"unknown" — the world is fully described by what `:init` says is true.

## How it works

A planning problem may involve thousands of ground facts, and in any realistic initial
state the overwhelming majority of them are false. Listing them would be both tedious
and enormous, so the convention is inverted: state only what is true, and let everything
unstated default to false. If `(on A B)` does not appear in `:init`, the planner
concludes that A is not on B.

Two qualifications matter for modelling.

The assumption applies to the initial state only. The goal is a *condition* to be
satisfied, not a description of a state, so facts omitted from `:goal` are unconstrained
rather than required to be false. A goal of `{on(E,C), on(C,A), on(B,C)}` in
[[blocksworld]] is satisfied by any state containing those three facts, whatever else is
also true — which is why a goal picture in the slides shows only *one* of the possible
goal states.

Actions can only produce facts listed in their effects. Nothing becomes true
incidentally, which is the flip side of the same convention and the reason an incomplete
delete list is such a common modelling bug.

## Formula

For an initial state specification $\mathit{Init} \subseteq F$ over the set of ground
facts $F$, the assumption fixes the state

$$
s_0 = \mathit{Init}, \qquad \text{so } f \notin \mathit{Init} \implies f \text{ is false in } s_0 .
$$

For the goal, in contrast, $G \subseteq F$ specifies only a required subset, and the
goal states are

$$
S_G = \{\, s \in S \mid G \subseteq s \,\}.
$$

## Why it matters

The assumption is what makes PDDL problem files short, and it is a frequent source of
confusion in the other direction: a model that behaves oddly often does so because a
fact the modeller assumed was true was simply never written down, and defaulted to false
without any error being reported. It also explains why negation is a convenience rather
than an extension of expressivity — negative preconditions can be checked because every
fact has a definite truth value.

## Relationships

- A property of [[pddl]]; the underlying semantics come from [[strips]]
- Interacts with [[lifted-representation]], since the closed world applies to ground facts after instantiation
- Silent failures under this assumption are a target of [[plan-validation]]

## Sources

- [[w01b-introduction-to-planning]] — states the assumption, stresses that it applies to `:init` only, and gives the blocksworld goal-state example
