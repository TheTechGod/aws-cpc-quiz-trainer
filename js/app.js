// ========================================================
// AWS CPC QUIZ TRAINER v5.4 — Visual Dashboard Edition
// Author: Geoffrey D. Metzger | Integrity Programming
// ========================================================
//
// Features:
// - Multi-answer questions (checkboxes) + partial credit
// - Shuffled questions and options
// - Timer + avg per question
// - Review mode (answers + explanations)
// - Retake Missed Questions
// - Progress Dashboard (history, averages, best domain)
// - Mini bar chart (last 5 scores) with color coding
// - LocalStorage persistence (last 20 sessions)
// ========================================================


// --------------------------------------------------------
// ELEMENT REFERENCES
// --------------------------------------------------------
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const reviewScreen = document.getElementById("review-screen");
const progressScreen = document.getElementById("progress-screen");

const nextBtn = document.getElementById("next-btn");
const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options");
const timerDisplay = document.getElementById("timer");

const scoreSummary = document.getElementById("score-summary");
const domainTable = document.getElementById("domain-stats");

const reviewBtn = document.getElementById("review-btn");
const reviewContainer = document.getElementById("review-container");
const backToResultsBtn = document.getElementById("back-to-results-btn");

const progressBtn = document.getElementById("progress-btn");
const backToResultsFromProgress = document.getElementById("back-to-results-from-progress");

// Progress metrics
const totalQuizzesEl = document.getElementById("total-quizzes");
const avgScoreEl = document.getElementById("avg-score");
const bestDomainEl = document.getElementById("best-domain");
const lastSessionEl = document.getElementById("last-session");
const historyList = document.getElementById("history-list");

// Optional (only if you add the button in HTML)
const resetProgressBtn = document.getElementById("reset-progress-btn");

// --------------------------------------------------------
// STATE
// --------------------------------------------------------
let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0; // fractional (partial credit)
let selectedDomains = [];
let questionCount = 5;
let userAnswers = []; // per-question review payload

let startTime, endTime, totalTime = 0, questionStartTime;
let domainStats = {}; // { [domain]: { correct: number, total: number } }
let timerInterval;

// Dynamic “Retake Missed” button (inserted on results screen)
const retakeBtn = document.createElement("button");
retakeBtn.id = "retake-btn";
retakeBtn.textContent = "Retake Missed Questions";
retakeBtn.className = "warning-btn";

// --------------------------------------------------------
// HELPERS
// --------------------------------------------------------
const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);
const fadeSwap = (hide, show) => { hide.classList.add("hidden"); show.classList.remove("hidden"); };
const norm = (s) => String(s).replace(/\s+/g, " ").trim();

// LocalStorage helpers (keep last 20 sessions)
const STORAGE_KEY = "awsProgress";
function loadHistory() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}
function saveHistory(history) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-20)));
}
function saveCurrentResultToHistory(result) {
  const history = loadHistory();
  history.push(result);
  saveHistory(history);
}

// --------------------------------------------------------
// START QUIZ
// --------------------------------------------------------
startBtn.addEventListener("click", () => {
  resultScreen.classList.add("hidden");

  // Domain selection (supports radios or checkboxes if you switch later)
  selectedDomains = Array.from(document.querySelectorAll('input[name="domain"]:checked'))
    .map(el => el.value);
  if (!selectedDomains.length) selectedDomains = ["All"];

  // Question count
  const countInput = document.querySelector('input[name="count"]:checked');
  questionCount = parseInt(countInput?.value || "5", 10);

  // Filter pool
  const pool = selectedDomains.includes("All")
    ? [...questions]
    : questions.filter(q => selectedDomains.includes(q.domain));

  if (!pool.length) {
    alert("No questions found for your selection.");
    return;
  }

  // Shuffle + slice
  quizQuestions = shuffleArray(pool).slice(0, Math.min(pool.length, questionCount));

  // Reset session state
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  domainStats = {};
  totalTime = 0;

  // Timer
  startTime = Date.now();
  questionStartTime = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);

  fadeSwap(startScreen, quizScreen);
  showQuestion();
});

