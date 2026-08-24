#flashcards/week-03-heuristic-search

## Elaborative Interrogation

Most heuristic search algorithms are correct and terminate for *any* function from states to numbers, with no properties required at all. Why, then, does the subject spend a whole lecture on safety, goal-awareness, admissibility and consistency?

?

The properties buy *guarantees*, not correctness. Without them a run still terminates and any plan it returns is genuinely applicable; what you lose is the ability to say in advance that a solution will be found if one exists (completeness) or that the plan returned is cheapest (optimality). Search *performance* separately depends on informedness, how closely $h$ tracks $h^*$, which is not one of the four properties.
#card/cmas #card/heuristic-properties

The perfect heuristic $h^*$ is by definition the most informed heuristic possible. Why is it useless in practice?

?

Computing $h^*(s)$ means finding the cost of an optimal plan for $s$, and planning is PSPACE-complete, so on a deterministic machine that is exponential in the number of state variables. A search evaluates its heuristic once per generated state, so using $h^*$ means solving an exponential problem per node. Usefulness is a trade-off between informedness and evaluation cost, not a maximisation of informedness.
#card/cmas #card/heuristic-function

Why does setting $h(s) = 0$ for every state reduce heuristic search to blind search, and why would adding a constant instead make no difference?

?

A constant heuristic assigns every state the same value, so it cannot distinguish any two states and contributes nothing to the expansion order; what remains is whatever the algorithm does with $g$ or with insertion order. Adding a constant shifts all values equally and leaves their relative order untouched, and greedy best-first search is invariant under any strictly monotonic transformation of $h$ for the same reason.
#card/cmas #card/heuristic-function

Novelty and a heuristic function both order the open list, yet the subject calls one blind and the other informed. What is the actual difference in what they measure?

?

A heuristic estimates the *future*: how much cost remains from this state to a goal. Novelty measures the *past*: whether this state contains an atom combination never seen earlier in the search. Novelty needs no goal information and no model inspection, only a factored state, which is why it survives in settings such as Atari where no declarative model exists.
#card/cmas #card/novelty

Why is safety sufficient for the completeness of greedy best-first search and A\*, when nothing else about the heuristic is assumed?

?

Because `if h(state(σ')) < ∞: open.insert(σ')` is the only line in either algorithm that discards part of the search space; everything else either expands or defers. Safety says $h(s) = \infty$ implies $h^*(s) = \infty$, so every branch dropped there provably contained no solution. Nothing reachable and solvable is lost.
#card/cmas #card/heuristic-properties

An unsafe heuristic reports $\infty$ at a state from which a solution actually exists. Trace precisely how that destroys completeness.

?

The successor test drops that node, so the entire subtree below it is never generated. If the only solutions in the problem lie in that subtree, the open list eventually empties and the algorithm returns `unsolvable` for a solvable problem. The failure is silent: nothing in the run distinguishes it from a genuinely unsolvable instance.
#card/cmas #card/heuristic-properties

Why can no property of the heuristic ever make greedy best-first search optimal, not even perfection?

?

Because the defect is structural rather than informational. Ordering on $h$ alone ignores $g$, so two goal states are ranked identically ($h = 0$ for both under any goal-aware heuristic) regardless of whether one cost 1 to reach and the other cost a million. Tie-breaking decides which is popped, and the algorithm returns the first goal it pops. Better future information cannot repair ignorance of the past.
#card/cmas #card/greedy-best-first-search

In the A\* optimality proof, why is admissibility the property that does the work rather than consistency or goal-awareness?

?

The proof needs to rule out $g(s) + h(s) > g^*$ for states on an optimal path. $g(s)$ is the real accumulated cost of a real path and cannot be inflated, so the only term that can push $f$ past $g^*$ is $h$. Admissibility is exactly the constraint $h(s) \le h^*(s)$, which forbids the overestimate. Consistency implies admissibility only in combination with goal-awareness, and buys efficiency (no re-opening) rather than optimality.
#card/cmas #card/a-star-search

Why does an admissible *and consistent* heuristic let you delete A\*'s `best-g` bookkeeping entirely?

?

