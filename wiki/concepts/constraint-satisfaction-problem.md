---
title: Constraint Satisfaction Problem (CSP)
type: concept
tags: [logic, complexity, models, week-01]
date: 2026-08-04
---

# Constraint Satisfaction Problem (CSP)

The problem of assigning a value to each of a set of finite-domain variables so that all
constraints between them are satisfied. SAT is the special case where every domain is
Boolean.

## How it works

A CSP has variables, each with a finite domain of possible values, and constraints
restricting which combinations of values may be assigned jointly. A solution assigns
every variable a value from its domain such that no constraint is violated. Unlike a
planning problem, the answer is a *state* satisfying constraints rather than a sequence
of actions producing one.

The classic example is the eight queens problem: place eight queens on a chessboard so
that no queen attacks another. Modelled as a CSP, there is one variable per queen whose
domain is the squares (or, more efficiently, the rows) it may occupy, with constraints
forbidding any two queens from sharing a row, column, or diagonal. A general CSP solver
returns an assignment without knowing anything about chess.

The relationship to [[boolean-satisfiability]] runs both ways. SAT is a CSP whose
variables all have domain $\{0,1\}$ and whose constraints are all disjunctive clauses;
conversely any finite-domain CSP can be encoded into SAT. Keeping them distinct is
worthwhile because the richer constraint language allows more expressive statements than
disjunctions of literals, and because the specialised inference available in SAT solvers
is very effective on the Boolean case.

Both are NP-complete, and both are attacked by the same combination described in
[[search-and-inference]] — search over assignments, guided by inference that propagates
the consequences of partial assignments and prunes domains.

## Formula

A CSP is a triple

$$
\langle X,\ D,\ C \rangle
$$

with variables $X = \{x_1, \dots, x_n\}$, finite domains $D = \{D_1, \dots, D_n\}$ where
$x_i \in D_i$, and constraints $C$, each $c \in C$ being a relation over some subset of
variables, $c \subseteq D_{i_1} \times \cdots \times D_{i_k}$.

A solution is an assignment $\sigma$ with $\sigma(x_i) \in D_i$ for all $i$ and
$(\sigma(x_{i_1}), \dots, \sigma(x_{i_k})) \in c$ for every $c \in C$. The unrestricted
search space has size $\prod_{i} |D_i|$, and

$$
\textsf{CSP} \in \text{NP-complete}.
$$

## Why it matters

CSP and SAT occupy the first of the nine post-1990s AI research areas, and they set the
pattern the subject then applies to planning: a minimal general model, general solvers,
NP-completeness, and practical performance far better than the worst case suggests.
Neither is covered in depth in this subject, but the contrast is what makes planning's
extra difficulty legible — planning is PSPACE-complete rather than NP-complete because
a plan may be exponentially long, whereas a CSP solution is always exactly one value per
variable.

## Relationships

- Generalises [[boolean-satisfiability]]
- Contrast with [[classical-planning]] and its complexity, [[planning-complexity]]
- An instance of [[models-and-solvers]]; solved via [[search-and-inference]]

## Sources

- [[w01-prerecorded-ai-overview]] — videos 3 and 4 give the model, the eight queens example, and the relationship to SAT
