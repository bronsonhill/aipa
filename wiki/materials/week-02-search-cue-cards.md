#flashcards/week-02-search

## Elaborative Interrogation

Why does a search node store a pointer to its parent and the action used to reach it, rather than just the state it wraps?
?
Neither is needed to decide what to expand next — only the state and $g(n)$ matter for that. They exist purely so that once a goal node is found, the plan can be reconstructed by walking the parent chain back to the root and reading off the actions in reverse.
#card/cmas #card/search-node

Why does checking whether a state is a goal at node *expansion* time rather than node *generation* time change breadth-first search's time complexity from $O(b^d)$ to $O(b^{d+1})$?
?
Testing at expansion means a node must first be pulled off the open list and expanded before it can be checked, which requires the entire next layer of $d+1$ to already have been generated before any node in it is tested. Testing at generation catches the goal the moment it is produced, one layer earlier.
#card/cmas #card/search-node

Why is $g(n)$ not the same thing as $g^*(n)$ for a state currently being explored?
?
$g(n)$ is the cost of the specific path the search happens to have used to reach node $n$ so far; $g^*(n)$ is the cost of the cheapest possible path to that state. They only provably coincide once the search has confirmed that no cheaper path remains to be found — which is exactly what optimality guarantees establish.
#card/cmas #card/search-node

A blind search algorithm needs no heuristic and always expands nodes in the same fixed order. Why is "expands in the same order regardless of where the solution is" listed as blind search's central weakness rather than just a neutral fact?
?
Because a solution one step away from the initial state is found no faster than one buried arbitrarily deep, if the algorithm's fixed strategy happens to explore elsewhere first. The lack of guidance is what makes blind search simple and safe, but also what makes it scale badly.
#card/cmas #card/blind-search

Why is breadth-first search complete even in a graph containing cycles, without needing any explicit cycle detection?
?
Because breadth-first search explores every branch in parallel, layer by layer. A cycle does not trap the search into looping — it simply keeps unrolling into an ever-deeper tree, one layer per traversal of the cycle, while every other (non-cyclic) branch is still being explored alongside it.
#card/cmas #card/breadth-first-search

Why is breadth-first search optimal only when every action has the same cost?
?
Shallowest-first expansion finds the shallowest goal first. Under uniform cost, depth and cost are the same quantity, so the shallowest goal is also the cheapest. Under non-uniform cost they come apart: a costly action can put a goal at a shallow depth while a cheaper path to a different goal sits one layer deeper, and breadth-first search would return the shallow, expensive one first.
#card/cmas #card/breadth-first-search

Deriving breadth-first search's time complexity as $O(b^d)$ involves summing a geometric progression across every layer of the tree from depth 0 to depth $d$. Why does the final answer reduce to just $b^d$ rather than the full sum?
?
A geometric progression with ratio $b > 1$ is dominated by its largest term; the earlier layers ($b^0, b^1, \dots, b^{d-1}$) together are smaller than the last layer alone. Big-O analysis discards the dominated terms, leaving $b^d$.
#card/cmas #card/breadth-first-search

Depth-first search only needs to keep the current branch in memory, giving it $O(b \cdot m)$ space complexity instead of breadth-first search's $O(b^d)$. Why does this saving depend on how cycle detection is implemented?
?
The saving comes from discarding everything outside the current path once backtracking moves on. If cycle detection is implemented by remembering every state ever visited (rather than only those on the current branch), that visited set grows without bound just like breadth-first search's frontier does, and the entire memory advantage that motivated using depth-first search is cancelled.
#card/cmas #card/depth-first-search

Why is depth-first search never guaranteed to return an optimal solution, even once cycle detection makes it complete?
?
Nothing in the deepest-first expansion rule favours cheap solutions over expensive ones. If an early branch happens to descend deeply before a shallow, cheap solution near the root is ever explored, depth-first search commits to and returns the deep solution first — completeness only guarantees a solution is eventually found, not that it is the best one.
#card/cmas #card/depth-first-search

