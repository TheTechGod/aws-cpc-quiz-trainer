/* ========================================================
   AWS CPC QUIZ TRAINER — Rebuilt Clean Version
   Author: Geoffrey D. Metzger | Integrity Programming
   ======================================================== */

const el = (id) => document.getElementById(id);

/* =====================================================
   1. CONFIG
   ===================================================== */

const API_URL = "https://xgob5q5wo5.execute-api.us-east-2.amazonaws.com/questions";
const LOCAL_JSON_PATH = "./data/questions.json";

// Practice-mode question counts by domain
const CLF_BLUEPRINT = {
  "Cloud Concepts": 6,
  "Security and Compliance": 8,
  "Cloud Technology and Services": 10,
  "Billing, Pricing, and Support": 6
};

/* =====================================================
   ORDER DOMAIN
   ===================================================== */

const DOMAIN_ORDER = [
  "Cloud Concepts",
  "Security and Compliance",
  "Cloud Technology and Services",
  "Billing, Pricing, and Support"
];

/* =====================================================
   2. APP STATE
   ===================================================== */

const state = {
  questions: [],
  filteredQuestions: [],
  currentQuestionIndex: 0,
  score: 0,
  userAnswers: [],
  timerInterval: null,
  startTime: null,
  questionStartTime: null,
  isLoading: true,
  source: null
};

/* =====================================================
   3. HELPERS
   ===================================================== */

function parseDomain(sk) {
  if (!sk || typeof sk !== "string") return "General";
  const parts = sk.split("#");
  const raw = parts[1] || "General";
  return raw.replace(/([a-z])([A-Z])/g, "$1 $2").trim();
}

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function normalizeOptions(options) {
  if (!Array.isArray(options)) return [];
  return options.map((opt) => {
    if (typeof opt === "string") return opt;
    if (opt && typeof opt === "object" && "S" in opt) return opt.S;
    return String(opt);
  });
}

function normalizeAnswers(correctAnswer, options = []) {
  if (Array.isArray(correctAnswer)) return correctAnswer.map(String);

  if (correctAnswer === null || correctAnswer === undefined) return [];

  return [String(correctAnswer)];
}

function normalizeApiQuestion(q, index) {
  return {
    id: q.id ?? index + 1,
    question: q.QuestionText || q.question || "Untitled question",
    options: normalizeOptions(q.Options || q.options),
    answer: normalizeAnswers(q.CorrectAnswer ?? q.correct, q.Options || q.options),
    explanation: q.Explanation || q.explanation || "No explanation provided.",
    domain: q.domain || parseDomain(q.SK)
  };
}

function normalizeLocalQuestion(q, index) {
  const options = q.answers || q.options || [];
  const correctIndexes = Array.isArray(q.correct) ? q.correct : [];

  const normalizedCorrectAnswers = correctIndexes
    .map((i) => options[i])
    .filter(Boolean)
    .map(String);

  return {
    id: q.id ?? index + 1,
    question: q.question || "Untitled question",
    options: options.map(String),
    answer: normalizedCorrectAnswers,
    explanation: q.explanation || "No explanation provided.",
    domain: q.domain || "General"
  };
}

function resetQuizState() {
  state.filteredQuestions = [];
  state.currentQuestionIndex = 0;
  state.score = 0;
  state.userAnswers = [];
  clearInterval(state.timerInterval);
  state.timerInterval = null;
  state.startTime = null;
  state.questionStartTime = null;
}

function initializeUserAnswers() {
  state.userAnswers = state.filteredQuestions.map(() => ({
    selected: new Set(),
    timeSpent: 0
  }));
}

function hideAllScreens() {
  ["setup-screen", "quiz-screen", "result-screen", "review-screen"].forEach((id) => {
    const node = el(id);
    if (node) node.classList.add("hidden");
  });
}

function showScreen(screenId) {
  hideAllScreens();
  const node = el(screenId);
  if (node) node.classList.remove("hidden");
}

function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

/* =====================================================
   4. DATA LOADING
   ===================================================== */

async function loadQuestionsFromAPI() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return data.map(normalizeApiQuestion).filter(q => q.question && q.options.length > 0);
}

async function loadQuestionsFromLocalJson() {
  const response = await fetch(LOCAL_JSON_PATH);
  if (!response.ok) {
    throw new Error(`Local JSON error: ${response.status}`);
  }

  const data = await response.json();
  return data.map(normalizeLocalQuestion).filter(q => q.question && q.options.length > 0);
}

async function loadQuestions() {
  state.isLoading = true;
  disableStartButtons(true);

  try {
    state.questions = await loadQuestionsFromAPI();
    state.source = "api";
    console.log(`✅ Loaded ${state.questions.length} questions from API`);
  } catch (apiErr) {
    console.warn("API failed, trying local JSON...", apiErr);

    try {
      state.questions = await loadQuestionsFromLocalJson();
      state.source = "local-json";
      console.log(`✅ Loaded ${state.questions.length} questions from local JSON`);
    } catch (jsonErr) {
      console.error("❌ Failed to load questions from both API and local JSON", jsonErr);
      alert("Couldn't load questions from the API or local JSON file.");
      state.isLoading = false;
      disableStartButtons(true);
      return;
    }
  }

  state.isLoading = false;
  updateDomainUI();
  disableStartButtons(false);

  const status = el("data-source");
  if (status) {
    status.textContent = `Loaded from: ${state.source}`;
  }
}

