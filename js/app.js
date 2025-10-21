// ========================================================
// ELEMENT REFERENCES
// ========================================================
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

// ========================================================
// STATE VARIABLES
// ========================================================
let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedDomains = [];
let questionCount = 5;

// ========================================================
// TIMER / STATS VARIABLES
// ========================================================
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
  // Simple shuffle helper for questions or answer options
  return arr.sort(() => Math.random() - 0.5);
}

// ========================================================
// DOMAIN CHECKBOX LOGIC
// ========================================================
const allBox = document.querySelector('input[name="domain"][value="All"]');
const domainBoxes = Array.from(
  document.querySelectorAll('input[name="domain"]')
).filter((b) => b.value !== "All");

// Make "All" mutually exclusive with specific domains
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

  // Get number of questions
  const countInput = document.querySelector('input[name="count"]:checked');
  questionCount = parseInt(countInput.value);

  // Filter questions based on domain
  if (selectedDomains.includes("All")) {
    quizQuestions = [...questions];
  } else {
    quizQuestions = questions.filter((q) =>
      selectedDomains.includes(q.domain)
    );
  }

  // Guard against too few questions
  const available = quizQuestions.length;
  if (available === 0) {
    alert("No questions found for your selection. Try another domain.");
    return;
  }
  if (available < questionCount) {
    alert(`Only ${available} question(s) available. Using ${available}.`);
    questionCount = available;
  }

  // Shuffle and trim
  quizQuestions = shuffleArray(quizQuestions).slice(0, questionCount);

  // Reset state for this session
  currentQuestionIndex = 0;
  score = 0;
  domainStats = {};
  totalTime = 0;

  // Start timer tracking
  startTime = Date.now();
  questionStartTime = Date.now();

  // Start visible timer
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);

  // Switch to quiz screen
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  // Display first question
  showQuestion();
});

// ========================================================
// TIMER DISPLAY
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
// SHOW QUESTION (with 🥕 explanation support)
// ========================================================
function showQuestion() {
  const q = quizQuestions[currentQuestionIndex];
  questionText.textContent = q.question;
  optionsList.innerHTML = "";

  // Shuffle answer options each time for anti-memorization
  const shuffledOptions = shuffleArray([...q.options]);

  shuffledOptions.forEach((opt) => {
    const li = document.createElement("li");
    li.textContent = opt;
    li.addEventListener("click", () => selectAnswer(li, q.answer));
    optionsList.appendChild(li);
  });

  // Remove any old explanation section before adding new one
  const existingExp = document.querySelector(".explanation");
  if (existingExp) existingExp.remove();

  // Add 🥕 explanation toggle only if explanation exists in data
  if (q.explanation) {
    const expDiv = document.createElement("div");
    expDiv.classList.add("explanation");

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "🥕 Show Explanation";
    toggleBtn.classList.add("toggle-exp");

    const expText = document.createElement("p");
    expText.textContent = q.explanation;
    expText.classList.add("exp-text", "hidden");

    toggleBtn.addEventListener("click", () => {
      expText.classList.toggle("hidden");
      toggleBtn.textContent = expText.classList.contains("hidden")
        ? "🥕 Show Explanation"
        : "🥕 Hide Explanation";
    });

    expDiv.appendChild(toggleBtn);
    expDiv.appendChild(expText);

    // Append explanation block under the options
    quizScreen.appendChild(expDiv);
  }

  // Disable next button until an answer is chosen
  nextBtn.disabled = true;
  questionStartTime = Date.now(); // mark start of this question
}

// ========================================================
// SELECT ANSWER
// ========================================================
function selectAnswer(selectedLi, correctAnswer) {
  const options = document.querySelectorAll("#options li");
  options.forEach((opt) => (opt.style.pointerEvents = "none"));

  // Time tracking
  const elapsed = (Date.now() - questionStartTime) / 1000;
  totalTime += elapsed;

  // Domain tracking
  const currentDomain = quizQuestions[currentQuestionIndex].domain;
  if (!domainStats[currentDomain])
    domainStats[currentDomain] = { correct: 0, total: 0 };
  domainStats[currentDomain].total++;

  // Correctness check
  if (selectedLi.textContent === correctAnswer) {
    selectedLi.style.background = "#bbf7d0"; // green
    score++;
    domainStats[currentDomain].correct++;
  } else {
    selectedLi.style.background = "#fecaca"; // red
    options.forEach((opt) => {
      if (opt.textContent === correctAnswer)
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
// SHOW RESULTS (Score + Domain Breakdown + Timing)
// ========================================================
function showResults() {
  clearInterval(timerInterval);
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  // Calculate timing and accuracy
  endTime = Date.now();
  const totalDuration = (endTime - startTime) / 1000;
  const avgTime = (totalDuration / quizQuestions.length).toFixed(1);
  const percentage = ((score / quizQuestions.length) * 100).toFixed(1);

  // Summary Stats
  scoreSummary.innerHTML = `
    <p>Score: ${score} / ${quizQuestions.length} (${percentage}%)</p>
    <p>Total Time: ${totalDuration.toFixed(1)}s</p>
    <p>Avg per Question: ${avgTime}s</p>
  `;

  // Domain breakdown table
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
// RESTART QUIZ
// ========================================================
restartBtn.addEventListener("click", () => {
  quizQuestions = [];
  currentQuestionIndex = 0;
  score = 0;
  clearInterval(timerInterval);
  timerDisplay.textContent = "Time: 00:00";

  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
});
