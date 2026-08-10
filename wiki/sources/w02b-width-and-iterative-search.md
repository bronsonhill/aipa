---
title: Week 2b Width and Iterative Search
type: source
source_type: lecture
link: https://handbook.unimelb.edu.au/subjects/comp90054
tags: [week-02, search, width, novelty, iterative-width]
date: 2026-08-10
---

# Week 2b Width and Iterative Search

Slides and recording are on Canvas (COMP90054 LMS); the link above is the public
handbook entry, since Canvas is not publicly accessible.

## Overview

The second live lecture of week 2, given by [[nir-lipovetzky]], asks what changes once a
search algorithm has access to a factored, variable-based state representation rather
than an opaque, uniquely-labelled state. The distinction is illustrated on
[[blocksworld]]: a "flat" representation where every state is just an ID ($s_0, s_1,
\dots$) carries no information a solver can read, while a variable-based representation
(`on(A,B)`, `clear(B)`, …) exposes structure the same way [[pddl]] does for
[[classical-planning]] generally. The lecture then reframes [[planning-complexity]]
through this lens: PSPACE-completeness is a worst-case bound, and in practice most
benchmark problems are solved quickly with a long tail of hard instances, so the field's
theory tries to characterise, from the structure of a problem's description, when it
will fall into the easy majority or the hard tail.

The key definitional move is a new concept, *width*, built from the *novelty* of a
state. The novelty of a newly generated state is the size of the smallest subset of its
atoms that has not appeared, as a subset, in any previously visited state; a state whose
every subset of atoms has been seen before (a true duplicate) is assigned a novelty of
$|F|+1$, one more than the number of atoms in the problem. Novelty is worked through by
hand on two examples: a three-state trace to establish the mechanics of "smallest
unseen subset", then a five-state trace using a novelty table that records, for each
subset size, the first state at which that subset became true.

Novelty grounds the algorithm **iterative width (IW)**. $\mathrm{IW}(k)$ is a
breadth-first search that prunes any generated state whose novelty exceeds $k$; the
search is re-run with $k = 0, 1, 2, \dots$ until a solution is found, and once $k$
reaches the number of atoms the search is equivalent to plain breadth-first search with
duplicate detection. The number of states $\mathrm{IW}(k)$ can generate is bounded by
$n^k$ (for $n$ atoms), which is polynomial for fixed $k$; if the *width* of a problem — the
smallest $k$ for which $\mathrm{IW}(k)$ solves it — is known in advance, running
$\mathrm{IW}$ at exactly that $k$ is complete and optimal at polynomial rather than
exponential cost. Empirically, restricted to single-goal problems, most classical
planning benchmarks have width 1 or 2, and $\mathrm{IW}(1)$/$\mathrm{IW}(2)$ already
outperform blind search by a wide margin on a corpus of roughly 38,000 instances tested.
Sokoban is given as the counterexample where achieving goals independently fails, since
pushing one box can make another goal unreachable — a problem without small width under
naive serialisation.

Because single-goal width results do not directly cover problems with multiple
conjunctive goals, the lecture introduces **serialized iterative width (SIW)**: run
$\mathrm{IW}$ until any one goal is reached, then re-run $\mathrm{IW}$ from that state
until one more goal is reached, repeating (a form of hill-climbing over the set of
goals) until all are satisfied. IW is noted to have been competitive with DeepMind's
Atari-playing agents using only $\mathrm{IW}(1)$, but doing so requires a factored
representation of the game's state — an open question the lecture leaves for students to
consider (screen pixels versus RAM contents) and revisits with an in-class exercise on
representing grid positions for shortest-path search, showing that a poorly chosen
variable grouping (e.g. a single combined location variable versus separate $x$ and $y$
variables) changes which states $\mathrm{IW}(1)$ can even reach.

## Key concepts

- [[novelty]]
- [[iterative-width-search]]
- [[state-space-modelling]]
- [[planning-complexity]]

## Key entities

- [[nir-lipovetzky]]
- [[blocksworld]]

## Topics covered (revision checklist)

- Flat versus factored (variable-based) state representations, illustrated on blocksworld
- Why PSPACE-completeness is a worst-case bound and does not predict typical-case behaviour (Papadimitriou's "biggest lies" remark on worst-case analysis)
- Definition of novelty: the size of the smallest subset of atoms in a state that is true for the first time in the search
- Novelty of a true duplicate state is $|F|+1$
- Worked novelty-table computation across a sequence of generated states
- The iterative width algorithm $\mathrm{IW}(k)$: breadth-first search pruning states of novelty greater than $k$
- $\mathrm{IW}$ run as an increasing sequence $\mathrm{IW}(0), \mathrm{IW}(1), \mathrm{IW}(2), \dots$ until a solution is found
- $\mathrm{IW}(k)$'s state bound of $n^k$, and completeness/equivalence to breadth-first search with duplicate detection once $k$ equals the number of atoms
- The notion of a problem's width as the smallest $k$ for which $\mathrm{IW}(k)$ solves it, and the completeness/optimality guarantee if that $k$ is known
- Empirical result: most single-goal benchmark problems have width 1 or 2
- Sokoban as an example where single goals cannot be achieved independently, breaking the small-width assumption
- Serialized iterative width (SIW): hill-climbing over a set of goals, re-running IW after each goal is reached
- IW(1)'s competitiveness with deep reinforcement learning (DeepMind) on Atari games, and the open question of what factored representation the game state should use
- In-class exercise: representing grid coordinates for shortest-path search as separate $x$/$y$ variables versus a single combined location variable, and the effect on which states $\mathrm{IW}(1)$ reaches

## Notable claims / results

- Novelty of a state is the size of the smallest subset of its atoms not seen as a subset of any previously visited state, capped at $|F|+1$ for a true duplicate.
- $\mathrm{IW}(k)$ generates at most $n^k$ states, where $n$ is the number of atoms — polynomial for fixed $k$, in contrast to the exponential worst case of unrestricted search.
- If a problem's width is known and $\mathrm{IW}$ is run at exactly that value of $k$, the search is complete, optimal, and polynomial rather than exponential.
- Empirically, most classical planning benchmarks (tested on ~38,000 instances) have width 1 or 2 under a single-goal restriction, and $\mathrm{IW}(1)$/$\mathrm{IW}(2)$ substantially outperform blind search.
- Sokoban is an example domain where individual goals cannot be pursued independently without producing unrecoverable states, defeating the small-width assumption behind plain IW.
- Serialized IW (SIW) extends IW to conjunctive multi-goal problems by greedily achieving one goal at a time.
- IW(1) was reported competitive with DeepMind's Atari-playing agents, despite using no learning, provided a suitable factored state representation of the game is available.

## Connections

- Follows [[w02a-blind-search-properties]], which covers the blind search algorithms IW is contrasted against.
- The formal state model this builds on was introduced in [[w02-prerecorded-search-fundamentals]] and [[w01b-introduction-to-planning]].
- Width-based search and PSPACE-completeness both bear on [[planning-complexity]].
- The empirical, benchmark-driven methodology matches [[w01-prerecorded-ai-overview]] and the [[international-planning-competition]].