/* =====================================================
   5. UI SETUP
   ===================================================== */

function disableStartButtons(disabled) {
  if (el("start-btn")) el("start-btn").disabled = disabled;
  if (el("practice-btn")) el("practice-btn").disabled = disabled;
}

function updateDomainUI() {
  const container = el("dynamic-domain-options");
  if (!container) return;

  const rawDomains = [...new Set(state.questions.map(q => q.domain))];

    const uniqueDomains = DOMAIN_ORDER.filter(domain =>
    rawDomains.includes(domain)
    );
  container.innerHTML = "";

    uniqueDomains.forEach((domainName, index) => {
    const label = document.createElement("label");
    label.className =
      "flex items-center space-x-2 p-2 bg-white rounded shadow-sm hover:bg-blue-50 cursor-pointer border border-transparent hover:border-blue-200 transition";

    label.innerHTML = `
      <input type="checkbox" class="domain-check" value="${domainName}">
      <span class="text-gray-700">${index + 1}. ${domainName}</span>
    `;

    container.appendChild(label);
  });
}

function getSelectedDomains() {
  return Array.from(document.querySelectorAll(".domain-check:checked")).map(cb => cb.value);
}

/* =====================================================
   6. QUIZ START
   ===================================================== */

function startQuiz(isPracticeMode = false) {
  if (state.isLoading) {
    alert("Still loading questions...");
    return;
  }

  if (!state.questions.length) {
    alert("No questions available.");
    return;
  }

  resetQuizState();

  const selectedDomains = getSelectedDomains();

  if (isPracticeMode) {
    if (selectedDomains.length === 0) {
      alert("Select at least one domain for Practice Mode.");
      return;
    }

    let practiceQuestions = [];

    selectedDomains.forEach((domain) => {
      const targetCount = CLF_BLUEPRINT[domain] || 5;
      const pool = state.questions.filter(q => q.domain === domain);
      practiceQuestions.push(...shuffle(pool).slice(0, targetCount));
    });

    state.filteredQuestions = shuffle(practiceQuestions);
  } else {
    const countInput = document.querySelector('input[name="count"]:checked');
    const count = countInput ? parseInt(countInput.value, 10) : 10;

    const pool =
      selectedDomains.length > 0
        ? state.questions.filter(q => selectedDomains.includes(q.domain))
        : [...state.questions];

    state.filteredQuestions = shuffle(pool).slice(0, count);
  }

  if (!state.filteredQuestions.length) {
    alert("No questions matched your selection.");
    return;
  }

  initializeUserAnswers();
  startTimer();
  showScreen("quiz-screen");
  showQuestion();
}

/* =====================================================
   7. QUIZ ENGINE
   ===================================================== */

function showQuestion() {
  const q = state.filteredQuestions[state.currentQuestionIndex];
  if (!q) return;

  state.questionStartTime = Date.now();

  if (el("question-number")) {
    el("question-number").innerText =
      `Question ${state.currentQuestionIndex + 1} of ${state.filteredQuestions.length}`;
  }

  if (el("question-text")) {
    el("question-text").innerText = q.question;
  }

  const optionsList = el("options");
  if (!optionsList) return;

  optionsList.innerHTML = "";

  const isMulti = q.answer.length > 1;

  if (isMulti) {
    const hint = document.createElement("p");
    hint.className = "text-blue-600 font-bold mb-2";
    hint.innerText = `(Select ${q.answer.length})`;
    optionsList.appendChild(hint);
  }

  q.options.forEach((opt) => {
    const li = document.createElement("li");
    li.className = "option-item p-3 mb-2 border rounded cursor-pointer hover:bg-gray-100 transition";
    li.innerText = opt;
    li.onclick = () => selectOption(li, opt, isMulti);
    optionsList.appendChild(li);
  });

  if (el("next-btn")) el("next-btn").disabled = true;
}

function selectOption(li, value, isMulti) {
  const answerState = state.userAnswers[state.currentQuestionIndex];
  const q = state.filteredQuestions[state.currentQuestionIndex];

  if (!answerState || !q) return;

  const currentSet = answerState.selected;

  if (isMulti) {
    if (currentSet.has(value)) {
      currentSet.delete(value);
      li.classList.remove("bg-blue-100", "border-blue-500");
    } else {
      currentSet.add(value);
      li.classList.add("bg-blue-100", "border-blue-500");
    }

    if (el("next-btn")) {
      el("next-btn").disabled = currentSet.size !== q.answer.length;
    }
  } else {
    document.querySelectorAll(".option-item").forEach((item) => {
      item.classList.remove("bg-blue-100", "border-blue-500");
    });

    currentSet.clear();
    currentSet.add(value);
    li.classList.add("bg-blue-100", "border-blue-500");

    if (el("next-btn")) el("next-btn").disabled = false;
  }
}

