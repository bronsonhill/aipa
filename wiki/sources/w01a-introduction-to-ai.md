---
title: Week 1a Introduction to AI
type: source
source_type: lecture
link: https://handbook.unimelb.edu.au/subjects/comp90054
tags: [week-01, introduction, rationality, agents, subject-admin]
date: 2026-08-04
---

# Week 1a Introduction to AI

Slides and recording are on Canvas (COMP90054 LMS); the link above is the public
handbook entry, since Canvas is not publicly accessible.

## Overview

The first live lecture, given by [[nir-lipovetzky]], opens with an explicit promise:
by the end of the hour students should have a clear idea of what AI is and, just as
importantly, what it is not — meaning which corner of AI this subject occupies. The
first half covers subject structure and assessment; the second delivers on the promise
by working through four competing definitions of AI and landing on the one the subject
adopts.

The definitional argument proceeds by elimination. Minsky's engineering definition —
making machines do things that would require intelligence if done by humans — founders
on the question of which human activities qualify, since eagles see better than humans
without anyone calling eagles intelligent. Turing's imitation game (from *Computing
Machinery and Intelligence*, 1950) operationalises it as a test, and Searle's Chinese
Room argues in reply that a system passing the test may be simulating understanding
rather than possessing it. Lipovetzky applies this directly to large language models:
they can simulate intelligence, but whether they are intelligent is not a well-defined
question. Haugeland's "machines with minds in the full and literal sense" points at
cognitive science, which is outside the subject's scope. The definition adopted is
Luger and Stubblefield's: AI is the branch of computer science concerned with the
automation of intelligent behaviour, where intelligent behaviour means making rational
action choices. On the standard two-by-two of thinking versus acting and humanly versus
rationally, the subject sits squarely in *acting rationally*.

Rationality then gets unpacked. A [[rational-agent]] perceives through sensors and acts
through actuators, and doing "the right thing" only has meaning relative to a stated
performance measure — the autonomous vacuum cleaner example draws several plausible and
mutually inconsistent measures from the room. Rationality is defined as a mapping from
performance measure, percepts, and knowledge to the best available action, and is
distinguished from omniscience. Four things can make an agent irrational: the wrong
performance measure, limited or faulty perception, wrong knowledge, and — the one the
class is led to discover using chess, where the first three are all satisfied yet nobody
is a grandmaster — insufficient computation. That fourth failure mode is the subject's
whole problem.

The administrative half sets out the subject's shape. The theme is *bounded* general
AI rather than AGI, which Lipovetzky rejects as ill-defined and therefore unfalsifiable.
Weeks 2–4 cover classical planning under three bounding assumptions (single initial
state, deterministic actions, full observability), which together reduce the problem to
graph search over an exponentially large graph; the interest lies in deriving heuristics
automatically and in width-based search. Later weeks relax those bounds toward MDPs and
reinforcement learning, with weeks 11–12 on advanced topics including the two-way
relationship between LLMs and planning.

## Key concepts

- [[rational-agent]]
- [[turing-test]]
- [[control-problem]]
- [[classical-planning]]
- [[models-and-solvers]]

## Key entities

- [[nir-lipovetzky]]
- [[guang-hu]]
- [[dartmouth-workshop]]

## Topics covered (revision checklist)

- Four definitions of AI: Minsky (engineering), Turing (acting humanly), Haugeland (thinking humanly / cognitive science), Luger and Stubblefield (acting rationally)
- Why Minsky's definition is not operational: which human activities count as requiring intelligence?
- Turing's imitation game and the 1950 paper *Computing Machinery and Intelligence*
- Searle's Chinese Room (1980) as a challenge to strong AI, and its application to LLMs
- The thinking/acting × humanly/rationally quadrants, and which fields occupy each
- Knowledge representation as the "thinking rationally" quadrant
- Agents, sensors, percepts, actuators, actions
- Performance measures and their role in defining rationality
- Rationality versus omniscience
- The four causes of irrationality, including bounded computation
- Kahneman's System 1 and System 2 as a model of human bounded rationality
- AGI versus bounded general AI; falsifiability as the criterion
- The three classical planning assumptions and how each is relaxed later in the subject
- Subject roadmap: classical planning, beyond-classical variants (soft goals, epistemic planning, path planning), MDPs, reinforcement learning, LLMs and planning
- Prerequisite knowledge: Python, dynamic programming (decomposition plus memoisation), piecewise functions, probability and Bayes' rule, set operations and propositional logic
- Assessment design: standards-based grading with self-assessment and resubmission; the participation token and streak system

## Notable claims / results

- The subject's working definition of AI is Luger and Stubblefield's: the automation of intelligent behaviour, i.e. making rational action choices. Its quadrant is *acting rationally*.
- A rational agent is a mapping from performance measure, percepts, and knowledge to the best available action. Rationality is relative to a performance measure and is not omniscience.
- Chess demonstrates that correct performance measure, full observability, and complete knowledge of the rules are jointly insufficient for rationality: the missing ingredient is computational tractability.
- Classical planning's three assumptions — single initial state, deterministic transitions, full observability — reduce the problem to search over a graph that is exponentially large in the number of state variables.
- AGI is rejected as a research framing on the grounds that an unbounded definition cannot be falsified, and so falls outside science; "bounded general AI" (e.g. one algorithm for all Atari games) is offered as the falsifiable alternative.
- All dynamics studied in this subject are discrete; continuous dynamics and low-level control are explicitly out of scope.

## Connections

- Assumes the background in [[w01-prerecorded-ai-overview]], particularly videos 1 and 2.
- The formal state models promised here are delivered in [[w01b-introduction-to-planning]].
- The methodological history behind the "acting rationally" choice is developed in [[theories-as-programs]].
