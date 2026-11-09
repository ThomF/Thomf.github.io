# Run report 2026-11-09T07-03-16: Shipyard example swapped to the admin panel run

**Verdict: shipped. All 8 acceptance criteria pass after one direct fix round.**

## What the owner needs to know first

a) **The page is redacted, and you did not ask for that.** The run text contained a working dev login (email plus password) and an owner email. The site and repo are public, so they were redacted, along with absolute local paths. The page says the details are redacted. File paths and the words admin (role, route, panel, username) are kept.

b) **A Harbor guide was generated for the source run, because none existed.** It was built from the logic files' context ranges, not the whole 311 KB context. Tests, CSS and docs were classed as plumbing from their paths. `/harbor verify` passed all 48 snippets. The guide stays in crate-digger, git-excluded, as earlier runs' guides do. The excerpt on the page is step S5 of 19.

c) **This was pushed to main, because you asked.** A normal run is not pushed. The request was "commit and push to main".

d) **Uncommitted changes appeared in the crate-digger working copy during the run.** They include files under apps/api. They did not come from this run and were left alone.

e) **The stale `.shipyard/checks/browser.mjs` now fails, as expected.** It asserts the old example. It also holds an absolute local path. `example-run.check.mjs` supersedes it. It was left in place because nothing is deleted, so removing it is your call.

## What was asked for

Replace the portfolio's Shipyard example (the shipyard.html run data, the Harbor excerpt and intro, and the index.html/script.js terminal replay) with Frisson admin-panel run 2026-11-09T06-16-12. The old run was 2026-11-09T01-05-12. Constraints:
- Only those three site files change, apart from run artifacts.
- Run data comes from the source report by script, not retyped.
- No credentials, owner email or local paths are committed.
- The three made-up terminal examples stay.
- Old run artifacts stay.

## Acceptance criteria

| AC | What it checks | Final status |
|---|---|---|
| AC1 | Run data deep-equals the source with redaction applied. runId, verdict shipped and target are correct. | Pass, after the fix. |
| AC2 | No dev login, owner email or domain, local path or password value in the changed files. No old run id in the three site files. | Pass, after the fix and a scrub of run artifacts. |
| AC3 | The template differs from the source only by the portfolio wrapper. The browserReport line is present. | Pass |
| AC4 | The intro names the run, quotes the request without the login, and gives the counts. It states the redaction. | Pass |
| AC5 | The Harbor figure matches the S5 snippet and bullets in the guide. | Pass |
| AC6 | The terminal replay and static fallback agree. Three made-up runs remain. `node --check` exits 0. | Pass |
| AC7 | Real browser at 1280 and 390 px. | Pass |
| AC8 | Outside .shipyard/, the diff lists exactly the three site files. | Pass |

## What was built

The diff touches three files: index.html (18 lines), script.js (20 lines) and shipyard.html (41 lines). In total that is 40 insertions and 39 deletions.
- The shipyard.html run data was produced from the source report by script, with redaction applied.
- The intro and the Harbor excerpt were replaced.
- SHIPYARD_RUNS[0] and the index.html fallback now show the admin panel run: "add an admin panel", ~/frisson, 3 tasks and 12 criteria, 828 tests, 99 browser steps, and 12 of 12.
- A browser check, `example-run.check.mjs`, was added under `.shipyard/checks/`.

## Test results

**Round 1 (tester), AC1 and AC2 failed.**
- AC1 evidence: 31 string leaves differed. 30 were intended redactions. One was not: `.tree.files[18].path`, the path of `admin-panel.css`, was mangled because the password rule for the slash-form credential also matched this file path.
- AC2 evidence: the scan's literal matched legitimate file paths such as `components/admin/AdminBulkImport.vue` five times on shipyard.html line 187. None of these was a credential. The tester also found an absolute local path in the untracked run directory (the report.html runDir field), and brief.json quoting the scan patterns.
- AC3, AC4, AC5, AC6 and AC8 passed in this round.

**Browser tester.** AC7 passed with `example-run.check.mjs` printing PASS at 1280 and 390 px. The admin panel run plays first, and Run again moves to a made-up run (add dark mode toggle). The Harbor disclosure opens and its link lands with #harbor in view. The page shows verdict shipped, AC12 and the browser tester evidence. Neither page scrolls horizontally, and there are no console errors.

**Fix round 1 (direct fix, scoped retest by tester-2).**
- AC1 passed: exactly 30 differing leaves, and the file paths are intact.
- AC2 failed only on run artifacts, not on the site files. cycles/1/browser-output-fix1.txt and report.html contained an absolute local path. brief.json and report.html contained the old run id, quoted in the goal and AC text.

**Harbormaster scrub.** After the artifacts were scrubbed, a scan by command found no sensitive match across the changed files or the commit messages. The old run id is absent from the three site files. AC2 passed. The pattern list is kept outside the repo.

## What went wrong and why

1. **A redaction rule over-matched.** The password rule matched a real file path and corrupted it. The tester caught it and the fix round corrected it.
2. **The brief nearly published the credential.** The checklist tester noticed that the brief quoted the forbidden strings. AC2 was reworded to describe the strings rather than quote them. This was caught before any run artifact was committed.
3. **Run artifacts leaked a local path and the old run id.** The run directory was untracked, so nothing was published. The harbormaster scrubbed them before commit.
4. **The AC2 local-path scan was made case-sensitive.** A case-insensitive match flagged the API route `/api/users/`, which is not a local path.
5. **Process note.** No surveyor was used. The harbormaster wrote the small map directly.

## Observations (for the owner to choose from)

- **Low:** `.shipyard/checks/browser.mjs` from an earlier run asserts the old example, so the check now fails. It also holds an absolute local path. It is superseded by `example-run.check.mjs`. Removing it is the owner's call.
- **Low:** Files committed by the earlier run 2026-11-09T01-39-51 (report.html, shipyard-report.json) hold absolute local paths. They were out of scope here and are unchanged.

## Recommended next steps

1. Look at the uncommitted apps/api changes in crate-digger (item d).
2. Decide whether to delete the stale `browser.mjs`, which also removes one local path.
3. Decide whether to scrub the absolute paths in the earlier run's committed artifacts. The repo is public, so this is worth doing.
## Token use

Size: lite. Reported total: 180,494 tokens across 6 agents.

| Role | Agents | Tokens | Share |
|---|---|---|---|
| tester | 2 | 66,234 | 37% |
| browser-tester | 1 | 54,849 | 30% |
| dev | 2 | 43,042 | 24% |
| reporter | 1 | 16,369 | 9% |

| Agent | Model | Tokens | Tool uses | Seconds |
|---|---|---|---|---|
| dev-T1 | sonnet | 28,517 | 10 | 68 |
| browser-tester | sonnet | 54,849 | 7 | 48 |
| tester | sonnet | 39,915 | 18 | 97 |
| dev-T1-fix1 (fix of T1) | sonnet | 14,525 | 6 | 28 |
| tester-2 | sonnet | 26,319 | 8 | 45 |
| reporter | sonnet | 16,369 | 11 | 23 |

The harbormaster's own tokens are not included: no figure was available.

### Dev models across 2 run(s)

| Model | Tasks | Fix agents | Fixes per task | Tokens |
|---|---|---|---|---|
| opus | 1 | 1 | 1.00 | 86,807 |
| sonnet | 1 | 1 | 1.00 | 43,042 |