// --------------------------------------------------------
// TIMER
// --------------------------------------------------------
function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  timerDisplay.textContent = `Time: ${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// --------------------------------------------------------
// RENDER QUESTION
// --------------------------------------------------------
function showQuestion() {
  const q = quizQuestions[currentQuestionIndex];
  questionText.textContent = q.question;
  optionsList.innerHTML = "";

  const isMulti = Array.isArray(q.answer);
  const correctAnswers = isMulti ? q.answer.map(norm) : [norm(q.answer)];
  const shuffledOptions = shuffleArray([...q.options]);

  shuffledOptions.forEach((opt, idx) => {
    const id = `opt-${currentQuestionIndex}-${idx}`;
    const li = document.createElement("li");

    const input = document.createElement("input");
    input.type = isMulti ? "checkbox" : "radio";
    input.name = "option";
    input.value = opt;
    input.id = id;

    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.textContent = opt;

    // Click row to toggle (don’t double-toggle if clicking the input)
    li.addEventListener("click", (e) => { if (e.target !== input) input.checked = !input.checked; });

    li.appendChild(input);
    li.appendChild(label);
    optionsList.appendChild(li);
  });

  nextBtn.textContent = "Submit";
  nextBtn.disabled = false;
  nextBtn.onclick = () => gradeAnswer(q);
  questionStartTime = Date.now();
}

// --------------------------------------------------------
// GRADE ANSWER (supports partial credit for multi-answer)
// --------------------------------------------------------
function gradeAnswer(q) {
  const inputs = Array.from(optionsList.querySelectorAll("input"));
  const selectedVals = inputs.filter(i => i.checked).map(i => norm(i.value));
  const isMulti = Array.isArray(q.answer);
  const correctAnswers = isMulti ? q.answer.map(norm) : [norm(q.answer)];

  if (selectedVals.length === 0) {
    alert(isMulti ? "Select one or more answers, then submit." : "Select an answer, then submit.");
    return;
  }

  // Timing
  const elapsed = (Date.now() - questionStartTime) / 1000;
  totalTime += elapsed;

  // Domain stats
  const domain = q.domain;
  if (!domainStats[domain]) domainStats[domain] = { correct: 0, total: 0 };
  domainStats[domain].total++;

  // Partial credit = (# selected that are correct) / (# correct total)
  const selectedCorrect = selectedVals.filter(v => correctAnswers.includes(v)).length;
  const questionScore = selectedCorrect / correctAnswers.length;

  score += questionScore;
  domainStats[domain].correct += questionScore;

  // Visual feedback
  optionsList.querySelectorAll("li").forEach(li => {
    const val = norm(li.querySelector("input").value);
    if (correctAnswers.includes(val)) li.classList.add("correct");
    if (selectedVals.includes(val) && !correctAnswers.includes(val)) li.classList.add("incorrect");
    li.querySelector("input").disabled = true;
  });

  const fullCorrect = questionScore === 1;

  // Store for review
  userAnswers.push({
    question: q.question,
    yourAnswer: selectedVals.join("; "),
    correctAnswer: correctAnswers.join("; "),
    explanation: q.explanation || "No explanation provided.",
    correct: fullCorrect
  });

  // Next/Finish
  nextBtn.textContent = (currentQuestionIndex + 1 === quizQuestions.length) ? "Finish Quiz" : "Next Question";
  nextBtn.onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) showQuestion();
    else showResults();
  };
}

// --------------------------------------------------------
// RESULTS
// --------------------------------------------------------
function showResults() {
  clearInterval(timerInterval);

  endTime = Date.now();
  const totalDuration = (endTime - startTime) / 1000;
  const avgTime = (totalDuration / quizQuestions.length).toFixed(1);
  const percentage = ((score / quizQuestions.length) * 100).toFixed(1);

  // Save to history
  const bestDomain = Object.keys(domainStats).length
    ? Object.keys(domainStats).reduce((a, b) => (
        (domainStats[a].correct / domainStats[a].total) >
        (domainStats[b].correct / domainStats[b].total) ? a : b
      ))
    : "N/A";

  saveCurrentResultToHistory({
    date: new Date().toLocaleString(),
    score: parseFloat(percentage),
    totalQuestions: quizQuestions.length,
    bestDomain,
    time: totalDuration.toFixed(1),
    domains: domainStats
  });

  // Render summary
  scoreSummary.innerHTML = `
    <p>Score: ${score.toFixed(1)} / ${quizQuestions.length} (${percentage}%)</p>
    <p>Total Time: ${totalDuration.toFixed(1)}s</p>
    <p>Avg per Question: ${avgTime}s</p>
  `;

  // Domain table
  domainTable.innerHTML = `<tr><th>Domain</th><th>Correct</th><th>Total</th><th>%</th></tr>`;
  Object.keys(domainStats).forEach(domain => {
    const stats = domainStats[domain];
    const pct = ((stats.correct / stats.total) * 100).toFixed(1);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${domain}</td>
      <td>${stats.correct.toFixed(1)}</td>
      <td>${stats.total}</td>
      <td>${pct}%</td>
    `;
    domainTable.appendChild(row);
  });

  // Attach Retake Missed (once)
  const btnRow = scoreSummary.parentElement;
  if (!document.getElementById("retake-btn")) {
    btnRow.insertBefore(retakeBtn, restartBtn);
    retakeBtn.addEventListener("click", retakeMissed);
  }

  // Swap screens
  fadeSwap(quizScreen, resultScreen);
}

