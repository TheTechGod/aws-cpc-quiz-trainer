// ========================================================
// AWS CPC QUIZ TRAINER v5.3 — Progress Dashboard Edition
// Author: Geoffrey D. Metzger | Integrity Programming
// ========================================================

// -------- Elements
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const nextBtn = document.getElementById("next-btn");
const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options");
const timerDisplay = document.getElementById("timer");
const scoreSummary = document.getElementById("score-summary");
const domainTable = document.getElementById("domain-stats");
const reviewBtn = document.getElementById("review-btn");
const reviewScreen = document.getElementById("review-screen");
const reviewContainer = document.getElementById("review-container");
const backToResultsBtn = document.getElementById("back-to-results-btn");

// NEW: Progress Dashboard elements
const progressBtn = document.getElementById("progress-btn");
const progressScreen = document.getElementById("progress-screen");
const backToResultsFromProgress = document.getElementById("back-to-results-from-progress");
const totalQuizzesEl = document.getElementById("total-quizzes");
const avgScoreEl = document.getElementById("avg-score");
const bestDomainEl = document.getElementById("best-domain");
const lastSessionEl = document.getElementById("last-session");
const historyList = document.getElementById("history-list");

// NEW: Retake Button
const retakeBtn = document.createElement("button");
retakeBtn.id = "retake-btn";
retakeBtn.textContent = "Retake Missed Questions";
retakeBtn.style.background = "#f59e0b";
retakeBtn.style.color = "#fff";
retakeBtn.style.border = "none";
retakeBtn.style.padding = "0.75rem 1.25rem";
retakeBtn.style.borderRadius = "8px";
retakeBtn.style.cursor = "pointer";
retakeBtn.style.fontWeight = "600";
retakeBtn.style.marginRight = "0.5rem";

// -------- State
let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedDomains = [];
let questionCount = 5;
let userAnswers = [];
let startTime, endTime, totalTime = 0, questionStartTime;
let domainStats = {};
let timerInterval;

// -------- Helpers
const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);
const fadeSwap = (hide, show) => { hide.classList.add("hidden"); show.classList.remove("hidden"); };
const norm = (s) => String(s).replace(/\s+/g, " ").trim();

// -------- Local Storage Helpers (now tracks history)
function saveStats(resultData) {
  const history = JSON.parse(localStorage.getItem("awsProgress") || "[]");
  history.push(resultData);
  localStorage.setItem("awsProgress", JSON.stringify(history.slice(-10))); // Keep last 10
}

function loadStats() {
  return JSON.parse(localStorage.getItem("awsProgress")) || [];
}

// -------- Start Quiz
startBtn.addEventListener("click", () => {
  resultScreen.classList.add("hidden");

  selectedDomains = Array.from(document.querySelectorAll('input[name="domain"]:checked')).map(el => el.value);
  if (!selectedDomains.length) selectedDomains = ["All"];

  const countInput = document.querySelector('input[name="count"]:checked');
  questionCount = parseInt(countInput.value, 10);

  quizQuestions = selectedDomains.includes("All")
    ? [...questions]
    : questions.filter(q => selectedDomains.includes(q.domain));

  if (!quizQuestions.length) return alert("No questions found for your selection.");
  if (quizQuestions.length < questionCount) questionCount = quizQuestions.length;
  quizQuestions = shuffleArray(quizQuestions).slice(0, questionCount);

  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  domainStats = {};
  totalTime = 0;

  startTime = Date.now();
  questionStartTime = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);

  fadeSwap(startScreen, quizScreen);
  showQuestion();
});

