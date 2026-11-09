# Spec: latest Frisson run and Harbor Pilot explainer

Source run: /Users/thomasfuhriman/code/crate-digger/.shipyard/runs/2026-11-09T01-05-12 (report.html, report.md, REVIEW_GUIDE.md).

## shipyard.html
Rebuild from the source report.html so it gets the newer template (size and token chips, Token use section). Re-apply the existing portfolio wrapper: viewport meta, title "Shipyard — Example Run", .pf-* CSS, nav, intro. Set state.target to ~/code/crate-digger inside the run data and change nothing else in it. Update the intro for this run: the request, 12 of 12 criteria, one fix round, 9 files, about 25 minutes, and the honest story that the exploratory pass caught a sleeve click that only worked on a 5px strip.

Add a static section id="harbor" between the intro and #app, in the page's own amber style: what the Harbor Pilot does, then step S1 from REVIEW_GUIDE.md quoted exactly (path line, code, What it does, Hands to the next step, When it fails), labelled as a real excerpt from this run's guide (8 steps). It must work without JS.

## index.html, script.js, style.css
Put the real run first in SHIPYARD_RUNS, with an optional dir field so the sim bar shows ~/frisson for it and ~/your-repo for the others. Keep the two invented runs and correct the comment so it says which is which. Steps, tags at most 5 characters, short enough for a phone:
plan 2 tasks · 12 criteria | build dev agent → CrateView.vue ok | build dev agent → docs, Playwright ok | test tester agent → 12 of 12 ok | test exploratory → 5px click target bad | fix CrateBox.vue → full sleeve clicks ok | test 686 tests · 12 of 12 ok | ship branch shipped ship | pilot /harbor → 8-step guide ok
Update the static #sim-out fallback to match. Say in the card that the demo replays a real run.

Add a details disclosure to the card, summary "What's the Harbor Pilot?", styled to fit the card: after a build, /harbor lays the real code out in the order the data moves so a person can read it start to finish. It is not a reviewer: it does not approve, fix or score, you are the reviewer. The code can't be paraphrased, because Claude only cites line ranges and a script copies those lines from the commit and refuses citations that don't exist. /harbor ask answers with quoted lines; /harbor verify re-checks every snippet against the branch. Link to shipyard.html#harbor.
