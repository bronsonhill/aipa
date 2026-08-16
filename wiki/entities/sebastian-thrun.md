---
title: Sebastian Thrun
type: entity
entity_type: person
tags: [people, robotics, week-03]
date: 2026-08-16
---

# Sebastian Thrun

AI researcher, roboticist and entrepreneur, best known for leading the Stanford team
that first completed the DARPA Grand Challenge and for founding the online education
platform Udacity.

## Key facts

- Led the Stanford team whose car was the first to finish the [[darpa-grand-challenge]], after several years in which no team completed it.
- A precursor of SLAM (simultaneous localisation and mapping), the family of algorithms now standard for a robot working out where it is in its environment.
- Founded Udacity, an online learning platform, and is described in the subject as a good educator as well as a researcher.
- The week 3 material includes his own recorded explanation of the Stanford car's path planner, showing A\* search trees over a maze, a barrier requiring a multi-point turn, and a reverse park into a gap between two cars.

## Relevance to AI Planning for Autonomy

Thrun's footage is used to close the distance between a 1970s algorithm and a working
autonomous vehicle: the [[a-star-search]] invented for [[shakey-the-robot|Shakey]] is
the same one planning the car's paths forty years later, with a straight-line Euclidean
distance heuristic, at under 10 milliseconds per query. The lecture adds a clarification
Thrun's own commentary leaves implicit — A\* there searches an abstract discretisation
and high-level manoeuvres, not the continuous motion, which is a separate lower-level
control problem.

## Sources

- [[w03-prerecorded-heuristic-search]] — the embedded DARPA footage and Lipovetzky's commentary on its scope
- [[w03a-heuristic-functions-properties]] — DARPA and SLAM as the modern backdrop for studying A\*
