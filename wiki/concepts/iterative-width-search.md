---
title: Iterative Width Search (IW)
type: concept
tags: [search, width, algorithms, week-02]
date: 2026-08-10
---

# Iterative Width Search (IW)

A breadth-first search pruned by [[novelty]]: $\mathrm{IW}(k)$ discards any generated
state whose novelty exceeds $k$. IW runs this at $k = 0, 1, 2, \dots$ in sequence until
a solution is found. Its serialized extension, SIW, handles conjunctive multi-goal
problems by re-running IW after each individual goal is reached.

## How it works

$\mathrm{IW}(k)$ is ordinary breadth-first search with one extra rule: a generated
state is only kept on the open list if its novelty (relative to every state visited so
far in the search) is at most $k$. States of higher novelty are pruned outright. IW
itself is the outer loop $\mathrm{IW}(0), \mathrm{IW}(1), \mathrm{IW}(2), \dots$,
re-running the pruned search at each successive $k$ until one succeeds.

At $k$ equal to the number of atoms in the problem, no state can have novelty greater
than $k$, so $\mathrm{IW}(k)$ degenerates to plain breadth-first search with duplicate
detection — IW is therefore complete in the limit, though the interesting cases are
where a small $k$ already suffices.

**Complexity.** $\mathrm{IW}(k)$ can generate at most $n^k$ states, where $n$ is the
number of atoms — polynomial in the problem size for any fixed $k$, rather than
exponential. The **width** of a problem is the smallest $k$ for which $\mathrm{IW}(k)$
solves it; if that $k$ is known in advance, running $\mathrm{IW}$ at exactly that value
is complete, optimal, and polynomial. Empirically, restricted to single-goal problems,
most classical planning benchmarks (tested on roughly 38,000 instances) have width 1 or
2, and $\mathrm{IW}(1)$/$\mathrm{IW}(2)$ substantially outperform blind search on them.

**Where it fails.** Small width is not guaranteed. Sokoban is the standard
counterexample: because pushing one box can make a different goal permanently
unreachable, goals cannot be pursued independently, and the problem does not decompose
into small-width single-goal subproblems the way benchmarks that admit easy
serialisation do.

**Serialized IW (SIW).** For problems with several conjunctive goals $G_1, \dots,
G_n$, SIW runs IW until *any one* goal is reached (it does not matter which), then
re-runs IW from that resulting state until one further goal is reached, and so on —
effectively hill-climbing over the set of remaining goals. This sidesteps having to
find a width bound for the joint goal, at the cost of no longer guaranteeing optimality
or even completeness in general, since achieving goals in an arbitrary order can lead
into states from which a remaining goal is unreachable.

**Representation sensitivity.** Novelty, and therefore which states IW(1) can reach at
all, depends on how the state is factored into variables. On a grid shortest-path
problem, representing position as separate $x$ and $y$ variables restricts IW(1) to
states that change only one coordinate relative to something already seen — it cannot
represent a diagonal move as novel, since both the new $x$-value and the new $y$-value
may each individually have already appeared, even though their combination has not.
Collapsing $x$ and $y$ into a single combined location variable changes this trade-off
again. Neither representation is unconditionally correct for IW(1); the choice of
variables directly determines completeness and optimality on a given problem.

## Why it matters

IW gives a search algorithm that needs no hand-built or learned heuristic, only a
factored state representation, and that is provably efficient whenever a problem's
width is small. Its performance on Atari — reportedly competitive with DeepMind's deep
reinforcement learning agents using only $\mathrm{IW}(1)$ — is offered as evidence that
much of what looks like it requires learning is actually structural, provided the state
is represented in a form that exposes that structure. That representation question (raw
pixels versus RAM contents, for Atari) is left open as unresolved in the source
lecture.

## Relationships

- Built on [[novelty]] and [[search-node]]s, using the [[breadth-first-search]] expansion order as its base
- Bounds the exponential worst case implied by [[planning-complexity]] whenever a problem's width is small
- SIW addresses the same conjunctive-goal problem that motivates [[satisficing-and-optimal-planning]]'s satisficing track
- Representation sensitivity connects directly to [[state-space-modelling]]
- The best-first variant, ordering on novelty with heuristic tie-breaking, is [[best-first-width-search]]
- Applied to black-box transition functions in [[planning-with-simulators]], on the [[arcade-learning-environment]]

## Sources

- [[w02b-width-and-iterative-search]] — defines IW(k), width, SIW, the Sokoban counterexample, empirical results, and the grid-representation exercise
- [[w03b-local-search-and-bfws]] — the Atari setup in detail (128 RAM bytes as variables, 589,824 states per lookahead, random child order, $\gamma = 0.995$) and the 54-game comparison against 2BFS, BrFS and UCT
