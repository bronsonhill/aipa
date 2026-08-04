---
title: Boolean Satisfiability (SAT)
type: concept
tags: [logic, complexity, models, week-01]
date: 2026-08-04
---

# Boolean Satisfiability (SAT)

The problem of deciding whether there is an assignment of true or false to a set of
Boolean variables that satisfies a set of clauses. Not covered in depth in this subject,
but included as the reference point for what a model and a general solver look like.

## How it works

A SAT instance is given in conjunctive normal form: a conjunction of clauses, where each
clause is a disjunction of literals and a literal is a variable or its negation. A
solver must either produce a satisfying assignment or establish that none exists.

SAT is NP-complete, so worst-case running time is exponential in the number of variables
— for 100 variables, $2^{100} \approx 10^{30}$ combinations, a number with no physical
interpretation. What makes SAT interesting rather than hopeless is that current solvers
routinely handle instances with thousands of variables and hundreds of thousands of
clauses, and do so quickly. Real instances have structure, and solvers exploit it
through inference methods such as unit propagation and conflict-driven clause learning
paired with search; see [[search-and-inference]].

This gap between worst-case hardness and practical performance is the pattern the whole
subject depends on, which is why SAT is introduced first.

The main industrial use is verification: checking that a logical circuit behaves as
specified, including in safety-critical settings such as aircraft control circuits, and
in circuit design more generally. SAT also appears inside planning, since one family of
classical planners works by compiling a bounded-horizon planning problem into a SAT
instance — SATPLAN won optimal tracks of the [[international-planning-competition]] in
2004 and 2006 on this basis.

## Formula

A formula in CNF over variables $x_1, \dots, x_n$:

$$
\varphi = \bigwedge_{j=1}^{m} C_j,
\qquad
C_j = \bigvee_{k} \ell_{jk},
\qquad
\ell_{jk} \in \{x_i,\ \neg x_i\}.
$$

For example, $\varphi = (x \vee \neg y \vee z \vee \neg w) \wedge (x \vee y)$.

The task is to decide whether there exists $\sigma : \{x_1,\dots,x_n\} \to \{0,1\}$ with
$\sigma(\varphi) = 1$. The search space has size $2^n$, and

$$
\textsf{SAT} \in \text{NP-complete}.
$$

## Why it matters

SAT is the cleanest example of the [[models-and-solvers]] agenda. The model is minimal —
Boolean variables and clauses, nothing else — the solvers are entirely general, and the
worst case is provably bad while practice is provably good enough to build industries
on. When the subject argues that intractable models are still worth having, SAT is the
existence proof.

## Relationships

- A special case of [[constraint-satisfaction-problem]] with Boolean domains
- Easier in the worst case than [[classical-planning]]; see [[planning-complexity]]
- Solved by the mechanisms in [[search-and-inference]]
- An instance of [[models-and-solvers]]

## Sources

- [[w01-prerecorded-ai-overview]] — videos 3 and 4 give the model, the complexity, the practical scale of solvers, and the verification application
- [[w01b-introduction-to-planning]] — planning as SAT among the computational approaches to classical planning
