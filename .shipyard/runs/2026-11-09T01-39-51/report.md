# Shipyard run 2026-11-09T01-39-51: shipped, 8 of 8 criteria pass, 1 cycle, 1 fix round

Not merged. The branch is `shipyard/frisson-run-harbor-explainer-2026-11-09T01-39-51`. The owner asked for a push, so it will be pushed. Merging to main publishes the site and stays with the owner.

## What was asked for
"Update the Shipyard section and run view with the latest Frisson run, and add a way to explain what the Harbor Pilot does. Push when done. Run Shipyard so it can be seen in Claude Desktop."

Goal from the brief: the portfolio's Shipyard card and `shipyard.html` show the latest real Frisson run (2026-11-09T01-05-12, single-crate view). Visitors can learn what the Harbor Pilot does from a disclosure on the card and from a real review-guide excerpt on the run page.

## Acceptance criteria
| ID | Criterion | Final status |
|---|---|---|
| AC1 | Run-data JSON has runId 2026-11-09T01-05-12, verdict shipped, 12 criteria pass | pass |
| AC2 | Run-data equals the source report's (ignoring `state.target`); no `/Users/` or `thomasfuhriman` in the page | pass |
| AC3 | Viewport meta, back link to `index.html#work`, single-crate intro; "first run" and "66 files" gone | pass |
| AC4 | `SHIPYARD_RUNS[0]` ask text, tags of 5 characters or fewer, `#sim-out` fallback matches | pass |
| AC5 | Card `<details>` about the Harbor Pilot: does not approve, fix or score; names /harbor, /harbor ask, /harbor verify | pass |
| AC6 | `id="harbor"` section before `#app` with the REVIEW_GUIDE S1 excerpt | pass |
| AC7 | `node --check script.js` is 0; changes limited to the four allowed files; no `package.json` | pass |
| AC8 | Browser check at 1280 and 390 px (disclosure, `#harbor` link, sim and "run again", report with AC12, no horizontal scroll, no console errors) | pass |

## What was built
- `index.html`, `shipyard.html`, `script.js` and `style.css` were changed (dev commit 7e5f38f).
- The real Frisson run is now the first run in the sim and the embedded report.
- The card has a Harbor Pilot disclosure.
- `shipyard.html` has a `#harbor` section with a review-guide excerpt.
- The dev added phone CSS to the `shipyard.html` wrapper, because the newer report template overflowed to 641px at 390px wide.
- Fix commit 52bf69a corrected the card copy from "two made-up" runs to "three".

## Tests
- **Tester:** 8 of 8 pass, tree clean. The repo has no test command, so the checks are greps, `node --check`, and a browser script, `.shipyard/checks/browser.mjs`.
- **After the fix:** the harbormaster re-ran `node --check script.js` (ok) and `browser.mjs` (PASS AC8, `cycles/1/browser-output-2.txt`). It also confirmed in Chromium that the back link at 390px reaches `index.html#work`, and that `#harbor` still lands correctly after a saved scroll.
- **Not re-run:** the AC1-AC7 greps, because only one word of `index.html` changed. Their passing status is from the tester's earlier run.
- **Not tested:** Firefox and Safari.

## What went wrong
- **Fix outside the criteria.** The harbormaster's spec miscounted the invented demo runs, so the public card said "two made-up" when there were three. No criterion covered it. It was caught in the exploratory pass and fixed directly.
- **Exploratory gaps.** The exploratory pass did not reach the index card at phone width, the back link, or a clean "run again" click, and someone else was using the pane. `browser.mjs` covers the card and "run again". The back link was checked by hand afterwards.
- **No deaths, no failed criteria, no extra cycles.**

## Plan changes
- Playwright was not added to this repo, since the README says no dependencies. The browser check borrows the Playwright already installed in the crate-digger checkout. No owner question was asked.
- Phone CSS was added to the `shipyard.html` wrapper (see above).
- The card copy was corrected from two to three (see above).

## Observations for the owner to choose from
1. **Low:** The saved-scroll restore in the report JS could override `#harbor` on a return visit. The exploratory finding did not reproduce, and the harbormaster's Chromium repro landed correctly. Other browsers are untested.
2. **Medium:** The report section renders raw markdown rather than formatted text.
3. **Medium:** Harbormaster (runs the build) and Harbor Pilot (lays out the code) are easily confused by a first-time reader.
4. **Low:** Stage times sum to 26m56s against a 24m43s wall clock, because fix overlaps test. The run says shipped while its report says nothing merged at the time. The sim says `~/frisson` while the report says crate-digger.

Other dev notes: the sim wraps at 320px, and wide report tables scroll inside themselves on phones.

## Recommended next steps
1. Look at the pushed branch on a phone and in a second browser (Firefox or Safari) before merging.
2. Merge to main when satisfied, which publishes the site.
3. Consider observations 2 and 3 as follow-ups. They affect how a first-time visitor reads the page.

## Token use

Size: lite. Reported total: 258,073 tokens across 6 agents.

| Role | Agents | Tokens | Share |
|---|---|---|---|
| tester | 2 | 152,784 | 59% |
| dev | 2 | 86,807 | 34% |
| surveyor | 1 | 18,482 | 7% |
| reporter | 1 | 0 | 0% |

| Agent | Model | Tokens | Tool uses | Seconds |
|---|---|---|---|---|
| surveyor-1 | sonnet | 18,482 | 11 | 37 |
| dev-T1 | opus | 80,037 | 34 | 374 |
| tester-1 | sonnet | 58,815 | 8 | 51 |
| explorer-1 | opus | 93,969 | 37 | 268 |
| dev-T1-fix1 (fix of T1) | sonnet | 6,770 | 3 | 8 |
| reporter-1 | sonnet | unavailable | - | - |

The harbormaster's own tokens are not included: no figure was available.
1 agent(s) reported no figure and count as 0 in the totals, so the real total is higher.

### Dev models across 1 run(s)

| Model | Tasks | Fix agents | Fixes per task | Tokens |
|---|---|---|---|---|
| opus | 1 | 1 | 1.00 | 86,807 |
