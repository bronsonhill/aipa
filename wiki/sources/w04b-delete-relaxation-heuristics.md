---
title: Week 4b Delete Relaxation Heuristics
type: source
source_type: lecture
link: https://handbook.unimelb.edu.au/subjects/comp90054
tags: [week-04, heuristics, delete-relaxation, additive-heuristic, max-heuristic, relaxed-plan]
date: 2026-08-24
---

# Week 4b Delete Relaxation Heuristics

Slides and recording are on Canvas (COMP90054 LMS); the link above is the public
subject handbook entry. Live lecture by [[nir-lipovetzky]], subtitled "It's a Long Way
to the Goal, But How Long Exactly? Part I: Acting As If the World Can Only Get
Better." Formalises the delete relaxation previewed in the week 4 pre-recorded videos,
proves it admissible, and builds up the chain of heuristics — $h^+$, $h^\text{max}$,
$h^\text{add}$, and the relaxed-plan heuristic $h^\text{FF}$ — that actual planners
compute from it.

## Overview

The delete relaxation of a STRIPS action $a$ is $a^+$: same preconditions, same add
effects, empty delete list. Extending this to actions, action sequences, and whole
planning tasks pointwise gives the relaxed task $\Pi^+$, and a **relaxed plan** for a
state $s$ is defined as an optimal plan for $\Pi^+_s$ (the relaxed task with initial
state $s$). Worked on the Australian TSP example, a relaxed plan for the initial state
never needs to "return" anywhere the truck has already been, because deleting `at(x)` no
longer happens — the truck accumulates locations rather than moving between them.

The admissibility argument runs through **state dominance**: $s'$ dominates $s$ when
$s \subseteq s'$ (everything true in $s$ is true in $s'$, possibly more). Two
propositions build the proof. First, dominance is preserved and only grows under
relaxed action application — if $s'$ dominates $s$, then any relaxed action sequence
applicable in $s$ is also applicable in $s'$, and the resulting state after applying it
to $s'$ still dominates the result after applying it to $s$; also, if $s$ is a goal
state then any state it dominates is too. Second, applying the *ordinary* (non-relaxed)
version of an action from $s$ produces a state dominated by applying the relaxed
version, because the relaxed version never removes anything the ordinary one would have
removed. Chaining these gives the headline result: **the delete relaxation is
admissible** — any plan for the real task, stripped of its delete effects, is a valid
(and typically much shorter) plan for the relaxed task, so the cost of an optimal
relaxed plan can never exceed $h^*$. This also gives a simple sound, complete,
polynomial-time algorithm — **greedy relaxed planning** — for deciding *whether* a
relaxed plan exists at all: repeatedly apply any applicable action whose effect changes
the current (relaxed) state, until the goal is reached or no action changes anything.

$h^+$ is defined as the cost of an *optimal* relaxed plan, and inherits admissibility
directly. But computing $h^+$ exactly is NP-complete — proved by reduction from SAT,
encoding each clause and variable of a CNF formula as facts and actions so that a
relaxed plan of cost $m + n$ (variables plus clauses) exists exactly when the formula is
satisfiable. Since $h^+$ is intractable, every real system approximates it. Two
classical approximations, both defined by the same Bellman-Ford-style recursive
equations evaluated bottom-up from facts already true in $s$ (base case 0), differ only
in how they combine sibling preconditions when a single action needs more than one
fact true: $h^\text{max}(s,g)$ takes the **max** over sub-goals — optimistic,
admissible, and provably $\le h^+ \le h^*$, but typically far too uninformative in
practice, since it ignores that different sub-goals might require entirely separate
work; $h^\text{add}(s,g)$ takes the **sum** — pessimistic, provably $\ge h^+$ (and hence
generally inadmissible, with concrete counterexamples), but usually much more
informative, at the cost of over-counting whenever sub-plans for different goals share
actions. A worked logistics example (a package must move from city C to D by a
sequence of load/drive/unload actions) shows the over-counting directly: $h^\text{add}$
sums the cost of getting the truck to each intervening city as if from scratch for
every downstream sub-goal, so with many packages all needing the same route the
over-count compounds badly.

**Relaxed plans** are introduced as a way to reduce this over-counting while staying
cheap. The construction has two parts. A **best-supporter function** $bs$ assigns each
non-true fact $p$ the cheapest action achieving it, using either the $h^\text{max}$ or
$h^\text{add}$ values to rank candidates; for this to yield a valid plan by backward
chaining, $bs$ must be **closed** (defined for every fact with a path to a goal in the
resulting support graph) and **well-founded** (that support graph must be acyclic — a
worked logistics counterexample shows how choosing supporters inconsistently can create
a cycle that backward-chaining never actually resolves down to the true state). Both
the $h^\text{max}$- and $h^\text{add}$-derived best-supporter functions are proved
closed and well-founded whenever costs are strictly positive. **Relaxed plan
extraction** then does exactly one backward pass: starting from the unmet top-level
goals, repeatedly pull the best supporter for each open sub-goal, add its preconditions
to the open set, and stop once nothing is open — this runs in time bounded by the
number of facts. The resulting heuristic, $h^\text{FF}$, sums the costs of every action
collected this way. It is provably $\ge h^+$ and agrees with $h^+$ exactly on
$\infty$ (both correctly detect unsolvability), so it can be inadmissible in principle,
but in practice it typically avoids the dramatic over-counting that plagues
$h^\text{add}$, because a shared sub-plan is only ever collected into the relaxed plan
once.

