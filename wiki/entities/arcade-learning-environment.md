---
title: Arcade Learning Environment
type: entity
entity_type: software
tags: [simulators, benchmarks, width, week-03]
date: 2026-08-16
---

# Arcade Learning Environment

An object-oriented framework (arcadelearningenvironment.org) for developing AI agents
that play Atari 2600 games, and the benchmark on which width-based planning was shown
to compete with deep reinforcement learning.

## Key facts

- Provides a simulator for Atari 2600 games, exposing the console's 128 bytes of RAM as state and 18 joystick actions.
- The planning setting it presents is deterministic with a fully known initial state, so it fits the classical planning model, but it offers no PDDL encoding and gives rewards rather than goals.
- Bellemare et al.'s benchmark protocol: games played for a maximum of 5 minutes (18,000 frames), a lookahead budget of 150,000 simulated frames, UCT given the same budget as 500 rollouts of depth 300, scores averaged over 5 runs per game.
- IW(1) was run over the RAM as 128 variables of 256 values each, generating up to 589,824 states per lookahead, with children in random order and discount $\gamma = 0.995$.
- Across 54 games, IW(1) was best on 26, UCT on 19, 2BFS on 13, and breadth-first search on 1. IW(1) and 2BFS reach 6 to 22 seconds of lookahead; breadth-first search reaches 0.3 seconds.
- Compared against DeepMind's deep reinforcement learning agent, IW outperformed it on 45 of 49 games, though the two solve different problems: IW is a reactive lookahead, DeepMind's agent produces a policy.
- Later work extended the approach to use screen pixels directly as features rather than RAM bytes.

## Relevance to AI Planning for Autonomy

ALE is the concrete case for [[planning-with-simulators]]: a problem inside the
classical planning model that a declarative language cannot conveniently express, where
a classical algorithm still applies almost off the shelf because [[novelty]] is computed
from the state representation rather than from the problem description. It is also the
worked example of [[nir-lipovetzky]]'s bounded-general-AI framing — one algorithm across
a stated class of problems, with no per-game engineering beyond the choice of features.

## Sources

- [[w03b-local-search-and-bfws]] — the ALE setup, the feature choice, and the experimental results
- [[w02b-width-and-iterative-search]] — earlier coverage of IW's Atari results
