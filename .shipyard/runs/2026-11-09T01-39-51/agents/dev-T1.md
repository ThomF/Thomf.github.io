# dev-T1 report

Commit: 7e5f38f on shipyard/frisson-run-harbor-explainer-2026-11-09T01-39-51. Files: index.html, shipyard.html, script.js, style.css. No dependencies added. .shipyard/ not committed.

## What changed

- **shipyard.html**: rebuilt from the source report.html by a script kept outside the repo. Wrapper re-applied (viewport, title, .pf-* CSS, nav, intro). state.target is now `~/code/crate-digger`. New static `section#harbor` before #app, with S1 extracted from REVIEW_GUIDE.md by the script and HTML-escaped, not retyped. The script stops if the guide does not have exactly 8 steps.
- **script.js**: real run first in SHIPYARD_RUNS with optional `dir`; two invented runs kept; comment says which is which. The bar shows `~/frisson` for the real run and `~/your-repo` for the others.
- **index.html**: fallback matches the real run, a line says the demo replays a real run, new details disclosure linking to shipyard.html#harbor.
- **style.css**: disclosure styles, sim min-height raised from 7 to 10 lines, smaller sim text and padding at 640px and below.

## Additions beyond the spec

- A `@media (max-width:640px)` block in the shipyard.html wrapper CSS. The newer report overflowed to 641px wide at 390. Wide tables now scroll inside themselves, the stage pipeline wraps, and the body padding is smaller. This overflow was also why #harbor did not land on phones (top 506 at scroll 0); the landing passed once the overflow was fixed.
- Report template JS is byte-identical to the source (diffed). Only the CSS, wrapper, title, viewport and state.target differ.
- Figures checked against source: 12/12 and verdict from state.json; 24m43s elapsed (about 25 minutes); 9 files from the guide's file map; 686 = 360 + 326 tests from report.md. Harbor wording checked against ~/code/shipyard/README.md.

## Tests

Check script: /private/tmp/claude-501/-Users-thomasfuhriman--claude-spares-spare-pHrYKq/3c415b62-0475-494c-8417-4cd47981be05/scratchpad/check.cjs (outside the repo; 47 ok, 0 failed on the final build, output in check-output.txt beside it). It uses crate-digger's Playwright 1.65 and Chromium only, served with python3 http.server on port 8765. Run before the commit, on the same files.

- AC1-AC6: static checks pass. AC2 parses both JSON blocks and compares them without state.target; no '/Users/' or 'thomasfuhriman' in the file.
- AC7: `node --check script.js` exits 0; commit touches only the four files; no package.json.
- AC8 at 1280, 390 and 320: real run plays first with ~/frisson; run again moves to the dark mode run with ~/your-repo; disclosure opens on click; link lands with #harbor top at 0; AC12, TOKENS chip and Token use present; documentElement and body scrollWidth within viewport; no console errors. Google Fonts failures would have been filtered from the error check; none were listed.
- Also passing: #harbor and the sim fallback render with JS disabled.
- Sim wrap: no wrapping at 390 (10 lines) or 1280.

## Known limits

- At 320px the sim wraps to 14 lines, without a hanging indent. 320 is outside AC8.
- At 390 the report's wider tables scroll sideways inside themselves, so some columns (such as a task's status) start off screen. The page itself does not scroll.
- Opening the disclosure at 1280 makes the neighbouring card in the row taller, because the grid row stretches.
- The sim's reserved 10 lines leave blank space under the shorter invented runs.
- Firefox and Safari not tested.
- `.projects` uses minmax(300px, 1fr), which is wider than the 288px content width at 320px. Existing and left alone; body overflow-x hidden masks it.

## Trap checked, no change

The report template restores a saved scroll position from sessionStorage, which could have beaten the #harbor link after a reader had scrolled down. I tested it in Chromium with and without a guard: the link landed correctly both ways, so I dropped the guard and left the template JS unedited. Not checked in other browsers.

## Wording for review

The intro's "One command" is carried over from the old wrapper; the owner also answered questions before planning in this run. "Shipped on its own branch" is used because the source report says nothing was merged or pushed.
