---
title: Week 2a Blind Search and Its Properties
type: source
source_type: lecture
link: https://handbook.unimelb.edu.au/subjects/comp90054
tags: [week-02, search, blind-search, complexity]
date: 2026-08-10
---

# Week 2a Blind Search and Its Properties

Slides and recording are on Canvas (COMP90054 LMS); the link above is the public
handbook entry, since Canvas is not publicly accessible.

## Overview

The first live lecture of week 2, given by [[nir-lipovetzky]], sets up the four
questions used all subject to judge whether a search algorithm suits a given problem:
completeness, optimality, time complexity, and space complexity. Before naming them the
lecture motivates the last two through a human example — chess players have full
knowledge of the rules, full observability of the board, and reliable senses, yet are
not rational, because computation and memory are both bounded. The same four bounds
apply to algorithms.

Breadth-first search is introduced as always expanding the shallowest open node,
implemented with a queue. Discussion with the class establishes it is complete whenever
the graph's solution-relevant component is connected — cycles do not trap it, because
every cycle unrolls into an ever-deeper tree rather than a loop the search revisits — but
it is optimal only under uniform edge cost. Where costs vary, breadth-first search can
return a higher-cost path before a cheaper, deeper one; Dijkstra's algorithm
(uniform-cost search) is named as the minimal fix, swapping the queue for a
priority queue ordered by accumulated cost. Time and space complexity are both derived
as $b^d$, where $b$ is the branching factor and $d$ is the depth of the shallowest goal,
by counting nodes layer by layer as a geometric progression dominated by its largest
term. A worked implementation detail is stressed here: checking for the goal at node
*generation* rather than node *expansion* changes the exponent from $d$ to $d+1$, a
difference each student is warned to get right in the first assignment.

Depth-first search is the dual, always expanding the deepest open node, implemented with
a stack. The class reaches consensus that it is complete only if repeated states are
tracked (otherwise a cycle can trap it forever) and that even then it is not optimal,
since nothing stops it from taking an early deep branch over a shallow solution close by.
Its practical advantage is space: because backtracking discards everything outside the
current branch, space complexity drops to $b \cdot m$, where $m$ is the depth of the
deepest branch explored (not the shallowest solution), rather than the full $b^d$ tree
breadth-first search must hold in memory — provided that cycle detection is scoped to the
current branch and does not itself require storing the whole visited set, which would
cancel the saving.

Iterative deepening is presented as depth-first search re-run with an increasing depth
limit, starting at 0 and incrementing until a solution is found. This combines
breadth-first search's completeness and (under uniform cost) optimality with depth-first
search's $O(bm)$ space bound, at the cost of re-expanding shallow nodes on every
iteration — a cost the lecture shows is small in practice, since the deepest layer, done
once, already dominates the total node count under big-O reasoning. Iterative deepening
is credited as the technique that first solved Rubik's Cube and as underlying the 1970s
search work behind [[shakey-the-robot|Shakey]]-era planning, and its combination with
inference is flagged as next week's topic.

## Key concepts

- [[blind-search]]
- [[breadth-first-search]]
- [[depth-first-search]]
- [[iterative-deepening-search]]
- [[search-node]]
- [[planning-complexity]]

## Key entities

- [[nir-lipovetzky]]

## Topics covered (revision checklist)

- The four evaluation dimensions: completeness, optimality, time complexity, space complexity
- Chess as an example of bounded rationality despite full knowledge, full observability, and correct sensors
- Breadth-first search: shallowest-first expansion, FIFO queue implementation
- Breadth-first search completeness under connectedness; behaviour in the presence of cycles (unrolled into the tree, not a trap)
- Breadth-first search optimality holds only under uniform edge cost; failure case with mixed-cost edges
- Dijkstra's algorithm / uniform-cost search as breadth-first search with a priority queue
- Time and space complexity of breadth-first search as $b^d$, derived by summing a geometric series
- The node-generation-versus-node-expansion goal test and its impact on the complexity exponent ($d$ versus $d+1$)
- Depth-first search: deepest-first expansion, LIFO stack implementation, backtracking
- Depth-first search completeness requires cycle/repeated-state detection; without it the search can loop forever
- Depth-first search is not optimal, even with cycle detection
- Depth-first search space complexity as $b \cdot m$, and why $m$ (deepest branch explored) replaces $d$ (shallowest solution depth)
- The tension between full-tree repeated-state tracking and the space saving depth-first search is meant to provide
- Iterative deepening: depth-first search re-run at increasing depth limits
- Iterative deepening inherits breadth-first search's completeness and uniform-cost optimality, and depth-first search's space bound
- Why repeating shallow-node expansion across iterations does not change the dominant time complexity term
- Iterative deepening's historical role: solving Rubik's Cube, and its use alongside inference in the 1970s

## Notable claims / results

- Breadth-first search is complete whenever the reachable graph is connected to a solution, but is optimal only under uniform edge cost; under non-uniform cost it can return a suboptimal solution before ever finding the optimal one.
- Depth-first search is complete only with repeated-state detection scoped to the current branch, and is never guaranteed optimal.
- Depth-first search space complexity is $O(bm)$ against breadth-first search's $O(b^d)$, because only the current branch, not the whole explored tree, needs to stay in memory.
- Checking whether a state is a goal at generation time rather than expansion time changes breadth-first search's complexity from $O(b^d)$ to $O(b^{d+1})$ — a purely implementation-level difference with an exponential effect.
- Iterative deepening combines breadth-first search's completeness/optimality guarantees with depth-first search's linear space bound, and the repeated work across iterations is dominated by the final, deepest iteration.

## Connections

- Builds directly on [[w02-prerecorded-search-fundamentals]], which introduces the same three algorithms and poses their completeness/optimality as open questions resolved live in this lecture.
- The formal search-node vocabulary ($g(n)$, open list, closed list) used throughout comes from [[w02-prerecorded-search-fundamentals]].
- Precedes [[w02b-width-and-iterative-search]], which moves from blind search to factored representations and the novelty-based [[iterative-width-search|IW]] algorithm.
- The $b^d$/PSPACE contrast connects to [[planning-complexity]].