Iterative deepening re-runs depth-first search from scratch at increasing depth limits, discarding all prior work each time. Why does this repeated work not blow up the algorithm's overall time complexity?
?
The total node count across all iterations is dominated by the single deepest iteration, for the same geometric-series reason breadth-first search's layer sum is dominated by its last layer. Re-expanding shallow nodes on every iteration adds relatively little compared to the cost of the final, full-depth pass.
#card/cmas #card/iterative-deepening-search

How does increasing iterative deepening's depth limit one step at a time restore optimality under uniform action cost, given that each individual pass is just bounded depth-first search?
?
Because the limit increases by exactly one each iteration, the search only considers solutions one step farther from the root after every solution closer to the root has already been ruled out. The first solution found is therefore the shallowest — and under uniform cost, depth and cost coincide, so shallowest is also cheapest.
#card/cmas #card/iterative-deepening-search

Why is a state's novelty capped at $|F|+1$ (one more than the number of atoms in the problem) rather than left undefined for a true duplicate?
?
$|F|+1$ acts as a sentinel: it is guaranteed larger than any genuine novelty score (which can be at most $|F|$, the size of the whole atom set), so an algorithm pruning on a novelty bound can treat "true duplicate" uniformly as "worse than anything else," without a special case.
#card/cmas #card/novelty

$\mathrm{IW}(k)$ can generate at most $n^k$ states for $n$ atoms — polynomial for any fixed $k$. Why does this not contradict planning being PSPACE-hard in the worst case?
?
The polynomial bound only holds when the problem's *width* — the smallest $k$ for which $\mathrm{IW}(k)$ actually finds a solution — is small. Width-based search does not defeat the worst case; it identifies and exploits a structural property (small width) that happens to hold for most benchmark problems, while worst-case instances can still require $k$ as large as the number of atoms, at which point $\mathrm{IW}(k)$ collapses back to exponential blind search.
#card/cmas #card/iterative-width-search

Why does representing a grid position as two separate variables ($x$ and $y$) instead of one combined location variable change which states $\mathrm{IW}(1)$ can reach?
?
$\mathrm{IW}(1)$ only accepts states whose novelty is at most 1 — i.e. states that introduce at least one atom value never seen before, on its own. With separate $x$/$y$ variables, a diagonal move changes both coordinates at once, but each individual coordinate value may already have appeared in some earlier state, so the combined move is not novel at size 1 and gets pruned. A single combined location variable makes every new position novel by construction, changing this trade-off entirely.
#card/cmas #card/iterative-width-search

Why does serialized iterative width (SIW) give up the completeness and optimality guarantees that plain $\mathrm{IW}(k)$ has when a problem's width is known?
?
SIW achieves goals in whatever order it happens to reach them, one at a time, without checking whether that order leaves the remaining goals reachable. Committing early to one goal can walk the search into a state from which a different goal can no longer be achieved — the same kind of side-effect problem that defeats naive single-goal serialisation in domains like Sokoban.
#card/cmas #card/iterative-width-search

Why does encoding blocksworld states as opaque IDs ($s_0, s_1, \dots$) versus as variables (`on(A,B)`, `clear(B)`, …) matter for a search algorithm, even though both representations describe exactly the same state space?
?
A flat, opaque ID carries no information a solver can read — every state looks equally unrelated to every other. A factored, variable-based representation exposes which facts two states share and which differ, which is exactly the information novelty (and therefore [[iterative-width-search]]) is computed from. The state space is the same; what the solver can *see* about it is not.
#card/cmas #card/state-space-modelling

Why does the gap between heuristic search and blind search narrow for optimal planning even though heuristic search still wins for satisficing planning?
?
Optimal planning requires admissible heuristics (never overestimating true cost), and admissibility is a strong constraint that makes heuristics weaker guidance than the inadmissible heuristics satisficing search is free to use. Computing even an admissible heuristic has a cost, and that cost does not always pay off against a well-chosen blind search algorithm — whereas satisficing search can use much more effective, unconstrained heuristics.
#card/cmas #card/satisficing-and-optimal-planning

