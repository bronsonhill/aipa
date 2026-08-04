---
title: Plan Validation and Model Debugging
type: concept
tags: [pddl, tooling, modelling, week-01]
date: 2026-08-04
---

# Plan Validation and Model Debugging

Checking that a plan is valid with respect to the encoded model, and separately that the
encoded model matches the real environment. These are different questions, and the
second is where the hard bugs live.

## How it works

A planner's front end is a parser, which catches syntactic errors. Misspelling
`:precondtion` produces an error naming the line and token in the FF parser used by
BFWS; the FD parser used by LAMA reports the same class of error more verbosely and less
precisely. Either way the error surfaces immediately.

Semantic errors do not. A domain that parses cleanly and returns a plan may still encode
something other than what was intended, and the planner has no way to know. The
canonical demonstration is a [[blocksworld]] `stack(?x, ?y)` action whose delete list
omits `clear(?y)`. The action stays applicable, the domain stays well-formed, and plans
are still produced — but since `clear(?y)` never becomes false, the model now permits
stacking several distinct blocks onto the same block. The model admits solutions that
cannot exist in reality.

Two habits address this.

**Validate plans.** [[val]] replays a plan step by step against the model, checking each
action's preconditions and applying its effects, and reports either that the plan is
valid or exactly which precondition failed at which step. This matters especially for
plans produced by LLMs, which are not sound and may return sequences that do not satisfy
the model at all.

**Test the model, not just the plan.** Write plans you expect to be valid and check that
VAL accepts them; more importantly, write plans that *should not* exist — ones violating
a physical constraint you believe you encoded — and check that VAL rejects them. This is
unit testing applied to a domain description, and it is what catches the missing delete
effect.

## Debugging strategies when no plan is found

When a planner returns no plan, the question is which subgoal or precondition is
unreachable. Three strategies, all of which work by making the goal something other than
the real goal and re-running:

1. **Goal decomposition.** Set a single suspect predicate as the goal. If a plan is
   found the state is reachable, so add another goal and repeat until the minimal
   unreachable subgoal is isolated.
2. **Binary search over an expected plan.** Set a goal that is roughly half-way, or use a
   landmark — a fact that must occur in every plan. Reachable means the bug lies closer
   to the goal; unreachable means it lies closer to the initial state.
3. **Action preconditions as goals.** Set one suspect precondition as the goal. If it is
   reachable, add another; once all preconditions of an action have been tested, move to
   the next action.

## Why it matters

A planning model is code, and code that produces plausible output while being wrong is
the expensive kind. The gap between the model and the world is not something a solver can
check, so it has to be closed by testing. This is also the honest answer to why
model-based approaches are not free: the description is short compared to a
hand-programmed controller, but it still has to be debugged.

## Relationships

- Tooling: [[val]], [[editor-planning-domains]]
- The error class it targets is created by the semantics of [[strips]] and [[pddl]]
- Silent defaults from [[closed-world-assumption]] are a common cause of semantic bugs
- Worked example: [[blocksworld]]

## Sources

- [[w01b-introduction-to-planning]] — the missing `clear(y)` peer-instruction exercise, VAL output, and all three debugging strategies
