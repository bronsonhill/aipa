---
title: Week 4a Generating Heuristic Functions
type: source
source_type: lecture
link: https://handbook.unimelb.edu.au/subjects/comp90054
tags: [week-04, heuristics, relaxation, goal-counting]
date: 2026-08-24
---

# Week 4a Generating Heuristic Functions

Slides and recording are on Canvas (COMP90054 LMS); the link above is the public
subject handbook entry. Live lecture by [[nir-lipovetzky]], subtitled "How to Relax:
Formally, and Informally,
and During Search." Formalises the relaxation methodology previewed in the week 4
pre-recorded videos and closes the loop on how a relaxation-derived heuristic actually
gets used inside a search algorithm.

## Overview

The lecture states relaxation's payoff up front: a planner given an arbitrary PDDL
input can derive a heuristic automatically, without a human designing one for the
domain, which is what preserves the generality and rapid-prototyping selling points laid
out in the first two lectures of the subject. It re-runs the two motivating examples —
straight-line distance as a relaxation of route-finding, and goal counting as a
relaxation of STRIPS planning — this time formally.

A relaxation is defined as a triple $\mathcal{R} = (\mathcal{P}', r, h'^*)$: a
transformation $r$ mapping instances of the original problem family $\mathcal{P}$ into
a simplified family $\mathcal{P}'$, together with a perfect heuristic $h'^*$ for
$\mathcal{P}'$, such that $h^{\mathcal{R}}(\Pi) := h'^*(r(\Pi))$ always underestimates
$h^*(\Pi)$. Three properties classify a relaxation: **native** if $\mathcal{P}' \subseteq
\mathcal{P}$ and the two problems share the same heuristic-computation method (not
necessarily the same values); **efficiently constructible** if $r$ runs in polynomial
time; **efficiently computable** if $h'^*$ runs in polynomial time on the simplified
problem. None of the three is a strict requirement for a relaxation to be useful — the
lecture is explicit that this taxonomy exists to name distinctions, not to gatekeep
which relaxations are admissible.

Working through the goal-counting relaxation against this taxonomy: it is native (a
STRIPS task with empty preconditions and deletes is still a STRIPS task), efficiently
constructible (dropping preconditions and deletes is immediate), but not efficiently
computable — the simplified problem's own optimal plan cost is still NP-hard to compute
in general (reducible to minimum set cover once actions can add more than two facts).
The recovery strategy, offered as a template for any relaxation that fails
computability, is one of: approximate the simplified problem's heuristic, redesign the
heuristic so it is typically feasible in practice even without a guarantee, or accept
the cost and hope for the best. Goal counting takes the first option — it approximates
the relaxed problem's true (hard) optimal cost by simply counting unmet goal
propositions, discarding all information about which actions or how many steps are
actually needed.

A short "how to relax during search" section places the relaxation inside the
heuristic-search loop: for a search state $s$, the task $\Pi_s$ is $\Pi$ with its
initial state replaced by $s$, and the heuristic value used during search is
$h^{\mathcal{R}}(s) = h'^*(r(\Pi_s))$ — the relaxation runs once per state, purely to
produce a number, and otherwise plays no role in the search itself. The lecture flags
this as a common point of confusion, particularly for native relaxations like ignoring
deletes, where it can look like the relaxed dynamics are somehow governing the real
search.

The lecture closes on an evaluation of goal counting as a heuristic: uninformative,
since its range is bounded by $|G|$ and any planning task can be re-encoded so that
$h(s) = 1$ for every non-goal state without changing the underlying problem, and it
ignores actions entirely — the value depends only on which goal propositions are
currently false, never on how the state was reached or what it costs to fix. The
delete relaxation, covered "much better" in the next lecture, is flagged as the fix.

## Key concepts

- [[relaxation]]
- [[goal-counting-heuristic]]
- [[heuristic-properties]]

## Key entities

- [[bylander-complexity-result]]

## Topics covered (revision checklist)

- Motivation: automatic heuristic derivation preserves generality/autonomy/rapid-prototyping (callback to lectures 1-2)
- Formal definition of a relaxation as a triple $(\mathcal{P}', r, h'^*)$ with the admissibility requirement $h^{\mathcal{R}} \le h^*$
- Native, efficiently constructible, efficiently computable — definitions and worked examples
- Straight-line-distance relaxation of route-finding: not native, efficiently constructible, efficiently computable
- Goal-counting relaxation of STRIPS: native, efficiently constructible, NOT efficiently computable (NP-hard past two add effects)
- Recovery options when a relaxation fails constructibility or computability: approximate, redesign for typical feasibility, or accept and hope
- $\Pi_s$ notation: a planning task with its initial state replaced by search state $s$
- How relaxation plugs into heuristic search: computed once per state, used only as the $h$-value
- Goal counting's weaknesses as a heuristic: small value range, re-encodability to a trivial $h=1$ heuristic, and ignoring action structure entirely

## Notable claims / results

- Every relaxation used during search only ever produces a number for $h^{\mathcal{R}}(s)$; it does not otherwise alter the search algorithm — a point the lecture calls out as easy to misread for native relaxations.
- Goal counting is native and efficiently constructible but not efficiently computable in the strict sense, because its underlying simplified problem (STRIPS with empty preconditions/deletes) is itself NP-hard to solve optimally for actions with more than two add effects.
- Any STRIPS planning task can in principle be transformed into an equivalent one where the goal-counting heuristic evaluates to exactly 1 on every non-goal state, illustrating how little structure goal counting actually preserves.

## Connections

- Digested in full alongside the pre-recorded videos and L5 in [[w04-relaxation-and-delete-relaxation-digest]].
- Formalises the informal relaxation examples from [[w04-prerecorded-relaxation-heuristics]].
- Extends [[heuristic-function]] with a concrete, general construction method rather than a hand-designed heuristic.
- Sets up [[w04b-delete-relaxation-heuristics]], which the lecture explicitly promises will produce "much better" heuristic functions than goal counting.
- The NP-hardness argument parallels the blocksworld plan-length hardness result in [[w04-prerecorded-planning-complexity]].
