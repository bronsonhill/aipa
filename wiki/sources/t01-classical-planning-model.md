---
title: Tutorial 1 Classical Planning Model
type: source
source_type: tutorial
link: https://handbook.unimelb.edu.au/subjects/comp90054
tags: [week-01, tutorial, state-models, modelling, tsp]
date: 2026-08-05
---

# Tutorial 1 Classical Planning Model

Hosted on Ed; the link above is the public handbook entry, since Ed is not publicly
accessible.

## Overview

The first tutorial moves from recognising the classical planning model to producing one.
Its pre-class instructions ask students to watch the pre-recorded videos, take an
introductory quiz, and attempt a Travelling Salesman Problem modelling exercise before
arriving, so that class time goes on discussing the modelling rather than deriving it.

The material has three parts. A six-question quiz checks the assumptions of
[[classical-planning]] — which components a classical model represents, that actions are
deterministic, that the state is fully known, that the environment is static except for
the agent's own actions, that solutions are fixed action sequences rather than policies,
and what makes the approach model-based rather than reactive or learned. Every question
maps onto a distinction drawn in [[w01a-introduction-to-ai]] and
[[w01b-introduction-to-planning]].

The TSP exercise then asks for a full state-space model of the Travelling Salesman
Problem given cities $V$, a start city $v_{\text{start}}$, and edges $E$: state space,
initial state, goal states, applicable-action function, transition function, and action
costs, all in compact mathematical notation. A suggested solution is provided, followed
by a quiz probing whether the model is understood rather than copied — how many goal
states exist for four cities, how that count changes if the salesman need not return
home, how many states in the declared state space are actually reachable, and how the
state space should be restricted so that only reachable states are generated.

The Grid problem closes the tutorial and is the more demanding part. On an $m \times m$
Manhattan grid with walls $W$ and a set of coordinates $V$ to visit, students model the
domain twice: once tracking the coordinates already visited, once tracking those still
outstanding. The two models are then compared on branching factor and state-space size,
with the question of whether each is the same and why. No solutions are supplied for
this section — it is the part designed to be worked out in discussion.

The final page is the most useful thing in the document for self-assessment. It states
the learning standard for SILO1 verbatim and lists what a sufficient demonstration
contains, which makes it a rubric for the modelling component of Assignment 1 rather
than just an exercise instruction.

## Key concepts

- [[classical-planning]]
- [[state-space-modelling]]
- [[planning-complexity]]
- [[search-and-inference]]

## Key entities

- [[blocksworld]] — the lecture's modelling example; TSP plays the same role here for state-space notation

## Topics covered (revision checklist)

- The six standard assumptions checked by the quiz: explicit components, deterministic effects, full observability, a static environment, action-sequence solutions, model-based reasoning
- Modelling TSP as a state-space tuple $\langle S, s_0, S_G, A, f, c \rangle$
- Choosing what a state must remember: current city plus the set of visited cities
- Why the visited set belongs in the state at all
- Goal states when the salesman must return home, and when they need not
- Counting states in a declared state space versus counting reachable ones
- Restricting a state space so that only valid states are generated
- Modelling the same grid domain two ways, by visited set and by outstanding set
- Comparing branching factor and state-space size between two models of one domain
- Generalisability of a model under changed initial states, changed goals, and larger instances
- The SILO1 standard for state-space modelling, and the five things a sufficient justification demonstrates

## Notable claims / results

- A state must carry enough information to determine which actions apply and what they do. For TSP, current position alone is insufficient because the goal depends on history, so the visited set is part of the state rather than derived from it.
- The state space as declared and the set of reachable states differ. Restricting the declaration to reachable states halves it for TSP; see [[tsp-state-space-model]] for the verified counts.
- The same domain admits multiple correct models with different sizes and branching factors. Choosing between them is a modelling decision with measurable consequences, which is what the Grid problem's two models are constructed to demonstrate.
- The assessed standard is not a correct model but a justified one. A sufficient demonstration covers correctness on the given instance, correctness on any instance in the domain, correct action and transition functions, an argument about state-space size, and generalisability under change.

## Connections

- Applies the model formalised in [[w01b-introduction-to-planning]] and assumed by later weeks
- Pre-class videos are [[w01-prerecorded-ai-overview]]
- Worked solution, verification, and the Grid comparison: [[tsp-state-space-model]]
- The lecture's own modelling exercise, in a language rather than in set notation: [[blocksworld]] and [[strips]]
