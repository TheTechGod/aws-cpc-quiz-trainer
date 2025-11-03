/* ========================================================
   AWS CPC QUIZ TRAINER — v7.0 Stable
   Author: Geoffrey D. Metzger | Integrity Programming
   ========================================================
   - Multi-domain filtering (checkboxes). If none checked → All.
   - Shuffled questions + options
   - Multi-answer support with partial credit
   - Timer + avg time/question
   - Progress bar
   - Review screen + Retake Missed
   - Progress Dashboard (localStorage; last 20 sessions)
   ======================================================== */

/* -----------------------------
   ELEMENTS
----------------------------- */
const el = (id) => document.getElementById(id);

const startBtn = el("start-btn");
const restartBtn = el("restart-btn");

const startScreen   = el("start-screen");
const quizScreen    = el("quiz-screen");
const resultScreen  = el("result-screen");
const reviewScreen  = el("review-screen");
const progressScreen= el("progress-screen");

const nextBtn = el("next-btn");
const questionText = el("question-text");
const optionsList = el("options");
const timerDisplay = el("timer");
const questionNumberDisplay = el("question-number");

const scoreSummary = el("score-summary");
const domainTable  = el("domain-stats");

const reviewBtn = el("review-btn");
const reviewContainer = el("review-container");
const backToResultsBtn = el("back-to-results-btn");

const progressBtn = el("progress-btn");
const backToResultsFromProgress = el("back-to-results-from-progress");

const totalQuizzesEl = el("total-quizzes");
const avgScoreEl     = el("avg-score");
const bestDomainEl   = el("best-domain");
const lastSessionEl  = el("last-session");
const historyList    = el("history-list");
const resetProgressBtn = el("reset-progress-btn");

/* -----------------------------
   STATE
----------------------------- */
let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let questionCount = 5;
let userAnswers = [];
let domainStats = {};

let selectedDomains = [];        // from checkboxes
let startTime = 0;
let endTime = 0;
let questionStartTime = 0;
let timerInterval = null;

const STORAGE_KEY = "awsProgress";

/* -----------------------------
   HELPERS
----------------------------- */
const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);
const fadeSwap = (hide, show) => { hide.classList.add("hidden"); show.classList.remove("hidden"); };
const norm = (s) => String(s).replace(/\s+/g, " ").trim();

const lsLoad = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
const lsSave = (history) => localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-20)));
const saveResult = (result) => { const h = lsLoad(); h.push(result); lsSave(h); };

/* -----------------------------
   DOMAIN FILTER (no “All Domains”)
----------------------------- */
function getSelectedDomains() {
  const checks = Array.from(document.querySelectorAll(".domain-check"));
  const checked = checks.filter(cb => cb.checked).map(cb => cb.value);
  // If user didn’t select anything, treat as ALL domains
  return checked.length ? checked : Array.from(new Set(questions.map(q => q.domain)));
}

/* -----------------------------
   PROGRESS BAR
----------------------------- */
(function mountProgressBar() {
  const status = document.getElementById("quiz-status");
  if (!status) return;
  const bar = document.createElement("div");
  bar.id = "progress-bar";
  bar.style.height = "8px";
  bar.style.background = "#2b3240";
  bar.style.borderRadius = "4px";
  bar.style.overflow = "hidden";
  bar.style.marginTop = "10px";

  const fill = document.createElement("div");
  fill.id = "progress-fill";
  fill.style.height = "100%";
  fill.style.width = "0%";
  fill.style.background = "linear-gradient(90deg, #3b82f6, #10b981)";
  fill.style.transition = "width 0.3s ease";

  bar.appendChild(fill);
  status.after(bar);
})();

const progressFill = document.getElementById("progress-fill");

/* -----------------------------
   START QUIZ
----------------------------- */
function startQuiz() {
  // Read selections
  selectedDomains = getSelectedDomains();

  const countInput = document.querySelector('input[name="count"]:checked');
  questionCount = parseInt(countInput?.value || "5", 10);

  const pool = questions.filter(q => selectedDomains.includes(q.domain));
  if (!pool.length) {
    alert("No questions found for your selection.");
    return;
  }

  // Build quiz set
  quizQuestions = shuffleArray(pool).slice(0, Math.min(pool.length, questionCount));

  // Reset state
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  domainStats = {};
  progressFill.style.width = "0%";

  // Timer
  clearInterval(timerInterval);
  startTime = Date.now();
  questionStartTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
  timerDisplay.textContent = "Time: 00:00";

  fadeSwap(startScreen, quizScreen);
  renderQuestion();
}

if (startBtn) startBtn.addEventListener("click", startQuiz);

/* -----------------------------
   TIMER
----------------------------- */
function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const m = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const s = String(elapsed % 60).padStart(2, "0");
  timerDisplay.textContent = `Time: ${m}:${s}`;
}

