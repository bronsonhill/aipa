---
title: VAL
type: entity
entity_type: software
tags: [tooling, pddl, validation, week-01]
date: 2026-08-04
---

# VAL

The standard plan validator for PDDL. Given a domain, a problem, and a candidate plan,
it replays the plan step by step and reports whether it is valid.

## Key facts

- Available as a solver option in [[editor-planning-domains]], and installable locally for use with the VS Code PDDL extension.
- Checks each action in turn: are its preconditions satisfied in the current state, and what state results from applying its effects.
- On success it reports that the plan executed and the goal was reached, along with the plan length.
- On failure it names the offending action, the step at which it failed, and the precondition that was not satisfied — for example, that `(put-down e)` has an unsatisfied precondition at time 3, needing `(holding e)` to be true.
- Usage in the browser editor is to copy the plan's action list into a new file and select VAL as the solver.

## Relevance to AI Planning for Autonomy

Validating a plan answers a narrower question than it first appears to: whether the plan
is correct *with respect to the encoded model*. Whether the model is correct with
respect to the world is a separate question that no validator can settle, and it is
where the expensive bugs live. The recommended practice is therefore to use VAL as a
testing harness on the model — write plans that should be valid and confirm they are,
and write plans that should be impossible and confirm they are rejected. A domain that
accepts a plan violating a physical constraint you believed you had encoded has told you
something a parser never would. See [[plan-validation]].

Validation is also the stated safeguard when plans come from LLMs, which are not sound
and may produce sequences that do not satisfy the model at all.

## Sources

- [[w01b-introduction-to-planning]] — demonstrates VAL live on blocksworld, including reading its output on a deliberately broken plan
