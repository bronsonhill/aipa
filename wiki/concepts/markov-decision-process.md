---
title: Markov Decision Process
type: concept
tags: [state-models, planning, probability, week-01]
date: 2026-08-04
---

# Markov Decision Process

A fully observable, probabilistic state model: actions have a probability distribution
over outcomes, but the agent always knows which state it ended up in. Solutions are
policies rather than action sequences.

## How it works

Relax exactly one assumption of [[classical-planning]] — determinism — and keep full
observability. Applying action $a$ in state $s$ now yields successor $s'$ with
probability $P_a(s' \mid s)$. Because the agent can observe the outcome, it does not
need to commit to a fixed sequence in advance; it can decide what to do based on where
it actually is. The solution form is therefore a *policy* $\pi$ mapping states to
actions.

"Markov" refers to the assumption that the transition probabilities depend only on the
current state and action, not on the history of how the agent arrived there. This is
what makes a state-indexed policy sufficient: nothing in the past adds information
beyond what the current state already carries.

Reinforcement learning is the same problem under a further restriction: the transition
probabilities are *not* given, and must be estimated through interaction with the
environment. This is why RL sits at the intersection of probabilistic planning and
machine learning — the problem is a planning problem, the tools come from learning.

## Formula

An MDP with goal states is

$$
\langle S,\ s_0,\ G,\ A,\ A(\cdot),\ P,\ c \rangle
$$

with transition probabilities $P_a(s' \mid s)$ for $s \in S$, $a \in A(s)$, satisfying

$$
\sum_{s' \in S} P_a(s' \mid s) = 1,
$$

and action costs $c(a,s) > 0$.

A solution is a policy $\pi : S \to A$ with $\pi(s) \in A(s)$. Policies are evaluated by
expected cost to reach the goal, and an optimal policy minimises it. The value of a
state under the optimal policy satisfies the Bellman equation

$$
V^*(s) = \begin{cases}
0 & \text{if } s \in G \\[4pt]
\displaystyle\min_{a \in A(s)} \left[ c(a,s) + \sum_{s' \in S} P_a(s' \mid s)\, V^*(s') \right] & \text{otherwise,}
\end{cases}
$$

with the optimal action in $s$ being the minimising $a$.

## Why it matters

MDPs are where the subject moves after classical planning, and they are the formal
substrate for reinforcement learning. The shift from action sequences to policies is
the conceptual break: once outcomes are uncertain and observable, a plan that fixes
every step in advance throws away the information execution provides.

## Relationships

- Relaxation of [[classical-planning]]; further relaxed to [[partially-observable-mdp]] by dropping observability
- Contrast with [[conformant-planning]], which has uncertainty but no feedback
- Sits under probabilistic planning in the taxonomy described in [[models-and-solvers]]

## Sources

- [[w01b-introduction-to-planning]] — gives the formal model and identifies it by the "non-deterministic transition function, full observability" combination
- [[w01a-introduction-to-ai]] — flags MDPs and reinforcement learning as the second half of the subject
- [[w01-prerecorded-ai-overview]] — video 2 places reinforcement learning at the nexus of probabilistic planning and machine learning