/* -----------------------------
   RENDER QUESTION
----------------------------- */
function renderQuestion() {
  const q = quizQuestions[currentQuestionIndex];
  if (!q) return;

  const idxLabel = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
  questionNumberDisplay.textContent = idxLabel;

  // progress %
  progressFill.style.width = `${(currentQuestionIndex / quizQuestions.length) * 100}%`;

  const shortId = q.id?.toString().includes("_") ? q.id.split("_")[1] : q.id;
  questionText.textContent = `${shortId}. ${q.question}`;

  // build options
  optionsList.innerHTML = "";
  const isMulti = Array.isArray(q.answer);
  const opts = shuffleArray(q.options);

  opts.forEach((opt, i) => {
    const id = `opt-${currentQuestionIndex}-${i}`;
    const li = document.createElement("li");

    const input = document.createElement("input");
    input.type = isMulti ? "checkbox" : "radio";
    input.name = "option";
    input.value = opt;
    input.id = id;

    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.textContent = opt;

    li.appendChild(input);
    li.appendChild(label);
    optionsList.appendChild(li);
  });

  nextBtn.disabled = false;
  nextBtn.textContent = "Submit";
  nextBtn.onclick = () => gradeCurrent(q);
  questionStartTime = Date.now();
}

/* -----------------------------
   GRADE CURRENT QUESTION
----------------------------- */
function gradeCurrent(q) {
  const isMulti = Array.isArray(q.answer);
  const inputs = Array.from(optionsList.querySelectorAll("input"));
  const picked = inputs.filter(i => i.checked).map(i => norm(i.value));

  if (picked.length === 0) {
    alert(isMulti ? "Select one or more answers, then submit." : "Select an answer, then submit.");
    return;
  }

  const correct = isMulti ? q.answer.map(norm) : [norm(q.answer)];

  // Update domain stats
  const d = q.domain;
  if (!domainStats[d]) domainStats[d] = { correct: 0, total: 0 };
  domainStats[d].total += 1;

  // Partial credit scoring
  const selectedCorrect = picked.filter(v => correct.includes(v)).length;
  const questionScore = selectedCorrect / correct.length;
  score += questionScore;
  domainStats[d].correct += questionScore;

  // Visual feedback
  optionsList.querySelectorAll("li").forEach(li => {
    const val = norm(li.querySelector("input").value);
    if (correct.includes(val)) li.classList.add("correct");
    if (picked.includes(val) && !correct.includes(val)) li.classList.add("incorrect");
    li.querySelector("input").disabled = true;
  });

  userAnswers.push({
    id: q.id,
    question: q.question,
    yourAnswer: picked.join("; "),
    correctAnswer: correct.join("; "),
    explanation: q.explanation || "No explanation provided.",
    correct: questionScore === 1
  });

  // Next step
  const last = currentQuestionIndex + 1 === quizQuestions.length;
  progressFill.style.width = `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`;

  nextBtn.textContent = last ? "Finish Quiz" : "Next Question";
  nextBtn.onclick = () => {
    if (last) showResults();
    else { currentQuestionIndex += 1; renderQuestion(); }
  };
}

