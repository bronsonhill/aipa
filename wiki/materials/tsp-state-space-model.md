---
title: TSP as a State-Space Model
type: material
tags: [week-01, tutorial, state-models, modelling, tsp, worked-example]
date: 2026-08-05
---

# TSP as a State-Space Model

A worked treatment of the Travelling Salesman Problem as a classical planning model,
with the state counts verified by enumeration. From [[t01-classical-planning-model]].

## The problem

Given a set of cities $V$, a start city $v_{\text{start}} \in V$, and a set of directed
edges $E \subseteq V \times V$, the salesman must visit every city at least once and
return to $v_{\text{start}}$. Each edge carries a cost.

## Choosing the state

The whole exercise turns on one decision, so it is worth making it deliberately rather
than by pattern-matching.

A state must carry exactly the information needed to determine which actions apply and
what they produce — no less, or the model is wrong; no more, or the state space is
larger than it needs to be. Current position alone fails the test here. Two salesmen
standing in the same city are not in the same situation if one has visited three cities
and the other none: the same action sequence leads one to the goal and the other
nowhere. The goal depends on history, so the history that matters has to be in the
state.

What matters is only *which* cities have been visited, not the order they were visited
in and not how many times each was entered. That is what makes a set the right structure
and what keeps the model finite. A state is therefore a pair of current city and visited
set.

## The model

$$
\begin{aligned}
S &= \{\, \langle v_c, V_{\text{vis}} \rangle \mid v_c \in V,\ V_{\text{vis}} \subseteq V \,\} \\[4pt]
s_0 &= \langle v_{\text{start}},\ \{v_{\text{start}}\} \rangle \\[4pt]
S_G &= \{\, \langle v_{\text{start}},\ V \rangle \,\} \\[4pt]
A(\langle v_c, V_{\text{vis}} \rangle) &= \{\, \langle v_c, v_n \rangle \mid \langle v_c, v_n \rangle \in E \,\} \\[4pt]
f(\langle v_c, V_{\text{vis}} \rangle,\ \langle v_c, v_n \rangle) &= \langle v_n,\ V_{\text{vis}} \cup \{v_n\} \rangle \\[4pt]
c(\langle v_c, v_n \rangle) &= \mathrm{cost}(v_c, v_n)
\end{aligned}
$$

Three details are easy to get wrong.

The start city is already in the visited set at $s_0$. The salesman lives there, so
arriving back is required but visiting it initially is not an achievement.

The goal fixes both coordinates. $V_{\text{vis}} = V$ says every city has been visited;
$v_c = v_{\text{start}}$ says the salesman came home. Dropping either gives a different
problem, which the tutorial quiz exploits.

Actions are edges, not destinations. Writing $A$ as a set of cities rather than a set of
edges works only when the graph is complete, and silently breaks otherwise.

## Counting the state space

The declared state space pairs each of $|V|$ current cities with each of $2^{|V|}$
subsets:

$$
|S| = |V| \cdot 2^{|V|}.
$$

Not all of those are reachable. In any state the salesman actually occupies, the current
city has necessarily been visited — you cannot stand somewhere you have never been. So
every reachable state satisfies $v_c \in V_{\text{vis}}$, and states violating it are
declared but never generated.

Restricting the declaration accordingly:

$$
S' = \{\, \langle v_c, V_{\text{vis}} \rangle \mid V_{\text{vis}} \subseteq V,\ v_c \in V_{\text{vis}} \,\},
\qquad
|S'| = \sum_{k=1}^{n} \binom{n}{k} k = n \cdot 2^{\,n-1},
$$

writing $n = |V|$. The declared space is exactly twice this, so the constraint removes
half the states.

### Verification

The closed forms above were checked against exhaustive enumeration with breadth-first
reachability from every legal initial state, on a complete graph:

| $n$ | $\lvert S\rvert$ declared | Reachable | $n \cdot 2^{n-1}$ | Goal states, returning | Goal states, not returning |
|---:|---:|---:|---:|---:|---:|
| 2 | 8 | 4 | 4 | 1 | 2 |
| 3 | 24 | 12 | 12 | 1 | 3 |
| 4 | 64 | 32 | 32 | 1 | 4 |
| 5 | 160 | 80 | 80 | 1 | 5 |
| 6 | 384 | 192 | 192 | 1 | 6 |

The restricted set $S'$ coincides exactly with the reachable set at every $n$ tested,
which confirms $v_c \in V_{\text{vis}}$ is not merely necessary but sufficient — on a
complete graph, every state satisfying it is reachable from some initial state.

Building this check is worth more than the numbers it produced. Enumeration is an oracle
you can construct for any state-space model in a few lines, and disagreement between
your algebra and your count is a misconception surfacing before it reaches an
assignment.

## Goal state variants

For four cities, with the salesman required to return home, there is exactly **one**
goal state: $\langle v_{\text{start}}, V \rangle$. Both coordinates are pinned, so the
count is 1 regardless of $n$. The frequent wrong answer treats "all cities visited" as
the whole condition and forgets that the current city is pinned too.

Drop the return requirement and the goal becomes $\{\langle v_c, V\rangle \mid v_c \in V\}$
— every city visited, salesman anywhere. That is **four** goal states for four cities, and
$n$ in general. This is the cleanest illustration of a general point: the goal is a
*condition*, and how many states satisfy it depends on how many coordinates the
condition leaves free.

## Applying the assessed standard

The tutorial's final page states what a sufficient justification demonstrates. Working
the model is half the task; the argument below is the other half, and it is the half
that gets marked. See [[state-space-modelling]] for the general form.

**Correct on the given instance.** From $s_0$ every applicable action follows an edge
and adds its destination to the visited set, so any state reached records a genuine walk
from $v_{\text{start}}$. A state in $S_G$ has $V_{\text{vis}} = V$ and $v_c =
v_{\text{start}}$, so a plan is a walk covering every city and ending home — the problem
as stated.

**Correct on any instance.** Nothing in the definitions refers to a particular graph.
$V$, $E$, $v_{\text{start}}$ and $\mathrm{cost}$ are parameters, so changing the map,
the start city, or the costs changes the instance without touching the model.

**Actions and transitions.** $A(s)$ admits exactly the outgoing edges of the current
city, so inapplicable moves are excluded by construction and disconnected graphs are
handled without special cases. $f$ is a function rather than a relation, which is what
determinism requires, and it is total on $A(s)$.

**Efficiency.** $|S'| = n \cdot 2^{n-1}$, exponential in the number of cities and
verified above. The exponential factor is irreducible for this problem, since the visited
set is genuinely needed; the achievable saving is the constant factor from excluding
$v_c \notin V_{\text{vis}}$.

**Generalisability.** Dropping the return requirement changes only $S_G$. Requiring
specific cities in a specific order needs more state, since a set records no order.
Growing the map costs nothing in the description and doubles the state space per city
added, which is where the difficulty actually lives.

## Relationships

- The model formalised: [[classical-planning]]
- The general skill and the assessed standard: [[state-space-modelling]]
- Why the size matters: [[planning-complexity]]
- The same modelling task in a language rather than set notation: [[strips]], [[blocksworld]]

## Sources

- [[t01-classical-planning-model]] — the exercise, its suggested solution, and the SILO1 standard
- [[w01b-introduction-to-planning]] — the state-model tuple this instantiates
