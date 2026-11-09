# Exploratory pass, cycle 1

Served with `python3 -m http.server 8931`, now stopped. Used all 25 browser tool calls. Desktop pane was 967px wide; phone was 375x812, plus a 390px same-origin iframe for shipyard.html.

Caveat: someone else was also using the pane during the pass. The pane reported user clicks twice. The disclosure was opened and the Harbor link followed by that person, not by me. Scroll readings on shipyard.html were disturbed, so those are marked below.

## Could a stranger say what the Harbor Pilot does?

Yes. The disclosure and #harbor both say it clearly: it lays the real code out in data order so you can read it, it does not review, and the code is copied by a script from cited line ranges. The S1 excerpt makes it concrete, and it matches REVIEW_GUIDE.md word for word, including `(\\d+)`. The guide has 8 steps, as stated.

## #harbor and sticky headers

shipyard.html has no sticky or fixed elements other than the two pointer-events:none overlays. A same-document jump to #harbor put it at top = 0 at desktop, and at 0 in the 390px iframe. It sits under nothing.

## Findings

### Medium: returning to shipyard.html#harbor can miss the section
shipyard.html:416 restores a saved scroll position from sessionStorage on every load, which overrides the fragment. Scroll position is saved on scroll and beforeunload (lines 422-427). So after a visitor reads the report, goes back, and then follows "See a real guide excerpt", they land where they left off, not at #harbor. Confirmed from the code. Partly seen in the browser: after following the link, the page read scrollY 323 with #harbor at 256, so the heading and the first paragraphs were off screen. The other user may have scrolled, so I did not get a clean reproduction.

### Medium: card copy says two made-up examples, there are three
The card says "Run again" moves on to "two made-up examples", and the comment at script.js:65 says "The other two". SHIPYARD_RUNS has one real run plus three invented ones: dark mode, rate-limit, export to CSV. The spec also says two. Read from the code; my browser probe of the cycle timed out.

### Medium: raw markdown in the report
The REPORT section is a `pre` holding about 10,000 characters of unrendered markdown (`**Verdict...`, `## ...`, `| AC1 | ... |` pipe tables). It is 3,148px tall at desktop and 5,825px at 390px, where the pipe tables wrap into noise. It is the plainest statement of the verdict on the page and the hardest to read. shipyard.html is 14,380px tall at 390px.

### Medium: Harbor Pilot and harbormaster are easy to confuse
The report has a HARBORMASTER LOG, and the harbormaster "reversed" AC12(b) and "ran npm test". That is a different role from the Harbor Pilot, which #harbor says does not approve, fix or score. Nothing on the page separates them, and a stranger could read this as a contradiction.

### Low: the sim's [pilot] step is absent from the report
The sim ends with `[pilot] /harbor → 8-step guide`. A search of the run data found no mention of /harbor or the review guide, and the stage strip ends at REPORT. A reader checking the card against the report finds no such step. The only link between them is the caption in #harbor.

### Low: "686 tests" appears only on the card
The report shows 360 api and 326 web tests. The sum is right, but the figure itself does not appear in the report.

### Low: stage times do not sum to elapsed
The stages add up to 26m56s and the ELAPSED chip says 24m43s. This comes from the source report, and may be overlap or rounding, but it is unexplained.

### Low: "shipped" means different things
The card says it "can even ship it to your repo", the sim says "branch shipped", and the report chip says SHIPPED, while the report text says "Nothing is merged or pushed". The intro's "shipped on its own branch" is accurate.

### Low: repo name differs
The sim bar says ~/frisson and the report chip says ~/CODE/CRATE-DIGGER, for the same run. Nothing says these are the same project.

### Low: unexplained jargon in the report header
FAST PATH DIRECT-FIX, FAST PATH SCOPED-RETEST, CYCLE 1/3 and SIZE STANDARD have no gloss. The header is otherwise fine.

### Low: the first excerpt shows unchanged code
S1 ends "These lines did not change in this build". That is honest and matches the guide, but it is an odd first sample of a guide to a change.

### Low: faint text
"Scroll to see every stage" and the HARBOR PILOT heading are dim next to their surroundings, most noticeably at phone width.

## Consistent across card, intro and report

12 of 12 criteria, one fix round (FIX ROUND 1/3), 9 files, about 25 minutes (24m43s), 2 tasks (T1, T2), the 5px strip story, and the order build, test, reversal, fix.

Desktop sim: played through with no clipping (out 406px wide, scrollHeight equal to clientHeight at 212px), and reserved its height so the card did not jump. No horizontal overflow on shipyard.html at 967px or 390px, with the #harbor code block fitting in the 390px iframe (scrollWidth 320, clientWidth 320). No broken images. At 375px the intro and #harbor read well.

## Not exercised

- Phone width on the index.html card: sim, run again, disclosure. A step meant to run it found the tab still on shipyard.html, and the call budget ran out.
- Back link: my click at (113, 42) did not visibly navigate. The tab was still on shipyard.html#harbor straight after, at scrollY 331. I cannot say whether this was a miss, slow navigation or the other user. The href is `index.html#work` and `id="work"` exists. No failure is claimed.
- Run again with a clean real click: my one click landed, but the follow-up script timed out, partly because its waits were too long, and the other user navigated away. The pane did show the real run again afterwards, which fits the cycle wrapping around, but that is not proof.
- The middle of the report was checked by script and heading list, not read on screen at every scroll position.
