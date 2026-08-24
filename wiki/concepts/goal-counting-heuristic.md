---
title: Goal-Counting Heuristic
type: concept
tags: [heuristics, week-04, relaxation]
date: 2026-08-24
---

# Goal-Counting Heuristic

A heuristic that counts the number of top-level goal propositions not currently true in
a state. It is the direct product of the simplest [[relaxation]] applied to STRIPS
planning: drop every action's preconditions and delete effects.

## How it works

Dropping preconditions and deletes from every action in a STRIPS task $\Pi$ turns
planning into a problem where any action can be applied at any time and only ever adds
facts, never removes them. That simplified problem $\mathcal{P}'$ (STRIPS with empty
preconditions and deletes) is a **native** relaxation of full STRIPS planning — it is
still itself a STRIPS task — and the transformation is trivially polynomial, so goal
counting is efficiently constructible. But solving $\mathcal{P}'$ optimally is still
NP-hard once an action can add more than two facts, by reduction from minimum set
cover: finding the minimum number of actions whose add lists together cover all the
goal facts is exactly minimum cover. So goal counting does not compute the relaxed
problem's true optimal cost; it approximates it, by simply counting how many goal
propositions remain false in the current state, with no reference to which actions
would be needed to make them true or how many steps that would take.

## Why it matters

Goal counting is the simplest possible worked example of the relaxation methodology,
and it doubles as a demonstration of the limits of relaxation done crudely. Its range
is bounded by the number of top-level goal facts $|G|$, and any planning task can in
principle be re-encoded so that it evaluates to exactly 1 on every non-goal state
without changing the underlying problem — meaning it can carry arbitrarily little
information about the true remaining cost. It ignores actions entirely: the value
depends only on which goal propositions are currently false, never on what it costs to
fix them. [[delete-relaxation]] is introduced immediately afterward as a heuristic
family that keeps far more of the problem's structure while remaining tractable to
approximate.

## Relationships

- An instance of [[relaxation]] applied to STRIPS with the transformation "drop
  preconditions and deletes"
- Superseded in informativeness by [[delete-relaxation]] and its derived heuristics
  ($h^\text{add}$, $h^\text{max}$, $h^\text{FF}$)
- Judged, like any [[heuristic-function]], against [[heuristic-properties]]

## Sources

- [[w04-prerecorded-relaxation-heuristics]] — the Australian-map worked example, the NP-hardness result, and the approximation
- [[w04a-generating-heuristic-functions]] — formal native/constructible/computable classification and the critique of goal counting's weak informativeness
