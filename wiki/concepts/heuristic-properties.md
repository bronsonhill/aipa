---
title: Heuristic Properties
type: concept
tags: [search, heuristics, week-03]
date: 2026-08-16
---

# Heuristic Properties

Four formal properties — safe, goal-aware, admissible, consistent — used to characterise
a [[heuristic-function]], and through it to establish the completeness and optimality
guarantees of the search algorithm consuming it.

## Formula

Let $\Pi$ be a planning task with states $S$, goal states $S_G$, cost function $c$, and
let $h$ be a heuristic for $\Pi$. Then $h$ is

- **safe** if $h^*(s) = \infty$ for all $s \in S$ with $h(s) = \infty$;
- **goal-aware** if $h(s) = 0$ for all $s \in S_G$;
- **admissible** if $h(s) \le h^*(s)$ for all $s \in S$;
- **consistent** if $h(s) \le h(s') + c(a)$ for all transitions $s \xrightarrow{a} s'$.

## How it works

**Safe** means the heuristic never lies about a dead end. If it reports $\infty$, there
really is no solution from that state, so the search may prune the branch. The
implication runs one way only, and this is the part most often misread: a safe
heuristic is not a dead-end *detector*. It may report a finite value at a state with no
solution; what it may not do is report $\infty$ at a state that has one.

**Goal-aware** means the heuristic recognises goals and signals them with zero. Note it
says nothing about non-goal states, which is why [[hill-climbing]] needs the stronger
condition $h(s) > 0$ for every non-goal state.

**Admissible** means optimistic. The heuristic may underestimate the true remaining
cost by any amount, but must never overestimate it. Stated as a distance: an admissible
estimate of the trip from Melbourne to Sydney always says it is at least as fast as it
really is.

**Consistent** is the local version of admissibility, constraining pairs of states
rather than single ones. Across one transition, the heuristic may not decrease by more
than the cost of the action taken. A heuristic can be inconsistent at a single
transition and that is enough to lose the property.

The properties imply one another in a fixed pattern. Consistency together with
goal-awareness entails admissibility; admissibility entails goal-awareness;
admissibility entails safety. No other implication among the four can be proved.

### Worked exercise

Three states with unit action costs: an initial state $I$ with $h = 2$, a dead-end
state $D$ with a self-loop and $h = 1$, and a goal $G$ with $h = 0$, where $I$ has
transitions to both $D$ and $G$. The true values are $h^*(I) = 1$,
$h^*(D) = \infty$, $h^*(G) = 0$.

This heuristic is goal-aware, because $h(G) = 0$. It is inadmissible, because
$h(I) = 2 > 1 = h^*(I)$; one violating state is enough. It is inconsistent, because
across $I \to G$ the value drops by 2 while the action costs 1; one violating transition
is enough.

Safety is the one worth slowing down on. The heuristic never reports $\infty$, so the
condition "$h^*(s) = \infty$ for all $s$ with $h(s) = \infty$" holds vacuously and the
heuristic *is* safe. The tempting wrong answer is to call it unsafe because it fails to
flag the dead end $D$, which reads the implication backwards. Safety constrains what
$h$ may claim when it says $\infty$; it never obliges $h$ to say $\infty$ anywhere. To
break safety here you would set $h(I) = \infty$, claiming no solution exists from a
state where one does.

The verdict is also a useful check on the implication diagram. Safe-but-inadmissible is
consistent with "admissible $\Rightarrow$ safe" — the arrow only rules out the reverse
combination, admissible-but-unsafe.

### What each property buys

| Algorithm | Complete if | Optimal if |
|---|---|---|
| [[greedy-best-first-search]] | $h$ safe | never guaranteed, even with $h^*$ |
| [[a-star-search]] | $h$ safe | $h$ admissible |
| [[weighted-a-star]] ($W > 1$) | $h$ safe | bounded suboptimal by factor $W$ if $h$ admissible |
| [[ida-star]] | $h$ safe | $h$ admissible |
| [[hill-climbing]], [[enforced-hill-climbing]] | never guaranteed | never guaranteed |

Safety earns completeness because discarding an infinite-$h$ successor is the only
place these algorithms drop a branch. Admissibility earns A\*'s optimality through the
theorem that A\* expands every node with $f \le g^*$: for A\* to miss an optimal
solution, some state on every optimal path would need $g(s) + h(s) > g^*$, and since
$g$ is fixed by the problem, only an overestimating $h$ can produce that.

Consistency does not appear in the table because it buys efficiency rather than
correctness: if $h$ is admissible and consistent, A\* never re-opens a closed state, so
the re-opening machinery can be dropped from the implementation.

## Why it matters

These four properties are the vocabulary in which every guarantee in the subject's
search half is stated. A\* was used for roughly two decades after its 1970s invention
before this theory existed, so nobody could say when it would return an optimal plan;
the properties are what turned that from experience into proof.

## Relationships

- Properties of a [[heuristic-function]]
- Determine the guarantees of [[a-star-search]], [[greedy-best-first-search]], [[weighted-a-star]], [[ida-star]]
- The dead-end discussion connects to the failure modes of [[hill-climbing]]
- Splits the week 4 relaxation heuristics along admissibility: [[max-heuristic]] and
  $h^+$ (see [[delete-relaxation]]) are admissible, while [[additive-heuristic]] and
  the [[relaxed-plan-heuristic]] are not, despite usually being more informative

## Sources

- [[w03-prerecorded-heuristic-search]] — the four definitions and the implications between them
- [[w03a-heuristic-functions-properties]] — the three-node exercise, safety's one-directionality, and greedy best-first search's non-optimality under $h^*$
- [[w03b-local-search-and-bfws]] — completes the argument that admissibility is what makes A\* optimal
- [[w04b-delete-relaxation-heuristics]] — worked examples of admissible ($h^\text{max}$) versus inadmissible ($h^\text{add}$, $h^\text{FF}$) relaxation heuristics
