#flashcards/week-01-foundations

## Elaborative Interrogation

Why is chess used to isolate the fourth failure mode of rationality (bounded computation) rather than one of the other three?
?
Because chess satisfies the other three: performance measure is unambiguous (win), the board is fully observable, and the rules are completely known — yet nobody is a grandmaster purely from knowing the rules. The only thing left to explain the gap is that computing the best action is not feasible in the available time, isolating computational infeasibility as its own distinct failure mode.
#card/cmas #card/rational-agent

Why does the lecture apply the Chinese Room argument to large language models rather than treating it as a purely historical objection to 1980s AI?
?
An LLM predicting the next token is structurally close to Searle sealed in the room following a rulebook: convincing output without any claim about what is happening inside. Passing the Turing test only settles the acting-humanly question; whether the LLM is intelligent is left exactly as undefined as it was for the Chinese Room, which is why the subject does not treat "sounds intelligent" as a specification.
#card/cmas #card/turing-test

Why does classical planning require a language like STRIPS or PDDL rather than being solved by handing a planner the raw state graph?
?
The state space is exponential in the number of state variables ($2^{|F|}$), so it cannot be enumerated or stored explicitly. A language encodes the model compactly — in linear space — and it is this compact encoding that a general solver operates on, discovering the graph implicitly rather than being handed it.
#card/cmas #card/classical-planning

Why is a system of linear equations solved by Gauss-Jordan elimination used as the template example for the models-and-solvers paradigm, given that linear systems are nothing like AI problems?
?
Gauss-Jordan is a solver in the intended sense: it solves any linear system without knowing what the variables mean, exactly the generality AI solvers aim for. The disanalogy — linear systems are tractable while SAT, CSP, and planning are not — is the point: it isolates generality of the solver as the property worth having, independent of whether the underlying model happens to be easy.
#card/cmas #card/models-and-solvers

Why couldn't a theories-as-programs style AI dissertation be proven wrong by any experiment?
?
When the program failed on some input, the failure could always be attributed to missing knowledge rather than to the theory itself being incorrect — there was always a fourth response of "add more knowledge." Since no outcome could count as evidence against the theory, it fell outside science by the falsifiability criterion, which is presented as the methodological root of the AI winter rather than a shortage of compute.
#card/cmas #card/theories-as-programs

Why must inference be "cheap" for the search-and-inference pairing to actually help a solver scale?
?
Inference produces guidance — a heuristic estimate or a pruning rule — by spending computation instead of exploring more of the search space directly. If computing that guidance costs more than the search time it saves, the pairing is a net loss; the entire design tension in every solver covered in the subject is balancing the accuracy of the guidance against the cost of producing it.
#card/cmas #card/search-and-inference

Why is SAT introduced as "the existence proof" that intractable models are still worth building solvers for?
?
SAT is NP-complete, so its worst case is provably exponential ($2^{100}\approx 10^{30}$ for 100 variables), yet current solvers routinely handle thousands of variables and hundreds of thousands of clauses quickly by exploiting structure via unit propagation and conflict-driven clause learning. This gap between provable worst-case hardness and demonstrated practical performance is exactly the pattern the rest of the subject's models are betting on.
#card/cmas #card/boolean-satisfiability

Why does keeping CSP conceptually distinct from SAT matter, given that every finite-domain CSP can be encoded into SAT and vice versa?
?
A richer constraint language can express relations more directly than disjunctions of Boolean literals, so keeping CSP separate preserves a more natural, compact model for problems like eight queens. At the same time, SAT's specialised inference (unit propagation, clause learning) is very effective specifically on the Boolean case, so collapsing the two loses solver specialisation even though the underlying expressiveness overlaps.
#card/cmas #card/constraint-satisfaction-problem

Why must a conformant plan work along *every* trajectory consistent with the initial-state uncertainty, rather than just the most likely one?
?
A conformant agent has no sensor model, so it never receives information during execution that could tell it which trajectory it is actually on. Since it cannot branch on an observation it will never get, the only way to guarantee reaching the goal is to pick an action sequence that succeeds no matter which candidate initial state and which non-deterministic outcome actually obtained.
#card/cmas #card/conformant-planning

