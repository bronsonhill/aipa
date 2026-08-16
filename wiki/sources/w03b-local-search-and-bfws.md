---
title: Week 3b Local Search and Best-First Width Search
type: source
source_type: lecture
link: https://handbook.unimelb.edu.au/subjects/comp90054
tags: [week-03, search, local-search, width, simulators]
date: 2026-08-16
---

# Week 3b Local Search and Best-First Width Search

Slides and recording are on Canvas (COMP90054 LMS); the link above is the public
handbook entry, since Canvas is not publicly accessible.

## Overview

The second live lecture of week 3 opens with the AI of the 2005 game *F.E.A.R.*, the
first commercial game to use a planner rather than hand-coded behaviour trees, built by
[[jeff-orkin]] on STRIPS-style modelling with a solver. [[nir-lipovetzky]] uses it to
make a point about where the value of the models-and-solvers frame lies: the game
industry allows nearly no CPU cycles for AI, and a planner still won, because the win
came from describing the world in facts and actions and letting a general solver
produce the behaviour.

The lecture then finishes the A\* optimality proof left open on Monday. Given that A\*
expands every node with $f \le g^*$, missing an optimal solution requires pushing some
state on every optimal trajectory outside that region, meaning $g(s) + h(s) > g^*$.
Since $g$ is fixed by the problem and not controllable, only $h$ can do it, and the only
property whose violation permits $h$ to be large enough is admissibility. So an
admissible heuristic guarantees A\* returns an optimal solution. Completeness is
unchanged from greedy best-first search: safety suffices.

Weighted A\* follows as the dial between algorithms — $W = 0$ gives Dijkstra, $W = 1$
gives A\*, large $W$ gives greedy best-first search — with the note that some solvers
run greedy first to obtain an upper bound and then dial $W$ down toward optimality.
Hill-climbing is presented as the local counterpart: commit to the best child, forget
every other branch. A four-graph poll asks in which graph hill-climbing with the blind
heuristic fails to find a solution, and the discussion produces the failure modes.
Under $h = 0$ every choice is a random tie-break, so the search is a random walk, which
on a connected undirected graph will eventually reach a goal. It fails on a genuine
dead-end region, where stepping in makes escape impossible. It fails on a cycle only
when tie-breaking is deterministic — which is also an adversarial concern, since a fixed
tie-break order can be exploited by whoever designs the instance, making random
tie-breaking the safer default despite its cost. Directed graphs are dangerous in
general; an undirected or provably reversible search space is much less so.

Optimality of hill-climbing fails on the same two-goal example used for greedy
best-first search. In answering a student's question, the lecture separates
incompleteness from non-optimality: they usually travel together, but not always, since
an algorithm that deliberately prunes symmetric solutions is incomplete by design and
still optimal.

Enforced hill-climbing is the hybrid. Its `improve` procedure is a breadth-first search
that stops at the first state with a strictly better heuristic value; the search is
systematic, but once it succeeds the algorithm commits to that path and discards the
whole generated layer, so memory does not accumulate the way breadth-first search's
would. That gives a systematic escape from a local minimum, as long as the minimum is
shallow enough. Its completeness and optimality guarantees are the same as
hill-climbing's, for the same reasons.

The final third turns to what state-of-the-art solvers actually do. They derive
heuristics automatically rather than by hand — the topic of the following weeks — and
plug them into greedy best-first search, with extensions such as helpful actions and
landmarks narrowing the branching factor. The shortcoming is that greedy best-first
search is pure exploitation, and gets stuck in local minima. Reinforcement learning and
MCTS require exploration for their guarantees, but explore flatly, ignoring the
structure of states. Best-first width search is the alternative: a plain best-first
search ordered on a novelty measure with ties broken by a heuristic. The novelty
measure used is not plain novelty but $w_h$, in which a state's new-tuple check is made
only against previously generated states sharing its heuristic value, rather than
against everything seen so far. Variants of BFWS have been the best performers in the
IPC agile and satisficing tracks since 2018. There are no optimality guarantees, since
those depend on the problem's width.

The lecture closes on the gap between a model and a language. Many problems fit the
classical planning model but are hard to express in PDDL — Pacman's ghosts being the
example — so simulators and black-box procedures are a legitimate way to give a planner
its transition function. In the [[arcade-learning-environment]] there is no PDDL
encoding and there are rewards rather than goals, yet IW(1) applies almost off the
shelf, run over the 128 bytes of Atari RAM as 128 variables of 256 values each,
generating up to 589,824 states per lookahead, with children generated in random order
and the action beginning the most rewarding path executed. On Bellemare et al.'s
benchmark of 54 games, IW(1) was best on 26, against 19 for UCT, 13 for 2BFS and 1 for
breadth-first search; IW(1) achieves 6 to 22 seconds of lookahead where breadth-first
search manages 0.3.

