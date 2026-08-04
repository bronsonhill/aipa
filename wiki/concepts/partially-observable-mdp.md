---
title: Partially Observable MDP (POMDP)
type: concept
tags: [state-models, planning, probability, uncertainty, week-01]
date: 2026-08-04
---

# Partially Observable MDP (POMDP)

A probabilistic state model in which the agent cannot directly observe its state, and
instead maintains a probability distribution over the states it might be in, updated
through a sensor model as it acts and observes.

## How it works

Take a [[markov-decision-process]] and remove full observability. The agent no longer
knows $s$; it holds a *belief state* $b$, a probability distribution over $S$. Two
things change the belief: acting, which propagates it through the transition
probabilities, and observing, which conditions it on the sensor model
$P_a(o \mid s)$. A solution is a policy mapping belief states to actions, so the
underlying decision problem is an MDP over the continuous space of beliefs.

The distinction from [[conformant-planning]] is exactly the presence of a sensor model.
Conformant planning also faces initial-state uncertainty, but can never resolve it; a
POMDP agent can act *in order to* gain information, which is why POMDP policies often
contain deliberate sensing actions that make no direct progress toward the goal.

POMDPs are the most expressive of the state models covered in week 1, and correspondingly
the hardest to solve. They are used in robotics wherever localisation is genuinely
uncertain — underwater vehicles, for instance, where GPS is unavailable and currents
introduce drift, so the agent must continuously track a belief about where it is.

## Formula

A POMDP is

$$
\langle S,\ A,\ A(\cdot),\ P,\ \mathit{Obs},\ O,\ b_0,\ b_f \rangle
$$

with transition probabilities $P_a(s' \mid s)$, a set of observations $\mathit{Obs}$, a
sensor model $O_a(o \mid s) = P_a(o \mid s)$ for $o \in \mathit{Obs}$, an initial belief
state $b_0$, and a target belief condition $b_f$.

Belief update after applying $a$ and observing $o$ is Bayesian:

$$
b_a(s') = \sum_{s \in S} P_a(s' \mid s)\, b(s),
\qquad
b_a^o(s') = \frac{P_a(o \mid s')\, b_a(s')}{\sum_{s'' \in S} P_a(o \mid s'')\, b_a(s'')}.
$$

A solution is a policy $\pi$ mapping belief states to actions.

## Why it matters

POMDPs demonstrate how much can be packed into a single model. The illustrative
application is a study of youth homelessness and HIV in Los Angeles, where the solver
chose which young people to invite to information sessions so as to maximise the spread
of health information — a problem involving uncertainty about the state of a social
network and about how information propagates. Expressivity of this kind comes at a
price, and POMDPs restate the recurring theme that the models worth having are the ones
that are intractable.

## Relationships

- Removes observability from [[markov-decision-process]]
- Differs from [[conformant-planning]] by having a sensor model
- The most expressive point on the model hierarchy described in [[models-and-solvers]] and [[classical-planning]]

## Sources

- [[w01b-introduction-to-planning]] — gives the formal model, belief states, and the sensor model
- [[w01-prerecorded-ai-overview]] — video 3 gives the LA information-spread application as a demonstration of expressivity
