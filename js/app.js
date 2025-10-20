// ===========================
// ELEMENT REFERENCES
// ===========================
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const nextBtn = document.getElementById("next-btn");
const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options");

// ===========================
// STATE VARIABLES
// ===========================
let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedDomains = [];
let questionCount = 5;

// ===========================
// HELPERS
// ===========================
function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// ===========================
// DOMAIN CHECKBOX LOGIC
// ===========================
const allBox = document.querySelector('input[name="domain"][value="All"]');
const domainBoxes = Array.from(document.querySelectorAll('input[name="domain"]')).filter(b => b.value !== "All");

if (allBox) {
  allBox.addEventListener("change", () => {
    if (allBox.checked) domainBoxes.forEach(b => b.checked = false);
  });
  domainBoxes.forEach(b => {
    b.addEventListener("change", () => {
      if (b.checked) allBox.checked = false;
    });
  });
}

// ===========================
// START QUIZ
// ===========================
startBtn.addEventListener("click", () => {
  resultScreen.classList.add("hidden");

  // Collect selected domains
  selectedDomains = Array.from(document.querySelectorAll('input[name="domain"]:checked')).map(el => el.value);
  if (selectedDomains.length === 0) selectedDomains = ["All"];

  // Get number of questions
  const countInput = document.querySelector('input[name="count"]:checked');
  questionCount = parseInt(countInput.value);

  // Filter questions
  if (selectedDomains.includes("All")) {
    quizQuestions = [...questions];
  } else {
    quizQuestions = questions.filter(q => selectedDomains.includes(q.domain));
  }

  // Guard if not enough questions
  const available = quizQuestions.length;
  if (available === 0) {
    alert("No questions found for your selection. Try another domain.");
    return;
  }
  if (available < questionCount) {
    alert(`Only ${available} question(s) available. Using ${available}.`);
    questionCount = available;
  }

  // Shuffle and limit
  quizQuestions = shuffleArray(quizQuestions).slice(0, questionCount);

  // Reset state
  currentQuestionIndex = 0;
  score = 0;

  // Switch screens
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  // Start quiz
  showQuestion();
});

// ===========================
// SHOW QUESTION
// ===========================
function showQuestion() {
  const q = quizQuestions[currentQuestionIndex];
  questionText.textContent = q.question;
  optionsList.innerHTML = "";

  q.options.forEach(opt => {
    const li = document.createElement("li");
    li.textContent = opt;
    li.addEventListener("click", () => selectAnswer(li, q.answer));
    optionsList.appendChild(li);
  });

  nextBtn.disabled = true;
}

// ===========================
// SELECT ANSWER
// ===========================
function selectAnswer(selectedLi, correctAnswer) {
  const options = document.querySelectorAll("#options li");
  options.forEach(opt => (opt.style.pointerEvents = "none"));

  if (selectedLi.textContent === correctAnswer) {
    selectedLi.style.background = "#bbf7d0"; // green
    score++;
  } else {
    selectedLi.style.background = "#fecaca"; // red
    options.forEach(opt => {
      if (opt.textContent === correctAnswer) {
        opt.style.outline = "2px solid #16a34a";
      }
    });
  }

  nextBtn.disabled = false;
}

// ===========================
// NEXT QUESTION
// ===========================
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
});

// ===========================
// SHOW RESULTS
// ===========================
function showResults() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  document.getElementById("score-summary").textContent =
    `You answered ${score} out of ${quizQuestions.length} correctly!`;
}

// ===========================
// RESTART QUIZ
// ===========================
restartBtn.addEventListener("click", () => {
  quizQuestions = [];
  currentQuestionIndex = 0;
  score = 0;

  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
});
