---
title: STRIPS
type: entity
entity_type: model
tags: [languages, planning, week-01]
date: 2026-08-04
---

# STRIPS

The Stanford Research Institute Problem Solver, built in 1970 for [[shakey-the-robot]].
The name now refers almost exclusively to its *language* — the representation of
planning problems as facts and add/delete/precondition operators — which survives as the
base fragment of [[pddl]].

## Key facts

- Originated as the planning system aboard Shakey at Stanford Research Institute, around 1970.
- The algorithm did not survive; the language did. This inversion of expectations is the framing question of [[w01b-introduction-to-planning]].
- A STRIPS problem is a tuple $P = \langle F, O, I, G \rangle$: facts (Boolean atoms), operators, initial situation $I \subseteq F$, goal situation $G \subseteq F$.
- Each operator $o \in O$ is represented by three lists: $\mathit{Pre}(o)$, $\mathit{Add}(o)$, $\mathit{Del}(o)$.
- Expressivity is exactly that of the classical state model. Later PDDL features — typing, negative preconditions, quantifiers — make descriptions more compact without expressing anything new.

## Formula

A STRIPS problem $P = \langle F, O, I, G\rangle$ determines the state model $S(P)$:

$$
\begin{aligned}
S &= 2^{F} &&\text{states are sets of atoms} \\
s_0 &= I \\
S_G &= \{ s \in S \mid G \subseteq s \} \\
A(s) &= \{ o \in O \mid \mathit{Pre}(o) \subseteq s \} \\
f(o, s) &= \big(s \setminus \mathit{Del}(o)\big) \cup \mathit{Add}(o) \\
c(o, s) &= 1
\end{aligned}
$$

The transition function is the whole of the semantics: applying an operator removes its
delete list and adds its add list. With $|F|$ facts the state space is $2^{|F|}$, so a
description linear in the number of facts denotes an exponentially larger model — which
is the point of having a language at all.

### Worked example

The [[blocksworld]] `stack(x, y)` operator, modelled from scratch in the lecture:

| List | Contents |
|---|---|
| $\mathit{Pre}$ | $\{\mathrm{holding}(x),\ \mathrm{clear}(y)\}$ |
| $\mathit{Add}$ | $\{\mathrm{on}(x,y),\ \mathrm{armEmpty}(),\ \mathrm{clear}(x)\}$ |
| $\mathit{Del}$ | $\{\mathrm{holding}(x),\ \mathrm{clear}(y)\}$ |

Note that $\mathit{Pre}$ and $\mathit{Del}$ coincide here. That is the usual case in
PDDL modelling and a useful mental check, though there are exceptions and it is a
heuristic rather than a rule.

## Mapping to PDDL

The tuple is propositional: $F$ is a flat set of atoms and $O$ a flat set of operators,
one per legal argument tuple, so five blocks means twenty-five `stack` operators written
out by hand. [[pddl]] never asks for that. The conversion goes through a lifted
intermediate — schemas plus objects — and the planner expands it back during grounding.

| STRIPS | PDDL construct | File |
|---|---|---|
| $F$ | `(:predicates ...)` **and** `(:objects ...)` | domain + problem |
| $O$ | `(:action ...)` schemas | domain |
| $\mathit{Pre}(o)$ | `:precondition` | domain |
| $\mathit{Add}(o)$ | bare atoms inside `:effect` | domain |
| $\mathit{Del}(o)$ | atoms wrapped in `not` inside `:effect` | domain |
| $I$ | `(:init ...)` | problem |
| $G$ | `(:goal ...)` | problem |

$F$ is the row that carries the idea. It has no single counterpart, because PDDL factors
it: predicates supply the relation names and arities, objects supply the things, and $F$
is the cross product the planner builds. `(on ?x - block ?y - block)` over objects
`a b c` yields nine atoms and $2^9$ states without anyone typing either number. That
factoring is the [[lifted-representation]].

Two smaller differences. The add and delete lists are separate in the tuple and merged
into one `:effect` conjunction in PDDL, with `not` marking the deletes — the semantics is
still $(s \setminus \mathit{Del}) \cup \mathit{Add}$, which is why deletes apply before
adds when an atom appears in both. And $I \subseteq F$ makes the [[closed-world-assumption]]
invisible, a consequence of $I$ being a set; in a problem file the same assumption means
an omitted atom produces a different problem rather than an error.

`:types` and `:requirements` have no counterpart at all. Types abbreviate preconditions
that could be written as ordinary predicates, requirements let a planner refuse a file it
cannot handle, and neither adds expressivity.

The worked `stack` table above converts with nothing left over (the lecture writes the
gripper fact as $\mathrm{armEmpty}()$, the blocksworld domain on [[pddl]] as `handempty`;
same atom):

```lisp
(:action stack
  :parameters (?x - block ?y - block)
  :precondition (and (holding ?x) (clear ?y))          ; Pre
  :effect (and (not (holding ?x)) (not (clear ?y))     ; Del
               (on ?x ?y) (handempty) (clear ?x)))     ; Add
```

## Relevance to AI Planning for Autonomy

STRIPS is the first language the subject teaches and the semantic core of everything
that follows. Understanding the four-component tuple and the $(s \setminus \mathit{Del})
\cup \mathit{Add}$ update is what makes [[pddl]] readable rather than mysterious, and the
mapping from language to state model is the concrete demonstration of why the
problem/language/model/solver toolchain has a language in it.

## Relationships

- Key to the tuple and set-builder notation in the formula above: [[reading-the-notation]]

## Sources

- [[w01b-introduction-to-planning]] — introduces the tuple, derives the semantics, and models the blocksworld `stack` action live
- [[w01-prerecorded-ai-overview]] — video 4 gives the informal state-variable account of the model STRIPS encodes, without naming the language
