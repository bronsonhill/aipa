#flashcards/w04-relaxation-heuristics

## Elaborative Interrogation

A relaxation is defined so that $h^{\mathcal{R}}(\Pi) \le h^*(\Pi)$ is baked into the definition rather than proved separately for each new relaxation. Why does simplifying a problem guarantee this bound automatically?

?

An optimal solution to a *simplified* version of a problem can never cost more than an optimal solution to the original — any constraint you drop can only make solving easier or equal, never harder. So for any relaxation $(\mathcal{P}', r, h'^*)$, $h'^*(r(\Pi))$ is the cost of solving something at least as easy as $\Pi$, which can't exceed $h^*(\Pi)$.
#card/cmas #card/relaxation

The lecture states that none of "native", "efficiently constructible", or "efficiently computable" is a strict requirement for a relaxation to be useful. What is each property actually classifying, if not usefulness?

?

They classify *how* a relaxation behaves computationally, not whether it's good: native asks whether the simplified problem stays inside the original family using the same method; constructible asks whether transforming an instance is cheap; computable asks whether solving the simplified instance is cheap. A relaxation failing all three could still, in principle, be approximated into something useful — the taxonomy names distinctions, it doesn't gatekeep.
#card/cmas #card/relaxation

Why is the "pretend you're a bird" relaxation of route-finding *not* native, while goal counting *is* native for STRIPS?

?

Native requires the simplified problem family to be a subset of the original, using the same computational method. A fully-connected, straight-line-weighted graph is not itself an instance of road-based route-finding (no real road network has every city mutually reachable by a straight line), so bird route-finding falls outside the original family. Dropping preconditions and deletes from a STRIPS task, by contrast, still yields a STRIPS task — it's simply a STRIPS task with empty precondition and delete lists — so it stays inside the family.
#card/cmas #card/relaxation

Goal counting is native and efficiently constructible, yet the lecture calls it "not efficiently computable." What exactly fails to be computable, and why doesn't that make goal counting itself hard to evaluate?

?

What fails to be efficiently computable is the *simplified problem's own optimal plan cost* — STRIPS with empty preconditions and deletes is still NP-hard once an action can add more than two facts, by reduction from minimum set cover. Goal counting sidesteps this by not actually solving that hard problem: it just counts unmet goal propositions as an *approximation* of the relaxed problem's true (hard-to-compute) optimum, which is itself trivially cheap to evaluate.
#card/cmas #card/goal-counting-heuristic

Any STRIPS planning task can, in principle, be re-encoded so that goal counting evaluates to exactly 1 on every non-goal state, without changing the underlying problem. What does this fact demonstrate about goal counting as a heuristic?

?

It shows how little of the problem's real structure goal counting actually preserves: since a re-encoding can flatten its range to a single constant value on all non-goal states, the heuristic's informativeness is not an intrinsic property of "how hard the problem is" but an artifact of how goals happen to be counted in the given encoding — a genuinely uninformative heuristic in the worst case.
#card/cmas #card/goal-counting-heuristic

The delete relaxation is summarised by the slogan "what was once true remains true forever." Trace precisely what changes about action semantics, and what stays the same.

?

For an action $a$, the relaxed action $a^+$ keeps exactly the same precondition list $pre_a$ and the same add-effect list $add_a$; only the delete list is set to $\emptyset$. So an action still requires the same conditions to fire and still adds the same facts — it simply never removes anything, meaning states under the relaxation can only ever grow monotonically as actions are applied.
#card/cmas #card/delete-relaxation

State dominance ($s'$ dominates $s$ iff $s \subseteq s'$) is the mechanism behind the delete relaxation's admissibility proof. Walk through why "relaxed states only grow" implies the relaxation can never turn a solvable task unsolvable.

?

Because relaxed actions only add facts, applying one from state $s^+$ always produces a state dominating $s^+$ itself. Dominance is also preserved forward: if $s'^+$ dominates $s^+$, then any action sequence applicable in $s^+$ remains applicable in $s'^+$, and if $s^+$ is a goal state, so is any state that dominates it. Chaining these facts along an entire plan shows that stripping the deletes from *any* real solving plan yields a state sequence that still reaches the goal — so the relaxed task is never harder to solve than the original.
#card/cmas #card/delete-relaxation

$h^+$ is provably admissible, yet computing it exactly is NP-complete. Why doesn't admissibility (which sounds like a strong, useful guarantee) save $h^+$ from being computationally useless in practice?

?

