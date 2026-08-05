---
title: State-Space Modelling
type: concept
tags: [modelling, state-models, week-01, skills]
date: 2026-08-05
---

# State-Space Modelling

The practice of turning an informally described domain into a classical planning model:
deciding what a state must remember, defining the action and transition functions over
that representation, and justifying the result. Distinct from [[classical-planning]],
which is the formalism this produces instances of.

## How it works

The formalism fixes the shape of the answer, $\langle S, s_0, S_G, A, f, c \rangle$, and
leaves the hard part open. Almost all of the difficulty is in one decision: what a state
records.

Two criteria govern it, pulling in opposite directions.

**Sufficiency.** A state must determine which actions apply and what they produce. If two
situations are represented by the same state but behave differently under the same
action, the representation is missing something. The test is concrete — find two
situations your representation conflates, and ask whether the same action sequence
succeeds from both.

**Minimality.** Anything the dynamics and the goal do not depend on should be left out,
because every distinction you record multiplies the state space. Recording the *order*
cities were visited in rather than the set, for instance, replaces a factor of $2^n$ with
one of $n!$ while answering exactly the same questions.

A useful discipline is to derive the state from the goal rather than from the domain
description. What a state must remember is whatever the goal condition and the action
preconditions read. In TSP the goal refers to which cities have been visited, so the
visited set is in the state; it refers to nothing about arrival order, so order is not.

## Multiple models of one domain

A domain does not have *the* state-space model. It has many correct ones that differ
measurably, and choosing between them is the modelling decision.

The standard demonstration tracks progress two ways: the set of targets already visited,
or the set still outstanding. Both are correct and the two are complements, so on a
domain where all targets must be reached they induce state spaces of identical size. The
differences appear elsewhere. Tracking outstanding targets makes the goal test
$V_{\text{needed}} = \emptyset$ rather than a comparison against the full set, and it
shrinks the state as the plan progresses rather than growing it.

Two quantities are worth computing for any candidate model, and they are independent:

| Quantity | What it measures | Determined by |
|---|---|---|
| State-space size | How many states exist | What the state records |
| Branching factor | How many actions apply per state | The action function |

A model can reduce one without touching the other. Recording less makes the space
smaller but leaves branching unchanged if the action set is unaffected; tightening
preconditions cuts branching while leaving the space the same size. Claiming one model
is better than another requires saying which quantity improved.

## Formula

For a state built from independent components $x_1, \dots, x_k$ with domains $D_i$,

$$
|S| = \prod_{i=1}^{k} |D_i|,
$$

so each added component multiplies rather than adds. A component recording a subset of
an $n$-element set contributes $2^n$; one recording an ordering contributes $n!$; one
recording a position among $m$ contributes $m$.

Declared size and reachable size differ whenever the components are not independent. If
a constraint holds in every reachable state — such as the current position being one of
the visited ones — the declared space overstates the real one, and restricting the
declaration to satisfy the constraint is a legitimate improvement. See
[[tsp-state-space-model]] for a case where this halves the space, verified by
enumeration.

## Why it matters

This is the first assessed skill in the subject and the input to everything after it: a
model is what a planner consumes, so a badly chosen representation cannot be recovered by
a better solver. The size argument is also where [[planning-complexity]] stops being
abstract. Exponential growth is a property of the representation you chose, and while
the exponential is usually irreducible, its base and its constant factors are yours to
argue about.

The assessed standard asks for a justification, not a model. A sufficient one covers
five things: that the model represents the given instance, that it represents any
instance in the domain, that the action and transition functions are correct, an argument
about the size of the state space, and what changes if the goal, the initial state, or
the instance size changes.

## Relationships

- Produces instances of [[classical-planning]]
- Size arguments connect to [[planning-complexity]]
- The same task carried out in a language rather than set notation: [[strips]], [[pddl]], [[lifted-representation]]
- Worked example with verified counts: [[tsp-state-space-model]]
- Checking a model admits only what it should: [[plan-validation]]

## Sources

- [[t01-classical-planning-model]] — the TSP and Grid exercises, the two-model comparison, and the SILO1 standard
- [[w01b-introduction-to-planning]] — the formalism being instantiated, and the blocksworld modelling done live
