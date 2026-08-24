---
title: Enforced Hill-Climbing
type: concept
tags: [search, local-search, algorithms, week-03]
date: 2026-08-16
---

# Enforced Hill-Climbing

A hybrid of local and systematic search: [[hill-climbing]] in which each step, instead
of looking only at immediate successors, runs a breadth-first search for the nearest
state with a strictly better heuristic value, then commits to that path and discards
everything else generated.

## How it works

```
def improve(σ₀):
    queue := new fifo queue ;  queue.push-back(σ₀) ;  closed := ∅
    while not queue.empty():
        σ = queue.pop-front()
        if state(σ) ∉ closed:
            closed := closed ∪ {state(σ)}
            if h(state(σ)) < h(state(σ₀)): return σ
            for each (a, s') ∈ succ(state(σ)):
                queue.push-back(make-node(σ, a, s'))
    fail

σ := make-root-node(init())
while not is-goal(state(σ)):
    σ := improve(σ)
return extract-solution(σ)
```

A FIFO queue rather than a priority queue is what makes `improve` a
[[breadth-first-search]]; the stopping condition is the first state whose $h$ is
strictly smaller than the $h$ of the state the search started from. So the algorithm
looks $k$ steps ahead systematically, for whatever $k$ turns out to be needed, rather
than one step.

The interesting part is what happens after `improve` returns. The entire tree generated
during the breadth-first search is discarded and only the path to the improving state is
kept, and the next call starts fresh from that state with a new, lower comparison
value. That is the local half: the systematic search establishes that a better state
exists and how to reach it, then the algorithm commits and forgets. Breadth-first
search's problem is space rather than time — a plain breadth-first search exhausts
memory within seconds on a real problem — and the commit step is what keeps that
bounded, provided each improvement is found within a few layers.

This gives a systematic way out of a local minimum, which plain hill-climbing has no
mechanism for at all. The qualification is depth: if the local minimum is wide, the
breadth-first search has to go deep to escape it, and the memory problem returns.

**Completeness and optimality.** Identical to hill-climbing — neither is guaranteed, for
the same reasons. Once `improve` returns, the alternatives are gone, so a commitment
into a dead-end region is as irreversible as before. The systematic step changes what
the search can reach, not what it can guarantee.

## Why it matters

Enforced hill-climbing was the main search algorithm inside essentially every planner
until around 2012, and remains in use for planning problems in domains such as UAV and
underwater-vehicle control. It is also the clearest demonstration in the subject that
the systematic/local distinction is a spectrum: taking the memory behaviour of local
search and the reach of systematic search, in the proportion the problem needs.

## Relationships

- Combines [[hill-climbing]] with [[breadth-first-search]]; a hybrid within [[local-search]]
- Shares hill-climbing's failure modes and its need for $h(s) > 0$ at non-goal states, see [[heuristic-properties]]
- Used by the FF planner restricted to [[helpful-actions]] rather than the full successor set, trading completeness for speed

## Sources

- [[w03-prerecorded-heuristic-search]] — the `improve` procedure traced pictorially, and the local/systematic mix
- [[w03b-local-search-and-bfws]] — memory behaviour, escaping local minima, and the identical guarantees to hill-climbing
- [[w04b-delete-relaxation-heuristics]] — FF's restriction of enforced hill-climbing to helpful actions
