---
title: Planning with Simulators
type: concept
tags: [modelling, width, simulators, week-03]
date: 2026-08-16
---

# Planning with Simulators

Running a planner over a black-box transition function — a simulator or an external
procedure — instead of a fully declarative encoding such as PDDL. It rests on the
observation that a problem can fit the classical planning model perfectly while being
impractical to express in a planning language.

## How it works

The status quo in classical planning is that the model is represented compactly in
[[strips]] or [[pddl]], and the planner reads that description. The gap is that
**the model is not the language**. Pacman is deterministic and fully observable, with a
known initial state and a finite discrete state space, so it fits the classical planning
model exactly; encoding the ghosts' behaviour in PDDL is another matter. Tetris and
Pong are the same story.

The alternative is a hybrid encoding. Some aspects stay declarative, while any element
of the problem can be attached to an external procedure written in ordinary code, C++
for instance, and action effects can be supplied as a fully black-box procedure taking
a state and returning its successor. Expressive language features that a declarative
encoding struggles with — functions, conditional effects, derived predicates, state
constraints, quantification — come along for free, because they are just code. This is
especially useful when the dynamics are non-linear, as in a UAV.

What a planner loses is any ability to inspect the model, which is exactly what most
heuristics need in order to be derived automatically. Width-based methods survive the
loss because [[novelty]] is computed from the state itself rather than from the problem
description, which is why [[iterative-width-search]] applies to a simulator almost off
the shelf.

### Atari as the worked case

The [[arcade-learning-environment]] is deterministic with a fully known initial state,
so classical planners ought to apply, but there is no PDDL encoding and there are
rewards rather than goals. Bellemare et al. had used breadth-first search and MCTS/UCT
for it. IW(1) needed only a choice of factored representation, and the most naive one
available was used: the 128 bytes of Atari RAM as 128 variables of 256 values each,
giving up to $128 \times 256 \times 18 = 589{,}824$ states in a lookahead, with children
generated in random order and a discount factor of $\gamma = 0.995$. The action
beginning the most rewarding IW(1) path is executed, and the search is re-run at the
next decision point.

The lookahead figures are the striking part: under the same 150,000-simulated-frame
budget, breadth-first search sees 0.3 seconds ahead where IW(1) sees 6 to 22 seconds.

## Why it matters

Simulators are how most real systems are already described — flight dynamics,
ecological models, game engines — and a planner that requires a complete declarative
model cannot touch them. Treating the simulator as the model rather than as an obstacle
extends the reach of planning technology to social science, computational
sustainability, and any other field built on simulation, and is one of the open research
directions the subject's lecturer names.

## Relationships

- Applies [[iterative-width-search]] and [[novelty]], which need only the state representation
- A refinement of the model/language distinction in [[models-and-solvers]] and [[classical-planning]]
- Contrasts with the declarative encodings [[pddl]] and [[strips]]
- Demonstrated on [[arcade-learning-environment]]; tooling in [[lapkt]]

## Sources

- [[w03b-local-search-and-bfws]] — the model-versus-language argument, the Atari setup, and the lookahead-depth results
