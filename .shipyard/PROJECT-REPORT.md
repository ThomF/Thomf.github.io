# Shipyard project report

## 2026-11-09T01-39-51: latest Frisson run and Harbor Pilot explainer
- Verdict: shipped (8/8 criteria), 1 cycle, 1 fix round (copy miscount from the spec, outside the criteria), size lite
- Wall clock: 15m 40s; slowest stage: build (6m 29s)
- Tokens: 258,073 across 6 agents (size lite, harbormaster's own tokens not included, 1 without a figure).
- Deaths: none. Fast paths: direct-fix, scoped-retest
- No test command here; checks are node --check and .shipyard/checks/browser.mjs, which borrows Playwright from the crate-digger checkout
- Branch pushed at the owner's request; not merged

## 2026-11-09T07-03-16: example run swapped to the Frisson admin panel run
- Verdict: shipped (8/8 criteria), 1 cycle, 1 direct fix round plus a scrub of run artifacts, size lite
- Wall clock: 10m 10s; slowest stage: test (4m 49s)
- Tokens: 180,494 across 6 agents (size lite, harbormaster's own tokens not included).
- Deaths: none. Fast paths: survey-by-harbormaster, direct-fix, scoped-retest
- Public-site rule: the swapped run data redacts the dev login, an owner email and local paths. Run the sensitive-string scan on run artifacts before committing, and never quote the patterns in a brief.
- .shipyard/checks/browser.mjs is stale and fails; example-run.check.mjs replaces it
- Pushed to main at the owner's request
