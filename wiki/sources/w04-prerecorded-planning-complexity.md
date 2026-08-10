---
title: Week 4 Pre-recorded Videos on Complexity and Computational Approaches
type: source
source_type: video
link: https://www.youtube.com/watch?v=zINXvvvhOOY
tags: [week-04, complexity, computational-approaches, planning-history]
date: 2026-08-10
---

# Week 4 Pre-recorded Videos on Complexity and Computational Approaches

Released ahead of week 4 but watched here alongside the week 2 material for their
grounding in the complexity theory that motivates width-based search.

## Overview

Two videos by [[nir-lipovetzky]]. The first works through the computational-complexity
argument for why planning is hard; the second surveys the computational approaches the
field has used to attack that hardness, from the 1950s to the present.

The complexity video frames both **satisficing planning** and **optimal planning** as
decision problems so they admit a yes/no answer, in the Turing-machine sense: plan
*existence* (does any plan exist for this task?) and plan *length* (does a plan of
length at most $B$ exist, for a given bound $B$?). After a short primer on Turing
machines and the complexity classes P, NP, and PSPACE (P and NP run in polynomial time
on deterministic and non-deterministic machines respectively; PSPACE runs in polynomial
*space* on a deterministic machine, and NP is generally believed to be a subset of it),
both plan existence and plan length are stated to be PSPACE-complete — hardest among
PSPACE problems, and strictly harder than the NP-complete problems (such as travelling
salesman) that classical combinatorial optimisation is usually drawn from. The
practical qualifier, attributed to Papadimitriou, is that worst-case complexity results
are frequently misleading in practice, since real problem distributions rarely hit the
worst case. The video works [[blocksworld]] as the running example: a domain-specific
strategy (put every block on the table, then stack) makes plan *existence* trivially
polynomial, while plan *length* for the same domain is NP-complete, and the state space
still grows factorially in the number of blocks — illustrated live in
[[editor-planning-domains]] with a 16-block instance, PDDL's concise problem
description, a solver run under a 500 MB/5 s budget, and the plan-quality gap between
the solver's found solution and the domain's known optimality bound.

The computational-approaches video argues that a planning language such as
[[pddl]]/[[strips]] plays two roles: it specifies a factorial-size state space
concisely, and — more importantly — it exposes structure a solver can exploit, in the
way that knowing a board game's rules lets a person build intuition about it far faster
than watching play without any rules at all. It then sketches the field's history of
computational approaches. **GPS** (General Problem Solver), by Newell and Simon,
combined STRIPS-style representation with means-ends analysis (an early form of goal-
counting heuristic) and problem decomposition via regression. Partial-order causal-link
planning (POCL), through the 1980s, worked backward from each subgoal in turn, adding
actions and resolving the conflicts ("threats") this creates between them. The 1990s
brought three approaches that redirected the field toward forward, progression-based
search: **GraphPlan** built a layered graph of all parallel plans up to a given length
and extracted a plan by searching it; **SATPlan** compiles a planning task into a CNF
formula and hands it to an off-the-shelf SAT solver, exploiting industrial SAT solvers'
ability to handle millions of variables; and **heuristic search planning**, which showed
in 1996 that effective heuristics could be extracted automatically from a problem's PDDL
description rather than hand-coded, and which the video identifies as the dominant
approach today and the subject's main focus for the following weeks. Model checking —
symbolic search over binary decision diagrams, where a single search state represents
many concrete states, used in industry for hardware/software verification — is named as
a further alternative not covered in depth. The video closes on the field's empirical
methodology: a shared language, public benchmark domains (40+ available via
[[editor-planning-domains]]), and the [[international-planning-competition]], with the
explicit caveat that a competition win reflects performance on that year's benchmarks
and rules, not a general ranking of planners.

## Video list

| # | Title | Link |
|---|---|---|
| 1 | Complexity | https://www.youtube.com/watch?v=zINXvvvhOOY |
| 2 | Computational Approaches | https://www.youtube.com/watch?v=8cFwRLvosSs |

## Key concepts

- [[planning-complexity]]
- [[planning-computational-approaches]]
- [[satisficing-and-optimal-planning]]

## Key entities

- [[blocksworld]]
- [[editor-planning-domains]]
- [[international-planning-competition]]
- [[general-problem-solver]]
- [[jorg-hoffmann]]

## Topics covered (revision checklist)

- Plan existence and plan length as decision problems (yes/no, Turing-machine sense)
- Turing machine primer: infinite tape, read/write/move-left/move-right
- Complexity classes P, NP, PSPACE and their relationship (NP believed to be a strict subset of PSPACE)
- PSPACE-completeness of both plan existence and plan length
- Papadimitriou's caveat on worst-case complexity versus practical/average-case behaviour
- Domain-specific complexity separation on blocksworld: plan existence in P, plan length NP-complete
- Factorial growth of the blocksworld state space, demonstrated on a 16-block instance
- Live demonstration in editor.planning.domains: importing blocksworld, solving under a resource budget, comparing found solution quality to known optimality bounds, plan animation via a VAL-based plugin
- The dual role of a planning language: concise specification, and exposing structure for solvers to exploit
- GPS (General Problem Solver): Newell and Simon, means-ends analysis, regression, problem decomposition
- Partial-order causal-link planning (POCL): backward subgoal-by-subgoal reasoning, threat resolution
- GraphPlan: layered planning graph encoding parallel plans, backward extraction
- SATPlan: compiling a planning task to CNF and using an off-the-shelf SAT solver
- Heuristic search planning: heuristics extracted automatically from the PDDL description (1996 result); identified as the dominant modern approach
- Model checking / symbolic search: binary decision diagrams, one search state representing many concrete states
- Empirical methodology: shared language, public benchmark domains, the International Planning Competition, and the caveat on interpreting competition results
- Recommended reading: Hoffmann's "Everything You Always Wanted to Know About Planning (But Were Afraid to Ask)"

## Notable claims / results

- Plan existence and plan length are both PSPACE-complete, placing planning strictly above NP-complete problems such as travelling salesman in worst-case hardness.
- On blocksworld specifically, plan existence is polynomial (a simple unstack-then-restack strategy always works) while plan length is NP-complete, and the state space still grows factorially in the number of blocks.
- A 1996 result showed that effective planning heuristics can be extracted automatically from a problem's declarative (PDDL) description, launching heuristic search planning as the field's now-dominant computational approach.
- Modern industrial SAT solvers handle millions of variables, which SATPlan exploits by compiling planning tasks into CNF.
- More than 40 benchmark domains and (by the lecturer's estimate) over 2,000 problem instances are available via editor.planning.domains; 74 planners competed in the 2011 IPC.
- Competition results are explicitly cautioned to reflect performance on a specific year's undisclosed benchmarks and scoring rules, not a general ranking between planners.

## Connections

- Provides the complexity-theoretic and historical grounding behind [[w02b-width-and-iterative-search]], where width-based search is motivated as exploiting exactly the kind of structure this video says heuristic search planning made tractable.
- Extends [[planning-complexity]] and [[blocksworld]], both first introduced in [[w01b-introduction-to-planning]].
- The empirical methodology matches [[w01-prerecorded-ai-overview]] and the [[international-planning-competition]].
