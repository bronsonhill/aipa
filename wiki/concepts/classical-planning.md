---
title: Classical Planning
type: concept
tags: [state-models, planning, week-01]
date: 2026-08-04
---

# Classical Planning

The model-based approach to autonomous behaviour under three bounding assumptions: a
single known initial state, deterministic actions, and full observability. Under these
assumptions, finding a plan reduces to search over a graph that is exponentially large
in the number of state variables.

## How it works

A system is described by a set of state variables. A state assigns a value to every
variable, actions change some of those values, and the task is to find a sequence of
actions carrying a known initial state into a state satisfying the goal. Because
actions are deterministic and everything is observable, the agent can compute the whole
sequence up front and execute it blindly; nothing it observes during execution can
surprise it. This is what makes the solution form an *action sequence* rather than a
policy.

The three assumptions are the "bounded" in bounded general AI ([[w01a-introduction-to-ai]]).
Each one can be dropped, and each dropped assumption gives a different model:
relaxing the single initial state to a set gives [[conformant-planning]]; relaxing
determinism to a probability distribution gives a [[markov-decision-process]]; relaxing
observability as well gives a [[partially-observable-mdp]].

Solvers for this model are called *planners*. Following the [[models-and-solvers]]
paradigm, a planner knows nothing about what the variables or actions mean — it only
requires that the input conform to the model. Planning tasks are written in a language
such as [[strips]] or [[pddl]] rather than by enumerating the state space directly.

## Formula

A classical planning problem is the state model

$$
S(P) = \langle S,\ s_0,\ S_G,\ A,\ A(\cdot),\ f,\ c \rangle
$$

with

- $S$ a finite and discrete state space,
- $s_0 \in S$ the known initial state,
- $S_G \subseteq S$ the set of goal states,
- $A(s) \subseteq A$ the actions applicable in state $s$,
- $f(a, s)$ a deterministic transition function giving the single successor $s' = f(a,s)$ for $a \in A(s)$,
- $c(a, s)$ the cost of applying $a$ in $s$, often uniform at $c(a,s) = 1$.

A solution is a sequence of applicable actions $a_0, \dots, a_{n-1}$ generating a state
sequence $s_0, \dots, s_n$ with $s_{i+1} = f(a_i, s_i)$, $a_i \in A(s_i)$, and
$s_n \in S_G$. The plan is optimal when it minimises $\sum_{i} c(a_i, s_i)$.

## Why it matters

Classical planning is the foundation the rest of the subject relaxes outward from. It
is also the smallest model in which the central difficulty is already present: the
state space is exponential in the number of variables, so the whole engineering problem
is finding structure that lets a solver avoid visiting most of it. Deciding whether a
plan exists is PSPACE-complete — see [[planning-complexity]] — which places it strictly
above SAT and CSP in worst-case difficulty.

## Relationships

- The practice of building instances of this model: [[state-space-modelling]]; worked example [[tsp-state-space-model]]
- Encoded compactly in [[strips]] and [[pddl]]
- Relaxations: [[conformant-planning]], [[markov-decision-process]], [[partially-observable-mdp]]
- Sits inside the [[models-and-solvers]] paradigm; the control problem it answers is described in [[control-problem]]
- Complexity: [[planning-complexity]]; solution quality: [[satisficing-and-optimal-planning]]
- Canonical example domain: [[blocksworld]]

## Sources

- [[w01b-introduction-to-planning]] — gives the formal state model and derives it from STRIPS semantics
- [[w01a-introduction-to-ai]] — names the three assumptions and frames them as the subject's bound on generality
- [[w01-prerecorded-ai-overview]] — video 4 introduces the state-variable formulation informally