## Key concepts

- [[heuristic-properties]]
- [[a-star-search]]
- [[weighted-a-star]]
- [[local-search]]
- [[hill-climbing]]
- [[enforced-hill-climbing]]
- [[best-first-width-search]]
- [[planning-with-simulators]]
- [[novelty]]

## Key entities

- [[nir-lipovetzky]]
- [[jeff-orkin]]
- [[arcade-learning-environment]]
- [[lapkt]]
- [[international-planning-competition]]

## Topics covered (revision checklist)

- *F.E.A.R.* (2005) as the first commercial game AI built on a planner rather than hand-coded behaviour
- Completing the A\* optimality proof: $g$ is not controllable, so admissibility is the required property
- A\* completeness needs only safety, as for greedy best-first search
- Weighted A\* as a dial: $W = 0$ Dijkstra, $W = 1$ A\*, large $W$ greedy best-first search
- Anytime pattern: run greedy first for an upper bound, then dial $W$ down
- Bounded suboptimality of weighted A\* for $W > 1$ with an admissible heuristic
- Hill-climbing: commit to the best child, discard all other branches
- The blind heuristic reduces hill-climbing to a random walk under random tie-breaking
- Hill-climbing failure modes: dead-end regions, cycles under deterministic tie-breaking, unsafe or adversarial heuristics
- Random versus fixed tie-breaking, and the adversarial argument for randomising
- Directed versus undirected (or reversible) search spaces as a danger criterion for local search
- Incompleteness versus non-optimality: usually linked, but symmetry-breaking is incomplete and still optimal
- Enforced hill-climbing: `improve` as breadth-first search to a strictly better $h$, then commit and discard
- Why the commit step bounds enforced hill-climbing's memory where breadth-first search's is unbounded
- The properties summary table across DFS, BrFS, ID, A\*, HC, IDA\*
- What state-of-the-art satisficing planners do: automatically derived heuristics, greedy best-first search, helpful actions, landmarks
- Exploitation versus exploration; flat exploration in RL and MCTS ignores state structure
- BFWS($f$) with $f = \langle w, f_1, \dots, f_n \rangle$: best-first ordering on novelty, ties broken in order
- The $w_h$ novelty measure: novelty computed only against states of equal heuristic value
- BFWS($\langle w, h \rangle$) with $h_{\mathrm{add}}$ or $h_{\mathrm{ff}}$; no optimality guarantees, since these depend on width
- Model versus language: problems that fit classical planning but resist PDDL encoding
- Simulators, external procedures, and black-box action effects; the Atari Learning Environment
- IW(1) over Atari RAM: 128 variables of 256 values, up to 589,824 states, random child order, discount 0.995
- Atari experimental results across 54 games and the lookahead-depth comparison

## Notable claims / results

- Admissibility is the property that makes A\* optimal; safety is the property that makes it complete.
- Weighted A\* with $W > 1$ and an admissible heuristic returns a solution costing at most $W$ times the optimum.
- Under the blind heuristic, hill-climbing with random tie-breaking is a random walk and will find a solution on a connected undirected graph, but a dead-end region or a cycle with fixed tie-breaking defeats it.
- Incompleteness does not strictly entail non-optimality: symmetry-breaking algorithms deliberately discard some solutions and remain optimal.
- Enforced hill-climbing's guarantees are identical to hill-climbing's; the systematic `improve` step changes reach, not correctness.
- BFWS variants have been the best performers in the IPC agile and satisficing tracks since 2018, and BFWS($\langle w, h \rangle$) is much stronger than greedy best-first search on $h$ alone.
- In the Atari benchmark of 54 games, IW(1) was best on 26, UCT on 19, 2BFS on 13, and breadth-first search on 1; IW(1) and 2BFS reach 6 to 22 seconds of lookahead where breadth-first search reaches 0.3 seconds.
- IW outperforms DeepMind's deep reinforcement learning agent on 45 of 49 games, but solves a different problem: IW is a reactive lookahead, DeepMind's agent produces a policy.

## Connections

- Completes the proof opened in [[w03a-heuristic-functions-properties]].
- BFWS combines [[novelty]] from [[w02b-width-and-iterative-search]] with the heuristic search of this week.
- The Atari application extends the IW results already recorded on [[iterative-width-search]].
- The model-versus-language argument refines [[models-and-solvers]] and the language coverage in [[w01b-introduction-to-planning]].
- Automatically derived heuristics are flagged as the topic of the following two weeks.