Admissibility is a guarantee about the *value* $h^+$ returns relative to $h^*$ — that it never overestimates — but says nothing about how expensive it is to *compute* that value. $\mathrm{PlanOpt}^+$ (deciding whether a relaxed plan of cost $\le B$ exists) is NP-complete by a direct reduction from SAT, so finding the truly optimal relaxed plan is generally as hard as satisfiability itself, independent of how well-behaved the resulting number would be.
#card/cmas #card/delete-relaxation

$h^\text{max}$ is admissible but "typically far too optimistic" in practice, while $h^\text{add}$ is inadmissible but "typically much more informative." What single modelling assumption, and single point of divergence, produces this trade-off?

?

Both approximate a multi-fact sub-goal's cost by assuming its individual facts can be achieved independently; they differ only in how those independent per-fact estimates combine. $h^\text{max}$ takes the *max*, implicitly assuming the hardest single sub-goal dominates and the rest come free — which throws away genuine extra cost. $h^\text{add}$ takes the *sum*, treating every sub-goal as needing fully separate work — which double-counts whenever sub-goals actually share a sub-plan.
#card/cmas #card/max-heuristic #card/additive-heuristic

In a logistics task where 100 packages all sit in the same city and must all move to another city via the same route, $h^\text{add}$ badly over-estimates the true cost. Explain the mechanism of the over-count, and why $h^\text{FF}$ mostly avoids it.

?

$h^\text{add}$ sums the cost of every top-level goal independently, so it pays for moving the truck along the shared route once *per package* — 100 times over — because its recursive definition has no way to notice that the same underlying action sequence serves all 100 sub-goals at once. $h^\text{FF}$ instead extracts one concrete relaxed plan via backward chaining over a best-supporter function and sums only the *distinct* actions actually collected, so a shared action supporting many facts is only ever counted once in the final sum.
#card/cmas #card/relaxed-plan-heuristic

Why must a best-supporter function be both closed and well-founded for relaxed plan extraction to actually produce a valid plan, and what concretely goes wrong if well-foundedness fails?

?

Closed means every non-true fact reachable from a goal in the support graph has a defined supporter, so backward chaining never gets stuck with nowhere to go. Well-founded means the support graph is acyclic, so backward chaining terminates by resolving down to facts already true in $s$. If the graph has a cycle — e.g. fact $p$'s best supporter needs precondition $q$, and $q$'s best supporter needs precondition $p$ — backward chaining from the goal can loop between $p$ and $q$ forever without ever reaching $s$, so no valid plan is extracted even though the facts are individually reachable.
#card/cmas #card/relaxed-plan-heuristic

FF restricts enforced hill-climbing to expand *only* helpful actions, while other planners use helpful actions as preferred operators instead. What is the completeness trade-off each choice makes, and why?

?

Restricting to only helpful actions discards the guarantee that every applicable action is eventually tried, so a plan requiring an action outside the current relaxed plan may never be found — a real loss of completeness in exchange for a much smaller branching factor. Treating them as preferred operators instead just re-orders expansion (helpful-derived nodes go first) while keeping the full action set available, so completeness is preserved at the cost of not shrinking the branching factor as aggressively.
#card/cmas #card/helpful-actions

Why does dropping delete effects make FreeCell's search space simpler in a very specific, mechanical sense — not just "generally easier"?

?

In FreeCell, a card cannot move onto a goal pile if something else currently occupies the space it would take there, or if a free cell is full — both are "in the way" facts that must be deleted (cleared) before the move is legal in the real game. Dropping deletes means those blocking facts are simply never removed to require clearing, so every card can move directly to its goal pile immediately, regardless of the current board state.
#card/cmas #card/delete-relaxation

## Mechanism

State the delete relaxation formally: given a STRIPS action $a$, what exactly is $a^+$, and how does this extend to a whole planning task $\Pi^+$?

?

$pre_{a^+} := pre_a$ (same preconditions), $add_{a^+} := add_a$ (same add effects), $del_{a^+} := \emptyset$ (deletes dropped). For a set of actions $A$, $A^+ := \{a^+ \mid a \in A\}$; for a task $\Pi = (F,A,c,I,G)$, the relaxed task is $\Pi^+ := (F, A^+, c, I, G)$ — only the action set changes, facts, cost, initial state, and goal are untouched.
#card/cmas #card/delete-relaxation

Trace the greedy relaxed planning algorithm step by step: given a state $s$, how does it decide a relaxed plan exists, and why does it always terminate?

?

