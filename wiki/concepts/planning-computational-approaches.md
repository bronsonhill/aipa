---
title: Planning Computational Approaches
type: concept
tags: [planning, history, algorithms, week-04]
date: 2026-08-10
---

# Planning Computational Approaches

A survey of how automated planning has attacked the [[planning-complexity|PSPACE-hard]]
problem computationally, from the 1950s founding of AI to the present. Each approach
exploits the structure a declarative planning language exposes, in a different way.

## How it works

A planning language such as [[pddl]]/[[strips]] plays two roles: it specifies a
factorial-size state space concisely, and it exposes the causal structure — which
actions affect which facts — that every approach below reads and exploits. Knowing a
game's rules, rather than only watching it played, is the analogy used for why this
structure matters: it lets a solver build intuition quickly rather than deriving
everything from scratch.

**GPS (General Problem Solver)**, by Newell and Simon — see [[general-problem-solver]]
— combined a STRIPS-style representation with means-ends analysis (an early,
goal-counting form of heuristic) and regression-based problem decomposition. It
dominated the field into the 1980s.

**Partial-order causal-link planning (POCL)** worked backward from the goal, one
subgoal at a time: pick a subgoal, add an action that achieves it, and resolve any
"threats" — conflicts where two actions cannot both be safely ordered relative to a
causal link — until the plan reaches back to the initial state.

Both GPS and POCL are regression-based, reasoning backward from the goal. The 1990s
introduced three approaches that moved the field toward forward, progression-based
search:

- **GraphPlan** builds a layered graph encoding all parallel plans up to a given
  length, then extracts a plan by searching that graph backward from the goal layer —
  a hybrid of forward graph construction and backward extraction.
- **SATPlan** compiles a planning task into a CNF (conjunctive normal form) formula and
  hands it to an off-the-shelf SAT solver; the advantage is direct access to industrial
  SAT solving power, which routinely handles millions of variables.
- **Heuristic search planning** showed, in a 1996 result, that effective heuristics
  can be extracted *automatically* from a problem's declarative description rather than
  hand-coded for each domain. This is identified as the dominant modern approach and
  the reason the subject spends the following weeks on heuristic search specifically.

**Model checking** is named as a further alternative, used in industry for hardware and
software verification (e.g. checking aircraft circuit logic for consistency). It
searches symbolically over binary decision diagrams, where a single search state stands
for a large set of concrete states, rather than expanding states one at a time.

## Why it matters

The shift from regression-based GPS/POCL to progression-based GraphPlan/SATPlan/
heuristic search in the 1990s is presented as the field's second major turning point,
after the 1956 [[dartmouth-workshop]] founding and the 1990s reframing described in
[[models-and-solvers]]. It sets up why the subject's remaining weeks on classical
planning focus on heuristic search: it is not one option among equals but the approach
that currently wins most [[international-planning-competition]] tracks, particularly
satisficing planning.

## Relationships

- Motivated by [[planning-complexity]]
- Heuristic search planning is the approach [[search-and-inference]] and
  [[iterative-width-search]] both build on
- Evaluated empirically via the [[international-planning-competition]]
- SATPlan connects to [[boolean-satisfiability]]

## Sources

- [[w04-prerecorded-planning-complexity]] — the full historical survey: GPS, POCL, GraphPlan, SATPlan, heuristic search planning, model checking, and the two roles of a planning language
