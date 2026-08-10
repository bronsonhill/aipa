---
title: Week 1 Pre-recorded Videos on AI and Planning
type: source
source_type: video
link: https://www.youtube.com/watch?v=vmt-OuH4iSI
tags: [week-01, introduction, history, models-and-solvers, applications, search]
date: 2026-08-04
---

# Week 1 Pre-recorded Videos on AI and Planning

## Overview

Eight short videos by [[nir-lipovetzky]] that carry roughly an hour of background
knowledge and are meant to be watched *before* the live week 1 lectures. The first six
trace a single argument: AI in the 1960s–80s tried to capture intelligence by
hand-coding knowledge into programs, that methodology failed for reasons that were
scientific rather than technical, and the field's recovery from the 1990s onward came
from reframing AI problems as *models* solved by *general solvers*. Two further videos,
released later, formalise the search machinery those models are solved with.

The first two videos are historical. The [[dartmouth-workshop|Dartmouth meeting of 1956]] coined the term
"artificial intelligence" and set out the conjecture that every aspect of intelligence
can be described precisely enough for a machine to simulate it. Research through the
following decades concentrated on knowledge representation and programming — Lisp,
Prolog, rule-based systems, expert systems — and a typical dissertation picked a task,
introspected on how it should be solved, and encoded that reasoning as a program. The
methodological failure was that a [[theories-as-programs|theory expressed as a program]]
cannot be proved wrong:
when it fails you can always blame missing knowledge. The three available responses
(narrow the domain, call the program a demo, add more knowledge) each sacrifice
generality, scientific value, or comprehensibility, and the resulting impasse produced
an AI winter.

The middle videos set out the replacement paradigm. From the 1990s the field's papers
fall into categories — [[boolean-satisfiability|SAT]] and
[[constraint-satisfaction-problem|constraints]], search and planning, probabilistic
reasoning, probabilistic planning, machine learning, natural language, vision and
robotics, multi-agent systems — and each is more usefully understood as a *model* with
associated *solvers* than as a bag of techniques. The worked illustration is a system
of linear equations solved by Gauss-Jordan: the solver is general because it cares only
that the input is a linear system, not what the variables mean. AI's models are the
same shape but intractable, so the research problem is scaling up, and scaling up means
recognising and exploiting the structure of a problem. Video 4 gives the first informal
statement of [[classical-planning]] — state variables, actions that change them, an
initial state and a goal — which [[w01b-introduction-to-planning]] later formalises and
encodes in [[strips]]. The recurring pair of ingredients
across every model is [[search-and-inference|search and inference]]: search explores the
possibilities, and inference is the cheap reasoning that guides it. Planning is also
established here as harder than SAT and CSP, being PSPACE-complete rather than
NP-complete — see [[planning-complexity]].

The last videos cover why anyone wants this. Board games mattered historically because
they are deterministic and fully observable, which makes them a clean testbed for
scaling; the applications since range across speech recognition, recommender systems,
medical treatment planning, self-driving path planning, and Atari. Planning specifically
has shone in space exploration (NASA's 1998 autonomous spacecraft controller, the
[[remote-agent-experiment]]), business process management, game AI, interactive
storytelling, network penetration testing, logistics, and warehouse automation. The
field's evaluation is empirical throughout, run on shared benchmarks and in the
[[international-planning-competition]].

Videos 7 and 8, released alongside week 2, shift from motivation to formal machinery.
"Intro to Search" states the [[state-space-modelling|formal state model]] as a six-tuple
— states, initial state, goal states, an applicability function, a deterministic
transition function, and an action-cost function — and observes that swapping out any
one of the model's core ingredients (a set rather than a single initial state,
probabilistic rather than deterministic transitions, rewards rather than costs) yields a
genuinely different model requiring different algorithms and producing different kinds
of solution. It draws the correspondence between a state model and a graph (states as
nodes, single-action reachability as edges), and states this graph is always encoded
*implicitly*: it does not fit in memory as a whole, so search must discover it while
running, from the initial state outward. It closes with the distinctions between blind
and heuristic (informed) search, and between systematic and local search, and notes
that heuristic search dominates satisficing planning while blind search remains
competitive for optimal planning — see [[satisficing-and-optimal-planning]]. "Search
terminology" then defines the shared vocabulary used from week 2 onward: a
[[search-node|search node]] (a state plus the path information used to reach it), the
cost function $g(n)$, the cheapest-cost function $g^*(n)$, node expansion, search
strategy, and the open list/closed list distinction between a search tree's frontier and
its already-expanded interior.

## Video list

| # | Title | Length | Link |
|---|---|---|---|
| 1 | AI History | 9:21 | https://www.youtube.com/watch?v=vmt-OuH4iSI |
| 2 | Modern AI | 2:28 | https://www.youtube.com/watch?v=ZnYu5MJti3M |
| 3 | Models and Solvers | 10:10 | https://www.youtube.com/watch?v=Sl9abdTUV5M |
| 4 | AI Planning Models | 7:19 | https://www.youtube.com/watch?v=sJMCCIQpbZY |
| 5 | Applications | 11:54 | https://www.youtube.com/watch?v=5vaolo43Zu0 |
| 6 | Summary so far | 2:01 | https://www.youtube.com/watch?v=LD8KseUyeEs |
| 7 | Intro to Search | — | https://www.youtube.com/watch?v=DvTSEVwkt98 |
| 8 | Search terminology | — | https://www.youtube.com/watch?v=mcINtGFnZa8 |