Initialise $s^+ := s$, $\vec{a}^+ := \langle\rangle$. While $G \not\subseteq s^+$: if some action $a$ has $pre_a \subseteq s^+$ and applying $a^+$ actually changes $s^+$, select it, apply it (update $s^+$ and append $a^+$ to the plan); otherwise return "unsolvable." It terminates because every action can be selected at most once — once applied, its add effects are already permanently true, so re-applying it again would leave $s^+$ unchanged, which the "changes $s^+$" check catches.
#card/cmas #card/delete-relaxation

Reproduce the recursive definition of $h^\text{add}(s,g)$, including all three cases.

?

$$h^\text{add}(s,g) = \begin{cases} 0 & g \subseteq s \\ \min_{a \in A,\ g \in add_a} c(a) + h^\text{add}(s, pre_a) & |g| = 1 \\ \sum_{g' \in g} h^\text{add}(s, \{g'\}) & |g| > 1 \end{cases}$$

Base case: goal already true costs 0. Singleton goal: cheapest achieving action's cost plus the estimated cost of its own preconditions. Multi-fact goal: sum the singleton estimates. ($h^\text{max}$ is identical except the multi-fact case takes $\max$ instead of $\sum$.)
#card/cmas #card/additive-heuristic

Reproduce the SAT-to-$\mathrm{PlanOpt}^+$ reduction used to prove optimal relaxed planning is NP-complete: what facts and actions encode a CNF formula, and what plan cost corresponds to satisfiability?

?

For each variable $v_i$: three facts $v_i$, $notv_i$, $setv_i$, and two actions $setvtrue_i: (\emptyset, \{v_i, setv_i\}, \emptyset)$ and $setvfalse_i: (\emptyset, \{notv_i, setv_i\}, \emptyset)$. For each clause $c_j$: one fact $satc_j$, and an action $makesatc_j: (\{v_i\}, \{satc_j\}, \emptyset)$ for each variable appearing positively in $c_j$, or $(\{notv_i\}, \{satc_j\}, \emptyset)$ for each appearing negatively. Initial state $\emptyset$; goal $\{setv_1,\dots,setv_m, satc_1,\dots,satc_n\}$; bound $B := m+n$. A cost-$(m+n)$ relaxed plan (one set-action per variable, one make-sat action per clause) exists exactly when the assignment it encodes satisfies every clause.
#card/cmas #card/delete-relaxation

Walk through the relaxed plan extraction algorithm: given a state $s$ and a best-supporter function $bs$, how does it build $RPlan$ from the goal backward?

?

Initialise $Open := G \setminus s$, $Closed := \emptyset$, $RPlan := \emptyset$. While $Open \ne \emptyset$: pick a fact $g \in Open$, move it to $Closed$, add its best supporter $bs(g)$ to $RPlan$, and add $bs(g)$'s own preconditions — minus what's already true in $s$ or already closed — back into $Open$. Return $RPlan$ once $Open$ empties. It runs in time bounded by $|F|$ because each fact is processed at most once.
#card/cmas #card/relaxed-plan-heuristic

Prove, at a sketch level, that $bs_s^\text{max}$ is well-founded (its support graph is acyclic) whenever every action cost is strictly positive.

?

If $a = bs_s^\text{max}(p)$, then $a$ achieves the minimum in the equation giving $0 < h^\text{max}(s,\{p\}) < \infty$. Since $c(a) > 0$, the cost contribution forces $h^\text{max}(s, pre_a) < h^\text{max}(s, \{p\})$, so every precondition $q \in pre_a$ satisfies $h^\text{max}(s, \{q\}) < h^\text{max}(s, \{p\})$. Transitively, any support-graph path from fact $r$ to fact $t$ forces $h^\text{max}(s,\{r\}) < h^\text{max}(s,\{t\})$ — a strictly decreasing quantity along any path rules out cycles.
#card/cmas #card/relaxed-plan-heuristic

## Contrast

Contrast $h^\text{max}$ and $h^\text{FF}$: both are derived from the same kind of best-supporter function, so what actually distinguishes their formal guarantees and typical behaviour?

?

$h^\text{max}$ *is* provably admissible ($h^\text{max} \le h^+ \le h^*$ always), because taking the max over sub-goals can never overshoot the true cost. $h^\text{FF}$ extracts one concrete relaxed plan from a best-supporter function (which can be $h^\text{max}$- or $h^\text{add}$-derived) and sums its actions' costs — this is provably $\ge h^+$, so $h^\text{FF}$ is *not* admissible in general, though it usually stays much closer to $h^*$ in practice than either $h^\text{max}$'s under-estimate or $h^\text{add}$'s over-count.
#card/cmas #card/max-heuristic #card/relaxed-plan-heuristic

Contrast the "native" classification of goal counting (a delete-and-precondition-dropping relaxation) with the "not native" classification of the straight-line route-finding relaxation, in terms of what each simplified family actually contains.