Why does an MDP's solution take the form of a policy rather than a fixed action sequence, when classical planning's does not?
?
Classical planning's actions are deterministic, so the whole trajectory can be computed in advance and executed blindly. An MDP's actions have probabilistic outcomes but are fully observable, so the agent actually learns which state it landed in after each action — committing to a fixed sequence in advance would throw away that information, so the solution instead maps every state to the best action from that state.
#card/cmas #card/markov-decision-process

Why do POMDP policies sometimes include actions that make no direct progress toward the goal?
?
A POMDP agent cannot observe the true state directly, only a belief distribution over states updated via a sensor model. Because acting can be undertaken specifically to gain information and sharpen that belief, a policy may include deliberate sensing actions purely to reduce uncertainty — something a conformant planner, which has no sensor model at all, could never do.
#card/cmas #card/partially-observable-mdp

Why does the closed-world assumption apply to a PDDL problem's `:init` but not to its `:goal`?
?
`:init` is meant to fully describe a single state, so anything left unlisted must default to false or the state would be ambiguous. `:goal`, by contrast, is a condition to be satisfied by whichever state a plan reaches — facts not mentioned in the goal are simply unconstrained, not required to be false, which is why a goal picture in the slides shows only one of many states that would satisfy it.
#card/cmas #card/closed-world-assumption

Why does typing (e.g. `?x - block`) add no new expressivity to PDDL even though it visibly changes which ground actions get generated?
?
Typing restricts which constants can be substituted into a variable during grounding, so it changes the *count* of ground instances a schema expands into — but every instantiation typing rules out was either nonsensical or one whose preconditions would fail anyway. Nothing becomes representable that wasn't representable before; typing only makes the description more compact and the modelling less error-prone.
#card/cmas #card/lifted-representation

Why is planning's PSPACE-completeness attributed to plans potentially being exponentially long, rather than to the size of the state space alone?
?
SAT and CSP are also built on exponentially large search spaces ($2^n$ assignments) yet are only NP-complete, because a satisfying assignment is a polynomial-size certificate that can be checked quickly. A plan, however, may itself need to be exponentially long to reach the goal, so it is not in general a polynomial-size certificate — what stays polynomial is only the memory needed to check one step of a trajectory at a time, which is exactly the PSPACE bound.
#card/cmas #card/planning-complexity

Why can a parser never catch the bug of an incomplete delete list in a blocksworld `stack` action?
?
Omitting `clear(y)` from the delete list does not violate any syntax rule — the domain remains perfectly well-formed and the action stays applicable, so the parser has nothing to flag. The error is semantic: the model now permits states that don't correspond to anything physically possible, and the only way to catch it is to test the model's behaviour, e.g. by validating both plans that should be accepted and plans that should be rejected.
#card/cmas #card/plan-validation

Why does the STRIPS story open week 1b with the question "which of the algorithm, the planner, and the language survived," rather than starting directly with the tuple notation?
?
It sets up the lecture's whole argument before the formalism arrives: the intuitive guess is the algorithm, since that's where the apparent cleverness lives, but the correct answer is the language — the fact/operator/add/delete representation, still in use as PDDL's `:strips` fragment. That inversion motivates the claim, developed next via Roman numeral multiplication, that notation determines what can be computed at all.
#card/cmas #card/strips

## Mechanism

Given a STRIPS problem $P = \langle F, O, I, G\rangle$, what is the step-by-step derivation of the state model it denotes?
?
1. States are all subsets of facts: $S = 2^F$. 2. The initial state is $s_0 = I$. 3. Goal states are every state that is a superset of $G$: $S_G = \{s \in S \mid G \subseteq s\}$. 4. An operator $o$ is applicable in $s$ iff $\mathit{Pre}(o) \subseteq s$, giving $A(s) = \{o \in O \mid \mathit{Pre}(o)\subseteq s\}$. 5. Applying $o$ in $s$ removes its delete list and adds its add list: $f(o,s) = (s \setminus \mathit{Del}(o)) \cup \mathit{Add}(o)$.
#card/cmas #card/strips

What is the procedure for deriving a blocksworld action's precondition, add, and delete lists from a natural-language description of the action?
?
1. State what must be true beforehand for the action to make sense (the precondition) — here, the hand is holding $x$ and $y$ is clear. 2. State what becomes true as a result (the add list) — $x$ is now on $y$, the hand is empty, $x$ is now clear. 3. State what becomes false as a result (the delete list) — usually the precondition itself, since the conditions that allowed the action typically no longer hold once it has been taken. 4. Check the result against the modelling heuristic that precondition and delete list usually coincide, as a sanity check rather than a guarantee.
#card/cmas #card/blocksworld

