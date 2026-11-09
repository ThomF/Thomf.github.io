# Shipyard project report

## 2026-11-09T01-39-51: latest Frisson run and Harbor Pilot explainer
- Verdict: shipped (8/8 criteria), 1 cycle, 1 fix round (copy miscount from the spec, outside the criteria), size lite
- Wall clock: 15m 40s; slowest stage: build (6m 29s)
- Tokens: 258,073 across 6 agents (size lite, harbormaster's own tokens not included, 1 without a figure).
- Deaths: none. Fast paths: direct-fix, scoped-retest
- No test command here; checks are node --check and .shipyard/checks/browser.mjs, which borrows Playwright from the crate-digger checkout
- Branch pushed at the owner's request; not merged
