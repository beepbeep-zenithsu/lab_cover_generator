/* =====================================================================
   app.js  -  application logic (you normally don't need to edit this)
   Data lives in:  js/config.js, js/students.js, js/courses.js
   ===================================================================== */
(function () {
"use strict";

const CFG = window.APP_CONFIG;
const $ = id => document.getElementById(id);
const FB_DOC = ["labcover", "config"];           /* Firestore collection / doc */
const LS_KEY = "lcg_local_v3";                   /* localStorage (no-Firebase mode) */

let COURSES = window.DEFAULT_COURSES;
let STUD = {};
let P = null;                                    /* the currently selected student */
let studText = window.DEFAULT_STUDENTS.trim();
let db = null, auth = null;                      /* Firebase handles (if configured) */
let isAdmin = false;

/* ---------- data loading ---------- */
function parseStudents(text) {
  const m = {};
  text.split("\n").forEach(l => {
    l = l.trim(); const i = l.indexOf(" ");
    if (i > 0) m[l.slice(0, i)] = l.slice(i + 1).trim();
  });
  return m;
}
function applyData(students, courses) {
  studText = (students || window.DEFAULT_STUDENTS).trim();
  STUD = parseStudents(studText);
  COURSES = courses || window.DEFAULT_COURSES;
  const cur = $("course").value;
  $("course").innerHTML = COURSES.map((c, i) => `<option value="${i}">${c.name} (${c.code})</option>`).join("");
  if (cur && COURSES[+cur]) $("course").value = cur;
  if ($("sid").value.length === 9) onId();
}
function loadLocal() {
  try {
    const s = JSON.parse(localStorage.getItem(LS_KEY) || "{}");
    applyData(s.students, s.courses);
  } catch (e) { applyData(); }
}
async function loadRemote() {
  try {
    const d = await db.collection(FB_DOC[0]).doc(FB_DOC[1]).get();
    if (d.exists) {
      const v = d.data();
      applyData(v.students, v.courses ? JSON.parse(v.courses) : null);
      return;
    }
  } catch (e) { console.warn("Could not read online data, using file defaults.", e); }
  applyData();
}

/* ---------- helpers ---------- */
const iso = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
const fmt = v => v ? new Date(v + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";
function lastDay(day) { const d = new Date(); while (d.getDay() !== day) d.setDate(d.getDate() - 1); return d; }
const curCourse = () => COURSES[+$("course").value];
const curExp = () => +$("exp").value;

/* ---------- Student ID -> details.  (Edit here to change ID rules.) ---------- */
function parseId(id) {
  if (!/^\d{9}$/.test(id) || !STUD[id]) return null;
  const dc = id.slice(4, 6), s = id[6], roll = +id.slice(7);
  const d = CFG.DEPTS[dc];
  if (!d || (s !== "1" && s !== "2") || !roll) return null;
  const sec = s === "1" ? "A" : "B";
  return { id, name: STUD[id], dc, dept: d.dept, prog: d.prog, sec, roll, grp: sec + (roll % 2 ? 1 : 2) };
}
function routineFor(c) {
  const d = (c.routine || {})[P.dc] || {};
  return d[P.sec] || d["*"] || null;
}

/* ---------- UI ---------- */
function onId() {
  const v = $("sid").value.trim();
  P = null;
  $("err").hidden = true; $("info").hidden = true; $("form").hidden = true; $("cv").hidden = true; $("ph").hidden = false;
  if (!v) return;
  if (v.length < 9 && document.activeElement === $("sid")) return;
  P = parseId(v);
  if (!P) {
    const body = encodeURIComponent("Student ID entered: " + v + "\n\nIssue (wrong ID / wrong name / wrong biodata / other):\n");
    $("err").hidden = false;
    $("err").innerHTML = `Invalid Student ID. Please enter a correct Student ID.
      <div class="r"><a href="mailto:${CFG.CORRECTION_EMAIL}?subject=${encodeURIComponent("Student Information Correction Request")}&body=${body}">
      <button type="button">Request Information Correction</button></a></div>`;
    return;
  }
  $("info").hidden = false;
  $("info").innerHTML = [["Name", P.name], ["Student ID", P.id], ["Department", P.dept], ["Programme", P.prog], ["Section / Group", `${P.sec} / ${P.grp}`]]
    .map(a => `<div><b>${a[0]}</b>${a[1]}</div>`).join("");
  $("form").hidden = false;
  onCourse();
}

function onCourse() {
  const c = curCourse();
  $("exp").innerHTML = c.exps.map((t, i) => `<option value="${i}">${i + 1}. ${t}</option>`).join("");
  buildExtraFields();
  buildButtons();
  draw();
}

function buildExtraFields() {
  const c = curCourse(), box = $("extraFields");
  if (c.fields !== "full") { box.innerHTML = ""; return; }
  const r = routineFor(c);
  box.innerHTML = `<details><summary>Optional: edit dates / submitted-to</summary>
    <div class="two"><div><label for="dp">Date of Performance</label><input type="date" id="dp"></div>
    <div><label for="ds">Date of Submission</label><input type="date" id="ds"></div></div>
    <label for="stf">Submitted To</label><input id="stf" placeholder="Teacher name(s)"></details>`;
  if (r) $("dp").value = iso(lastDay(r.day));
  setSubmission();
  $("stf").value = r ? r.t : "";
  $("dp").oninput = () => { setSubmission(); draw(); };
  $("ds").oninput = draw;
  $("stf").oninput = draw;
}
function setSubmission() {
  const v = $("dp") && $("dp").value; if (!v) return;
  const d = new Date(v + "T00:00:00"); d.setDate(d.getDate() + 14); $("ds").value = iso(d);
}

function buildButtons() {
  const c = curCourse(), b = $("btns");
  if (c.restByExp) {
    b.innerHTML = `<button id="bcov">Download Cover</button><button id="brep" class="o">Download Lab Report</button>`;
    $("bcov").onclick = downloadPdf;
    $("brep").onclick = downloadReport;
  } else {
    b.innerHTML = `<button id="bpdf">Download PDF</button><button id="bimg" class="o">Download Image</button>`;
    $("bpdf").onclick = downloadPdf;
    $("bimg").onclick = downloadImg;
  }
}

/* ---------- drawing the cover on a canvas ---------- */
const imgCache = {};
const loadImg = src => imgCache[src] || (imgCache[src] = new Promise((ok, no) => {
  const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = src;
}));
const cv = $("cv"), ctx = cv.getContext("2d");

async function draw() {
  if (!P || $("form").hidden) return;
  const c = curCourse(), e = curExp();
  const src = c.tplByExp ? c.tplByExp[e] : c.tpl;
  let img;
  try { img = await loadImg(src); }
  catch (err) { $("ph").hidden = false; $("ph").textContent = "Could not load the cover template image: " + src; cv.hidden = true; return; }
  const font = c.font || "Ubuntu,Arial,sans-serif";
  try { await document.fonts.load("500 16px Ubuntu"); } catch (err) {}
  if (curExp() !== e || curCourse() !== c) return;   /* user changed selection meanwhile */
  cv.width = img.naturalWidth; cv.height = img.naturalHeight;
  const k = cv.width / c.pageW, p = c.posByExp ? c.posByExp[e] : c.pos;
  ctx.drawImage(img, 0, 0);
  ctx.fillStyle = "#1a1a1a"; ctx.textBaseline = "middle";
  let rows;
  if (c.fields === "full") {
    rows = [[p.en, String(e + 1)], [p.t, c.exps[e]], [p.dop, fmt($("dp").value)], [p.dos, fmt($("ds").value)],
            [p.sub, $("stf").value], [p.nm, P.name], [p.sid, P.id], [p.dp, P.dept], [p.pr, P.prog], [p.gp, P.grp]];
  } else {
    rows = [[p.nm, P.name], [p.sid, P.id], [p.pr, P.prog], [p.gp, P.grp]];
  }
  rows.forEach(([xy, t]) => {
    if (!t) return;
    let s = (c.fontSize || 12) * k; const mw = (c.pageW - 20 - xy[0]) * k;
    const setF = () => ctx.font = `500 ${s}px ${font}`;
    setF();
    while (ctx.measureText(t).width > mw && s > 6 * k) { s -= .4 * k; setF(); }
    ctx.fillText(t, xy[0] * k, xy[1] * k);
  });
  cv.hidden = false; $("ph").hidden = true;
}

/* ---------- downloads ---------- */
function saveBlob(name, blob) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}
const fname = ext => `LabCover_${P.id}_${curCourse().code.replace(/\s/g, "")}_Exp${curExp() + 1}.${ext}`;
const reportName = () => `LabReport_${P.id}_${curCourse().code.replace(/\s/g, "")}_Exp${curExp() + 1}.pdf`;

function downloadImg() { cv.toBlob(b => saveBlob(fname("png"), b), "image/png"); }
function downloadPdf() {
  const { jsPDF } = window.jspdf, c = curCourse(), h = (c.pageH / c.pageW) * 210;
  const pdf = new jsPDF({ unit: "mm", format: [210, h] });
  pdf.addImage(cv.toDataURL("image/jpeg", .95), "JPEG", 0, 0, 210, h);
  saveBlob(fname("pdf"), pdf.output("blob"));
}
async function downloadReport() {
  const c = curCourse(), btn = $("brep"), old = btn.textContent;
  btn.disabled = true; btn.textContent = "Building...";
  try {
    const res = await fetch(c.restByExp[curExp()]);
    if (!res.ok) throw new Error("report file not found");
    const restBytes = await res.arrayBuffer();
    const { PDFDocument } = PDFLib;
    const out = await PDFDocument.create();
    const jpg = await out.embedJpg(await fetch(cv.toDataURL("image/jpeg", .95)).then(r => r.arrayBuffer()));
    out.addPage([c.pageW, c.pageH]).drawImage(jpg, { x: 0, y: 0, width: c.pageW, height: c.pageH });
    const rest = await PDFDocument.load(restBytes);
    (await out.copyPages(rest, rest.getPageIndices())).forEach(pg => out.addPage(pg));
    saveBlob(reportName(), new Blob([await out.save()], { type: "application/pdf" }));
  } catch (err) {
    console.error(err);
    alert("Could not build the full report (the report file for this experiment may not be reachable). You can still download just the cover.");
  } finally { btn.disabled = false; btn.textContent = old; }
}

/* =====================================================================
   ADMIN
   Mode 1 (FIREBASE configured): Google emails a sign-in link to the admin
        address. Only that account can write data (server-side rules).
   Mode 2 (no Firebase): EmailJS emails a 6-digit code; edits are stored in
        this browser only.
   ===================================================================== */
let timer = null;
function loadScript(src) {
  return new Promise((ok, no) => { const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = no; document.head.appendChild(s); });
}
function startTimer(deadline, onEnd) {
  clearInterval(timer);
  const tick = () => {
    const left = Math.max(0, deadline - Date.now()), s = Math.ceil(left / 1000);
    document.querySelectorAll(".timeLeft").forEach(el => el.textContent = Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"));
    if (left <= 0) { clearInterval(timer); onEnd(); }
  };
  tick(); timer = setInterval(tick, 250);
}
function showPanel() {
  isAdmin = true;
  $("lockBox").hidden = true; $("adminPanel").hidden = false; $("adm").open = true;
  $("astu").value = studText;
  $("acfg").value = JSON.stringify(COURSES, null, 1);
  $("modeNote").textContent = db
    ? "Signed in. Saving publishes the changes online for everybody immediately."
    : "Edits are saved only in this browser. To change data for everyone, edit js/students.js / js/courses.js and re-publish (or set up Firebase, see README).";
}
function lockPanel() {
  isAdmin = false; clearInterval(timer);
  $("adminPanel").hidden = true; $("lockBox").hidden = false; $("otpArea").hidden = true; $("otpMsg").textContent = "";
  if (auth) auth.signOut().catch(() => {});
}

/* --- Mode 1: Firebase email link --- */
async function fbSend() {
  $("otpArea").hidden = false; $("otpEntry").hidden = true; $("linkNote").hidden = false;
  $("otpMsg").textContent = "";
  const url = location.origin + location.pathname + "?adm=" + Date.now();
  try {
    await auth.sendSignInLinkToEmail(CFG.ADMIN_EMAIL, { url, handleCodeInApp: true });
    $("otpMsg").textContent = "Sign-in link sent to " + CFG.ADMIN_EMAIL + ".";
    startTimer(Date.now() + CFG.OTP_SECONDS * 1000, () => { $("otpMsg").textContent = "Link expired. Click the button to send a new one."; });
  } catch (e) { $("otpMsg").textContent = "Could not send the link: " + e.message; }
}
/* --- Mode 2: EmailJS one-time code --- */
let otp = null;
async function ejSend() {
  const E = CFG.EMAILJS;
  if (!(E.SERVICE_ID && E.TEMPLATE_ID && E.PUBLIC_KEY && window.emailjs)) {
    $("otpMsg").textContent = "Admin sign-in is not set up yet. Fill in EMAILJS (or FIREBASE) in js/config.js. See README.";
    return;
  }
  const code = String(crypto.getRandomValues(new Uint32Array(1))[0] % 900000 + 100000);
  otp = { code, exp: Date.now() + CFG.OTP_SECONDS * 1000 };
  $("otpArea").hidden = false; $("otpEntry").hidden = false; $("linkNote").hidden = true;
  startTimer(otp.exp, () => { $("otpMsg").textContent = "Code expired. Click Resend."; });
  try {
    await emailjs.send(E.SERVICE_ID, E.TEMPLATE_ID, { code, to_email: CFG.ADMIN_EMAIL }, E.PUBLIC_KEY);
    $("otpMsg").textContent = "Code sent to " + CFG.ADMIN_EMAIL + ".";
  } catch (e) { otp = null; $("otpMsg").textContent = "Could not email the code (EmailJS error)."; }
}
function ejCheck() {
  if (!otp || Date.now() > otp.exp) { $("otpMsg").textContent = "Code expired. Click Resend."; return; }
  if ($("otpIn").value.trim() === otp.code) { clearInterval(timer); otp = null; showPanel(); }
  else $("otpMsg").textContent = "Incorrect code.";
}

/* --- panel actions --- */
async function save() {
  try {
    const courses = JSON.parse($("acfg").value);
    const students = $("astu").value.trim();
    if (db) {
      if (!auth.currentUser || auth.currentUser.email !== CFG.ADMIN_EMAIL) throw new Error("Not signed in as admin");
      await db.collection(FB_DOC[0]).doc(FB_DOC[1]).set({ students, courses: JSON.stringify(courses), updatedAt: Date.now() });
      $("amsg").textContent = "Saved online for everyone.";
    } else {
      localStorage.setItem(LS_KEY, JSON.stringify({ students, courses }));
      $("amsg").textContent = "Saved in this browser.";
    }
    applyData(students, courses);
  } catch (e) { $("amsg").textContent = "Could not save: " + e.message; }
}
async function reset() {
  if (!confirm("Discard saved changes and go back to the data in js/students.js and js/courses.js?")) return;
  try {
    if (db) await db.collection(FB_DOC[0]).doc(FB_DOC[1]).delete();
    else localStorage.removeItem(LS_KEY);
    applyData(); showPanel(); $("amsg").textContent = "Reset to file defaults.";
  } catch (e) { $("amsg").textContent = "Could not reset: " + e.message; }
}

/* ---------- start-up ---------- */
async function init() {
  $("course").onchange = onCourse;
  $("exp").onchange = draw;
  $("sid").addEventListener("input", onId);
  $("sid").addEventListener("blur", () => { if ($("sid").value) onId(); });
  $("asave").onclick = save; $("areset").onclick = reset; $("alock").onclick = lockPanel;

  if (CFG.FIREBASE) {
    $("lockText").textContent = "Admin access requires a one-time sign-in link emailed to the administrator's address. You have " + CFG.OTP_SECONDS / 60 + " minutes to use it.";
    $("sendOtp").textContent = "Email me a sign-in link";
    $("sendOtp").onclick = fbSend;
    applyData();
    try {
      const v = "10.12.2";
      await loadScript(`https://www.gstatic.com/firebasejs/${v}/firebase-app-compat.js`);
      await Promise.all([loadScript(`https://www.gstatic.com/firebasejs/${v}/firebase-auth-compat.js`),
                         loadScript(`https://www.gstatic.com/firebasejs/${v}/firebase-firestore-compat.js`)]);
      firebase.initializeApp(CFG.FIREBASE);
      auth = firebase.auth(); db = firebase.firestore();
      const href = location.href, isLink = auth.isSignInWithEmailLink(href);
      if (!isLink) await auth.signOut();                     /* every visit needs a fresh sign-in */
      loadRemote();
      if (isLink) {
        const t = +new URLSearchParams(location.search).get("adm");
        history.replaceState(null, "", location.pathname);
        $("adm").open = true;
        if (!t || Date.now() - t > CFG.OTP_SECONDS * 1000) {
          $("otpMsg").textContent = "That link is older than " + CFG.OTP_SECONDS / 60 + " minutes and was rejected. Request a new one.";
        } else {
          try {
            const r = await auth.signInWithEmailLink(CFG.ADMIN_EMAIL, href);
            if (r.user.email === CFG.ADMIN_EMAIL) showPanel();
            else { await auth.signOut(); $("otpMsg").textContent = "Not the admin account."; }
          } catch (e) { $("otpMsg").textContent = "Sign-in failed: " + e.message; }
        }
      }
    } catch (e) {
      console.warn("Firebase failed to load; using file data.", e);
      $("otpMsg").textContent = "Could not reach Firebase. Admin is unavailable right now.";
    }
  } else {
    $("lockText").textContent = "Admin access requires a one-time code emailed to the administrator's address. You have " + CFG.OTP_SECONDS / 60 + " minutes to enter it.";
    $("sendOtp").onclick = ejSend; $("resendOtp").onclick = ejSend; $("checkOtp").onclick = ejCheck;
    loadLocal();
  }
}
init();
})();
