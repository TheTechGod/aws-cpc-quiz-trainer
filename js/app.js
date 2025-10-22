// ========================================================
// AWS CPC QUIZ TRAINER v4.0 — Review Mode Edition
// Author: Geoffrey D. Metzger | Integrity Programming
// ========================================================

// ======================= ELEMENT REFERENCES =======================
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const reviewScreen = document.getElementById("review-screen");

const nextBtn = document.getElementById("next-btn");
const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options");
const timerDisplay = document.getElementById("timer");
const scoreSummary = document.getElementById("score-summary");
const domainTable = document.getElementById("domain-stats");

const reviewBtn = document.getElementById("review-btn");
const backToResultsBtn = document.getElementById("back-to-results-btn");
const reviewContainer = document.getElementById("review-container");

// ======================= STATE VARIABLES =======================
let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedDomains = [];
let questionCount = 5;

// ======================= TIMER / STATS VARIABLES =======================
let startTime;
let endTime;
let totalTime = 0;
let questionStartTime;
let domainStats = {};
let timerInterval;

// ========================================================
// HELPERS
// ========================================================
function shuffleArray(arr) {
  // Randomize array order (simple Fisher-Yates)
  return arr.sort(() => Math.random() - 0.5);
}

function fadeSwap(hideEl, showEl) {
  // Smooth fade transition between screens
  hideEl.style.opacity = "0";
  setTimeout(() => {
    hideEl.classList.add("hidden");
    showEl.classList.remove("hidden");
    showEl.style.opacity = "1";
  }, 200);
}

// ========================================================
// DOMAIN SELECTION LOGIC
// ========================================================
const allBox = document.querySelector('input[name="domain"][value="All"]');
const domainBoxes = Array.from(
  document.querySelectorAll('input[name="domain"]')
).filter((b) => b.value !== "All");

// Make “All Domains” mutually exclusive
if (allBox) {
  allBox.addEventListener("change", () => {
    if (allBox.checked) domainBoxes.forEach((b) => (b.checked = false));
  });
  domainBoxes.forEach((b) => {
    b.addEventListener("change", () => {
      if (b.checked) allBox.checked = false;
    });
  });
}

// ========================================================
// START QUIZ
// ========================================================
startBtn.addEventListener("click", () => {
  resultScreen.classList.add("hidden");

  // Collect selected domains
  selectedDomains = Array.from(
    document.querySelectorAll('input[name="domain"]:checked')
  ).map((el) => el.value);

  if (selectedDomains.length === 0) selectedDomains = ["All"];

  // Get selected number of questions
  const countInput = document.querySelector('input[name="count"]:checked');
  questionCount = parseInt(countInput.value);

  // Filter questions
  quizQuestions = selectedDomains.includes("All")
    ? [...questions]
    : questions.filter((q) => selectedDomains.includes(q.domain));

  // Validate available questions
  if (quizQuestions.length === 0) {
    alert("No questions found for your selection. Try another domain.");
    return;
  }
  if (quizQuestions.length < questionCount) {
    alert(`Only ${quizQuestions.length} question(s) available. Using all.`);
    questionCount = quizQuestions.length;
  }

  // Shuffle & limit
  quizQuestions = shuffleArray(quizQuestions).slice(0, questionCount);

  // Reset state
  currentQuestionIndex = 0;
  score = 0;
  domainStats = {};
  totalTime = 0;

  // Start timer
  startTime = Date.now();
  questionStartTime = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);

  // Switch screens smoothly
  fadeSwap(startScreen, quizScreen);

  // Show first question
  showQuestion();
});

// ========================================================
// TIMER
// ========================================================
function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  timerDisplay.textContent = `Time: ${String(mins).padStart(2, "0")}:${String(
    secs
  ).padStart(2, "0")}`;
}

// ========================================================
// SHOW QUESTION
// ========================================================
function showQuestion() {
  const q = quizQuestions[currentQuestionIndex];
  questionText.textContent = q.question;
  optionsList.innerHTML = "";

  // Randomize options to prevent memorization
  const shuffledOptions = shuffleArray([...q.options]);

  shuffledOptions.forEach((opt) => {
    const li = document.createElement("li");
    li.textContent = opt;
    li.addEventListener("click", () => selectAnswer(li, q));
    optionsList.appendChild(li);
  });

  // Remove previous explanation block (no 🥕 on quiz phase)
  const oldExp = document.querySelector(".explanation");
  if (oldExp) oldExp.remove();

  nextBtn.disabled = true;
  questionStartTime = Date.now();
}

