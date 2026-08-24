---
title: Week 4 Pre-recorded Relaxation and Delete Relaxation Heuristics
type: source
source_type: video
link: https://www.youtube.com/watch?v=vHi7ZZjAooU
tags: [week-04, heuristics, relaxation, delete-relaxation, 8-puzzle]
date: 2026-08-24
---

# Week 4 Pre-recorded Relaxation and Delete Relaxation Heuristics

Nine short videos by [[nir-lipovetzky]], released ahead of the week 4 live lectures.
The first six cover relaxation as a general methodology for generating heuristics
automatically, worked through the goal-counting heuristic; two "Question" videos pose
exercises on relaxing the 8-puzzle without giving the answer; the final three preview
the delete relaxation, properly the subject of week 5's lecture but released early
here.

## Overview

The sequence opens by naming the problem: designing a heuristic by hand is
time-consuming even for a single domain (the videos point back at the Pac-Man
assignment), and a planner accepting arbitrary PDDL input has no human present to do
that design work at all. **Relaxation** is introduced as the general fix — simplify the
problem, solve the simple version optimally, and use that cost as the heuristic
estimate for the original. The methodology is worked through twice at an informal
level before being made precise: route-finding relaxes to "pretend you're a bird" (a
fully-connected graph weighted by straight-line distance), and STRIPS planning relaxes
to goal counting by dropping every action's preconditions and delete effects, which
lets the goal condition be reached by simply adding facts in any order. A hand-traced
example over a small Australian road network — a truck starting in Sydney that must
visit Adelaide, Perth, Brisbane, and Darwin and return — gives a relaxed plan of length
four, matching the count of unmet top-level goals from the initial state.

The formal definition follows: a relaxation of $h^*$ is a triple $(P', r, h'^*)$ of a
simplified problem family, a transformation into it, and a perfect heuristic for the
simplified family, subject to three properties. **Native** relaxations keep the
simplified problem inside the original family and reuse the same heuristic-computation
method (goal counting is native — a STRIPS task with empty preconditions and deletes is
still a STRIPS task; the bird's-eye route-finding relaxation is not, since a
fully-connected straight-line graph is not itself an instance of road-based
route-finding). **Efficiently constructible** requires the transformation to run in
polynomial time; **efficiently computable** requires the simplified problem's perfect
heuristic to be computable in polynomial time. Goal counting turns out to satisfy the
first two but not the third: optimal planning even with zero preconditions and empty
deletes is still NP-hard once an action can add more than two facts, by a reduction from
minimum set cover — a result the videos attribute to a complexity paper by Bylander
that classifies which restrictions of STRIPS stay polynomial. The response, general
across relaxation methods, is to *approximate* the relaxed problem's own optimal
heuristic rather than solve it exactly; goal counting is exactly this approximation, in
which "count the number of currently-false goals" stands in for the true cost of the
relaxed (still generally hard) problem.

Two short exercise videos then set the same exercise on the 8-puzzle: derive a
relaxation whose optimal cost equals the Manhattan-distance heuristic, and a second
whose optimal cost equals the misplaced-tiles heuristic, by dropping one or both of the
8-puzzle's two move preconditions (that the source and destination cells are adjacent,
and that the destination is blank). Neither relaxation is native, since changing the
move rule produces a different puzzle with no corresponding 8-puzzle instance; both are
left as an exercise in judging constructibility and computability rather than being
solved on camera.

The closing three videos introduce the **delete relaxation** ahead of week 5's formal
treatment, framed by the slogan "what was once true remains true forever" — apply an
action's add effects but never remove anything. Two vignettes make the intuition
concrete: handing over money in the relaxed world leaves both parties holding it;
drinking a full pint leaves both a full glass and an empty one. The delete relaxation is
named as one of four general families of relaxation-based heuristics (alongside
critical-path heuristics, abstractions, and landmarks), singled out as the one the
course covers because it underlies most state-of-the-art planners and is, in the
lecturer's judgement, the most pedagogically direct. A formal sketch follows: for an
action $a$, the relaxed action $a^+$ keeps the same preconditions and add effects and
drops the deletes; a relaxed plan for a state $s$ is an optimal plan for the relaxed
task with initial state $s$. Working the Australian TSP example again under
delete-relaxed `drive` actions produces a four-action relaxed plan that never has the
truck actually "leave" any city it has visited, since nothing is ever deleted. The final
video introduces **state dominance** ($s'$ dominates $s$ when $s \subseteq s'$) and
argues, via a diagram of states growing monotonically as actions are applied, that
because relaxed actions can only add facts, the relaxation can never make a solvable
problem unsolvable — which is the intuition behind the admissibility proof given
formally in week 5.

