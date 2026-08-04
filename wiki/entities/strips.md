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

## Relevance to AI Planning for Autonomy

STRIPS is the first language the subject teaches and the semantic core of everything
that follows. Understanding the four-component tuple and the $(s \setminus \mathit{Del})
\cup \mathit{Add}$ update is what makes [[pddl]] readable rather than mysterious, and the
mapping from language to state model is the concrete demonstration of why the
problem/language/model/solver toolchain has a language in it.

## Sources

- [[w01b-introduction-to-planning]] — introduces the tuple, derives the semantics, and models the blocksworld `stack` action live
- [[w01-prerecorded-ai-overview]] — video 4 gives the informal state-variable account of the model STRIPS encodes, without naming the language