With both properties, A\* never re-opens a closed state: the first time a state is expanded, it is already reached by an optimal path, so no later node can arrive with a strictly smaller $g$. The `or g(σ) < best-g(state(σ))` disjunct can then never fire, making it and the `best-g` map dead code.
#card/cmas #card/a-star-search

Weighted A\* with $W > 1$ returns plans at most $W$ times optimal. Why is that bound only claimed when the heuristic is admissible?

?

The bound is derived from $h$ underestimating true remaining cost; inflating an underestimate by $W$ keeps the total within a factor $W$ of optimal. If $h$ already overestimates, $W \cdot h$ compounds an error of unknown size and no factor bound can be stated. Admissibility is what makes the inflation quantifiable.
#card/cmas #card/weighted-a-star

Why is a fixed tie-breaking order in hill-climbing a security concern and not merely an occasional inefficiency?

?

Tie-breaking is part of the algorithm's observable behaviour, so anyone who knows the order can construct an instance that steers the search into a cycle or a dead end deliberately. Random tie-breaking removes the attack by making the trajectory unpredictable, and it also escapes cycles that a fixed order loops on forever. It costs randomness generation per step, which is usually worth paying.
#card/cmas #card/hill-climbing

Why is local search much safer on an undirected (or provably reversible) search space than on a directed one?

?

Local search deletes the branches it did not take, so a bad step is normally irreversible. In an undirected graph every action can be undone, so a step into an unpromising region can always be walked back by the ordinary search process; there is no state from which escape is impossible. The danger of local search comes from irreversibility, not from committing as such.
#card/cmas #card/local-search

Does incompleteness imply non-optimality? Give the working intuition and the counterexample.

?

As a working intuition, yes: an algorithm that discards branches usually discards optimal solutions along with the rest. Strictly, no. Symmetry-breaking algorithms deliberately prune all but one of several equivalent solutions, which makes them incomplete by construction while leaving at least one optimal solution reachable. That kind of deliberate incompleteness is recommended practice, not a defect.
#card/cmas #card/local-search

Why does computing novelty only against states of the *same heuristic value* mix exploration and exploitation, where computing it globally would not?

?

Globally, novelty decays: once the search has seen many states, almost nothing contains an unseen atom tuple, so the measure stops discriminating and the ordering collapses onto the tie-breaker. Partitioning the comparison set by $h$-level keeps the question meaningful within each level — among states that look equally close to the goal, which shows something structurally new? Exploration is then applied inside the region the heuristic already considers promising.
#card/cmas #card/best-first-width-search

Why can IW be applied to Atari almost off the shelf when classical planners cannot be applied at all?

?

Classical planners need a declarative model to derive heuristics from, and the Arcade Learning Environment supplies neither a PDDL encoding nor goals, only rewards. Novelty is computed from the state representation itself, not from a problem description, so IW needs only a factored view of the state; the 128 RAM bytes supply one directly.
#card/cmas #card/planning-with-simulators

The slide "Model $\neq$ Language" claims a problem can fit the classical planning model and still be impractical to encode. Why does Pacman qualify?

?

Pacman is deterministic, fully observable, has a known initial state and a finite discrete state space, so it satisfies the classical planning model exactly. What resists encoding is the ghost behaviour, which is straightforward as procedural code and awkward as PDDL action schemas. The model is a mathematical object; PDDL is one notation for it, and the notation is the narrower of the two.
#card/cmas #card/planning-with-simulators

Enforced hill-climbing runs a breadth-first search inside every step, yet its memory behaviour is nothing like breadth-first search's. Why not?

?

Because the tree generated by `improve` is discarded the moment an improving state is found; only the path to that state survives, and the next call starts fresh with a new comparison value. A plain breadth-first search must retain every generated layer until the goal appears, which is what exhausts memory within seconds. Enforced hill-climbing pays breadth-first search's memory cost only for the depth of one improvement.
#card/cmas #card/enforced-hill-climbing

## Mechanism

Starting from `open` containing only the root and ending at a returned solution, state the full greedy best-first search procedure including duplicate handling.

?

