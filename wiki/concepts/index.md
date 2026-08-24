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

### Heuristic search

- [[heuristic-function]] — estimating remaining cost; informedness against evaluation cost | added: 2026-08-16
- [[heuristic-properties]] — safe, goal-aware, admissible, consistent, and which guarantee each buys | added: 2026-08-16
- [[relaxation]] — simplify the problem, solve it, use that cost as the heuristic | added: 2026-08-24
- [[goal-counting-heuristic]] — count unmet goals; the simplest relaxation, and its limits | added: 2026-08-24
- [[delete-relaxation]] — drop delete effects; "what was once true remains true forever" | added: 2026-08-24
- [[max-heuristic]] — admissible but uninformative approximation of $h^+$ via max over sub-goals | added: 2026-08-24
- [[additive-heuristic]] — inadmissible but informative approximation of $h^+$ via sum over sub-goals | added: 2026-08-24
- [[relaxed-plan-heuristic]] — extract one relaxed plan by backward-chaining; avoids most over-counting | added: 2026-08-24
- [[helpful-actions]] — applicable actions that also appear in the extracted relaxed plan | added: 2026-08-24
- [[greedy-best-first-search]] — order on $h$ alone; complete if safe, never guaranteed optimal | added: 2026-08-16
- [[a-star-search]] — order on $f = g + h$; optimal when the heuristic is admissible | added: 2026-08-16
- [[weighted-a-star]] — $g + W\cdot h$ as a dial from Dijkstra through A* to greedy, with a suboptimality bound | added: 2026-08-16
- [[ida-star]] — iterative deepening on an $f$-limit; A*'s optimality with linear space | added: 2026-08-16
- [[local-search]] — commit and forget; small memory, no guarantees | added: 2026-08-16
- [[hill-climbing]] — discrete gradient descent, and the four structures that defeat it | added: 2026-08-16
- [[enforced-hill-climbing]] — breadth-first search to a better $h$, then commit; the pre-2012 workhorse | added: 2026-08-16
- [[best-first-width-search]] — novelty first, heuristic as tie-break; IPC's best satisficing planner since 2018 | added: 2026-08-16
- [[planning-with-simulators]] — when the model fits but the language does not; black-box transitions | added: 2026-08-16

### Modelling and languages

- [[closed-world-assumption]] — anything not in `:init` is false, and why that applies to the initial state only | added: 2026-08-04
- [[lifted-representation]] — predicates and action schemas over objects, versus the propositional model beneath | added: 2026-08-04
- [[plan-validation]] — validating plans against a model, and debugging a model that admits the wrong ones | added: 2026-08-04

### Complexity and solution quality

- [[planning-complexity]] — PlanEx and PlanLen are PSPACE-complete; where they come apart | added: 2026-08-04
- [[satisficing-and-optimal-planning]] — any plan versus a cheapest plan, and why the techniques differ | added: 2026-08-04
- [[boolean-satisfiability]] — SAT as the reference model: minimal, NP-complete, solved well in practice | added: 2026-08-04
- [[constraint-satisfaction-problem]] — finite-domain variables under constraints; SAT's generalisation | added: 2026-08-04
- [[planning-computational-approaches]] — GPS, POCL, GraphPlan, SATPlan, heuristic search, and model checking | added: 2026-08-10

### Search

- [[search-node]] — the unit a search algorithm manipulates: state plus parent, action, and $g(n)$ | added: 2026-08-10
- [[blind-search]] — search using only the problem definition, judged on four properties | added: 2026-08-10
- [[breadth-first-search]] — shallowest-first, FIFO; complete, optimal only under uniform cost | added: 2026-08-10
- [[depth-first-search]] — deepest-first, LIFO; linear space, no optimality guarantee | added: 2026-08-10
- [[iterative-deepening-search]] — depth-first re-run at increasing depth limits | added: 2026-08-10
- [[novelty]] — how much new atom-subset information a state carries relative to search history | added: 2026-08-10
- [[iterative-width-search]] — breadth-first search pruned by novelty; polynomial when width is small | added: 2026-08-10
