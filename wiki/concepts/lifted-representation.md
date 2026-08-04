---
title: Lifted Representation
type: concept
tags: [pddl, logic, modelling, week-01]
date: 2026-08-04
---

# Lifted Representation

Describing a planning task using variables that range over objects, rather than
enumerating every ground instance. PDDL is lifted; the state model it denotes is
propositional.

## How it works

The distinction is the one between predicate logic and propositional logic. Writing
`on(?x, ?y)` states a *predicate* with variables; substituting constants for those
variables gives a *proposition* or ground fact such as `on(A, B)`. One lifted statement
concisely stands for every combination of substitutions, including ones that are
uninteresting or unreachable — `on(A, A)` is generated too, because the notation excludes
nothing.

The same applies to actions. An action schema `stack(?x, ?y)` is parameterised by
objects, and grounding it against a set of constants produces one concrete action per
substitution. A domain file therefore describes an unbounded family of tasks with a
fixed, small number of schemas, and it is the problem file's `:objects` that determines
how many ground actions actually exist.

Typing refines this. Declaring `(:types block hoist)` and writing `?x - block` restricts
substitution to constants of that type, so a domain with four blocks and four hoists does
not generate the nonsensical instantiations that untyped variables would. Like negative
preconditions and quantifiers, typing adds no expressivity — it makes the representation
more compact and the modelling less error-prone without enlarging the class of problems
that can be expressed.

Because the state model underneath is propositional, this is where the compactness of a
planning language comes from: a linear number of predicates and schemas denotes a state
space of size $2^{|F|}$.

## Formula

Given a set of predicates $P$, each with arity $n_p$, and a set of objects $O$, the
ground fact set is

$$
F = \{\, p(c_1, \dots, c_{n_p}) \mid p \in P,\ c_i \in O \,\},
\qquad
|F| = \sum_{p \in P} |O|^{n_p}.
$$

Similarly an action schema with $k$ parameters grounds into $|O|^k$ actions, or fewer
under typing. The resulting state space is $S = 2^{F}$.

## Why it matters

Naming matters more than it looks. Predicates read as `on`, `clear` and `holding` let a
modeller reason about whether a precondition list is right; the same domain with random
symbols is essentially unmodellable even though it denotes the identical state model.
The lifted level is where humans work, and the propositional level is where solvers
work, so the grounding step is also where the size of a problem is decided.

## Relationships

- The representation used by [[pddl]]; the propositional semantics are those of [[strips]]
- Grounding determines the state space referred to in [[classical-planning]]
- Interacts with [[closed-world-assumption]], which applies after grounding

## Sources

- [[w01b-introduction-to-planning]] — develops predicate versus propositional logic, action schemas, typing, and the human-readability point