A worked side effect of running relaxed-plan extraction is a set of **helpful
actions**: any action applicable in the current state that also appears in the
extracted relaxed plan. FF used helpful actions to restrict enforced hill-climbing's
successor generation to just those actions (at the cost of completeness); other
planners instead treat them as *preferred operators*, expanding nodes reached via
helpful actions first without dropping the rest.

Two closing quiz-style examples fix intuition for what ignoring deletes actually
removes: in FreeCell, dropping deletes lets a card move directly onto its goal pile
regardless of what is currently on top of it or in the free cells; in Sokoban, it means
a pushed stone never becomes stuck (nothing ever becomes blocked, since blocking is
entirely a matter of deleted "empty cell" facts). The lecture closes with a table of
four real systems built from these pieces — HSP (greedy best-first search on
$h^\text{add}$), FF (enforced hill-climbing on $h^\text{FF}$ plus helpful-action
pruning), LAMA (multi-queue greedy best-first search combining $h^\text{FF}$ with a
landmarks heuristic), and BFWS (novelty-guided best-first width search, previewed for
the following lecture) — and points to work extending beyond pure delete relaxation:
admissible lower bounds such as landmark heuristics and the LM-cut heuristic, and
"semi-relaxed" plan heuristics that explicitly track a chosen subset of fact
conjunctions to interpolate between $h^+$ and $h^*$.

## Key concepts

- [[delete-relaxation]]
- [[additive-heuristic]]
- [[max-heuristic]]
- [[relaxed-plan-heuristic]]
- [[helpful-actions]]

## Key entities

- [[jorg-hoffmann]]

## Topics covered (revision checklist)

- Formal definition of $a^+$, $A^+$, $\vec{a}^+$, $\Pi^+$
- Relaxed plan: an optimal plan for $\Pi^+_s$
- Worked relaxed plan for the Australian TSP example
- State dominance: definition and the two dominance-preservation propositions
- Proof sketch that the delete relaxation is admissible ($h^+ \le h^*$)
- Greedy relaxed planning algorithm: sound, complete, polynomial-time decision of relaxed-plan existence
- $h^+$: definition as optimal relaxed plan cost, admissibility corollary
- $h^+$ on TSP (minimum spanning tree) and Towers of Hanoi ($n$, not $2^n$)
- NP-completeness of $\mathrm{PlanOpt}^+$ (optimal relaxed planning), proved by reduction from SAT
- $h^\text{max}$ and $h^\text{add}$: shared recursive definition, differing only in max vs. sum over sub-goals
- $h^\text{max}$ is admissible/optimistic but typically uninformative; $h^\text{add}$ is typically informative but inadmissible/pessimistic due to over-counting
- Worked Bellman-Ford-style computation of $h^\text{add}$ on the TSP and logistics examples
- Best-supporter functions $bs^\text{max}_s$, $bs^\text{add}_s$: definition via argmin over achieving actions
- Closed and well-founded best-supporter functions; the support graph and cycle example
- Relaxed plan extraction algorithm (backward chaining from goals over a best-supporter function)
- $h^\text{FF}$: definition, $h^\text{FF} \ge h^+$, agreement with $h^+$ on $\infty$, typical (not guaranteed) tightness in practice
- Helpful actions: definition, use in FF's enforced hill-climbing, use as preferred operators elsewhere
- How ignoring deletes simplifies FreeCell and Sokoban
- Example systems built on these heuristics: HSP, FF, LAMA, BFWS
- Recommended readings: Bonet and Geffner's "Planning as Heuristic Search"; Hoffmann and Nebel's FF paper; Keyder, Hoffmann and Haslum's "Semi-Relaxed Plan Heuristics"

## Notable claims / results

- The delete relaxation is provably admissible: for any plan $\vec{a}$ solving the original task from $s$, the delete-relaxed sequence $\vec{a}^+$ is a valid (and generally shorter or equal) plan for the relaxed task, so $h^+(s) \le h^*(s)$ always.
- Computing $h^+$ exactly is NP-complete (PlanOpt$^+$), by a direct reduction from SAT that encodes each variable and clause of a CNF formula as facts and actions.
- $h^\text{max} \le h^+ \le h^*$ always (admissible); $h^\text{add} \ge h^+$ always, and there exist tasks where $h^\text{add}(s) > h^*(s)$ (inadmissible, due to counting shared sub-plans multiple times).
- $h^\text{FF} \ge h^+$ for all tasks, and $h^\text{FF}(s) = \infty$ iff $h^+(s) = \infty$; there exist tasks where $h^\text{FF}(s) > h^*(s)$, but in practice it typically avoids $h^\text{add}$'s dramatic over-counting because each shared action is only collected into the relaxed plan once.
- $h^+$ equals the minimum spanning tree cost on TSP instances, and equals $n$ (not $2^n$) on the $n$-disk Towers of Hanoi task — both illustrating that the delete relaxation can produce a dramatically simpler-to-solve problem than the original.

## Connections

- Digested in full alongside the pre-recorded videos and L4 in [[w04-relaxation-and-delete-relaxation-digest]].
- Directly formalises the delete-relaxation preview in [[w04-prerecorded-relaxation-heuristics]] and its state-dominance argument.
- Extends the relaxation framework from [[w04a-generating-heuristic-functions]] with a specific, widely-used relaxation and its own admissibility proof.
- Sets up [[best-first-width-search]] (BFWS, the following lecture's topic), listed here as using a variant of $h^\text{FF}$ alongside novelty and goal counting.
- The NP-completeness proof for PlanOpt$^+$ parallels the PSPACE-completeness proofs for plan existence/length in [[w04-prerecorded-planning-complexity]] and [[planning-complexity]].
