# Ledger 2026-11-09T07-03-16
- 2026-11-09T07:03:16Z preflight: branched from 725089233e5c66f15e07ccf45b4c1c076c50c44e. Size lite (requested). Owner asked for commit and push to main at the end.
- 07:07:43Z dev-T1 done (94932f3). Testers dispatched. No token figure was given for dev-T1.
- 07:09:56Z tester: AC1 and AC2 fail on a mangled file path. AC2's scan also over-matched, and the brief quoted the forbidden strings; both reworded. Direct fix round 1.
- 07:12:32Z tester-2: AC1 pass. AC2 failed only on run artifacts; harbormaster scrubbed them and the scan by command passed. Stale browser.mjs fails as expected. Entering report.