1. `open` is a priority queue ordered by ascending $h(state(\sigma))$; insert the root node; `closed := ∅`.
2. While `open` is non-empty, pop the minimum-$h$ node $\sigma$.
3. If $state(\sigma) \in closed$, skip it (duplicate); otherwise add $state(\sigma)$ to `closed`.
4. If $state(\sigma)$ is a goal, return the extracted solution.
5. Otherwise, for each $(a, s') \in succ(state(\sigma))$, make a node $\sigma'$, and insert it into `open` only if $h(state(\sigma')) < \infty$.
6. If `open` empties, return `unsolvable`.
#card/cmas #card/greedy-best-first-search

State the two, and only two, modifications that turn greedy best-first search into A\*.

?

1. The priority queue is ordered by $f = g(\sigma) + h(state(\sigma))$ instead of $h$ alone, so the node must carry its accumulated cost $g$.
2. The expansion test becomes `state(σ) ∉ closed **or** g(σ) < best-g(state(σ))`, with `best-g` updated on expansion, so a closed state is re-opened when a strictly cheaper path to it is found.
Everything else — the infinite-$h$ successor filter, the goal test at expansion, solution extraction — is unchanged.
#card/cmas #card/a-star-search

Define A\*'s $f$-value, and distinguish generated, expanded, and re-expanded nodes.

?

$f(s) := g(s) + h(s)$, cost-so-far plus estimated cost-to-go.
**Generated**: nodes inserted into `open` at some point.
**Expanded**: nodes popped from `open` for which the test against `closed` and distance succeeds.
**Re-expanded** (or re-opened): expanded nodes for which $state(\sigma) \in closed$ at the moment of expansion, meaning a cheaper path was found after the state was first closed.
#card/cmas #card/a-star-search

Reconstruct the proof that A\* returns an optimal solution when $h$ is admissible, in four steps.

?

1. **Theorem**: A\* expands every node whose $f$-value satisfies $f \le g^*$, where $g^*$ is the optimal solution cost (equivalently $h^*(s_0)$).
2. **Contrapositive**: for A\* to miss every optimal solution, each optimal trajectory $P$ must contain a state with $g(s) + h(s) > g^*$, pushing it outside the guaranteed-expanded region.
3. **Which term**: $g(s)$ is the true accumulated cost of a real path and is fixed by the problem, so only $h$ can inflate the sum.
4. **Conclusion**: admissibility ($h \le h^*$ everywhere) forbids exactly that inflation, so no optimal trajectory can escape the expanded region.
#card/cmas #card/a-star-search

Trace A\* over the slide-18 graph, where nodes are labelled $g + h$ and the root is $0+3$. Which nodes are expanded, in what order?

?

1. Expand root $0+3$; children $1+2 = 3$ and $1+3 = 4$ enter `open`.
2. Pop $1+2$ ($f=3$); children $2+6 = 8$, $2+7 = 9$.
3. Pop $1+3$ ($f=4$); children $2+5 = 7$, $2+2 = 4$.
4. Pop $2+2$ ($f=4$); children $3+5 = 8$, $3+1 = 4$.
5. Pop $3+1$ ($f=4$); children include $4+8 = 12$ and a goal at $g=4$, $h=0$, so $f=4$.
6. Pop the goal and return.
Six expansions; the nodes at $f = 7, 8, 9, 12$ were generated but never expanded.
#card/cmas #card/a-star-search

Give hill-climbing's full procedure, including what happens to the successors not chosen.

?

1. $\sigma :=$ root node of the initial state.
2. Forever: if $state(\sigma)$ is a goal, return the extracted solution.
3. Generate $\Sigma'$, the set of nodes for all successors of $state(\sigma)$.
4. Set $\sigma$ to an element of $\Sigma'$ minimising $h$, breaking ties randomly.
5. Every other element of $\Sigma'$ is deleted from memory permanently, and the search never returns to that branch.
There is no open list and no closed list.
#card/cmas #card/hill-climbing

Give the `improve` procedure of enforced hill-climbing and state its stopping condition exactly.

?

1. `queue` is a **FIFO** queue (hence breadth-first) seeded with $\sigma_0$; `closed := ∅`.
2. Pop $\sigma$ from the front; if $state(\sigma) \in closed$, skip; otherwise close it.
3. If $h(state(\sigma)) < h(state(\sigma_0))$ — *strictly* better than the state the call started from — return $\sigma$ immediately.
4. Otherwise push all successors to the back and continue.
5. If the queue empties, `fail`.
The outer loop calls `improve` repeatedly until the current state is a goal, keeping only the returned path each time.
#card/cmas #card/enforced-hill-climbing

State IDA\*'s limit initialisation and update rule, and say what is pruned.

?

The initial limit is $\mathrm{lim}_0 = f(s_0) = g(s_0) + h(s_0)$. The search runs depth-first, pruning any generated node whose $f$-value exceeds the current limit. If an iteration ends without a solution, the next limit is $\mathrm{lim}_{i+1} = \min_{s \in S_P} f(s)$, the smallest $f$ among the nodes pruned in that iteration, rather than a fixed increment. That admits exactly the cheapest previously-unreachable nodes and no others.
#card/cmas #card/ida-star

Define BFWS($f$) precisely, including the general form of the evaluation function.

?

BFWS($f$) for $f = \langle w, f_1, \ldots, f_n \rangle$, where $w$ is a novelty measure, is a plain best-first search in which nodes are ordered by the novelty function $w$, with ties broken by the functions $f_i$ in the order listed. The basic scheme is BFWS($\langle w, h \rangle$) using $h = h_{\mathrm{add}}$ or $h_{\mathrm{ff}}$ and the novelty measure $w = w_h$.
#card/cmas #card/best-first-width-search

Define the $w_h$ novelty measure used by BFWS.

?

$w_h(s)$ is the size of the smallest new tuple of atoms generated by $s$ for the first time in the search, computed *relative to previously generated states $s'$ with $h(s) = h(s')$*. The novelty check is made only against states sharing $s$'s heuristic value, rather than against every state generated so far.
#card/cmas #card/best-first-width-search

Give the IW(1)-over-Atari configuration used in the 2015 experiments.

?

- State features: the 128 bytes of Atari RAM treated as 128 variables of 256 values each.
- Up to $128 \times 256 \times 18 = 589{,}824$ states generated per lookahead.
- Children generated in random order.
- Discount factor $\gamma = 0.995$.
- The action beginning the most rewarding IW(1) path is executed, then the search re-runs at the next decision point.
#card/cmas #card/planning-with-simulators

Distinguish world states, search states, and search nodes, including how the first two relate under progression and regression.

?

**World state**: a situation in the world modelled by the planning task. **Search state**: the subproblem remaining to be solved — identical to the world state under *progression*, but under *regression* a search state is a sub-goal describing a *set* of world states. **Search node**: a search state plus information on how the search got there (parent, action, accumulated cost $g$).
#card/cmas #card/search-node

## Contrast

Both greedy best-first search and A\* pop the minimum-priority node and both are complete under a safe heuristic. What separates their optimality guarantees, and why?

?

Greedy best-first search orders on $h$ alone and is never guaranteed optimal, even given $h^*$, because it cannot distinguish two goals reached at wildly different cost. A\* orders on $g + h$ and is optimal whenever $h$ is admissible, because including $g$ makes the priority an estimate of *total path cost* rather than of remaining cost, which is what the $f \le g^*$ expansion theorem needs.
#card/cmas #card/a-star-search

Weighted A\* at $W = 0$, $W = 1$, and $W \to \infty$ collapses onto three algorithms already covered. Name each and justify it from the priority function.

?

$f = g + W \cdot h$.
- $W = 0$: the $h$ term vanishes, leaving ordering on accumulated cost — uniform-cost search, that is, Dijkstra's algorithm (a blind search).
- $W = 1$: $f = g + h$, which is A\* by definition.
- $W \to \infty$: the weighted $h$ term dominates and $g$ becomes negligible by comparison, so ordering is effectively on $h$ alone — greedy best-first search.
#card/cmas #card/weighted-a-star

Admissibility and consistency both constrain how large $h$ may be. What is the structural difference between the two constraints?

?

Admissibility is a *global, per-state* condition comparing $h(s)$ against $h^*(s)$ for each state independently. Consistency is a *local, per-transition* condition relating two adjacent states: $h(s) \le h(s') + c(a)$ for every transition $s \xrightarrow{a} s'$, so the heuristic may not fall by more than the action costs. One violating transition breaks consistency, just as one violating state breaks admissibility.
#card/cmas #card/heuristic-properties

State the four implications that hold between the heuristic properties, and say what does *not* follow.

?

Consistent $\wedge$ goal-aware $\Rightarrow$ admissible. Admissible $\Rightarrow$ goal-aware. Admissible $\Rightarrow$ safe. No other implication among the four can be proved — in particular safety implies nothing about the others, and consistency alone does not give admissibility without goal-awareness.
#card/cmas #card/heuristic-properties

Hill-climbing and enforced hill-climbing have identical completeness and optimality guarantees (neither). What does the systematic `improve` step actually change?

?

It changes *reach*, not correctness. Hill-climbing can only move to a state that is better than the current one by exactly one action, so it stalls the moment no immediate successor improves $h$. Enforced hill-climbing looks $k$ steps ahead systematically and escapes any local minimum shallow enough for a breadth-first search to cross. Since the commit-and-discard step is unchanged, a step into a dead-end region remains irreversible either way.
#card/cmas #card/enforced-hill-climbing

IDA\* and A\* both return optimal plans under an admissible heuristic. What is traded for what?

?

A\* keeps the whole frontier in a priority queue, giving exponential space, and expands each node essentially once. IDA\* runs depth-first under an $f$-limit, giving space linear in the depth explored, at the cost of re-expanding shallow nodes on every iteration. IDA\* is the choice when memory rather than time is the binding constraint — it is what first solved Rubik's Cube.
#card/cmas #card/ida-star

IDA\* and iterative deepening differ in one respect only. What is it, and what does it buy?

?

Only the cutoff differs: iterative deepening prunes on *depth*, IDA\* prunes on the *$f$-value* $g + h$, with the limit starting at $f(s_0)$ and rising to the minimum $f$ over pruned nodes. Using $f$ prunes branches a depth cutoff would explore, so IDA\* expands strictly fewer nodes while keeping the same linear space bound, and gains optimality with respect to cost rather than only to depth.
#card/cmas #card/ida-star

Systematic and local search both appear in successful satisficing planners. Why is only one admissible for optimal planning?

?

Proving a returned plan is cheapest requires having ruled out every cheaper alternative, which means the algorithm must account for all branches it did not take. Local search deletes them, so it can never certify that a cheaper plan does not exist elsewhere. For optimal planning, systematic algorithms are required; for satisficing planning, where only *a* plan is needed, both approaches have successful instances.
#card/cmas #card/local-search

BFWS and IW both order search by novelty. How do they differ in structure and in what they guarantee?

?

IW($k$) is a sequence of breadth-first searches, each *pruning* every state with novelty above $k$, run for increasing $k$. BFWS is a single best-first search that *orders* on novelty (specifically $w_h$) and breaks ties with a heuristic, pruning nothing outright. IW's guarantees come from problem width; BFWS gives no optimality guarantee, and its completeness argument likewise depends on width.
#card/cmas #card/best-first-width-search

Reinforcement learning, MCTS and width-based methods all treat exploration as necessary. What does the subject claim distinguishes width-based exploration?

?

RL and MCTS perform *flat* exploration: actions are sampled without regard to what the resulting state contains, so structurally identical and structurally novel states are treated alike. Width-based exploration computes novelty over the factored structure of the state, so it directs effort at states exposing atom combinations never seen before. The claim on the slide is that width-based methods take the structure of states into account.
#card/cmas #card/best-first-width-search

A\* was invented in the 1970s and the theory of when it is optimal arrived in the 1980s–90s. What was actually unknown for those two decades?

?

Not how the algorithm works — that was implemented and used throughout. What was missing was the connection between properties of the heuristic and the guarantees of the search: nobody could state that admissibility yields optimality or that safety yields completeness. The algorithm was used on trust and empirical performance, with its guarantees unproved.
#card/cmas #card/a-star-search

## Failure-Mode

A heuristic never returns $\infty$ anywhere, including at genuine dead ends. Is it safe?

?

Yes, vacuously. Safety says $h(s) = \infty \Rightarrow h^*(s) = \infty$; if the antecedent never holds, the implication cannot be violated. The tempting error is to call it unsafe for failing to *detect* the dead end, which reverses the implication. Safety governs what $h$ may claim when it reports $\infty$; it never obliges $h$ to report $\infty$.
#card/cmas #card/heuristic-properties

Worked exercise: unit action costs; initial state $I$ has $h = 2$ with actions to a goal $G$ ($h = 0$) and to a self-looping non-goal $D$ ($h = 1$). Which properties hold?

?

True values: $h^*(I) = 1$, $h^*(D) = \infty$, $h^*(G) = 0$.
**Goal-aware**: yes, $h(G) = 0$.
**Admissible**: no, $h(I) = 2 > 1 = h^*(I)$.
**Consistent**: no, across $I \to G$ the value drops by 2 while the action costs 1.
**Safe**: yes, vacuously — $h$ never reports $\infty$. Safe-but-inadmissible is consistent with the implication diagram, which only forbids admissible-but-unsafe.
#card/cmas #card/heuristic-properties

What goes wrong if you evaluate safety, admissibility or consistency without first computing $h^*$?

?

All three are defined by comparison against $h^*$ (or, for consistency, against action costs on real transitions), so any verdict reached from the $h$-values alone is a guess. The lecturer flagged this as where most students trip: compute $h^*$ for the relevant states first, then check each definition. In a small graph that means asking, per state, whether a solution exists and what the cheapest one costs.
#card/cmas #card/heuristic-properties

Hill-climbing is run with a goal-aware heuristic that assigns $0$ to some non-goal states. What happens, and why is goal-awareness not enough?

?

Goal-awareness only requires goals to have value $0$; it permits non-goals to have $0$ too. Plotting $h$ as a landscape, such a state is a floor. Since every hill-climbing step moves to the successor minimising $h$, the search settles there, has no improving move available, and never terminates. The precondition hill-climbing actually needs is the stronger $h(s) > 0$ for all $s \notin S_G$.
#card/cmas #card/hill-climbing

Under the blind heuristic, in which situations does hill-climbing still succeed and in which does it fail?

?

With $h = 0$ everywhere and random tie-breaking, every step is a random choice, so the search is a random walk and will reach a goal on a connected undirected graph. It fails on a dead-end region, since stepping in makes escape impossible and the discarded branches are gone. It fails on a cycle only under *deterministic* tie-breaking, where a fixed order loops forever; random tie-breaking escapes eventually.
#card/cmas #card/hill-climbing

Where is the "common, hard-to-spot bug" in A\* implementations, and what is its week-2 analogue?

?

Checking duplicates at the wrong point — testing membership of `closed` at generation versus expansion, or forgetting the `g(σ) < best-g` disjunct so cheaper re-discoveries are silently dropped. The deck says outright that Russell and Norvig are too imprecise here. The week-2 analogue is goal-testing at generation versus expansion, which changes breadth-first search's complexity from $O(b^d)$ to $O(b^{d+1})$.
#card/cmas #card/a-star-search

What breaks if A\* omits re-opening (no `best-g` test) while the heuristic is admissible but *inconsistent*?

?

An inconsistent heuristic can cause a state to be closed on a suboptimal path, because $f$ ordering no longer guarantees the first arrival is cheapest. Without re-opening, that inflated $g$ is locked in and propagates to every descendant, so the plan returned may cost more than optimal. The shortcut is only sound when the heuristic is consistent as well as admissible.
#card/cmas #card/a-star-search

Why is enforced hill-climbing not a general escape from local minima, despite the systematic inner search?

?

`improve` is a breadth-first search, so its memory cost grows exponentially with the number of layers it must generate. A shallow local minimum is crossed in a few layers cheaply. A wide one forces the breadth-first search deep, and breadth-first search's space problem returns in full. The escape works only while improvements are found within a few layers.
#card/cmas #card/enforced-hill-climbing

Weighted A\* is described as a dial toward greediness. What is the stated caveat about the $W \to \infty$ end?

?

The limit is approached with a very large constant, not literal infinity — the video is explicit that infinity "is going to play nasty". With a large finite $W$ the $g$ term becomes negligible relative to $W \cdot h$ and the behaviour matches greedy best-first search, while the arithmetic stays well defined. Note also that the factor-$W$ suboptimality bound degrades as $W$ grows.
#card/cmas #card/weighted-a-star

Why does BFWS come with no optimality guarantee, and why did the lecture decline to give a completeness result either?

?

Both depend on the *width* of the problem being solved, which governs what novelty-bounded exploration can reach. The lecture judged that theory too involved to open at this point. Practically, BFWS is the preferred approach when a solution is needed and its cost need not be optimal; for optimal planning the answer remains A\*.
#card/cmas #card/best-first-width-search

The Atari results show IW outperforming DeepMind's agent on 45 of 49 games. Why is that not a clean claim of superiority?

?

The two solve different control problems on different inputs. IW is a lookahead agent that re-plans at every decision point using a simulator, with RAM as input; DeepMind's agent is a learning agent producing a reactive policy from screen pixels. The slide states it remains open how best to compare them, and reports the 45-of-49 figure specifically as a gameplay-score comparison.
#card/cmas #card/planning-with-simulators

Interpret the Atari lookahead figures: BrFS reaches 0.3 seconds of lookahead, IW(1) and 2BFS reach 6–22 seconds, under the same 150,000-frame budget.

?

Every algorithm gets the same simulation budget, so the difference is purely how far that budget is spread. BrFS spends it exhaustively on the first fraction of a second and sees almost nothing of the future. IW(1) prunes by novelty, so the same number of simulated frames buys a lookahead one to two orders of magnitude deeper in game time, which is what converts into better play.
#card/cmas #card/planning-with-simulators

## Deck notes

Scope: week 3 of COMP90054 — the heuristic search half of the search block. Cards are
drawn from [[heuristic-function]], [[heuristic-properties]],
[[greedy-best-first-search]], [[a-star-search]], [[weighted-a-star]], [[ida-star]],
[[local-search]], [[hill-climbing]], [[enforced-hill-climbing]],
[[best-first-width-search]] and [[planning-with-simulators]], plus the three week 3
source pages and [[w03-heuristic-search-digest]].

Coverage check: every week 3 concept page has at least three cards. Every algorithm
(GBFS, A\*, WA\*, HC, EHC, IDA\*, BFWS) carries a mechanism card reproducing its
procedure, at least one contrast card against a neighbouring algorithm, and at least
one failure-mode card. The four heuristic properties are tested individually, as an
implication diagram, and through the three-node worked exercise. No definition-only
cards: every "what is X" was rewritten as why-X-works, how-X-differs-from-Y, or
what-breaks-without-X.

Deliberately technical rather than summary-level, per request. Pseudocode-level
mechanism cards reproduce the actual control flow (FIFO versus priority queue, the
exact `best-g` disjunct, the strict inequality in `improve`'s stopping condition)
because those details are what the tutorials and assignment exercise, and because the
lecture's own quiz questions turn on them. The A\* trace card reproduces the full
slide-18 expansion rather than describing it.

Two cards target errors the lecturer named explicitly: reading the safety implication
backwards, and evaluating properties without first computing $h^*$. The vacuous-safety
card exists because the intuitive answer to that exercise is wrong in a way that
survives casual review.

Excluded: week 4 material (automatic heuristic derivation, $h^+$ approximations),
helpful actions and landmarks (named on slide 30, not covered), and the width theory
underlying BFWS's guarantees (explicitly deferred in the lecture). Novelty and IW get
cards only where week 3 extends them — the $w_h$ refinement and the simulator
application — since the week 2 deck already covers their definitions.

Tag convention `#card/cmas` is inherited from the week 2 deck so both decks filter
together; it does not match the schema's `subject` and could be renamed across both
decks if wanted.

Recommended initial interval: 1–3 days. The mechanism and trace cards reward same-day
review before a tutorial, since the tutorials practise exactly these procedures.
