---
title: The Control Problem
type: concept
tags: [foundations, autonomy, week-01]
date: 2026-08-04
---

# The Control Problem

The problem of selecting the action to do next. Every approach to autonomous behaviour
is an answer to it, and there are three: specify the control by hand, learn it from
experience, or specify the problem by hand and derive the control automatically.

## How it works

**Programming-based.** The programmer writes the controller directly. For a Mario agent
this looks like a set of rules: if no danger, run; if danger appears and Mario is big,
jump and kill. Domain knowledge is easy to express this way, which is its real
advantage. The failure mode is that the agent cannot handle any situation the programmer
did not anticipate, and the space of situations is usually much larger than the space of
situations anyone thinks to write down.

**Learning-based.** The controller is induced from experience or simulation. Unsupervised
(reinforcement learning) penalises the agent when Mario dies and rewards it for
finishing a level; supervised learning classifies actions as good or bad from labelled
traces. This handles unanticipated situations better, but requires either large amounts
of interaction or labelled data, and what is learned is hard to inspect or adapt.

**Model-based.** The programmer specifies the *problem* — actions, initial situation,
goals, sensors — and a solver computes the controller. This is the subject's approach,
and it inherits the properties of [[models-and-solvers]]: generality where generality is
required, rapid prototyping (tens of lines of problem description in place of thousands
of lines of C++), and a description that can be adapted and maintained because it says
what the world is like rather than what to do. The cost is computational, since the
models involved are intractable.

The three are not mutually exclusive, and the interesting work is often at the
boundaries — using learning to acquire a model, or to acquire heuristics for a solver.

## Why it matters

The framing explains why this subject exists as something other than a programming or a
machine learning subject. It also explains the ambition behind general problem solving:
write one program that solves all problems in a class, which forces the question of what
counts as a "problem" and what counts as "solving" it. That question is answered by
committing to a model, and the first commitment the subject makes is
[[classical-planning]].

## Relationships

- The model-based branch leads to [[models-and-solvers]] and [[classical-planning]]
- The learning-based branch reappears with [[markov-decision-process]] and reinforcement learning
- Contrast with the historical approach described in [[theories-as-programs]]

## Sources

- [[w01b-introduction-to-planning]] — sets out the three approaches with the Mario example and the general problem solving ambition
- [[w01a-introduction-to-ai]] — frames autonomy as making rational action choices, see [[rational-agent]]
