---
title: editor.planning.domains
type: entity
entity_type: software
tags: [tooling, pddl, week-01]
date: 2026-08-04
---

# editor.planning.domains

A browser-based IDE for writing PDDL and running planners against it, developed at the
University of Melbourne with collaborators at other universities. It is the subject's
default modelling environment.

## Key facts

- Reachable at `editor.planning.domains`; part of the wider planning.domains initiative collecting planning tools and resources across institutions.
- Provides an import library of existing domains, including [[blocksworld]], each with a description and a sample problem, usable as starting points.
- Runs several planners server-side. The default is BFWS, which uses the FF parser; LAMA, using the Fast Downward parser, is also available.
- [[val]] is available as a solver option for validating a plan against the model.
- Sessions can be saved, shared with others, and synchronised with a local VS Code setup through the PDDL extension, with push and pull operations similar to a git remote.
- The alternative local setup is VS Code plus the PDDL extension, optionally with a downloaded plan validator and parser. Both front ends call the same `solve.planning.domains` API, so results agree.
- Planners can also be installed locally via `planutils` for work without a network connection.
- Each imported domain shows a lower and upper bound on plan quality for its problems; when the two meet, the optimal solution is known, and when they don't, only a bracket is known (e.g. blocksworld-16 is bracketed between 48 and 54 at the time of the week 4 demonstration).
- Solvers run under a fixed resource budget (500 MB RAM, 5 s time in the week 4 demonstration); a solution found within budget can still be far from optimal, which the bound display makes visible directly.
- A separate animation plugin (installed as a Visual Studio Code / editor extension, distinct from VAL itself) can play back a found plan step by step against a domain-specific animation profile, e.g. a blocksworld animation profile downloaded and applied to visualise stacking moves.

## Relevance to AI Planning for Autonomy

This is the tool used for the tutorials and the modelling component of the first
assignment. The workflow it supports is the one the subject is teaching: write a domain
and a problem, solve, read the plan, then validate the plan and — more importantly —
test the model against plans that ought to be impossible. The parser differences between
BFWS and LAMA matter in practice, since the FF parser pinpoints a syntax error's line
and token while the Fast Downward parser is more verbose and less precise.

## Sources

- [[w01b-introduction-to-planning]] — live demonstration of importing blocksworld, solving, and validating; setup instructions for the VS Code alternative
- [[nir-lipovetzky]] — the tool comes from his group's planning technology work
- [[w04-prerecorded-planning-complexity]] — demonstrates the lower/upper solution-quality bounds, the resource-budgeted solver run, and the plan animation plugin on a 16-block blocksworld instance
