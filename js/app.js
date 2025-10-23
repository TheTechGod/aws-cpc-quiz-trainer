// ========================================================
// AWS CPC QUIZ TRAINER v5.1.1 — Multi-Answer Fixes + Review
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

// Use the Review UI that already exists in your HTML
const reviewBtn = document.getElementById("review-btn"); // on Results screen
const reviewScreen = document.getElementById("review-screen");
const reviewContainer = document.getElementById("review-container");
const backToResultsBtn = document.getElementById("back-to-results-btn");

// -------- State
let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0; // now allows partial credit
let selectedDomains = [];
let questionCount = 5;
let userAnswers = [];

let startTime, endTime, totalTime = 0, questionStartTime;
let domainStats = {}; // { [domain]: { correct: <sum of partial>, total: <number of questions> } }
let timerInterval;

// -------- Helpers
const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);
const fadeSwap = (hide, show) => { hide.classList.add("hidden"); show.classList.remove("hidden"); };
const norm = (s) => String(s).replace(/\s+/g, " ").trim();

// -------- Start Quiz
startBtn.addEventListener("click", () => {
  resultScreen.classList.add("hidden");

  // collect domain selections (radios or checkboxes depending on your HTML)
  selectedDomains = Array.from(
    document.querySelectorAll('input[name="domain"]:checked')
  ).map(el => el.value);
  if (!selectedDomains.length) selectedDomains = ["All"];

  const countInput = document.querySelector('input[name="count"]:checked');
  questionCount = parseInt(countInput.value, 10);

  // filter question pool
  quizQuestions = selectedDomains.includes("All")
    ? [...questions]
    : questions.filter(q => selectedDomains.includes(q.domain));

  if (!quizQuestions.length) return alert("No questions found for your selection.");

  if (quizQuestions.length < questionCount) questionCount = quizQuestions.length;
  quizQuestions = shuffleArray(quizQuestions).slice(0, questionCount);

  // reset session
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  domainStats = {};
  totalTime = 0;

  // timer
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

// -------- Show Question (auto checkbox for multi-answer)
function showQuestion() {
  const q = quizQuestions[currentQuestionIndex];
  questionText.textContent = q.question;
  optionsList.innerHTML = "";

  const multi = Array.isArray(q.answer);               // multi-answer?
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

    // Make the whole row feel clickable
    li.addEventListener("click", (e) => {
      // don't double-toggle when clicking the checkbox itself
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

// -------- Grade (partial credit for multi)
function gradeAnswer(q) {
  const inputs = Array.from(optionsList.querySelectorAll("input"));
  const selectedVals = inputs.filter(i => i.checked).map(i => norm(i.value));
  const isMulti = Array.isArray(q.answer);
  const correctAnswers = isMulti ? q.answer.map(norm) : [norm(q.answer)];

  if (selectedVals.length === 0) {
    alert(isMulti ? "Select one or more answers, then submit." : "Select an answer, then submit.");
    return;
  }

  // timing
  const elapsed = (Date.now() - questionStartTime) / 1000;
  totalTime += elapsed;

  // domain stats scaffold
  const currentDomain = q.domain;
  if (!domainStats[currentDomain]) domainStats[currentDomain] = { correct: 0, total: 0 };
  domainStats[currentDomain].total++;

  // partial credit: (# of correct choices the user selected) / (# of correct choices)
  const selectedCorrectCount = selectedVals.filter(v => correctAnswers.includes(v)).length;
  const questionScore = selectedCorrectCount / correctAnswers.length;

  // add to overall score + per-domain score
  score += questionScore;
  domainStats[currentDomain].correct += questionScore;

  // visual feedback
  optionsList.querySelectorAll("li").forEach(li => {
    const val = norm(li.querySelector("input").value);
    if (correctAnswers.includes(val)) li.classList.add("correct");        // show all correct
    if (selectedVals.includes(val) && !correctAnswers.includes(val)) {
      li.classList.add("incorrect");                                      // show wrong picks
    }
    li.querySelector("input").disabled = true;
  });

  // store for review screen
  userAnswers.push({
    question: q.question,
    yourAnswer: selectedVals.join("; "),
    correctAnswer: correctAnswers.join("; "),
    explanation: q.explanation || "No explanation provided.",
    correct: questionScore === 1
  });

  // advance button
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
}

// -------- Review (uses your existing review screen)
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