/* -----------------------------
   RESULTS
----------------------------- */
function showResults() {
  clearInterval(timerInterval);
  endTime = Date.now();

  const totalDuration = (endTime - startTime) / 1000;
  const avg = (totalDuration / quizQuestions.length).toFixed(1);
  const pct = ((score / quizQuestions.length) * 100).toFixed(1);

  // best domain
  const best = Object.keys(domainStats).length
    ? Object.keys(domainStats).reduce((a, b) =>
        (domainStats[a].correct / domainStats[a].total) >
        (domainStats[b].correct / domainStats[b].total) ? a : b)
    : "N/A";

  saveResult({
    date: new Date().toLocaleString(),
    score: Number(pct),
    totalQuestions: quizQuestions.length,
    bestDomain: best,
    time: totalDuration.toFixed(1),
    domains: domainStats
  });

  scoreSummary.innerHTML = `
    <p>Score: ${score.toFixed(1)} / ${quizQuestions.length} (${pct}%)</p>
    <p>Total Time: ${totalDuration.toFixed(1)}s</p>
    <p>Avg per Question: ${avg}s</p>
  `;

  // domain table
  domainTable.innerHTML = `<tr><th>Domain</th><th>Correct</th><th>Total</th><th>%</th></tr>`;
  Object.entries(domainStats).forEach(([name, stats]) => {
    const p = ((stats.correct / stats.total) * 100).toFixed(1);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${name}</td>
      <td>${stats.correct.toFixed(1)}</td>
      <td>${stats.total}</td>
      <td>${p}%</td>
    `;
    domainTable.appendChild(tr);
  });

  // ensure retake button present
  let retakeBtn = document.getElementById("retake-btn");
  if (!retakeBtn) {
    retakeBtn = document.createElement("button");
    retakeBtn.id = "retake-btn";
    retakeBtn.className = "warning-btn";
    retakeBtn.textContent = "Retake Missed Questions";
    const group = resultScreen.querySelector(".btn-group");
    if (group) group.insertBefore(retakeBtn, group.firstChild);
    retakeBtn.addEventListener("click", retakeMissed);
  }

  fadeSwap(quizScreen, resultScreen);
}

/* -----------------------------
   REVIEW
----------------------------- */
function renderReview() {
  reviewContainer.innerHTML = "";
  userAnswers.forEach((a, i) => {
    const div = document.createElement("div");
    div.className = "review-item";
    div.innerHTML = `
      <h4>${i + 1}. ${a.question}</h4>
      <p><strong>Your Answer:</strong> <span class="${a.correct ? "correct" : "incorrect"}">${a.yourAnswer || "—"}</span></p>
      <p><strong>Correct Answer:</strong> ${a.correctAnswer}</p>
      <p><strong>Explanation:</strong> ${a.explanation}</p>
      <hr/>
    `;
    reviewContainer.appendChild(div);
  });
}

reviewBtn?.addEventListener("click", () => { renderReview(); fadeSwap(resultScreen, reviewScreen); });
backToResultsBtn?.addEventListener("click", () => fadeSwap(reviewScreen, resultScreen));

/* -----------------------------
   RETAKE MISSED
----------------------------- */
function retakeMissed() {
  const missedIds = userAnswers.filter(a => !a.correct).map(a => a.id);
  if (!missedIds.length) { alert("No missed questions to retake!"); return; }

  quizQuestions = questions.filter(q => missedIds.includes(q.id));
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  domainStats = {};
  progressFill.style.width = "0%";

  clearInterval(timerInterval);
  startTime = Date.now();
  questionStartTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
  timerDisplay.textContent = "Time: 00:00";

  fadeSwap(resultScreen, quizScreen);
  renderQuestion();
}

/* -----------------------------
   PROGRESS DASHBOARD
----------------------------- */
progressBtn?.addEventListener("click", () => { renderProgress(); fadeSwap(resultScreen, progressScreen); });
backToResultsFromProgress?.addEventListener("click", () => fadeSwap(progressScreen, resultScreen));

resetProgressBtn?.addEventListener("click", () => {
  if (confirm("This will erase all saved progress. Continue?")) {
    localStorage.removeItem(STORAGE_KEY);
    renderProgress();
  }
});

function renderProgress() {
  const history = lsLoad();

  if (!history.length) {
    totalQuizzesEl.textContent = 0;
    avgScoreEl.textContent = "0%";
    bestDomainEl.textContent = "N/A";
    lastSessionEl.textContent = "—";
    historyList.innerHTML = "<li>No quiz data yet. Take a quiz to see your progress!</li>";
    return;
  }

  const total = history.length;
  const avg = (history.reduce((s, h) => s + h.score, 0) / total).toFixed(1);
  const last = history[history.length - 1];

  // aggregate domains
  const agg = {};
  history.forEach(h => {
    const d = h.domains || {};
    Object.keys(d).forEach(name => {
      const { correct, total } = d[name];
      if (!agg[name]) agg[name] = { c: 0, t: 0 };
      agg[name].c += correct;
      agg[name].t += total;
    });
  });

  let best = "N/A", bestRate = 0;
  Object.keys(agg).forEach(k => {
    const r = agg[k].c / agg[k].t;
    if (r > bestRate) { bestRate = r; best = k; }
  });

  totalQuizzesEl.textContent = total;
  avgScoreEl.textContent = `${avg}%`;
  bestDomainEl.textContent = best;
  lastSessionEl.textContent = `${last.date} — ${last.score}%`;

  historyList.innerHTML = "";
  history.slice(-5).reverse().forEach(h => {
    const li = document.createElement("li");
    li.textContent = `${h.date} — ${h.score}% (${h.bestDomain || "N/A"})`;
    historyList.appendChild(li);
  });
}

/* -----------------------------
   RESTART
----------------------------- */
restartBtn?.addEventListener("click", () => {
  quizQuestions = [];
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  clearInterval(timerInterval);
  timerDisplay.textContent = "Time: 00:00";
  questionNumberDisplay.textContent = "";
  progressFill.style.width = "0%";
  fadeSwap(resultScreen, startScreen);
});

/* -----------------------------
   QUALITY-OF-LIFE
----------------------------- */
// Start with Enter on start screen
document.addEventListener("keydown", (e) => {
  if (!startScreen.classList.contains("hidden") && e.key === "Enter") {
    e.preventDefault(); startQuiz();
  }
});