## Mechanism

Starting from an empty open list and ending once a goal is expanded, what are the steps of breadth-first search on a tree?
?
1. Place the initial state on the open list (a FIFO queue).
2. Remove the front node from the open list and expand it: apply every legal action to generate its children.
3. Add each newly generated child to the back of the open list.
4. Repeat, always removing from the front — guaranteeing every node at depth $k$ is expanded before any node at depth $k+1$ — until a goal node is expanded (or generated, depending on the goal-test convention).
#card/cmas #card/breadth-first-search

Starting from an empty open list and ending once a goal is expanded, what are the steps of depth-first search on a tree, including what happens when a branch runs out of successors?
?
1. Place the initial state on the open list (a LIFO stack).
2. Remove the top node from the open list and expand it, pushing its children onto the stack.
3. Continue popping and expanding the most recently pushed node, descending as deep as possible along one branch.
4. When a node has no unexplored successors, backtrack: pop back up to the nearest ancestor with unexplored children and descend again down a different branch.
5. Repeat until a goal is found (or the stack empties with no solution).
#card/cmas #card/depth-first-search

What is the outer-loop and inner-loop structure of the iterative deepening algorithm?
?
Outer loop: starting at depth limit $\ell = 0$, increment $\ell$ by 1 each time the inner search fails to find a solution. Inner loop: run depth-first search from scratch, refusing to expand any node deeper than the current limit $\ell$, discarding all state from previous iterations. Stop as soon as an inner-loop pass finds a goal.
#card/cmas #card/iterative-deepening-search

Given a newly generated state during search and the history of every previously visited state, what is the step-by-step procedure for computing that new state's novelty?
?
1. List the atoms true in the new state.
2. Check all subsets of size 1: has any single atom in this state never appeared in a previously visited state? If yes, novelty is 1.
3. If every size-1 subset has been seen before, check all subsets of size 2, then size 3, and so on, in increasing order.
4. The novelty is the size of the *smallest* subset that has never appeared before, as a subset, in any earlier visited state.
5. If every subset — including the full atom set, i.e. the state itself — has already appeared, the state is a true duplicate and its novelty is set to $|F|+1$.
#card/cmas #card/novelty

What are the two nested loops that make up the iterative width (IW) algorithm, and what does each one control?
?
Outer loop: run $\mathrm{IW}(k)$ for $k = 0, 1, 2, \dots$ in sequence, stopping as soon as one value of $k$ finds a solution. Inner loop (for a fixed $k$): perform ordinary breadth-first search, but discard — prune — any generated state whose novelty (computed against every state visited so far in that inner search) exceeds $k$.
#card/cmas #card/iterative-width-search

Starting from the initial state and a set of conjunctive goals $G_1, \dots, G_n$, what does serialized iterative width (SIW) do?
?
1. Run IW from the current state until *any one* remaining goal is satisfied — it does not matter which.
2. Treat the state at which that goal was reached as the new starting point.
3. Run IW again from there until one more remaining goal is satisfied.
4. Repeat until all goals in the conjunction are satisfied. This is a form of hill-climbing over the set of goals, achieving them one at a time in whatever order the search happens to reach them.
#card/cmas #card/iterative-width-search

## Contrast

What is the essential difference between a search algorithm's *open list* and its *closed list*?
?
The open list is the current frontier: nodes that have been generated but not yet expanded, i.e. the leaves of the search tree so far. The closed list is the set of nodes already expanded — the internal, non-leaf nodes whose children have already been generated.
#card/cmas #card/search-node

Contrast the pros and cons of blind search versus heuristic (informed) search.
?
Blind search needs only the problem's formal definition, is simple to implement, and carries no risk of a bad heuristic — but it always expands nodes in the same fixed order regardless of where the solution actually is. Heuristic search needs a heuristic function, which is generally hard to design well and whose formal guarantees (e.g. admissibility) can be hard to establish — but a good heuristic is typically far more effective in practice, especially for satisficing planning.
#card/cmas #card/blind-search