// -------- Timer
function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  timerDisplay.textContent = `Time: ${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// -------- Show Question
function showQuestion() {
  const q = quizQuestions[currentQuestionIndex];
  questionText.textContent = q.question;
  optionsList.innerHTML = "";

  const multi = Array.isArray(q.answer);
  const correctAnswers = multi ? q.answer.map(norm) : [norm(q.answer)];
  const shuffledOptions = shuffleArray([...q.options]);

  shuffledOptions.forEach((opt, idx) => {
    const id = `opt-${currentQuestionIndex}-${idx}`;
    const li = document.createElement("li");
    const input = document.createElement("input");
    input.type = multi ? "checkbox" : "radio";
    input.name = "option";
    input.value = opt;
    input.id = id;

    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.textContent = opt;

    li.addEventListener("click", (e) => {
      if (e.target !== input) input.checked = !input.checked;
    });

    li.appendChild(input);
    li.appendChild(label);
    optionsList.appendChild(li);
  });

  nextBtn.textContent = "Submit";
  nextBtn.disabled = false;
  nextBtn.onclick = () => gradeAnswer(q);
  questionStartTime = Date.now();
}

// -------- Grade (Multi-Answer Safe)
function gradeAnswer(q) {
  const inputs = Array.from(optionsList.querySelectorAll("input"));
  const selectedVals = inputs.filter(i => i.checked).map(i => norm(i.value));
  const isMulti = Array.isArray(q.answer);
  const correctAnswers = isMulti ? q.answer.map(norm) : [norm(q.answer)];

  if (selectedVals.length === 0) {
    alert(isMulti ? "Select one or more answers, then submit." : "Select an answer, then submit.");
    return;
  }

  const elapsed = (Date.now() - questionStartTime) / 1000;
  totalTime += elapsed;
  const currentDomain = q.domain;

  if (!domainStats[currentDomain]) domainStats[currentDomain] = { correct: 0, total: 0 };
  domainStats[currentDomain].total++;

  const selectedCorrectCount = selectedVals.filter(v => correctAnswers.includes(v)).length;
  const questionScore = selectedCorrectCount / correctAnswers.length;

  score += questionScore;
  domainStats[currentDomain].correct += questionScore;

  optionsList.querySelectorAll("li").forEach(li => {
    const val = norm(li.querySelector("input").value);
    if (correctAnswers.includes(val)) li.classList.add("correct");
    if (selectedVals.includes(val) && !correctAnswers.includes(val)) li.classList.add("incorrect");
    li.querySelector("input").disabled = true;
  });

  const wasCorrect = questionScore === 1;
  q.wasCorrect = wasCorrect;

  userAnswers.push({
    question: q.question,
    yourAnswer: selectedVals.join("; "),
    correctAnswer: correctAnswers.join("; "),
    explanation: q.explanation || "No explanation provided.",
    correct: wasCorrect
  });

  nextBtn.textContent = (currentQuestionIndex + 1 === quizQuestions.length) ? "Finish Quiz" : "Next Question";
  nextBtn.onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) showQuestion();
    else showResults();
  };
}

// -------- Results
function showResults() {
  clearInterval(timerInterval);
  fadeSwap(quizScreen, resultScreen);

  endTime = Date.now();
  const totalDuration = (endTime - startTime) / 1000;
  const avgTime = (totalDuration / quizQuestions.length).toFixed(1);
  const percentage = ((score / quizQuestions.length) * 100).toFixed(1);

  // Save result to localStorage for progress tracking
  const resultData = {
    date: new Date().toLocaleString(),
    score: parseFloat(percentage),
    totalQuestions: quizQuestions.length,
    bestDomain: Object.keys(domainStats).reduce((a, b) => (
      (domainStats[a]?.correct / domainStats[a]?.total) >
      (domainStats[b]?.correct / domainStats[b]?.total)
        ? a : b
    )),
    time: totalDuration.toFixed(1)
  };
  saveStats(resultData);

  scoreSummary.innerHTML = `
    <p>Score: ${score.toFixed(1)} / ${quizQuestions.length} (${percentage}%)</p>
    <p>Total Time: ${totalDuration.toFixed(1)}s</p>
    <p>Avg per Question: ${avgTime}s</p>
  `;

  domainTable.innerHTML = `<tr><th>Domain</th><th>Correct</th><th>Total</th><th>%</th></tr>`;
  Object.keys(domainStats).forEach(domain => {
    const stats = domainStats[domain];
    const pct = ((stats.correct / stats.total) * 100).toFixed(1);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${domain}</td>
      <td>${stats.correct.toFixed(1)}</td>
      <td>${stats.total}</td>
      <td>${pct}%</td>`;
    domainTable.appendChild(row);
  });

  const btnRow = scoreSummary.parentElement;
  if (!document.getElementById("retake-btn")) {
    btnRow.insertBefore(retakeBtn, restartBtn);
    retakeBtn.addEventListener("click", retakeMissed);
  }
}

// -------- Review
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
      <hr>`;
    reviewContainer.appendChild(div);
  });
}

reviewBtn?.addEventListener("click", () => {
  renderReview();
  fadeSwap(resultScreen, reviewScreen);
});
backToResultsBtn?.addEventListener("click", () => fadeSwap(reviewScreen, resultScreen));

// -------- Retake Missed
function retakeMissed() {
  const missed = userAnswers.filter(a => !a.correct);
  if (!missed.length) {
    alert("No missed questions to retake!");
    return;
  }
  quizQuestions = questions.filter(q =>
    missed.some(m => m.question === q.question)
  );
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  fadeSwap(resultScreen, quizScreen);
  showQuestion();
}

// -------- Progress Dashboard
progressBtn?.addEventListener("click", renderProgress);
backToResultsFromProgress?.addEventListener("click", () => fadeSwap(progressScreen, resultScreen));

function renderProgress() {
  const history = loadStats();
  if (!history.length) {
    historyList.innerHTML = "<p>No quiz data yet. Take a quiz to see your progress!</p>";
  } else {
    const avgScore = (history.reduce((a, b) => a + b.score, 0) / history.length).toFixed(1);
    const best = history.reduce((a, b) => (a.score > b.score ? a : b));
    totalQuizzesEl.textContent = history.length;
    avgScoreEl.textContent = `${avgScore}%`;
    bestDomainEl.textContent = best.bestDomain || "N/A";
    lastSessionEl.textContent = `${history[history.length - 1].date} — ${history[history.length - 1].score}%`;

    historyList.innerHTML = "";
    history.slice(-5).reverse().forEach(h => {
      const li = document.createElement("li");
      li.textContent = `${h.date} — ${h.score}% (${h.bestDomain})`;
      historyList.appendChild(li);
    });
  }
  fadeSwap(resultScreen, progressScreen);
}

// -------- Restart
restartBtn.addEventListener("click", () => {
  quizQuestions = [];
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  clearInterval(timerInterval);
  timerDisplay.textContent = "Time: 00:00";
  fadeSwap(resultScreen, startScreen);
});