?

Goal counting's simplified family — STRIPS tasks with empty preconditions and deletes — is a genuine subset of all STRIPS tasks, since such a task is still, syntactically, a valid STRIPS task; nothing about the definition of STRIPS is violated. The straight-line relaxation's simplified family — fully-connected graphs weighted by Euclidean distance — is not a subset of real road-network route-finding instances, because no real road network can have every pair of cities directly and mutually connected by a straight line; the simplified instances live outside the original problem class entirely.
#card/cmas #card/relaxation

## Failure-Mode

A student computes $h^\text{FF}(s)$ and finds it strictly greater than $h^*(s)$ on some state, then concludes they must have made an arithmetic error, since $h^\text{FF}$ "should be admissible like other relaxation heuristics." What's wrong with this reasoning?

?

$h^\text{FF}$ is not admissible in general — only $h^\text{max}$ and $h^+$ carry that guarantee among the heuristics covered this week. $h^\text{FF} \ge h^+$ always, and there provably exist tasks and states where $h^\text{FF}(s) > h^*(s)$; it is pessimistic like $h^\text{add}$, just usually less badly so because it avoids most (not all) of the over-counting that plagues $h^\text{add}$. Finding $h^\text{FF}(s) > h^*(s)$ on some example is expected behaviour, not necessarily an error.
#card/cmas #card/relaxed-plan-heuristic

A student picks a best-supporter function where $bs(t(B)) = dr(C,B)$ and $bs(t(C)) = dr(B,C)$ in a simple A–B–C–D logistics chain, then runs relaxed plan extraction expecting it to terminate with a correct plan. What actually happens, and why?

?

The support graph now contains a two-cycle: $t(B)$'s supporter needs precondition $t(C)$, and $t(C)$'s supporter needs precondition $t(B)$. Backward chaining from the goal opens $t(B)$, which reopens $t(C)$ as a precondition, which reopens $t(B)$ again — the algorithm as specified will keep adding facts already seen without ever resolving down to the true initial state $t(A)$, because this $bs$ is not well-founded (its support graph is cyclic).
#card/cmas #card/relaxed-plan-heuristic

A relaxation is efficiently constructible and native, so a student assumes it must also be efficiently computable. Using goal counting as the counterexample, explain why this assumption fails.

?

None of the three properties implies any other — they classify independent aspects of a relaxation (family membership plus method, cost of the transformation, cost of solving the transformed instance). Goal counting is native (the simplified STRIPS family is a genuine subset) and efficiently constructible (dropping two lists is trivial), but the simplified problem's own optimal cost is NP-hard to compute exactly past two add effects per action — so it fails efficient computability despite satisfying the other two.
#card/cmas #card/relaxation

## Deck notes

Scope: week 4 of COMP90054 — the relaxation methodology and its dominant instance, the
delete relaxation. Cards are drawn from [[relaxation]], [[goal-counting-heuristic]],
[[delete-relaxation]], [[max-heuristic]], [[additive-heuristic]],
[[relaxed-plan-heuristic]], and [[helpful-actions]], plus the three week 4 source pages
and [[w04-relaxation-and-delete-relaxation-digest]].

Coverage check: every week 4 concept page has at least two cards, and the two heaviest
concepts — [[delete-relaxation]] and [[relaxed-plan-heuristic]] — carry both a
mechanism card reproducing exact formal content (the $a^+$ definition, the greedy
relaxed planning loop, the SAT reduction, the extraction algorithm, the
well-foundedness proof sketch) and at least one conceptual/failure-mode card. No
definition-only cards: every "what is X" was rewritten as why-X-holds,
how-X-differs-from-Y, or what-breaks-without-X, per the user's request for a mix of
technical and conceptual coverage rather than a purely technical or purely summary
deck.

Deliberately reproduces formal machinery in full where the digest does — the $h^\text{add}$
recursive equation, the SAT-to-PlanOpt⁺ reduction, and the well-foundedness proof
sketch are given at the same level of detail as the source lecture, because these are
exactly the kind of derivation the subject examines directly (see the digest's exam
surface). The 8-puzzle relaxation exercise (deriving Manhattan distance / misplaced
tiles) is deliberately left off this deck, since the source material poses it as an
unanswered exercise rather than a settled result — turning an open question into a
flashcard with a canned answer would misrepresent it. Landmarks and abstractions, the
other two relaxation families named but out of scope for this course, are likewise
excluded. Tag convention `#card/cmas` inherited from the week 2 and 3 decks for filter
compatibility.
