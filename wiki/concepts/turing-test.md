---
title: Turing Test
type: concept
tags: [foundations, philosophy, week-01]
date: 2026-08-04
---

# Turing Test

Turing's operational replacement for the question "can machines think": if a human
interrogator communicating through a terminal cannot reliably tell whether the
respondent is a machine or a person, the machine passes.

## How it works

The test comes from Alan Turing's 1950 paper *Computing Machinery and Intelligence*,
which opens by proposing to consider the question of whether machines can think, and
then replaces it with a game — the imitation game — because the original question is
too ill-defined to answer. A human communicates through a text channel with something
that is either another human or a program, and judges which. Fooling the judge is the
criterion.

It occupies the *acting humanly* quadrant: it makes no claim about what is happening
inside the system, only about the behaviour it produces. That is simultaneously the
test's strength as an operational criterion and the target of its best-known criticism.

John Searle's Chinese Room (1980) supplies that criticism. Searle imagines himself
sealed in a room with boxes of Chinese characters he cannot read and a rulebook, in a
language he can read, telling him which characters to send out in response to characters
passed in. Someone outside would judge that they are conversing with a Chinese speaker.
Searle argues that he nonetheless does not understand Chinese; he is simulating the
knowledge, and simulation of understanding is not understanding. If the argument holds
against the room, it holds against any program passing the test.

The lecture applies this directly to large language models. An LLM predicting the next
token is close in structure to the room, so the fact that it produces convincing
conversation settles the *acting humanly* question and leaves the question of whether it
is intelligent exactly where it was — which is to say, not well defined.

## Why it matters

The test is the reason this subject does not aim at imitating humans. Passing it is a
coherent goal, and a system that looks intelligent may well be useful, but "looks
intelligent" is not a specification you can build a solver against. The alternative
criterion, [[rational-agent]] behaviour relative to a stated performance measure, is
falsifiable and bounded, and that is why the subject adopts it.

## Relationships

- The *acting humanly* alternative to [[rational-agent]]
- Turing appears again as a founder of the computational model referenced in [[dartmouth-workshop]]
- The falsifiability argument mirrors the one in [[theories-as-programs]]

## Sources

- [[w01a-introduction-to-ai]] — presents the imitation game, the Chinese Room video, and the application to LLMs
- [[w01-prerecorded-ai-overview]] — video 1 notes Turing's chapter opening *Computers and Thought* (1963)
