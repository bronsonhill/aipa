---
title: Reading the Notation
type: material
tags: [week-01, notation, set-theory, reference, tuples]
date: 2026-08-05
---

# Reading the Notation

A key to the mathematical notation used across the wiki's model definitions —
angle-bracket tuples, set-builder notation, and the handful of symbols that recur in
every state-space formula. Read this before [[tsp-state-space-model]] or [[strips]] if
the formulas there are the sticking point rather than the ideas.

## Tuples: $\langle \cdot \rangle$

Angle brackets denote a tuple: an ordered, fixed-length bundle of components, where
position carries meaning. $\langle S, s_0, S_G, A, f, c \rangle$ says a planning problem
*is* these six components in this order, the same role a struct or record plays in code.
Parentheses $(a, b)$ mean the same thing; the angle form is conventional for a named
structure, partly to avoid clashing visually with function application like $f(s, a)$.

Order matters and repetition is allowed, which is what distinguishes a tuple from a set:
$\langle a, b \rangle \ne \langle b, a \rangle$, whereas $\{a, b\} = \{b, a\}$ as sets.

The notation gets confusing not because angle brackets are ambiguous, but because the
same bracket is reused at different levels within one page. [[tsp-state-space-model]]
uses it three ways:

$$
\underbrace{\langle S, s_0, S_G, A, f, c\rangle}_{\text{the whole problem, a 6-tuple}}
\qquad
\underbrace{\langle v_c, V_{\text{vis}}\rangle}_{\text{one state, a 2-tuple}}
\qquad
\underbrace{\langle v_c, v_n\rangle}_{\text{one action, a 2-tuple}}
$$

The bracket alone never tells you which level you're at; the contents do. A 6-tuple
describing the whole problem, a 2-tuple of (city, visited-set) describing a single state,
and a 2-tuple of (city, city) describing a single action — an edge to traverse — are
three different things that happen to share a notation.

## Set-builder notation: $\{\, x \mid P(x) \,\}$

Read as "the set of all $x$ such that $P(x)$ holds." Everything left of the bar $\mid$
gives the shape of a typical element; everything right of it filters which elements
qualify. A comma to the right of the bar reads as "and."

Reading a full line from [[tsp-state-space-model]]:

$$
S = \{\, \langle v_c, V_{\text{vis}} \rangle \mid v_c \in V,\ V_{\text{vis}} \subseteq V \,\}
$$

"The state space is the set of all pairs (current city, visited set), such that the
current city is one of the cities, and the visited set is some subset of the cities."
The state count $n \cdot 2^n$ follows directly from this line: $v_c$ has $n$ choices,
$V_{\text{vis}}$ has $2^n$ choices, and every combination is included, so the counts
multiply.

## Symbols worth knowing

| Symbol | Read as | Example |
|---|---|---|
| $\in$ | "is an element of" | $v_c \in V$ — the current city is one of the cities |
| $\subseteq$ | "is a subset of" | $V_{\text{vis}} \subseteq V$ — the visited cities are some of the cities |
| $\mid$ | "such that" | inside $\{\, \dots \mid \dots \,\}$ |
| $\cup$ | union, "with ... added" | $V_{\text{vis}} \cup \{v_n\}$ — mark $v_n$ visited |
| $\setminus$ | set difference, "with ... removed" | $s \setminus \mathit{Del}(a)$ |
| $2^{F}$ | powerset, all subsets of $F$ | $S = 2^F$ — a state is any combination of facts |
| $\emptyset$ | the empty set | no elements satisfy the condition |

$2^F$ is worth dwelling on, since it looks like arithmetic and isn't: it denotes the set
of all subsets of $F$, named that way because a set with $|F|$ elements has exactly
$2^{|F|}$ subsets. That single piece of notation is the entire content of the exponential
blow-up in [[planning-complexity]].

## Applying it: the STRIPS transition function

$$
f(o, s) = \big(s \setminus \mathit{Del}(o)\big) \cup \mathit{Add}(o)
$$

Read straight through: the next state is the current state, with the delete list
removed, then the add list included. A state here is a set of facts that hold, so
removing a fact makes it false and adding one makes it true. That one line is the entire
semantics of [[strips]] — see the worked `stack(x, y)` example there, where a missing
element of $\mathit{Del}$ is exactly the kind of bug this line's mechanics would catch.

## Relationships

- Worked example this key supports: [[tsp-state-space-model]]
- The language whose semantics is one line of this notation: [[strips]]
- Where the notation's $2^{|F|}$ term comes from and why it matters: [[planning-complexity]]
