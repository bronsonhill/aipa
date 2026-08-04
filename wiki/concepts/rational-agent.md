---
title: Rational Agent
type: concept
tags: [foundations, agents, week-01]
date: 2026-08-04
---

# Rational Agent

An agent that perceives its environment through sensors and acts on it through
actuators, choosing at each point the action that maximises a stated performance
measure given its percepts and its knowledge.

## How it works

Rationality is not a property an agent has on its own. It is defined relative to a
performance measure, and different measures make different behaviour rational. For an
autonomous vacuum cleaner the candidates include never cleaning the same surface twice,
never colliding with obstacles, and finishing faster than a human would — each is
defensible, none follows from the others, and the definition of rational behaviour
changes depending on which is chosen.

Rationality is also distinct from omniscience. An omniscient agent knows the true state
of the environment and the actual effects of its actions; a rational agent makes the
best choice available given what it can perceive and what it knows. The right framing is
that a rational agent *tries* to do the right thing, because the hypothetical best case
is often unattainable — you cannot see the dirt under the bed.

There are four ways an agent can fail to be rational, and the fourth is the one this
subject is about:

1. The performance measure is wrong for the task.
2. Perception is limited or faulty (a sensor clogged with dust).
3. The knowledge is wrong, whether about the world's dynamics or the current state.
4. Computing the best action is not feasible in the time available.

Chess isolates the fourth. The performance measure is unambiguous, the board is fully
observable, the rules are completely known, and still nobody is a grandmaster by virtue
of knowing the rules. Kahneman's System 1 and System 2 give the human version of the
same limit: the fast associative system is cheap to run and is what we fall back on
when the deliberative system is too expensive.

## Formula

Rationality can be written as a mapping from percept history, knowledge, and
performance measure to an action:

$$
a^* = \arg\max_{a \in A(s)} \ \mathbb{E}\big[\, U(a, s) \mid \text{percepts},\ \text{knowledge} \,\big]
$$

where $U$ is the performance measure. The bounded-rationality caveat is that computing
$\arg\max$ must itself fit within the agent's time and compute budget, and when it does
not, the action actually taken may be suboptimal even though every other input is
correct.

## Why it matters

"Acting rationally" is the quadrant of AI this subject occupies. Of the four positions
on the thinking/acting × humanly/rationally grid — cognitive science, the Turing test,
knowledge representation, and rational action — only the last has both a bounded
definition of the target behaviour and a clear notion of success. The fourth failure
mode, computational infeasibility, is what makes [[classical-planning]] and its
relaxations hard, and what the rest of the subject attacks.

## Relationships

- Defines the target of [[control-problem]]
- Contrast with the "acting humanly" criterion in [[turing-test]]
- The computational failure mode is quantified in [[planning-complexity]]

## Sources

- [[w01a-introduction-to-ai]] — develops the definition, the vacuum cleaner performance measures, and the four failure modes
