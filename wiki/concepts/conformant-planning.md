---
title: Conformant Planning
type: concept
tags: [state-models, planning, uncertainty, week-01]
date: 2026-08-04
---

# Conformant Planning

Planning with uncertainty but no feedback: the agent does not know which of several
possible initial states it is in, cannot sense, and must find a single action sequence
that reaches the goal from *every* possibility.

## How it works

Two relaxations of [[classical-planning]] apply at once. The known initial state $s_0$
becomes a set $S_0$ of candidate initial states, and the transition function becomes
non-deterministic: applying $a$ in $s$ yields some state in a set $F(a,s)$ rather than a
single successor. Crucially there is no sensor model, so the agent gains no information
during execution and cannot branch on what it observes.

The consequence is that the solution form stays an action sequence, exactly as in
classical planning, but the requirement on that sequence is much stronger. It must be
applicable and goal-reaching along every trajectory consistent with the uncertainty.
The name comes from this: with nothing to sense, the agent must *conform* to the
information it started with.

The Mars rover example makes the shape concrete. A rover that lands without a reliable
GPS fix does not know its position, cannot resolve the ambiguity by sensing, and still
needs a manoeuvre that works wherever it actually is.

## Formula

A conformant planning problem is

$$
\langle S,\ S_0,\ S_G,\ A,\ A(\cdot),\ F,\ c \rangle
$$

with $S_0 \subseteq S$ a set of possible initial states and
$F(a,s) \subseteq S$ a non-deterministic transition function for $a \in A(s)$.

An action sequence $a_0, \dots, a_{n-1}$ is a solution when every state sequence
$s_0, \dots, s_n$ satisfying $s_0 \in S_0$ and $s_{i+1} \in F(a_i, s_i)$ has
$a_i \in A(s_i)$ for all $i$ and $s_n \in S_G$.

An equivalent view is to search in *belief space*: a belief is a set $b \subseteq S$ of
states the agent might be in, the initial belief is $S_0$, and applying $a$ maps $b$ to
$\bigcup_{s \in b} F(a,s)$. The goal is any belief $b \subseteq S_G$. This makes
conformant planning a classical planning problem over an exponentially larger state
space.

## Why it matters

Conformant planning isolates uncertainty from feedback. Comparing it against
[[markov-decision-process]] (uncertainty with observability, no need to hedge) and
[[partially-observable-mdp]] (uncertainty with partial feedback) shows that these two
dimensions are independent, and that each costs something different computationally.
Its solutions are also the most robust: a conformant plan needs no sensors at all to
execute.

## Relationships

- Relaxation of [[classical-planning]]
- Contrast with [[markov-decision-process]] and [[partially-observable-mdp]]
- The belief-space reformulation is a case of the problem transformations discussed in [[models-and-solvers]]

## Sources

- [[w01b-introduction-to-planning]] — gives the formal model and the Mars rover motivation