What is the difference between systematic and local search, and which one is required for optimal planning?
?
Systematic search considers the full frontier of possibilities at once, keeping the whole tree of candidates it is exploring — this is what breadth-first search, depth-first search, and iterative deepening all do, and it is what lets them guarantee completeness. Local search (e.g. gradient descent, genetic algorithms) is greedy: it keeps only one or a few candidate solutions at a time and discards the rest. Optimal planning requires systematic search, because a local search algorithm cannot guarantee it has not missed a cheaper solution elsewhere.
#card/cmas #card/blind-search

How do breadth-first search and depth-first search differ in the data structure used for the open list, and what expansion order does each produce?
?
Breadth-first search uses a FIFO queue, always expanding the shallowest node first, producing a strict layer-by-layer order. Depth-first search uses a LIFO stack, always expanding the deepest (most recently generated) node first, descending along one branch until it must backtrack.
#card/cmas #card/breadth-first-search

Compare the space complexity of breadth-first search and depth-first search, and explain in one sentence why they differ.
?
Breadth-first search is $O(b^d)$ in space, because the entire frontier — potentially the whole tree up to the shallowest goal depth $d$ — must be held in memory at once. Depth-first search is $O(b \cdot m)$, because backtracking discards everything outside the current branch, so only one path of length $m$ (the deepest branch explored) needs to be kept.
#card/cmas #card/depth-first-search

Contrast breadth-first search, depth-first search, and iterative deepening on completeness, optimality (under uniform cost), and space complexity.
?
Breadth-first search: complete (given a connected solution component), optimal under uniform cost, $O(b^d)$ space. Depth-first search: complete only with correctly scoped cycle detection, never guaranteed optimal, $O(bm)$ space. Iterative deepening: complete, optimal under uniform cost, $O(bm)$ space — it recovers breadth-first search's guarantees while keeping depth-first search's space bound.
#card/cmas #card/iterative-deepening-search

What is the relationship between $\mathrm{IW}(k)$ run at $k$ equal to the number of atoms in the problem, and plain breadth-first search with duplicate detection?
?
They are equivalent. Once $k$ equals the total number of atoms, no state can have a novelty greater than $k$ (the largest possible novelty short of the true-duplicate sentinel is exactly the atom count), so the novelty-based pruning rule never actually discards anything — $\mathrm{IW}(k)$ degenerates to ordinary breadth-first search that only rejects true duplicates.
#card/cmas #card/iterative-width-search

What is the difference between the three-function interface (`start`, `is_target`, `successor`) that defines a state model for search, versus the search node itself?
?
The three-function interface belongs to the *problem*: `start` gives the initial state, `is_target` tests whether a state is a goal, and `successor` generates the state reached by applying an action — none of this depends on which search algorithm is used. A search node belongs to the *algorithm's bookkeeping*: it wraps one particular state encountered during a specific search run, together with how that search reached it (parent, action, $g(n)$).
#card/cmas #card/search-node

## Failure-Mode

A search implementation runs depth-first search on a graph containing a cycle but does not track any previously visited states. What goes wrong?
?
The search can descend into the cycle and re-traverse it indefinitely, since depth-first search only backtracks once a branch is fully exhausted — and a cycle never becomes exhausted on its own. The search may run forever without ever reaching a goal that lies outside the cycle, breaking completeness.
#card/cmas #card/depth-first-search

