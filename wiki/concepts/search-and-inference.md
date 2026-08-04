---
title: Search and Inference
type: concept
tags: [foundations, algorithms, heuristics, week-01]
date: 2026-08-04
---

# Search and Inference

The two ingredients present in every solver covered in the subject. Search explores the
space of possibilities; inference derives cheap information about the problem's
structure and uses it to steer the search away from most of that space.

## How it works

Search alone is enough to be correct and hopeless in practice. Blind search over the
state space of a planning problem is direct but does not scale, because the space is
exponential in the number of variables. Inference is what makes search feasible: it
exploits structure in the problem description to produce guidance, typically a heuristic
estimate of how far a state is from the goal, or a constraint ruling out regions
entirely.

The requirement on inference is that it must be cheap. Guidance that is expensive to
compute buys nothing, since the time spent computing it could have been spent searching.
This tension — accuracy of guidance against cost of producing it — is the recurring
design question in every solver.

The pairing shows up across models with different names for the same idea. In SAT, the
inference methods are unit propagation and conflict-driven clause learning. In classical
planning, they are heuristics derived automatically from the problem's causal structure,
which is why encoding a problem in [[pddl]] rather than as a raw state graph matters:
the language exposes the cause-and-effect relationships that inference reads. In
constraint programming, they are constraint propagation and arc consistency.

The intuition analogy the lecture uses is worth stating precisely: what we call intuition
in human problem solving also works by recognising which components of a problem matter
and discarding the rest, and it is useful because it is fast.

## Why it matters

This is the answer to the scaling problem posed by [[models-and-solvers]]. Since every
model of interest is intractable, no solver can avoid exponential worst-case behaviour;
what a good solver does is behave well on the problems people actually pose, and it does
that by finding and exploiting their structure. Related routes to the same end are
islands of tractability (restricting the model until it becomes polynomial, as grid
pathfinding is) and transformations that compile away features of a problem in the hope
that what remains is easier.

## Relationships

- The scaling mechanism behind [[models-and-solvers]]
- Applied to [[classical-planning]], [[boolean-satisfiability]] and [[constraint-satisfaction-problem]]
- Why the choice of language matters for inference: [[strips]], [[pddl]]

## Sources

- [[w01-prerecorded-ai-overview]] — video 4 names search and inference as the two universal ingredients; video 6 lists the scaling routes
- [[w01b-introduction-to-planning]] — the two roles of language, specification and computation, are the same point from the language side
