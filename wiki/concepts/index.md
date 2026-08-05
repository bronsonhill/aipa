---
title: Concepts
---

Index of core concepts and theory in AI planning for autonomy.

## Pages

### State models

- [[classical-planning]] — the base model: single initial state, deterministic actions, full observability | added: 2026-08-04
- [[state-space-modelling]] — the skill of building one: choosing what a state records, and justifying it | added: 2026-08-05
- [[conformant-planning]] — uncertainty about the initial state with no sensing; one plan must work everywhere | added: 2026-08-04
- [[markov-decision-process]] — probabilistic transitions with full observability; solutions are policies | added: 2026-08-04
- [[partially-observable-mdp]] — probabilistic transitions plus a sensor model; policies over belief states | added: 2026-08-04

### Foundations

- [[models-and-solvers]] — the paradigm underlying modern AI: general solvers over families of problems | added: 2026-08-04
- [[control-problem]] — selecting the next action; the programming, learning, and model-based approaches | added: 2026-08-04
- [[rational-agent]] — acting to maximise a performance measure, and the four ways that fails | added: 2026-08-04
- [[turing-test]] — acting humanly as a criterion, and the Chinese Room reply | added: 2026-08-04
- [[theories-as-programs]] — the 1960s to 80s methodology and why it could not be falsified | added: 2026-08-04
- [[search-and-inference]] — the two ingredients of every solver, and how structure is exploited | added: 2026-08-04

### Modelling and languages

- [[closed-world-assumption]] — anything not in `:init` is false, and why that applies to the initial state only | added: 2026-08-04
- [[lifted-representation]] — predicates and action schemas over objects, versus the propositional model beneath | added: 2026-08-04
- [[plan-validation]] — validating plans against a model, and debugging a model that admits the wrong ones | added: 2026-08-04

### Complexity and solution quality

- [[planning-complexity]] — PlanEx and PlanLen are PSPACE-complete; where they come apart | added: 2026-08-04
- [[satisficing-and-optimal-planning]] — any plan versus a cheapest plan, and why the techniques differ | added: 2026-08-04
- [[boolean-satisfiability]] — SAT as the reference model: minimal, NP-complete, solved well in practice | added: 2026-08-04
- [[constraint-satisfaction-problem]] — finite-domain variables under constraints; SAT's generalisation | added: 2026-08-04
