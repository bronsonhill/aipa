---
title: Novelty
type: concept
tags: [search, width, week-02]
date: 2026-08-10
---

# Novelty

A measure, defined over a factored state representation, of how much new information a
newly generated state carries relative to every state already visited in the search.
The foundational concept behind [[iterative-width-search]].

## How it works

Given a state $s$ generated during search, and the history of all previously visited
states, the novelty of $s$ is the size of the smallest subset of atoms true in $s$ that
is not a subset of the atoms true in any previously visited state. Concretely: check
every subset of $s$'s true atoms, smallest first (size 1, then size 2, and so on); the
first size at which some subset has never appeared before is the novelty of $s$.

If *every* subset of $s$'s atoms — including the full set, which means $s$ itself — has
already appeared, $s$ is a true duplicate of a previously visited state, and its
novelty is defined as $|F|+1$, one more than the total number of atoms $F$ in the
problem, a sentinel value larger than any genuine novelty score.

A worked example: given atoms $P, Q, R$, if $P$ and $Q$ have each individually appeared
before (in different earlier states) but the pair $\{Q, R\}$ has not, a state
containing $Q$ and $R$ has novelty 2 — its size-1 subsets ($Q$, $R$ individually) are
both already seen, but the size-2 subset $\{Q, R\}$ is new. In practice this is tracked
with a novelty table recording, per subset size, the earliest state at which each
combination of atoms became true.

## Why it matters

Novelty operationalises the intuition that a state contributing genuinely new
information about the problem — a fact combination never seen before — is more likely
to be worth exploring than one that only re-combines already-explored facts. It gives
[[iterative-width-search]] a principled way to prune the search space that is entirely
structural (computed from the state representation alone) rather than requiring any
hand-built or learned heuristic.

The choice of which variables make up the factored state representation directly
determines novelty scores, and therefore which states a novelty-bounded search can
reach at all — see [[iterative-width-search]] for the grid-representation exercise
illustrating this.

## Relationships

- Drives the pruning rule in [[iterative-width-search]]
- Computed over the atoms of a [[search-node]]'s state, as defined by [[state-space-modelling]]
- Sensitive to the choice of factored representation, the same choice discussed generally in [[state-space-modelling]]

## Sources

- [[w02b-width-and-iterative-search]] — defines novelty, works two examples (a short trace, and a five-state novelty table), and states the $|F|+1$ true-duplicate convention
