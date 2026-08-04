---
title: Models and Solvers
type: concept
tags: [methodology, week-01, foundations]
date: 2026-08-04
---

# Models and Solvers

The organising paradigm of modern AI: rather than writing a program that solves one
problem, express the problem as an instance of a general *model* and hand it to a
*solver* that handles every instance of that model.

## How it works

The pipeline is problem → model → solver → solution, with a language sitting between
the problem and the model to make the model description compact. The defining property
is that the solver is *general*: it has no access to what the variables mean and no
special-casing for the problem at hand, only a requirement that the input conform to
the model.

The template example is a system of linear equations. Given "John is three times
Peter's age, and in ten years he will be twice Peter's age", the modelling step
produces $J = 3P$ and $J + 10 = 2(P+10)$, and Gauss-Jordan elimination returns
$P = 10$, $J = 30$. Gauss-Jordan is a solver in the intended sense — it solves any
linear system, not this one. The disanalogy is that linear systems are tractable while
every interesting AI model is not: SAT and CSP are NP-complete, classical planning is
PSPACE-complete (see [[planning-complexity]]).

This is what distinguishes the post-1990s agenda from the knowledge-engineering era
that preceded it. Under [[theories-as-programs]], a program that failed could always be
blamed on missing knowledge, and nothing was falsifiable. A solver, by contrast, makes
a claim about a whole family of problems, so it can be tested against benchmarks it has
never seen — hence the empirical methodology of standard benchmark sets and the
[[international-planning-competition]].

Because the models are intractable, the entire research programme reduces to scaling up,
and scaling up means recognising and exploiting the structure of a problem. Four
recurring routes: deriving better heuristics, learning from conflicts, finding islands
of tractability (grid pathfinding is polynomial, for instance), and transforming a
problem into a form that is easier to solve. The generic mechanism underneath all of
them is the pairing described in [[search-and-inference]].

## Why it matters

Everything in the subject is an instance of this pattern. [[classical-planning]],
[[conformant-planning]], [[markov-decision-process]] and [[partially-observable-mdp]]
are models; [[strips]] and [[pddl]] are languages for describing them; planners are
solvers. Understanding a new technique amounts to asking which model it targets and
what structure it exploits.

## Relationships

- Instantiated by [[classical-planning]] and its relaxations
- Languages for the models: [[strips]], [[pddl]]
- The methodology it replaced: [[theories-as-programs]]
- Mechanism for scaling: [[search-and-inference]]
- Other models in the taxonomy: [[boolean-satisfiability]], [[constraint-satisfaction-problem]]
- Empirical evaluation: [[international-planning-competition]]

## Sources

- [[w01-prerecorded-ai-overview]] — videos 2, 3 and 6 develop the paradigm, the Gauss-Jordan example, and the scaling agenda
- [[w01b-introduction-to-planning]] — adds the language as the missing component of the toolchain