function handleNextQuestion() {
  const q = state.filteredQuestions[state.currentQuestionIndex];
  const userAnswer = state.userAnswers[state.currentQuestionIndex];

  if (!q || !userAnswer) return;

  userAnswer.timeSpent = Math.floor((Date.now() - state.questionStartTime) / 1000);

  const isCorrect =
    userAnswer.selected.size === q.answer.length &&
    q.answer.every(ans => userAnswer.selected.has(ans));

  if (isCorrect) {
    state.score++;
  }

  state.currentQuestionIndex++;

  if (state.currentQuestionIndex < state.filteredQuestions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

/* =====================================================
   8. TIMER
   ===================================================== */

function startTimer() {
  state.startTime = Date.now();

  if (el("timer")) {
    el("timer").innerText = `Time: 00:00`;
  }

  state.timerInterval = setInterval(() => {
    const diff = Math.floor((Date.now() - state.startTime) / 1000);
    if (el("timer")) {
      el("timer").innerText = `Time: ${formatTime(diff)}`;
    }
  }, 1000);
}

/* =====================================================
   9. RESULTS & REVIEW
   ===================================================== */

function endQuiz() {
  clearInterval(state.timerInterval);

  const totalQuestions = state.filteredQuestions.length;
  const pct = Math.round((state.score / totalQuestions) * 100);
  const totalTime = Math.floor((Date.now() - state.startTime) / 1000);
  const avgTime = Math.round(totalTime / totalQuestions);

  showScreen("result-screen");

  if (el("score-summary")) {
    el("score-summary").innerHTML = `
      <h3 class="text-2xl font-bold">Score: ${state.score}/${totalQuestions} (${pct}%)</h3>
      <p class="text-gray-600">Average Pace: ${avgTime}s per question</p>
      <p class="text-sm ${avgTime <= 83 ? "text-green-600" : "text-red-600"}">
        ${avgTime <= 83 ? "✅ On track for exam pace!" : "⚠️ Try to speed up (Target: 83s)"}
      </p>
      <p class="text-sm text-gray-500 mt-2">Question source: ${state.source}</p>
    `;
  }
}

function renderReview() {
  showScreen("review-screen");

  const container = el("review-container");
  if (!container) return;

  container.innerHTML = "";

  state.filteredQuestions.forEach((q, i) => {
    const userAnswer = state.userAnswers[i];
    const selectedAnswers = [...userAnswer.selected];
    const isCorrect =
      selectedAnswers.length === q.answer.length &&
      q.answer.every(ans => userAnswer.selected.has(ans));

    const div = document.createElement("div");
    div.className = "review-item mb-6 p-4 border rounded shadow-sm bg-white";

    div.innerHTML = `
      <div class="flex justify-between items-start gap-4">
        <p class="font-bold">${i + 1}. ${q.question}</p>
        <span class="text-xs px-2 py-1 bg-gray-100 rounded whitespace-nowrap">${userAnswer.timeSpent}s</span>
      </div>
      <p class="text-sm mt-2"><strong>Domain:</strong> ${q.domain}</p>
      <p class="text-sm mt-2"><strong>Correct:</strong> ${q.answer.join(", ")}</p>
      <p class="text-sm ${isCorrect ? "text-green-600" : "text-red-600"}"><strong>Yours:</strong> ${selectedAnswers.join(", ") || "None"}</p>
      <p class="text-xs text-gray-500 italic mt-2">${q.explanation}</p>
    `;

    container.appendChild(div);
  });
}

/* =====================================================
   10. EVENTS
   ===================================================== */

function bindEvents() {
  if (el("start-btn")) {
    el("start-btn").onclick = () => startQuiz(false);
  }

  if (el("practice-btn")) {
    el("practice-btn").onclick = () => startQuiz(true);
  }

  if (el("next-btn")) {
    el("next-btn").onclick = handleNextQuestion;
  }

  if (el("review-btn")) {
    el("review-btn").onclick = renderReview;
  }

  if (el("restart-btn")) {
    el("restart-btn").onclick = () => {
      resetQuizState();
      showScreen("setup-screen");
    };
  }
}

/* =====================================================
   11. INIT
   ===================================================== */
window.addEventListener("DOMContentLoaded", async () => {
  bindEvents();
  showScreen("setup-screen");

  state.isLoading = true;
  disableStartButtons(true);

  try {
    state.questions = await loadQuestionsFromLocalJson();
    state.source = "local-json";
    state.isLoading = false;

    updateDomainUI();
    disableStartButtons(false);

    const status = el("data-source");
    if (status) {
      status.textContent = `Loaded from: ${state.source}`;
    }

    console.log("Loaded local domains:", [...new Set(state.questions.map(q => q.domain))]);
  } catch (err) {
    console.error("❌ Failed to load local JSON", err);
    state.isLoading = false;
    alert("Couldn't load local questions.json file.");
  }
});






/*
window.addEventListener("DOMContentLoaded", async () => {
  bindEvents();
  showScreen("setup-screen");
  await loadQuestions();
});
*/