Videos 3 and 4 carry the technical content the week 1b live lecture builds on. Videos 7
and 8 carry the technical content [[w02a-blind-search-properties]] and
[[w02-prerecorded-search-fundamentals]] build on.

## Key concepts

- [[models-and-solvers]]
- [[theories-as-programs]]
- [[classical-planning]]
- [[search-and-inference]]
- [[boolean-satisfiability]]
- [[constraint-satisfaction-problem]]
- [[partially-observable-mdp]]
- [[state-space-modelling]]
- [[search-node]]
- [[satisficing-and-optimal-planning]]

## Key entities

- [[nir-lipovetzky]]
- [[dartmouth-workshop]]
- [[remote-agent-experiment]]

## Topics covered (revision checklist)

- Dartmouth 1956, the coining of "artificial intelligence", and the founding proposal's conjecture
- The four Dartmouth proposers and what each is known for
- *Computers and Thought* (1963) and what its table of contents reveals about 1960s AI research, opening with Turing on whether a machine can think — see [[turing-test]]
- 1960s–80s AI: Lisp, Prolog, rule-based programming, expert systems, shells and architectures
- The theories-as-programs methodology and why it cannot be falsified
- Three responses to a failing program, and the weakness of each
- The AI winter and the "good old-fashioned AI is rule application" criticism
- The nine research areas of AI from the 1990s onward; which four this subject covers
- Reinforcement learning as the nexus of probabilistic planning and machine learning
- The problem/model/solver pipeline; linear equations and Gauss-Jordan as the template
- Generality of solvers: solvers care about model compliance, not problem semantics
- Tractability of linear equations versus intractability of interesting AI models
- Constraint satisfaction: finite-domain variables plus constraints; the eight queens example
- SAT: clauses over Boolean variables, negation normal form, NP-completeness
- Practical scale of modern SAT solvers, and their use in circuit verification
- The planning model: state variables, actions, initial state, goal state
- Planning with feedback; solutions as policies or trees rather than sequences
- POMDPs as an expressive model; the LA youth-homelessness/HIV information-spread application
- Search and inference as the two universal ingredients
- Empirical methodology: standard benchmarks, international competitions, avoiding overfitting to benchmarks
- Board games as testbeds: determinism and full observability; poker as the harder case
- Applications: Shazam via hidden Markov models and Viterbi, recommender systems, medical treatment sequencing, self-driving path planning, Atari
- Planning applications: NASA space exploration, business process management, the game *F.E.A.R.*, interactive storytelling, penetration testing, logistics, Xerox PARC printing, warehouse automation and multi-agent pathfinding
- Routes to scaling up: better heuristics, conflict learning, islands of tractability, problem transformations
- The formal state model as a six-tuple: states, initial state, goal states, applicability function, transition function, cost function
- Changing any core model ingredient (single versus multiple initial states, deterministic versus probabilistic transitions, costs versus rewards) yields a different model requiring different algorithms
- The correspondence between a state model and a graph, and why that graph is always encoded implicitly rather than stored in full
- Blind versus heuristic (informed) search, and systematic versus local search
- Heuristic search dominates blind search for satisficing planning; for optimal planning the gap is much smaller
- Search node, $g(n)$, $g^*(n)$, node expansion, search strategy, open list, closed list

## Notable claims / results

- The term "artificial intelligence" was coined at the 1956 Dartmouth meeting; its proposal conjectured that every aspect of intelligence can in principle be described precisely enough for a machine to simulate it.
- Theories expressed as programs cannot be proved wrong, because failure can always be attributed to missing knowledge. This is presented as the root methodological cause of the first AI winter, not a shortage of compute.
- Minsky's *Perceptrons* is credited with stalling neural network research for roughly 30 years; what was missing at the time was computational power.
- SAT and CSP are NP-complete, so worst-case behaviour is exponential in the number of variables ($2^{100} \approx 10^{30}$), yet current solvers routinely handle thousands of variables and hundreds of thousands of clauses.
- Classical planning is NP-hard, and more precisely PSPACE-complete — strictly harder than SAT and CSP.
- Solvers are general over a *family* of problems (a model), not tailored to instances. This generality is what distinguishes the models-and-solvers agenda from 1970s AI programs.
- Pathfinding on a grid is polynomial, which makes it an example of an "island of tractability" within the broader planning landscape.
- NASA launched a spacecraft in 1998 whose task-level control was handled by a planner, the first AI control system to fly a spacecraft without human supervision.
- The game *F.E.A.R.* (early 2000s) is still cited as among the best game AI, and it used a planner descended from 1970s work.

## Connections

- The live lectures that build on these videos: [[w01a-introduction-to-ai]] and [[w01b-introduction-to-planning]].
- Videos 3 and 4 introduce the model hierarchy that [[w01b-introduction-to-planning]] formalises as [[classical-planning]], [[conformant-planning]], [[markov-decision-process]] and [[partially-observable-mdp]].
- Videos 7 and 8 introduce the search-node vocabulary and formal state model that [[w02-prerecorded-search-fundamentals]] and [[w02a-blind-search-properties]] build on directly.
