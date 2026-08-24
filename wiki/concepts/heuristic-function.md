---
title: Heuristic Function
type: concept
tags: [search, heuristics, week-03]
date: 2026-08-16
---

# Heuristic Function

A function mapping each state of a planning task to an estimate of the cost remaining
from that state to the nearest goal. It is the single ingredient separating heuristic
(informed) search from [[blind-search]].

## Formula

For a planning task $\Pi$ with state space $S$, a heuristic is a function

$$h : S \mapsto \mathbb{R}_0^+ \cup \{\infty\}$$

and $h(s)$ is called the *heuristic value*, or $h$-value, of $s$. The *remaining cost*
of $s$ is the cost of an optimal plan for $s$, or $\infty$ when no plan exists; the
*perfect heuristic* $h^*$ assigns every state its remaining cost.

## How it works

A heuristic needs no properties at all for most heuristic search algorithms to remain
correct and terminate — any function from states to numbers will do. What it changes is
performance, through two competing quantities.

The first is **informedness**: how closely $h$ tracks $h^*$. The extremes bound the
range. At one end, $h = 0$ for every state carries no information, cannot distinguish
any two states, and reduces heuristic search to blind search; the same is true of any
constant. At the other end, $h^*$ is perfectly informed. For some algorithms, notably
[[a-star-search]], formal quality properties of $h$ can be related by proof to the
number of nodes expanded; for others, "it works well in practice" is as much analysis
as is available.

The second is **evaluation cost**. Because planning is PSPACE-complete and therefore
exponential on a deterministic machine (see [[planning-complexity]]), computing $h^*$
for a single state means solving an exponential problem, and a search evaluates its
heuristic once per generated state. The perfect heuristic is therefore not the design
target. A useful heuristic approximates $h^*$ as closely as it can while staying cheap
to evaluate, and the balance between the two is what distinguishes one heuristic from
another.

The properties used to reason formally about a heuristic — safe, goal-aware, admissible,
consistent — are covered in [[heuristic-properties]], along with which guarantee of
which algorithm each one buys.

## Why it matters

Every state-of-the-art satisficing planner is a heuristic search: a heuristic derived
automatically from the problem description, plugged into
[[greedy-best-first-search]] or [[best-first-width-search]]. Deriving those heuristics
automatically, rather than writing them by hand for each domain, is what makes the
approach general — a hand-written heuristic stops being valid the moment the problem
changes and nobody is there to rewrite it.

## Relationships

- Judged by the four properties in [[heuristic-properties]]
- Consumed by [[greedy-best-first-search]], [[a-star-search]], [[weighted-a-star]], [[hill-climbing]], [[enforced-hill-climbing]], [[ida-star]]
- Contrasted with [[novelty]], which derives its ordering from the search's past rather than an estimate of its future
- Absent (equivalently, constant) in [[blind-search]]
- Generated automatically by [[relaxation]], rather than hand-designed, in every heuristic covered from week 4 onward: [[goal-counting-heuristic]], [[max-heuristic]], [[additive-heuristic]], [[relaxed-plan-heuristic]]

## Sources

- [[w03-prerecorded-heuristic-search]] — formal definition, $h^*$, informedness, and the cost trade-off
- [[w03a-heuristic-functions-properties]] — the PSPACE argument against using $h^*$, and $h = 0$ as the blind heuristic
- [[w04a-generating-heuristic-functions]] — relaxation as the general method for deriving $h$ automatically from a problem description
