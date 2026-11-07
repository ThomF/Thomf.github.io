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