## Videos

| # | Title | Duration | Link |
|---|---|---|---|
| 1 | How to Generate Heuristics — Relaxation | 9:09 | https://www.youtube.com/watch?v=vHi7ZZjAooU |
| 2 | How to Relax — Informally | 12:07 | https://www.youtube.com/watch?v=74DJLrCVdd8 |
| 3 | How to Relax Formally | 9:59 | https://www.youtube.com/watch?v=rHhOKImSFcg |
| 4 | Goal Counting in Australia — Formally | 3:17 | https://www.youtube.com/watch?v=o4Mwdvrhg1k |
| 5 | Question: How to Relax the 8-Puzzle | 6:23 | https://www.youtube.com/watch?v=ny1mw8G1dTk |
| 6 | Question: Properties of 8-Puzzle Relaxations | 2:00 | https://www.youtube.com/watch?v=ayrxK8xHxeY |
| 7 | Delete Relaxation Intro | 4:04 | https://www.youtube.com/watch?v=K8caM3LNE88 |
| 8 | Delete Relaxation Formally | 8:52 | https://www.youtube.com/watch?v=owgbsrxD_j4 |
| 9 | Delete Relaxation Properties | 14:55 | https://www.youtube.com/watch?v=Ivmmc8G_5yo |

## Key concepts

- [[relaxation]]
- [[goal-counting-heuristic]]
- [[delete-relaxation]]

## Key entities

- [[bylander-complexity-result]]

## Topics covered (revision checklist)

- Motivation: hand-designing heuristics per domain doesn't scale; a general planner needs to derive them from the PDDL description automatically
- Relaxation as a triple (simplified problem, transformation, perfect heuristic for the simplified problem)
- Informal relaxation examples: route-finding to straight-line distance ("pretend you're a bird"), STRIPS to goal counting (drop preconditions and deletes)
- Formal properties of a relaxation: native, efficiently constructible, efficiently computable
- Native relaxations keep the simplified family inside the original and reuse the same heuristic-computation method; goal counting is native, bird's-eye route-finding is not
- Optimal planning with empty preconditions and deletes is still NP-hard for actions with more than two add effects (reduction from minimum set cover; Bylander's complexity classification)
- Approximating a relaxed problem's own hard-to-compute optimal heuristic (goal counting as an approximation, not an exact computation)
- 8-puzzle relaxation exercise: dropping the adjacency precondition vs. the blank-destination precondition to derive Manhattan distance and misplaced tiles
- Delete relaxation slogan: "what was once true remains true forever"
- Delete relaxation as one of four heuristic families (critical path, delete relaxation, abstractions, landmarks)
- Formal delete-relaxed action $a^+$: same preconditions and adds, empty deletes
- Relaxed plan: an optimal plan for the delete-relaxed task
- State dominance: $s'$ dominates $s$ if $s \subseteq s'$; relaxed states grow monotonically under action application

## Notable claims / results

- Goal counting is a native, efficiently constructible relaxation of STRIPS planning, but computing its underlying simplified problem's own optimal heuristic exactly is still NP-hard past two add effects per action — so goal counting itself is an approximation, not an exact solve, of that already-simplified problem.
- The delete relaxation is described as the most widely used and pedagogically simplest of the four known relaxation families in planning, and underlies most state-of-the-art planners.
- Under the delete relaxation, applying an action can only add facts and can never render a solvable state unsolvable — the basis of the admissibility argument for delete-relaxation heuristics developed formally in week 5.

## Connections

- Precedes and is developed formally in [[w04a-generating-heuristic-functions]] (relaxation) and [[w04b-delete-relaxation-heuristics]] (delete relaxation, $h^+$, $h^\text{add}$, $h^\text{max}$, relaxed plans).
- Extends [[heuristic-function]] and [[planning-complexity]] with a concrete method for deriving heuristics automatically.
- The NP-hardness of relaxed optimal planning echoes the PSPACE-hardness of full planning covered in [[w04-prerecorded-planning-complexity]].
