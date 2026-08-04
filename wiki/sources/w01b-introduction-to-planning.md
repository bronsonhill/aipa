---
title: Week 1b Introduction to Planning
type: source
source_type: lecture
link: https://handbook.unimelb.edu.au/subjects/comp90054
tags: [week-01, strips, pddl, state-models, complexity, blocksworld]
date: 2026-08-04
---

# Week 1b Introduction to Planning

Slides and recording are on Canvas (COMP90054 LMS); the link above is the public
handbook entry, since Canvas is not publicly accessible.

## Overview

The second live lecture opens with the [[shakey-the-robot|Shakey robot]] film from 1970
and a question: of everything that came out of Shakey — the planner, the algorithm, the
language — what actually survived? The answer, and the lecture's organising claim, is
the language. [[strips|STRIPS]] the algorithm is a historical curiosity; STRIPS the
language is still in use, now as the core fragment of [[pddl]]. The stated objective is that by the end of
the hour every student can speak a new language.

The argument for why language matters is made through Roman numerals. Multiplying 39
by 134 in Roman numerals requires a halving-and-doubling table and a final summation;
in Arabic numerals it is routine. The notation did not merely change how concisely the
numbers were written, it changed which manipulation procedures were available at all.
Language therefore plays two roles: representation (how compactly information can be
stated) and computation (how easily it can be manipulated). This is why the
problem/model/solver toolchain from the pre-recorded videos is incomplete — a component
is missing between the problem and the model, and that component is a language.

The concrete content is [[strips]]: a problem is a tuple $P = \langle F, O, I, G\rangle$
of facts, operators, initial situation and goal, with each operator carrying a
precondition, an add list and a delete list. The lecture derives the semantics
explicitly, showing how these four symbols generate a state model whose state space is
$2^F$ — a linear amount of syntax encoding an exponentially larger state space, which
was exactly the goal. [[blocksworld]] is the worked example: the class collectively
models the `stack(x,y)` action, and along the way notices the modelling heuristic that
an action's delete list usually mirrors its preconditions.

The lecture's centrepiece is a peer-instruction exercise on a subtly broken domain: a
`stack` action that omits `clear(y)` from its delete list. The room votes, discusses in
pairs, and votes again, converging on the correct answer — the model now permits states
where two different blocks sit on the same block, because `clear(y)` never becomes
false. The point drawn out is that syntactic errors get caught by the parser, while
semantic errors quietly admit plans that do not correspond to anything real. Hence the
recommended toolchain includes [[val]] as a plan validator, and hence the advice to write
expected plans and plans that *should not* exist and test the model against both — see
[[plan-validation]] for that workflow and the three strategies for debugging a domain
that returns no plan. The same warning is applied to LLM-generated plans, which are not
sound and need validating against the model.

The remainder covers [[pddl]] proper: the domain/problem split (actions and predicates
in the domain, objects, initial state and goal in the problem — one domain, unboundedly
many problems), typing, the [[closed-world-assumption]] on `:init` only, and the
[[lifted-representation]] that distinguishes predicate logic from the propositional
model underneath. The accompanying slides go further into [[planning-complexity]]
(PlanEx and PlanLen are PSPACE-complete, placing planning above
[[boolean-satisfiability|SAT]]), the split between
[[satisficing-and-optimal-planning|satisficing and optimal planning]], the history of
computational approaches from GPS through Graphplan to
[[search-and-inference|heuristic search]], and the
[[international-planning-competition]].

## Key concepts

- [[classical-planning]]
- [[conformant-planning]]
- [[markov-decision-process]]
- [[partially-observable-mdp]]
- [[control-problem]]
- [[closed-world-assumption]]
- [[lifted-representation]]
- [[planning-complexity]]
- [[satisficing-and-optimal-planning]]
- [[plan-validation]]
- [[models-and-solvers]]

## Key entities

- [[strips]]
- [[pddl]]
- [[blocksworld]]
- [[shakey-the-robot]]
- [[val]]
- [[editor-planning-domains]]
- [[international-planning-competition]]
- [[nir-lipovetzky]]

## Topics covered (revision checklist)