A team applies breadth-first search to a graph where most edges cost 1 but a handful of "shortcut" edges cost 10. What can go wrong with the solution returned, and what is the standard fix?
?
Breadth-first search can return a shallow path that happens to use a cost-10 edge before it ever generates a deeper path made entirely of cost-1 edges that is actually cheaper overall — because shallowest-first expansion order tracks depth, not accumulated cost. The standard fix is uniform-cost search (Dijkstra's algorithm): replace the FIFO queue with a priority queue ordered on $g(n)$, so the search always expands the cheapest-so-far node next rather than the shallowest.
#card/cmas #card/breadth-first-search

A student implements iterative width by running $\mathrm{IW}(1)$ once and, when it fails to find a solution, concludes the problem has no solution. What is wrong with this reasoning?
?
Failing at a given $k$ only means the problem's width exceeds $k$ — it says nothing about solvability. The IW algorithm is meant to be re-run at increasing $k$ ($\mathrm{IW}(0), \mathrm{IW}(1), \mathrm{IW}(2), \dots$) until either a solution is found or $k$ reaches the total number of atoms, at which point $\mathrm{IW}(k)$ becomes equivalent to exhaustive breadth-first search with duplicate detection and is guaranteed complete.
#card/cmas #card/iterative-width-search

In a Sokoban-style domain, a solver tries to achieve each goal box position independently, one at a time, using a small fixed novelty bound. Why can this strategy leave the problem unsolved even though a solution exists?
?
Pushing a box to satisfy one goal can leave a different box in a position from which its own goal is permanently unreachable (e.g. pushed against a wall). Because the goals are not independent, achieving them one at a time under a small-width assumption can walk the search into a dead state — this is exactly why Sokoban is the standard counterexample to the "most problems have small width" empirical claim, and why plain per-goal serialisation (as in SIW) is not guaranteed complete in general.
#card/cmas #card/iterative-width-search

A search implementation checks whether a generated node is a goal only when that node is popped off the open list for expansion, rather than as soon as it is generated. What is the measurable cost of this design choice, and why does it happen?
?
It inflates breadth-first search's complexity from $O(b^d)$ to $O(b^{d+1})$: to expand-and-test the shallowest goal node, the algorithm must first generate every one of its siblings at the same depth (since the queue serves them in order), and by the time the goal node itself is popped, it has often already caused one additional layer beyond it to be generated as part of normal queue processing before the check is reached.
#card/cmas #card/search-node

## Deck notes

Scope: this deck covers week 2 of AI Planning for Autonomy — blind search
(breadth-first search, depth-first search, iterative deepening), the formal
search-node vocabulary, and width-based search (novelty, iterative width,
serialized iterative width). Source pages: [[w02a-blind-search-properties]],
[[w02b-width-and-iterative-search]], [[w02-prerecorded-search-fundamentals]].
Concept pages: [[search-node]], [[blind-search]], [[breadth-first-search]],
[[depth-first-search]], [[iterative-deepening-search]], [[novelty]],
[[iterative-width-search]], plus the week-2-relevant additions to
[[state-space-modelling]] (factored representation) and
[[satisficing-and-optimal-planning]] (blind-versus-heuristic performance split).

Deliberately excluded: week 1 material (state model basics, PDDL, blocksworld
modelling) and week 4 material (PSPACE-completeness proof machinery, GPS/POCL/
GraphPlan/SATPlan history) — both were ingested into the wiki but sit outside
week 2's syllabus scope, so cards on them belong in separate decks. A handful of
cards reference Dijkstra's algorithm / uniform-cost search and admissible
heuristics in passing, since the lecture uses them as the natural point of
comparison for breadth-first search's cost-blindness and for the
satisficing/optimal split — these are noted rather than tested in depth, since
neither is a week 2 topic in its own right.

Coverage check: every concept page in scope has at least 2 cards, and every
algorithm (BFS, DFS, IDS, IW, SIW) has both a mechanism card (the procedure) and
at least one contrast or failure-mode card (what goes wrong, or how it compares
to a neighbouring algorithm) — the two question types that catch superficial
"I recognise this" familiarity without real procedural or comparative
understanding. No definition-only cards were used; every "what is X" question
was rewritten to ask why X works the way it does, how X differs from Y, or what
breaks without X.

Recommended initial interval: 1–3 days given this is freshly ingested material,
tightening to same-day review for the mechanism cards (BFS/DFS/IDS/IW/SIW
procedures) if used ahead of the first assignment, since the live lecture
explicitly ties BFS/DFS/IDS to assignment implementation work.
