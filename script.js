// ── ASCII portrait ─────────────────────────────────────────────
const face = document.getElementById("face");
const art = window.FACE_ASCII || "";
const rows = art.split("\n");
const cols = Math.max(...rows.map((r) => r.length));
face.querySelectorAll("pre").forEach((pre) => (pre.textContent = art));

// Scale the font so the whole portrait fits the screen.
function fitFace() {
  const charW = 0.6, lineH = 1.1;                  // monospace cell, in em
  const maxW = Math.min(window.innerWidth - 32, 1100);
  const maxH = window.innerHeight * 0.62;
  const fs = Math.min(maxW / (cols * charW), maxH / (rows.length * lineH));
  face.style.setProperty("--fs", fs.toFixed(2) + "px");
}
fitFace();
window.addEventListener("resize", fitFace);

// Boot-up reveal, top to bottom.
face.classList.add("is-booting");
requestAnimationFrame(() => requestAnimationFrame(() => face.classList.remove("is-booting")));

// Cursor "flashlight" brightens the portrait.
face.addEventListener("pointermove", (e) => {
  const r = face.getBoundingClientRect();
  face.style.setProperty("--mx", e.clientX - r.left + "px");
  face.style.setProperty("--my", e.clientY - r.top + "px");
});
face.addEventListener("pointerleave", () => {
  face.style.setProperty("--mx", "50%");
  face.style.setProperty("--my", "-200px");
});

// Occasional glitch: swap a few characters for a split second.
const lit = face.querySelector(".face__lit");
const glyphs = "#%&@*+=-:.";
setInterval(() => {
  if (document.hidden || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const chars = art.split("");
  for (let i = 0; i < 40; i++) {
    const at = Math.floor(Math.random() * chars.length);
    if (chars[at] !== "\n" && chars[at] !== " ") chars[at] = glyphs[(Math.random() * glyphs.length) | 0];
  }
  lit.textContent = chars.join("");
  setTimeout(() => (lit.textContent = art), 120);
}, 2800);

// ── Clock + year ───────────────────────────────────────────────
const clock = document.getElementById("clock");
const tick = () => (clock.textContent = new Date().toLocaleTimeString([], { hour12: false }));
tick(); setInterval(tick, 1000);
document.getElementById("year").textContent = new Date().getFullYear();

// ── Reveal sections on scroll ──────────────────────────────────
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => e.isIntersecting && (e.target.classList.add("is-in"), io.unobserve(e.target)));
}, { threshold: 0.12 });
document.querySelectorAll(".label, .window, .project, .chips, .contact__line").forEach((el) => {
  el.classList.add("reveal");
  io.observe(el);
});

// ── Shipyard demo terminal ─────────────────────────────────────
// A scripted replay: nothing here talks to a server.
// The first run is real, condensed from Shipyard's report for the Frisson
// run 2026-11-09T01-05-12 (shipyard.html). The other two are invented examples.
// Each run: optional dir (default ~/your-repo), the feature request, then
// [tag, text, result] steps. Tags are at most 5 characters, or the padding breaks.
// result: "ok" ✓, "bad" ✗, "ship" ↗, or "" for none.
const SHIPYARD_RUNS = [
  { dir: "~/frisson", ask: "only show the crate you are on", steps: [
    ["plan",  "2 tasks · 12 criteria", ""],
    ["build", "dev agent → CrateView.vue", "ok"],
    ["build", "dev agent → docs, Playwright", "ok"],
    ["test",  "tester agent → 12 of 12", "ok"],
    ["test",  "exploratory → 5px click target", "bad"],
    ["fix",   "CrateBox.vue → full sleeve clicks", "ok"],
    ["test",  "686 tests · 12 of 12", "ok"],
    ["ship",  "branch shipped", "ship"],
    ["pilot", "/harbor → 8-step guide", "ok"],
  ]},
  { ask: "add dark mode toggle", steps: [
    ["plan",  "3 tasks · 2 files", ""],
    ["build", "dev agent → ThemeToggle.vue", "ok"],
    ["test",  "tester agent → 1 failing", "bad"],
    ["fix",   "patched contrast check", "ok"],
    ["test",  "12 passing", "ok"],
    ["ship",  "PR opened", "ship"],
  ]},
  { ask: "rate-limit the login route", steps: [
    ["plan",  "2 tasks · 3 files", ""],
    ["build", "dev agent → rateLimit.ts", "ok"],
    ["test",  "tester agent → 2 failing", "bad"],
    ["fix",   "limit per IP, not global", "ok"],
    ["test",  "27 passing", "ok"],
    ["ship",  "PR opened", "ship"],
  ]},
  { ask: "export crates to CSV", steps: [
    ["plan",  "4 tasks · 3 files", ""],
    ["build", "dev agent → exportCsv.ts", "ok"],
    ["build", "dev agent → ExportButton.vue", "ok"],
    ["test",  "tester agent → 9 passing", "ok"],
    ["ship",  "PR opened", "ship"],
  ]},
];

(() => {
  const out = document.getElementById("sim-out");
  const replay = document.getElementById("sim-replay");
  const dir = document.getElementById("sim-dir");
  if (!out || !replay) return;            // static fallback log stays as-is

  const MARK = { ok: ["sim__ok", "✓"], bad: ["sim__bad", "✗"], ship: ["sim__ok", "↗"] };
  const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
  const span = (cls, text) => Object.assign(document.createElement("span"), { className: cls, textContent: text });
  let runIndex = 0, token = 0;

  // Waits, but pauses while the tab is hidden and stops if a newer run started.
  const wait = (ms, my) => new Promise((done) => {
    const step = () => {
      if (my !== token) return;
      if (document.hidden) return setTimeout(step, 250);
      setTimeout(() => my === token && done(), ms);
    };
    step();
  });

  function renderInstant(run) {
    out.textContent = "";
    out.append(span("sim__cmd", `> /shipyard "${run.ask}"`));
    for (const [tag, text, res] of run.steps) {
      out.append("\n", span("sim__tag", `[${tag}]`), " ".repeat(6 - tag.length) + text);
      if (MARK[res]) out.append(" ", span(...MARK[res]));
    }
  }

  async function play(run) {
    const my = ++token;
    if (reduced()) return renderInstant(run);
    out.textContent = "";
    const cmd = span("sim__cmd", "> ");
    const caret = span("sim__caret", "▮");
    out.append(cmd, caret);
    for (const ch of `/shipyard "${run.ask}"`) {
      cmd.textContent += ch;
      await wait(35 + Math.random() * 45, my);
    }
    await wait(500, my);
    for (const [tag, text, res] of run.steps) {
      const line = span("", "");
      line.append("\n", span("sim__tag", `[${tag}]`), " ".repeat(6 - tag.length) + text);
      const dots = span("sim__dim", " …");
      line.append(dots);
      out.insertBefore(line, caret);
      await wait(600 + Math.random() * 700, my);
      dots.remove();
      if (MARK[res]) line.append(" ", span(...MARK[res]));
      await wait(250, my);
    }
    caret.remove();
  }

  function next() {
    const run = SHIPYARD_RUNS[runIndex++ % SHIPYARD_RUNS.length];
    if (dir) dir.textContent = run.dir || "~/your-repo";
    play(run);
  }
  replay.addEventListener("click", next);

  // Start the first run when the card scrolls into view.
  new IntersectionObserver((entries, obs) => {
    if (entries.some((e) => e.isIntersecting)) { obs.disconnect(); next(); }
  }, { threshold: 0.4 }).observe(out);
})();
