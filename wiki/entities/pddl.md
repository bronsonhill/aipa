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

## Syntax

### Notation basics

PDDL is written in Lisp-style s-expressions: everything is a parenthesised list whose
first element names the construct. Whitespace and line breaks are insignificant, `;`
starts a comment running to end of line, and keywords begin with a colon (`:action`,
`:init`). Identifiers are case-insensitive and conventionally lowercase, with `-` and
`_` both allowed inside a name — though `-` is also the type-declaration separator, so
`?x - block` and `?x-block` are different things and a missing space around the dash is
a common parse error.

The one distinction to internalise is **variable versus object**. A token starting with
`?` is a variable, bound only within the action schema (or quantifier) that declares it;
a bare token is an object name, declared in the problem file. This is the surface form
of the [[lifted-representation]]: an action schema with variables is a template that a
planner grounds into one action per legal substitution of objects for variables.

### Domain file

```lisp
(define (domain <name>)
  (:requirements ...)      ; language features used
  (:types ...)             ; type names, optionally a hierarchy
  (:constants ...)         ; objects shared by every problem in this domain
  (:predicates ...)        ; the relations a state can record
  (:functions ...)         ; numeric fluents (PDDL 2.1 and later)
  (:action ...) ...)       ; one or more action schemas
```

Sections must appear in this order, and all but the name and at least one action are
optional. Anything the domain uses beyond basic STRIPS has to be declared in
`:requirements`, and a planner that does not support a listed requirement is expected to
refuse the file rather than silently mis-solve it:

| Requirement | Enables |
|---|---|
| `:strips` | conjunctive preconditions, add and delete effects — the base fragment |
| `:typing` | the `- type` declarations on parameters and objects |
| `:negative-preconditions` | `not` inside a precondition |
| `:disjunctive-preconditions` | `or` inside a precondition |
| `:equality` | the built-in `=` predicate for comparing objects |
| `:universal-preconditions`, `:existential-preconditions` | `forall` and `exists` in preconditions |
| `:conditional-effects` | `when` inside an effect |
| `:fluents`, `:durative-actions` | numeric fluents and time (PDDL 2.1) |
| `:adl` | shorthand for the quantified, disjunctive and conditional-effect set together |

**Types.** `(:types block table)` declares two flat type names.
`(:types block - object gripper - object)` declares a hierarchy, where `-` reads as "is
a subtype of"; the implicit root type is `object`. Typing is a compactness device
rather than an expressivity one — the same restrictions can be written as ordinary
predicates in preconditions (`(is-block ?x)`), at the cost of verbosity.

**Predicates.** `(:predicates (on ?x - block ?y - block) (clear ?x - block) (handempty))`
declares the vocabulary of the state. A predicate applied to specific objects — `(on a b)`
— is an *atom* or *fact*, and a state is exactly the set of atoms currently true. A
zero-argument predicate such as `(handempty)` is a plain boolean. Predicate names may not
collide with type or object names.

**Action schemas.** The core construct:

```lisp
(:action stack
  :parameters (?x - block ?y - block)
  :precondition (and (holding ?x) (clear ?y))
  :effect (and (not (holding ?x))
               (not (clear ?y))
               (clear ?x)
               (on ?x ?y)
               (handempty)))
```

`:parameters` declares the variables and their types. `:precondition` is a formula over
those variables that must hold in a state for the action to be applicable there.
`:effect` describes the successor state: a bare atom is an **add effect**, and an atom
wrapped in `not` is a **delete effect**. Everything the effect does not mention is
unchanged, which is PDDL's answer to the frame problem — a schema states only what it
alters. Deletes are applied before adds where an atom appears in both.

Preconditions are conjunctions by default; `and` may be omitted for a single atom.
With the corresponding requirement declared they may also use `or`, `not`, `=`, and the
quantifiers, which take the form `(forall (?b - block) (clear ?b))` and
`(exists (?b - block) (on ?b a))`. Effects are more restricted: `or` is not permitted,
since an effect must determine one successor state, but `forall` is allowed, and `when`
gives a conditional effect, `(when (fragile ?x) (broken ?x))`, whose consequent applies
only in states where the antecedent holds.

A variable appearing in a precondition or effect must be bound — declared in
`:parameters` or by an enclosing quantifier. An unbound `?x` is the other common parse
error, and unlike a misspelled keyword it sometimes survives the parser and produces
nonsense.

### Grounding

A schema is a template, and a planner expands it into ground actions by taking a blind
cross product over the parameter types. With five blocks, `stack` has $5 \times 5 = 25$
ground instances, `(stack a a)` among them. Nothing about the schema rules that one out;
grounding does not consult the state.

Preconditions are what cut the product down, through the STRIPS applicability test
$A(s) = \{o \mid \mathit{Pre}(o) \subseteq s\}$. In a state where the gripper holds `a`
and only `b` is clear, `(holding ?x)` pins `?x` to `a`, `(clear ?y)` pins `?y` to `b`, and
the remaining 24 instances fail the subset check. One action survives, and it survives
because it was filtered rather than because anything computed it.

Two habits follow. A **static predicate** — one no effect ever adds or deletes, listed
once in `:init` — works as a lookup table when it appears in a precondition:
`(gridsquare-connected ?from ?to ?d)` restricts `?to` to real neighbours of `?from`
instead of every square on the map, and `=` plus a hand-written disjunction would be the
alternative. And a variable that appears in the **effect** but is pinned by no
precondition is free for the planner to bind however suits the search, which is a
modelling bug in nearly every case where it occurs.

Typing prunes before the product is built; preconditions prune after. The set of usable
actions is the same either way, the amount of work is not — which is why a schema with
one parameter more than it needs can multiply the grounded action count without
constraining anything. The correspondence with the underlying tuple
$\langle F, O, I, G \rangle$ is tabulated on [[strips]].

### Problem file

```lisp
(define (problem blocks-3)
  (:domain blocksworld)                      ; must match the domain's name exactly
  (:objects a b c - block)
  (:init (on-table a) (on-table b) (on c a)
         (clear b) (clear c) (handempty))
  (:goal (and (on a b) (on b c)))
  (:metric minimize (total-cost)))           ; optional, PDDL 2.1 and later
```

`:objects` names the constants this instance quantifies over, with types when `:typing`
is in force. `:init` is a flat list of ground atoms — no `and`, no variables, no
negation — and it is exhaustive: anything not listed is false, which is the
[[closed-world-assumption]]. Because it is exhaustive, forgetting `(handempty)` does not
produce an error, it produces a different problem in which the gripper is mysteriously
occupied.

`:goal` is a formula rather than a list, so it takes `and` and, with the requirements
declared, the same connectives a precondition may use. It describes a *set* of goal
states, not one state: any state containing `(on a b)` and `(on b c)` satisfies the goal
above, whatever else is true in it. `:metric` selects what an optimal planner minimises,
most often action costs accumulated through `(increase (total-cost) 1)` effects; without
it, plan length is the default measure.

### Output

A planner returns a plan as a sequence of ground actions, one per line, in the form
`(stack a b)` — the schema name applied to the objects substituted for its parameters.
That file is what [[val]] replays against the domain and problem to confirm each action's
precondition held when it was taken and that the goal holds at the end.

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

The syntax reference above expands on the source material with standard PDDL 1.2/2.1
language detail; the running example follows [[blocksworld]] as used in the subject.
