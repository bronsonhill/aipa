---
title: Week 2 Pre-recorded Videos on Search Fundamentals
type: source
source_type: video
link: https://www.youtube.com/watch?v=IHwb1bquqLc
tags: [week-02, search, blind-search, foundations]
date: 2026-08-10
---

# Week 2 Pre-recorded Videos on Search Fundamentals

## Overview

Three short videos by [[nir-lipovetzky]] meant to be watched before the week 2 live
lectures. They give the vocabulary and the formal three-function interface
(start/is-target/successor) that any search algorithm is built from, then introduce
breadth-first and depth-first search and pose their completeness and optimality as open
questions for the live lecture to resolve.

The first video ("Search Basics") reiterates that a state model encodes a graph
implicitly — the full graph is never materialised, only the reachable portion discovered
during search — and gives the three operations every search algorithm needs: a `start`
function returning the initial state, an `is_target` (goal test) function, and a
`successor` function generating the state reached by applying an action. It draws a
distinction, flagged as not required for this subject but useful background, between a
*search state* (a single world state, when searching forward from the initial state) and
a *search state under regression* (a set of world states, when searching backward from a
partial goal description). It formalises the *search node* as a state plus bookkeeping —
a pointer to the parent node, the action used to reach it, and $g(n)$, the accumulated
cost from the initial state — and explains that storing parent and action is what lets a
plan be reconstructed by walking back from a goal node to the root. It then defines
**completeness** (guaranteed to find a solution if one exists, given unbounded time and
memory) and **optimality** (the first solution returned is guaranteed cheapest), and the
two complexity dimensions, time and space, measured not in seconds but in the number of
generated and expanded states respectively — parameterised by the *branching factor* $b$
(average successors per node) and the *goal depth* $d$ (depth of the shallowest goal
state).

The second video ("Breadth First Search") frames the blind-versus-informed distinction
as a pros/cons quiz: blind search needs only the problem definition and is simple to
implement, but always expands in the same fixed order regardless of where the solution
actually is; informed search needs a heuristic function, which is harder to build and
whose guarantees are harder to establish, but is typically far more effective in
practice. It then walks through breadth-first search's shallowest-first, FIFO expansion
order on a worked tree, and poses two questions for the live lecture: is breadth-first
search complete, and is it optimal under non-uniform edge costs?

The third video ("Depth First Search") does the same for depth-first search: deepest-
first, LIFO expansion with backtracking once a branch is exhausted, worked through on
the same style of tree, again posing completeness and optimality as open questions for
discussion live.

## Video list

| # | Title | Link |
|---|---|---|
| 1 | Search Basics | https://www.youtube.com/watch?v=IHwb1bquqLc |
| 2 | Breadth First Search | https://www.youtube.com/watch?v=nsXpe4HGrso |
| 3 | Depth First Search | https://www.youtube.com/watch?v=Nkdw8xzU9gk |

## Key concepts

- [[search-node]]
- [[blind-search]]
- [[breadth-first-search]]
- [[depth-first-search]]
- [[state-space-modelling]]

## Key entities

- [[nir-lipovetzky]]

## Topics covered (revision checklist)

- The three-function search interface: start, is-target (goal test), successor
- State models encode graphs implicitly; the graph is discovered during search, not stored up front
- Search state versus world state under forward search (one-to-one) versus regression/backward search (a search state can represent a set of world states)
- Search node as state plus parent pointer, action, and $g(n)$
- Reconstructing a plan by walking parent pointers back to the initial state
- Completeness: guaranteed to find a solution given unbounded time and resources, if one exists
- Optimality: the first solution returned is guaranteed cheapest
- Time complexity measured as number of generated states; space complexity as memory to store states, both parameterised by branching factor $b$ and goal depth $d$
- Distinguishing generated states from expanded states
- Pros and cons of blind versus informed search
- Breadth-first search: shallowest-first order, FIFO queue, worked tree example
- Depth-first search: deepest-first order, LIFO stack, backtracking, worked tree example
- Completeness and optimality of BFS and DFS posed as open discussion questions

## Notable claims / results

- A search node is defined as (state, parent, action, $g(n)$); $g(n)$ is the cost of the path from the initial state to $n$, and $g^*(n)$ (introduced separately) is the cost of the cheapest such path.
- Blind search requires no additional input beyond the problem definition, but always expands nodes in the same order regardless of solution location; informed search requires a heuristic function that is generally hard to construct but far more effective in practice.
- Time and space complexity of blind search algorithms are conventionally expressed in terms of two parameters: branching factor $b$ and goal depth $d$.

## Connections

- The formal vocabulary here (search node, open/closed list via [[search-node]]) underpins the algorithms resolved in [[w02a-blind-search-properties]].
- Extends the state-model formalism introduced across [[w01-prerecorded-ai-overview]] and [[w01b-introduction-to-planning]]; see [[state-space-modelling]].
- Precedes [[w02b-width-and-iterative-search]], where the same search-node machinery underlies iterative width.