// ========================================================
// SELECT ANSWER
// ========================================================
function selectAnswer(selectedLi, q) {
  const options = document.querySelectorAll("#options li");
  options.forEach((opt) => (opt.style.pointerEvents = "none"));

  // Track user answer for review
  q.userAnswer = selectedLi.textContent;

  // Track time
  const elapsed = (Date.now() - questionStartTime) / 1000;
  totalTime += elapsed;

  // Domain tracking
  const currentDomain = q.domain;
  if (!domainStats[currentDomain])
    domainStats[currentDomain] = { correct: 0, total: 0 };
  domainStats[currentDomain].total++;

  // Correctness logic
  if (selectedLi.textContent === q.answer) {
    selectedLi.style.background = "#bbf7d0"; // green
    score++;
    domainStats[currentDomain].correct++;
  } else {
    selectedLi.style.background = "#fecaca"; // red
    options.forEach((opt) => {
      if (opt.textContent === q.answer)
        opt.style.outline = "2px solid #16a34a"; // highlight correct
    });
  }

  nextBtn.disabled = false;
}

// ========================================================
// NEXT QUESTION
// ========================================================
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
});

// ========================================================
// SHOW RESULTS
// ========================================================
function showResults() {
  clearInterval(timerInterval);
  fadeSwap(quizScreen, resultScreen);

  endTime = Date.now();
  const totalDuration = (endTime - startTime) / 1000;
  const avgTime = (totalDuration / quizQuestions.length).toFixed(1);
  const percentage = ((score / quizQuestions.length) * 100).toFixed(1);

  // Summary block
  scoreSummary.innerHTML = `
    <p>Score: ${score} / ${quizQuestions.length} (${percentage}%)</p>
    <p>Total Time: ${totalDuration.toFixed(1)}s</p>
    <p>Avg per Question: ${avgTime}s</p>
  `;

  // Domain breakdown
  domainTable.innerHTML = `
    <tr><th>Domain</th><th>Correct</th><th>Total</th><th>%</th></tr>
  `;
  Object.keys(domainStats).forEach((domain) => {
    const stats = domainStats[domain];
    const pct = ((stats.correct / stats.total) * 100).toFixed(1);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${domain}</td>
      <td>${stats.correct}</td>
      <td>${stats.total}</td>
      <td>${pct}%</td>
    `;
    domainTable.appendChild(row);
  });
}

// ========================================================
// REVIEW QUESTIONS
// ========================================================
reviewBtn.addEventListener("click", () => {
  fadeSwap(resultScreen, reviewScreen);
  renderReview();
});

function renderReview() {
  reviewContainer.innerHTML = "";

  quizQuestions.forEach((q, index) => {
    const div = document.createElement("div");
    div.classList.add("review-item");
    div.innerHTML = `
      <h3>Q${index + 1}: ${q.question}</h3>
      <p><strong>Your Answer:</strong>
        <span class="${q.userAnswer === q.answer ? "correct" : "incorrect"}">
          ${q.userAnswer || "No answer selected"}
        </span>
      </p>
      <p><strong>Correct Answer:</strong> ${q.answer}</p>
      ${
        q.explanation
          ? `<p class="exp-text"><strong>Explanation:</strong> ${q.explanation}</p>`
          : ""
      }
      <hr/>
    `;
    reviewContainer.appendChild(div);
  });
}

// Return to Results
backToResultsBtn.addEventListener("click", () => {
  fadeSwap(reviewScreen, resultScreen);
});

// ========================================================
// RESTART QUIZ
// ========================================================
restartBtn.addEventListener("click", () => {
  quizQuestions = [];
  currentQuestionIndex = 0;
  score = 0;
  clearInterval(timerInterval);
  timerDisplay.textContent = "Time: 00:00";
  fadeSwap(resultScreen, startScreen);
});
