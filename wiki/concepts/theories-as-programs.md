---
title: Theories as Programs
type: concept
tags: [history, methodology, week-01]
date: 2026-08-04
---

# Theories as Programs

The research methodology dominant in AI from the 1960s to the 1980s, in which a theory
about how some task is solved was expressed as a program implementing it. Its
characteristic flaw is that such a theory cannot be proved wrong.

## How it works

The standard shape of an AI dissertation in the period was to pick a task and domain,
introspect on how the task is solved, capture that reasoning as a program, and test it
on a handful of examples. The dissertation was then a theory about the domain —
scientific discovery, circuit analysis, story understanding, computational humour — plus
the program embodying it. The supporting technology grew up around this: Lisp, Prolog,
rule-based programming, expert system shells.

The methodological problem is that when the program fails, the failure can always be
attributed to missing knowledge rather than to the theory being wrong. Nothing about the
theory is at risk from any experiment, which puts it outside science by the falsifiability
criterion. Three responses were available, each with its own cost:

| Response | Cost |
|---|---|
| Narrow the domain (expert systems) | Lack of generality; the system fails on the next variation |
| Accept the program as an illustration or demo | Limited scientific value |
| Fill in the missing knowledge (commonsense, intuition) | Systems nobody can understand, and never successful |

The knowledge-based approach reached an impasse in the 1980s, and this is presented as
the cause of the AI winter of that period — a methodological failure rather than a
shortage of computing power. The contemporaneous criticism, Haugeland's, was that good
old-fashioned AI amounts to rule application and intelligence is not rule application.

## Why it matters

The replacement paradigm, [[models-and-solvers]], is defined largely in opposition to
this one. A solver makes a claim about a family of problems rather than one problem, so
it can be tested on instances nobody has seen and the claim can fail. That is why the
field's evaluation methodology became empirical, with shared benchmarks and competitions
such as the [[international-planning-competition]]. The historical criticisms of
mainstream AI were partially valid at the time and are considerably less valid now,
precisely because the methodology changed.

The same falsifiability argument reappears in the subject's rejection of AGI as a
research framing and its preference for *bounded* general AI, where the class of
problems being generalised over is stated in advance.

## Relationships

- The paradigm that replaced it: [[models-and-solvers]]
- The falsifiability argument recurs in [[turing-test]] and in the AGI discussion in [[w01a-introduction-to-ai]]
- Historical setting: [[dartmouth-workshop]]

## Sources

- [[w01-prerecorded-ai-overview]] — video 1 develops the methodology, the three responses, and the AI winter
- [[w01a-introduction-to-ai]] — reuses the falsifiability argument against AGI
