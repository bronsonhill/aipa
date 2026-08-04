---
title: PDDL
type: entity
entity_type: software
tags: [languages, planning, tooling, week-01]
date: 2026-08-04
---

# PDDL

The Planning Domain Definition Language, introduced in 1998 as the standard input
language for the [[international-planning-competition]] and still the lingua franca of
automated planning. Its `:strips` fragment is [[strips]].

## Key facts

- Created in 1998 to make planners comparable. Before it, research groups each had their own language and solver, and nothing could be evaluated against anything else.
- **1998** PDDL 1.0. **2003** PDDL 2.1 adds numeric fluents and durative actions. **2006 onward** functional, multi-agent, epistemic, and dynamical-system extensions.
- Still in active use in robotics, logistics, and game AI, and still being extended.
- A task is split across two files. The **domain** holds `:requirements`, `:types`, `:predicates`, and `:action` schemas. The **problem** holds `:domain`, `:objects`, `:init`, and `:goal`.
- The split reflects that actions and predicates are shared across a whole family of tasks: one domain file serves an unbounded number of problem files. Every blocksworld instance has the same four actions and the same five predicates, and differs only in objects, initial state, and goal.
- Representation is lifted, not propositional — see [[lifted-representation]].
- Anything absent from `:init` is false, and this applies to the initial state only — see [[closed-world-assumption]].
- Negative preconditions, existential and universal quantifiers, and typing make descriptions more compact but add no expressivity.

## Anatomy

A minimal domain:

```lisp
(define (domain hello-neighbours)
  (:requirements :strips :typing :negative-preconditions)
  (:types neighbour)
  (:predicates (said_hello_to ?n - neighbour))
  (:action hello
    :parameters (?n - neighbour)
    :precondition (not (said_hello_to ?n))
    :effect (said_hello_to ?n)))
```

and its problem:

```lisp
(define (problem greet-the-room)
  (:domain hello-neighbours)
  (:objects alice bob carol - neighbour)
  (:init)                                  ; nothing said yet; unlisted = false
  (:goal (and (said_hello_to alice)
              (said_hello_to bob)
              (said_hello_to carol))))
```

## Lifecycle

```
domain.pddl  ┐
             ├─→ Planner ─→ plan ─→ VAL ─→ valid / error
problem.pddl ┘
```

The subject's environments are [[editor-planning-domains]] in the browser and VS Code
with the PDDL extension; both call the same `solve.planning.domains` API, and sessions
sync between them. Planners can also be installed locally through `planutils`.

The validation step is not optional in practice. A parser catches syntax errors — a
misspelled `:precondtion` is reported with a line number by the FF parser used by BFWS,
more verbosely by the FD parser used by LAMA — but semantic errors produce plans that
are valid against the model and wrong about the world. See [[plan-validation]].

## Relevance to AI Planning for Autonomy

PDDL is the language students model in for the tutorials and the first assignment. Its
importance beyond this subject is the standardisation argument: a shared language is
what turned planning from a collection of incomparable systems into a field with
benchmarks, competitions, and measurable progress.

## Sources

- [[w01b-introduction-to-planning]] — history, domain and problem anatomy, closed-world assumption, toolchain, parsers, and debugging
- [[w01a-introduction-to-ai]] — flags PDDL modelling as assessed work in the first assignment
