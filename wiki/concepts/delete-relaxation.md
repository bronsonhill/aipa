---
title: Delete Relaxation
type: concept
tags: [heuristics, week-04, relaxation]
date: 2026-08-24
---

# Delete Relaxation

The [[relaxation]] that drops every action's delete effects while keeping its
preconditions and add effects, under the slogan "what was once true remains true
forever." It underlies most state-of-the-art satisficing planners.

## How it works

For a STRIPS action $a$, the delete-relaxed action $a^+$ has the same preconditions
$pre_a$, the same add effects $add_a$, and an empty delete list. Extending this
pointwise gives a relaxed action set $A^+$, a relaxed task $\Pi^+ = (F, A^+, c, I, G)$,
and, for any state $s$, a **relaxed plan**: an optimal plan for $\Pi^+_s$ (the relaxed
task with initial state $s$). Because nothing is ever deleted, applying a relaxed
action can only ever add facts to a state.

**State dominance** formalises why this makes the problem easier, never harder: $s'$
dominates $s$ if $s \subseteq s'$. Two propositions build on this. First, dominance is
preserved (and can only grow) as relaxed actions are applied — if $s'$ dominates $s$
then any relaxed action sequence applicable in $s$ is applicable in $s'$ too, and the
resulting states preserve dominance; a state dominating a goal state is itself a goal
state. Second, applying the ordinary version of an action from $s$ always produces a
state dominated by applying its relaxed version, since the relaxed version never
removes what the ordinary one would have. Chaining these gives **admissibility**: any
plan $\vec{a}$ solving the real task from $s$ becomes, once its delete effects are
stripped, a valid — and generally shorter or equal — plan for the relaxed task, so the
cost of an optimal relaxed plan can never exceed $h^*(s)$.

This also yields **greedy relaxed planning**, a simple algorithm for deciding whether a
relaxed plan exists at all: starting from $s$, repeatedly apply any applicable action
whose relaxed effect actually changes the current state, until the goal is reached
(success) or no action changes anything (failure). It is sound, complete, and
polynomial-time, because every action can be selected at most once — once applied, a
relaxed action's add effects are permanently true, so re-applying it changes nothing.

## Formula

$$h^+(s) := \text{cost of an optimal relaxed plan for } s$$

$h^+$ is provably admissible (a direct corollary of the delete relaxation's
admissibility), but computing it exactly is **NP-complete** (the decision problem
$\mathrm{PlanOpt}^+$), by a reduction from SAT that encodes each variable and clause of
a CNF formula as facts and actions so that a relaxed plan of cost $m+n$ exists exactly
when the formula is satisfiable. Because $h^+$ is intractable, every practical system
approximates it — via [[max-heuristic]], [[additive-heuristic]], or the
[[relaxed-plan-heuristic]].

## Why it matters

The delete relaxation keeps far more of a planning task's structure than
[[goal-counting-heuristic]] while remaining amenable to a tractable admissible
approximation ($h^\text{max}$) or a much more informative inadmissible one
($h^\text{add}$, $h^\text{FF}$). Concretely, $h^+$ equals the minimum spanning tree
cost on a TSP-style task, and equals $n$ rather than $2^n$ on the $n$-disk Towers of
Hanoi task, illustrating how dramatically simpler the relaxed problem can be. Ignoring
deletes has an intuitive reading per domain: in FreeCell it lets any card move directly
to its goal pile regardless of what currently sits above it; in Sokoban it means a
pushed stone can never become stuck, since blocking is entirely a matter of deleted
"empty cell" facts.

## Relationships

- An instance of [[relaxation]], specialised to dropping only delete effects
- Approximated by [[max-heuristic]] (admissible, optimistic) and
  [[additive-heuristic]] (inadmissible, pessimistic, subject to over-counting)
- Refined by the [[relaxed-plan-heuristic]] $h^\text{FF}$, which reduces the
  over-counting that plagues $h^\text{add}$
- Produces [[helpful-actions]] as a side effect of relaxed plan extraction
- Underlies real systems: HSP ($h^\text{add}$), FF ($h^\text{FF}$ + helpful actions),
  LAMA ($h^\text{FF}$ + landmarks), and BFWS (a variant of $h^\text{FF}$ +
  [[novelty]]) — see [[best-first-width-search]]

## Sources

- [[w04-prerecorded-relaxation-heuristics]] — informal introduction, the money/pint intuition, state dominance sketch
- [[w04b-delete-relaxation-heuristics]] — full formalisation: $a^+$, admissibility proof, greedy relaxed planning, $h^+$, NP-completeness of $\mathrm{PlanOpt}^+$, FreeCell/Sokoban intuition