What is the goal-decomposition strategy for debugging a PDDL domain that returns no plan?
?
1. Pick a single suspect predicate from the real goal and set it as the entire goal, re-running the planner. 2. If a plan is found, that predicate is reachable — add another suspect predicate to the goal and repeat. 3. Continue until adding a predicate causes the planner to fail, which isolates the minimal unreachable subgoal responsible for the original failure.
#card/cmas #card/plan-validation

What is the sequence of steps and checks a PDDL task goes through from domain/problem files to a validated plan?
?
1. Write `domain.pddl` (requirements, types, predicates, action schemas) and `problem.pddl` (domain reference, objects, init, goal). 2. A parser (e.g. FF or FD) checks syntax and reports errors with a line/token. 3. A planner solves the parsed task and returns a plan (or fails). 4. VAL replays the plan step by step against the model, checking each precondition and applying each effect, reporting either validity or the exact failing step.
#card/cmas #card/pddl

Given an action $a$ and observation $o$, what are the two steps of updating a POMDP agent's belief state?
?
1. Propagate through the transition model: $b_a(s') = \sum_{s\in S} P_a(s'\mid s)\,b(s)$, spreading the belief according to the action's probabilistic outcomes. 2. Condition on the observation via Bayes' rule using the sensor model: $b_a^o(s') = \dfrac{P_a(o\mid s')\,b_a(s')}{\sum_{s''} P_a(o\mid s'')\,b_a(s'')}$, sharpening the belief toward states consistent with what was actually observed.
#card/cmas #card/partially-observable-mdp

Starting from a predicate `on(?x, ?y)` and an action schema `stack(?x, ?y)`, what is the procedure for producing the ground fact set and ground action set a solver actually searches over?
?
1. For each predicate, substitute every combination of objects from `:objects` for its variables, producing one ground fact per combination — with typing, restrict substitutions to objects of the declared type. 2. Do the same for each action schema's parameters, producing one ground action per valid substitution. 3. The resulting ground fact set $F$ determines a state space of size $2^{|F|}$; the ground action set is what actually appears in $A(s)$ during search.
#card/cmas #card/lifted-representation

## Contrast

Contrast the four candidate definitions of AI (Minsky, Turing, Haugeland, Luger and Stubblefield) on what each one measures and why three of them are rejected.
?
Minsky's engineering definition (doing what would require intelligence in humans) fails because it's not operational — eagles outsee humans without being called intelligent. Turing's imitation game measures only external behaviour (acting humanly), leaving the Chinese Room objection that a system may simulate rather than possess understanding. Haugeland's "minds in the full and literal sense" points at cognitive science, outside the subject's scope. Luger and Stubblefield's "automation of intelligent behaviour," meaning rational action choices, is adopted because it is both falsifiable and bounded — the subject sits in the acting-rationally quadrant.
#card/cmas #card/rational-agent

What is the difference between classical planning, conformant planning, and an MDP in terms of which of the three bounding assumptions (single initial state, determinism, full observability) each relaxes?
?
Classical planning keeps all three. Conformant planning relaxes the single initial state to a set and determinism to non-determinism, but adds no observability, so it must conform to every possibility. An MDP keeps a single known initial state and full observability but relaxes determinism to a probability distribution, so it can react to what it actually observes and returns a policy rather than a fixed sequence.
#card/cmas #card/classical-planning

What is the difference between conformant planning and a POMDP, given that both start from uncertainty about the initial state?
?
A POMDP has a sensor model $P_a(o\mid s)$ that lets the agent update a belief distribution as it acts and observes, so it can resolve uncertainty over time and even act specifically to gain information. Conformant planning has no sensor model at all — the agent never learns anything during execution — so it must commit in advance to a single action sequence that works no matter which possibility turns out to be true.
#card/cmas #card/conformant-planning

What is the difference between SAT, CSP, and classical planning in terms of the shape of a solution and worst-case complexity?
?
SAT's solution is a Boolean assignment satisfying a set of clauses; CSP's is an assignment of finite-domain values satisfying constraints — both are single assignments and both problems are NP-complete. Classical planning's solution is a sequence of actions transforming an initial state into a goal state, and because that sequence may itself need to be exponentially long, planning is PSPACE-complete, strictly harder than either.
#card/cmas #card/planning-complexity

Contrast the three approaches to the control problem (programming-based, learning-based, model-based) on how each fails.
?
Programming-based control fails on any situation the programmer did not anticipate, since the space of possible situations vastly exceeds what anyone writes down by hand. Learning-based control handles unanticipated situations better but requires large amounts of interaction or labelled data, and the resulting controller is hard to inspect or adapt. Model-based control (the subject's approach) trades a short, adaptable problem description for computational cost, since the underlying models are intractable.
#card/cmas #card/control-problem

What is the difference between PlanEx and PlanLen, and how do they diverge on a specific domain like blocksworld even though both are PSPACE-complete in general?
?
PlanEx asks whether any plan exists (satisficing planning); PlanLen asks whether a plan of at most a given length exists (optimal planning). In blocksworld specifically, PlanEx is in P — unstack everything onto the table and rebuild always works — while PlanLen is NP-complete, since finding *a* plan is easy but finding a *short* one is not; the domain-specific structure that makes PlanEx easy does not help bound plan length.
#card/cmas #card/planning-complexity

What is the difference between a syntactic (parser-caught) error and a semantic error in a PDDL domain, using the missing `clear(y)` bug as the example?
?
A syntactic error, like a misspelled `:precondition`, breaks the grammar the parser expects and is reported immediately with a line and token. The missing `clear(y)` in `stack`'s delete list breaks nothing syntactically — the domain still parses and the planner still returns plans — but the resulting model now permits physically impossible states (two blocks on one block), a semantic error that only testing the model's behaviour against expected and forbidden plans can catch.
#card/cmas #card/plan-validation

Contrast the lifted (predicate) and propositional (ground) levels of a PDDL description, and say which level each of the human modeller and the solver works at.
?
The lifted level uses variables ranging over objects — `on(?x, ?y)`, `stack(?x, ?y)` — and is where a human modeller works, because named predicates and a handful of schemas are something a person can read and reason about. The propositional level is the fully grounded fact and action set the state model $S=2^F$ is defined over, and it is what the solver actually searches — the same domain with randomly relabelled predicates would denote the identical propositional model but be unmodellable by a human.
#card/cmas #card/lifted-representation

## Failure-Mode

A CSP solver is given the eight queens problem with one variable per queen whose domain is all 64 squares, instead of one variable per queen whose domain is just its row. What goes wrong, or what is left on the table?
?
Nothing is technically wrong — both encodings are valid CSPs and both are solvable — but the all-squares encoding's search space is far larger, since it allows two queens to be assigned to different squares in the same row as a syntactically distinct (though invalid) assignment before row/column/diagonal constraints ever get to prune it. Modelling choices that don't change what's expressible can still change how much a general solver has to search, which is exactly the kind of structure inference is meant to exploit.
#card/cmas #card/constraint-satisfaction-problem

A student concludes that because SAT and classical planning are both intractable in the worst case (NP-complete and PSPACE-complete respectively), practical solvers for both are essentially hopeless. What is wrong with this reasoning?
?
Worst-case complexity describes the hardest instances a problem class permits, not the instances anyone actually poses. SAT solvers routinely handle thousands of variables via inference (unit propagation, clause learning), and planners rely on the same search-and-inference pairing plus benchmarking on real problem distributions via the International Planning Competition. Provable worst-case hardness and demonstrated practical performance are compatible — that gap is the whole basis of the field's empirical methodology.
#card/cmas #card/planning-complexity

A PDDL modeller writes a `pickup(x)` action whose precondition requires `onTable(x)` and `armEmpty()`, but whose delete list only removes `armEmpty()` and forgets to remove `onTable(x)`. What state does this admit that shouldn't exist?
?
Since `onTable(x)` never becomes false, the block is simultaneously recorded as still on the table and, via the add list, as being held — a state with no physical counterpart, exactly analogous to the missing `clear(y)` bug in `stack`. The parser reports nothing because the domain is syntactically fine; only validating the model against plans that should be rejected would surface it.
#card/cmas #card/closed-world-assumption

A team models a conformant planning problem but writes a solver that branches its action choice based on which state in the initial belief set turned out to be true. What is wrong with this approach?
?
Conformant planning has no sensor model, so the agent has no way to observe which candidate initial state it is actually in — branching on that information assumes an observation the model does not provide. The solution must instead be a single fixed action sequence that succeeds along every trajectory consistent with the uncertainty; anything that inspects the true state mid-execution has silently smuggled in observability the conformant model doesn't have, which is what a POMDP is for.
#card/cmas #card/conformant-planning

A researcher in the 1970s notices their expert system fails on a new case, adds a rule to handle it, and reports this as progress refining the theory. Why does the theories-as-programs methodology treat this as a warning sign rather than genuine scientific progress?
?
Under theories-as-programs, any failure can always be patched by adding more knowledge, so no experiment can ever falsify the underlying theory — every failure looks like "missing knowledge," never like "the theory is wrong." This is exactly the impasse the models-and-solvers paradigm was built to escape: a general solver's claim can be tested on benchmark instances it has never seen, so its failures are informative in a way patch-driven expert-system failures never were.
#card/cmas #card/theories-as-programs

A team validates their PDDL domain by writing three plans they expect VAL to accept, all of which pass. They conclude the domain is bug-free. What is missing from their testing strategy?
?
Testing only plans expected to be *valid* only checks that the domain doesn't reject good behaviour — it says nothing about whether the domain also, incorrectly, accepts *bad* behaviour, like the missing-`clear(y)` bug that leaves `stack` fully functional while admitting impossible states. The recommended strategy is to also write plans that should not exist under the intended physics and confirm VAL rejects them; passing only the positive tests leaves exactly this class of semantic bug undetected.
#card/cmas #card/plan-validation

An agent has an unambiguous performance measure, complete knowledge of its environment's rules, and full observability of the current state, yet still performs poorly. Which of the four failure modes of rationality does this rule out, and which remains?
?
It rules out a wrong performance measure, faulty or limited perception, and wrong knowledge — all three are stated as satisfied. What remains is the fourth: the agent's knowledge and perception may be perfect while computing the best action within the available time is simply not feasible, exactly the chess example used to isolate bounded computation as its own distinct failure mode, independent of the other three.
#card/cmas #card/rational-agent

## Deck notes

Scope: this deck covers week 1 of AI Planning for Autonomy — the four definitions of AI
and the acting-rationally framing, the models-and-solvers paradigm and its predecessor
theories-as-programs, the control problem, SAT and CSP as reference models, and the
formal state-model hierarchy (classical planning, conformant planning, MDPs, POMDPs)
together with the STRIPS/PDDL language that encodes them, including blocksworld
modelling, the closed-world assumption, lifted representation, planning complexity, and
plan validation. Source pages: [[w01-prerecorded-ai-overview]],
[[w01a-introduction-to-ai]], [[w01b-introduction-to-planning]]. Concept pages:
[[rational-agent]], [[turing-test]], [[control-problem]], [[classical-planning]],
[[models-and-solvers]], [[theories-as-programs]], [[search-and-inference]],
[[boolean-satisfiability]], [[constraint-satisfaction-problem]], [[conformant-planning]],
[[markov-decision-process]], [[partially-observable-mdp]], [[closed-world-assumption]],
[[lifted-representation]], [[planning-complexity]], [[plan-validation]]. Entity pages:
[[strips]], [[pddl]], [[blocksworld]].

Deliberately excluded: week 2 material (blind search algorithms, search-node vocabulary,
novelty and width-based search), which was released alongside week 1's later videos but
belongs to its own deck — see [[week-02-search-cue-cards]]. The Dartmouth workshop and
Shakey the robot are mentioned in passing within existing cards rather than given their
own cards, since their content is historical colour supporting the theories-as-programs
and STRIPS narratives rather than independently testable material.

Coverage check: every concept page in scope has at least 2 cards, and the two areas with
the most independent sub-ideas — the state-model hierarchy (classical, conformant, MDP,
POMDP) and the PDDL/STRIPS formalism (lifted representation, closed-world assumption,
plan validation) — each have a contrast card and at least one failure-mode card in
addition to elaborative and mechanism cards, so recognising a definition is not enough to
answer a card. No definition-only cards were used; every "what is X" question was
rewritten to ask why X works the way it does, how X differs from Y, or what breaks
without X.

Recommended initial interval: 1–3 days given this is freshly ingested material,
tightening to same-day review for the mechanism cards (STRIPS semantics, PDDL lifecycle,
belief update, grounding) if used ahead of the first assignment, since the live lecture
ties PDDL modelling directly to assignment work.
