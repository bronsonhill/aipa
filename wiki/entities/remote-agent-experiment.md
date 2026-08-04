---
title: Remote Agent Experiment (RAX)
type: entity
entity_type: model
tags: [applications, space, planning, week-01]
date: 2026-08-04
---

# Remote Agent Experiment (RAX)

NASA's autonomous spacecraft control system, flown in 1998. The first AI system to
control a spacecraft without human supervision, and the first major success of automated
planning in the field.

## Key facts

- Launched in 1998 aboard a NASA mission, with a planner responsible for task-level control.
- The planner handled the *sequence of tasks* required to operate the spacecraft. Low-level control and continuous dynamics were handled separately, and are out of scope for this subject in the same way.
- Demonstrated that a solver could take over decisions that had previously required ground control, which matters most where round-trip communication latency makes supervision impractical.
- NASA has maintained a substantial planning research group since.

## Relevance to AI Planning for Autonomy

RAX is the standing answer to why anyone needs [[classical-planning]] rather than a
hand-written controller. Space exploration is the setting where the programming-based
approach to the [[control-problem]] breaks down hardest: the situations a spacecraft
encounters cannot all be anticipated on the ground, and there is no operator close
enough to intervene when an unanticipated one arrives. Specifying the problem and
letting a solver derive the behaviour is not a convenience there, it is the only option.

It also anchors the applications survey, which runs from space through business process
management, game AI, interactive storytelling, network penetration testing, logistics,
and warehouse automation. What those share is that each is a sequential decision problem
where a sequence of actions must transform an initial configuration into a desired one.

## Sources

- [[w01-prerecorded-ai-overview]] — video 5 presents RAX as the first great success of planning