// --------------------------------------------------------
// REVIEW MODE
// --------------------------------------------------------
function renderReview() {
  reviewContainer.innerHTML = "";
  userAnswers.forEach((a, i) => {
    const div = document.createElement("div");
    div.classList.add("review-item");
    div.innerHTML = `
      <h4>${i + 1}. ${a.question}</h4>
      <p><strong>Your Answer:</strong> <span class="${a.correct ? "correct" : "incorrect"}">${a.yourAnswer || "—"}</span></p>
      <p><strong>Correct Answer:</strong> ${a.correctAnswer}</p>
      <p><strong>Explanation:</strong> ${a.explanation}</p>
      <hr>
    `;
    reviewContainer.appendChild(div);
  });
}

reviewBtn?.addEventListener("click", () => {
  renderReview();
  fadeSwap(resultScreen, reviewScreen);
});

backToResultsBtn?.addEventListener("click", () => fadeSwap(reviewScreen, resultScreen));

// --------------------------------------------------------
// RETAKE MISSED
// --------------------------------------------------------
function retakeMissed() {
  const missedQuestions = userAnswers.filter(a => !a.correct).map(a => a.question);
  if (!missedQuestions.length) {
    alert("No missed questions to retake!");
    return;
  }

  quizQuestions = questions.filter(q => missedQuestions.includes(q.question));

  // Reset session
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  domainStats = {};
  totalTime = 0;

  // Timer for new round
  startTime = Date.now();
  questionStartTime = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);

  fadeSwap(resultScreen, quizScreen);
  showQuestion();
}

// --------------------------------------------------------
// PROGRESS DASHBOARD
// --------------------------------------------------------
progressBtn?.addEventListener("click", () => {
  renderProgress();
  fadeSwap(resultScreen, progressScreen);
});

backToResultsFromProgress?.addEventListener("click", () => fadeSwap(progressScreen, resultScreen));

resetProgressBtn?.addEventListener("click", () => {
  if (confirm("This will erase all saved progress. Continue?")) {
    localStorage.removeItem(STORAGE_KEY);
    renderProgress();
  }
});

function renderProgress() {
  const history = loadHistory();

  if (!history.length) {
    totalQuizzesEl.textContent = 0;
    avgScoreEl.textContent = "0%";
    bestDomainEl.textContent = "N/A";
    lastSessionEl.textContent = "—";
    historyList.innerHTML = "<li>No quiz data yet. Take a quiz to see your progress!</li>";
    renderChart([]); // clears
    return;
  }

  const total = history.length;
  const avg = (history.reduce((sum, h) => sum + h.score, 0) / total).toFixed(1);
  const last = history[history.length - 1];

  // Aggregate best domain across all time
  const domainAgg = {};
  history.forEach(h => {
    const d = h.domains || {};
    Object.keys(d).forEach(name => {
      const { correct, total } = d[name];
      if (!domainAgg[name]) domainAgg[name] = { c: 0, t: 0 };
      domainAgg[name].c += correct;
      domainAgg[name].t += total;
    });
  });

  let bestDomain = "N/A";
  let bestRate = 0;
  Object.keys(domainAgg).forEach(name => {
    const rate = domainAgg[name].c / domainAgg[name].t;
    if (rate > bestRate) { bestRate = rate; bestDomain = name; }
  });

  totalQuizzesEl.textContent = total;
  avgScoreEl.textContent = `${avg}%`;
  bestDomainEl.textContent = bestDomain;
  lastSessionEl.textContent = `${last.date} — ${last.score}%`;

  // Recent sessions list (last 5)
  historyList.innerHTML = "";
  history.slice(-5).reverse().forEach(h => {
    const li = document.createElement("li");
    li.textContent = `${h.date} — ${h.score}% (${h.bestDomain || "N/A"})`;
    historyList.appendChild(li);
  });

  renderChart(history);
}

// Mini bar chart for last 5 scores
function renderChart(history) {
  const chartContainer = document.getElementById("chart-bars");
  if (!chartContainer) return;

  chartContainer.innerHTML = "";

  const lastFive = history.slice(-5);
  lastFive.forEach(h => {
    const bar = document.createElement("div");
    bar.classList.add("chart-bar");

    // Color coding by performance
    if (h.score < 60) bar.classList.add("bar--bad");
    else if (h.score < 80) bar.classList.add("bar--ok");
    else bar.classList.add("bar--good");

    bar.style.height = `${h.score}%`;

    const label = document.createElement("span");
    label.textContent = `${h.score}%`;
    bar.appendChild(label);

    bar.title = `${h.date} — ${h.score}%`;
    chartContainer.appendChild(bar);
  });
}

// --------------------------------------------------------
// RESTART
// --------------------------------------------------------
restartBtn.addEventListener("click", () => {
  quizQuestions = [];
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  clearInterval(timerInterval);
  timerDisplay.textContent = "Time: 00:00";
  fadeSwap(resultScreen, startScreen);
});