- Shakey (1970) and the survival of the STRIPS language over the STRIPS algorithm
- Roman numeral multiplication as an argument that notation determines available algorithms
- The two roles of language: concise representation, and tractable manipulation
- The toolchain problem → language → model → solver → solution
- The three approaches to the control problem: programming-based, learning-based, model-based
- Advantages and failure modes of each approach (Mario as the running example)
- General problem solving and its successive weakenings ("Ambition 1.0 / 2.0 / 3.0")
- The classical planning state model: finite discrete $S$, known $s_0$, goal set $S_G$, applicable actions $A(s)$, deterministic $f(a,s)$, action costs $c(a,s)$
- Conformant planning: a *set* of possible initial states and a non-deterministic transition function, with no observation
- MDPs: transition probabilities with full observability; solutions are policies
- POMDPs: belief states, a sensor model $P_a(o \mid s)$, solutions map belief states to actions
- The grid-navigation example distinguishing classical / MDP / POMDP by which assumptions hold
- STRIPS as the tuple $\langle F, O, I, G\rangle$; operators as (Pre, Add, Del)
- STRIPS semantics: how the four components induce a state model with $S = 2^F$
- Blocksworld: `on`, `onTable`, `clear`, `holding`, `armEmpty`; the actions `stack`, `unstack`, `pickup`, `putdown`
- Modelling `stack(x,y)` from scratch: precondition, add list, delete list
- The heuristic that preconditions and delete effects usually coincide
- Why an incomplete delete list admits physically impossible states
- PDDL history: 1.0 (1998), 2.1 numeric fluents and durative actions (2003), later functional/multi-agent/epistemic extensions
- PDDL domain anatomy: `:requirements`, `:types`, `:predicates`, `:action` with `:parameters`, `:precondition`, `:effect`
- PDDL problem anatomy: `:domain`, `:objects`, `:init`, `:goal`
- The closed-world assumption, and that it applies to `:init` but not to the goal
- Expressive conveniences that add no expressivity: negative preconditions, existential and universal quantifiers, typing
- Lifted versus propositional representation; action schemas and grounding
- Parser errors versus semantic errors; reading FF-parser versus FD-parser messages
- Reading VAL output for valid and invalid plans
- Three debugging strategies: goal decomposition, binary search over an expected plan / landmarks, action preconditions as goals
- Satisficing versus optimal planning; PlanEx and PlanLen as decision problems
- PSPACE-completeness of PlanEx and PlanLen; domain-specific cases where PlanEx is in P but PlanLen is NP-complete
- Blocksworld state counts as a demonstration of combinatorial explosion
- Computational approaches: GPS/STRIPS, partial-order planning, Graphplan, planning as heuristic search, planning as SAT
- IPC history and winners; the caveat that winning IPC means winning on those benchmarks under those criteria

## Notable claims / results

- What survived from Shakey was the language, not the algorithm. STRIPS remains the base expressivity level of PDDL today.
- Language has two roles, representation and computation, and the choice of language changes which manipulations are feasible — Roman versus Arabic numerals being the demonstration.
- With $|F|$ facts, STRIPS encodes a state space of size $2^{|F|}$: a linear-size description of an exponentially large model. This compactness is the entire point of having a planning language.
- Omitting `clear(y)` from `stack(x,y)`'s delete list does not make the action inapplicable and is not harmless bookkeeping. It admits states in which two distinct blocks are on the same block.
- In PDDL, preconditions and delete effects generally coincide. This is a modelling heuristic with known exceptions, not a rule.
- Anything not listed in `:init` is false (closed-world assumption). This applies to the initial state only, not the goal.
- One domain file serves an unbounded number of problem files: actions and predicates are shared, while objects, initial state, and goal vary per instance.
- PlanEx and PlanLen are both PSPACE-complete in general. Within particular benchmark domains such as Blocksworld and Logistics, PlanEx is in P while PlanLen is NP-complete.
- Blocksworld state counts grow explosively: 13 states for 3 blocks, 501 for 5, 58,941,091 for 10.
- LLMs are not sound planners; plans they produce must be validated against the model.
- Winning the IPC establishes superiority only on those benchmarks under that year's scoring criteria.

## Connections

- Formalises the model hierarchy sketched in video 4 of [[w01-prerecorded-ai-overview]].
- Continues from [[w01a-introduction-to-ai]], which established *acting rationally* as the target and named the three classical assumptions.
- The compactness argument here is the concrete payoff of [[models-and-solvers]].
