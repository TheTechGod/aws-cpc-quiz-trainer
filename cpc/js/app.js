const getEl = (id) => document.getElementById(id);

/* ================= CONFIG ================= */

const LOCAL_JSON_PATH = "./data/questions.json";
const STORAGE_KEY = "cpc_quiz_history";

const DOMAIN_ORDER = [
  "Cloud Concepts",
  "Security and Compliance",
  "Cloud Technology and Services",
  "Billing, Pricing, and Support"
];

const TEST_DISTRIBUTION = {
  "Cloud Concepts": 12,
  "Security and Compliance": 15,
  "Cloud Technology and Services": 17,
  "Billing, Pricing, and Support": 6
};

/* ================= STATE ================= */

const state = {
  questions: [],
  filteredQuestions: [],
  currentQuestionIndex: 0,
  score: 0,
  userAnswers: [],
  timerInterval: null,
  startTime: null,
  questionStartTime: null,
  isLoading: true
};

/* ================= STORAGE ================= */

function saveAttempt(attempt) {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  existing.unshift(attempt);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

function getAttempts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

/* ================= HELPERS ================= */

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function normalizeLocalQuestion(q, i) {
  const options = Array.isArray(q.answers)
    ? q.answers
    : Array.isArray(q.options)
      ? q.options
      : [];

  const correctIndexes = Array.isArray(q.correct) ? q.correct : [];

  return {
    id: q.id ?? i + 1,
    question: q.question || "Untitled question",
    options: options.map(String),
    answer: correctIndexes
      .map((idx) => options[idx])
      .filter(Boolean)
      .map(String),
    explanation: q.explanation || "",
    domain: q.domain || "General"
  };
}

function disableButtons(disabled) {
  const startBtn = getEl("start-btn");
  const testBtn = getEl("test-btn");

  if (startBtn) startBtn.disabled = disabled;
  if (testBtn) testBtn.disabled = disabled;
}

function showScreen(id) {
  ["setup-screen", "quiz-screen", "result-screen", "review-screen", "progress-screen"]
    .forEach((screenId) => {
      const node = getEl(screenId);
      if (node) node.classList.add("hidden");
    });

  const target = getEl(id);
  if (target) target.classList.remove("hidden");
}

function resetState() {
  clearInterval(state.timerInterval);
  state.filteredQuestions = [];
  state.currentQuestionIndex = 0;
  state.score = 0;
  state.userAnswers = [];
  state.startTime = null;
  state.questionStartTime = null;
  state.timerInterval = null;
}

function initAnswers() {
  state.userAnswers = state.filteredQuestions.map(() => ({
    selected: new Set(),
    timeSpent: 0
  }));
}

function getSelectedDomains() {
  return [...document.querySelectorAll(".domain-check:checked")]
    .map((cb) => cb.value);
}

function formatElapsed(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

/* ================= DATA LOAD ================= */

async function loadQuestions() {
  disableButtons(true);

  try {
    const res = await fetch(LOCAL_JSON_PATH);
    if (!res.ok) {
      throw new Error(`Failed to load questions.json (${res.status})`);
    }

    const data = await res.json();
    state.questions = data.map(normalizeLocalQuestion);
    state.isLoading = false;

    updateDomainUI();
    disableButtons(false);
  } catch (err) {
    console.error("Failed to load questions:", err);
    alert("Could not load questions.json. Check the path and JSON format.");
    state.isLoading = false;
  }
}

/* ================= UI ================= */

function updateDomainUI() {
  const container = getEl("dynamic-domain-options");
  if (!container) return;

  container.innerHTML = "";

  const rawDomains = [...new Set(state.questions.map((q) => q.domain))];
  const orderedDomains = DOMAIN_ORDER.filter((domain) => rawDomains.includes(domain));

  orderedDomains.forEach((domain, index) => {
    const label = document.createElement("label");
    label.className = "domain-option";

    label.innerHTML = `
      <input type="checkbox" class="domain-check" value="${domain}">
      <span>${index + 1}. ${domain}</span>
    `;

    container.appendChild(label);
  });
}

/* ================= QUIZ START ================= */

function startQuiz() {
  if (state.isLoading) {
    alert("Questions are still loading.");
    return;
  }

  resetState();

  const selectedDomains = getSelectedDomains();
  const countInput = document.querySelector('input[name="count"]:checked');
  const countValue = countInput ? countInput.value : "10";

  const pool = selectedDomains.length
    ? state.questions.filter((q) => selectedDomains.includes(q.domain))
    : [...state.questions];

  state.filteredQuestions = countValue === "all"
    ? shuffle(pool)
    : shuffle(pool).slice(0, Number.parseInt(countValue, 10));

  if (!state.filteredQuestions.length) {
    alert("No questions matched your selection.");
    return;
  }

  startSession();
}

function startTestMode() {
  if (state.isLoading) {
    alert("Questions are still loading.");
    return;
  }

  resetState();

  const examQuestions = [];

  Object.entries(TEST_DISTRIBUTION).forEach(([domain, count]) => {
    const pool = state.questions.filter((q) => q.domain === domain);

    if (pool.length === 0) {
      console.warn(`No questions available for domain: ${domain}`);
      return;
    }

    const selected = [];
    while (selected.length < count) {
      selected.push(...shuffle(pool));
    }

    examQuestions.push(...selected.slice(0, count));
  });

  state.filteredQuestions = shuffle(examQuestions).slice(0, 50);

  if (!state.filteredQuestions.length) {
    alert("Could not build the test.");
    return;
  }

  startSession();
}

function startSession() {
  initAnswers();
  startTimer();
  showScreen("quiz-screen");
  showQuestion();
  window.scrollTo({ top: 0, behavior: "auto" });
}

/* ================= QUIZ ENGINE ================= */

function showQuestion() {
  const q = state.filteredQuestions[state.currentQuestionIndex];
  if (!q) return;

  state.questionStartTime = Date.now();

  const questionText = getEl("question-text");
  const questionNumber = getEl("question-number");
  const optionsList = getEl("options");
  const nextBtn = getEl("next-btn");

  if (questionText) questionText.innerText = q.question;
  if (questionNumber) {
    questionNumber.innerText = `Question ${state.currentQuestionIndex + 1} of ${state.filteredQuestions.length}`;
  }

  if (!optionsList) return;
  optionsList.innerHTML = "";

  q.options.forEach((opt) => {
    const li = document.createElement("li");
    li.innerText = opt;
    li.className = "option";
    li.onclick = () => selectOption(li, opt);
    optionsList.appendChild(li);
  });

  if (nextBtn) nextBtn.disabled = true;
}

function selectOption(li, value) {
  const answerState = state.userAnswers[state.currentQuestionIndex];
  if (!answerState) return;

  document.querySelectorAll(".option").forEach((node) => {
    node.classList.remove("selected");
  });

  answerState.selected.clear();
  answerState.selected.add(value);

  li.classList.add("selected");

  const nextBtn = getEl("next-btn");
  if (nextBtn) nextBtn.disabled = false;
}

function nextQuestion() {
  const q = state.filteredQuestions[state.currentQuestionIndex];
  const answerState = state.userAnswers[state.currentQuestionIndex];

  if (!q || !answerState) return;

  const isCorrect =
    q.answer.length === answerState.selected.size &&
    q.answer.every((a) => answerState.selected.has(a));

  if (isCorrect) state.score += 1;

  answerState.timeSpent = Math.floor((Date.now() - state.questionStartTime) / 1000);

  state.currentQuestionIndex += 1;

  if (state.currentQuestionIndex < state.filteredQuestions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

/* ================= ANALYTICS ================= */

function calculateDomainStats() {
  const stats = {};

  state.filteredQuestions.forEach((q, i) => {
    const answerState = state.userAnswers[i];
    if (!stats[q.domain]) {
      stats[q.domain] = { correct: 0, total: 0, percent: 0 };
    }

    const isCorrect =
      q.answer.length === answerState.selected.size &&
      q.answer.every((a) => answerState.selected.has(a));

    if (isCorrect) stats[q.domain].correct += 1;
    stats[q.domain].total += 1;
  });

  Object.keys(stats).forEach((domain) => {
    const d = stats[domain];
    d.percent = d.total ? Math.round((d.correct / d.total) * 100) : 0;
  });

  return stats;
}

/* ================= RESULTS ================= */

function calculateReadinessScore(pct, avgTime, domainStats) {
  // 1. Accuracy (0–100)
  const accuracyScore = pct;

  // 2. Speed score (faster = better)
  let speedScore = 100;
  if (avgTime > 30) speedScore = 40;
  else if (avgTime > 20) speedScore = 60;
  else if (avgTime > 15) speedScore = 75;
  else if (avgTime > 10) speedScore = 90;

  // 3. Domain balance (penalize weak areas)
  const domainPercents = Object.values(domainStats).map(d => d.percent);
  const minDomain = Math.min(...domainPercents);
  const balanceScore = minDomain;

  // FINAL SCORE (weighted)
  const finalScore = Math.round(
    accuracyScore * 0.5 +
    speedScore * 0.2 +
    balanceScore * 0.3
  );

  return finalScore;
}

function getReadinessLabel(score) {
  if (score >= 85) return "🔥 Exam Ready";
  if (score >= 70) return "✅ Almost Ready";
  if (score >= 50) return "⚠️ Needs Improvement";
  return "❌ Not Ready";
}


function endQuiz() {
function endQuiz() {
  clearInterval(state.timerInterval);

  const total = state.filteredQuestions.length;
  const pct = total ? Math.round((state.score / total) * 100) : 0;
  const totalTime = Math.floor((Date.now() - state.startTime) / 1000);
  const avgTime = total ? Math.round(totalTime / total) : 0;

  const domainStats = calculateDomainStats();

  // 🔥 Readiness
  const readinessScore = calculateReadinessScore(pct, avgTime, domainStats);
  const readinessLabel = getReadinessLabel(readinessScore);

  // 🔥 Domain Breakdown
  const domainBreakdownHtml = Object.entries(domainStats)
    .map(([domain, data]) => {
      return `<p>${domain}: ${data.percent}% (${data.correct}/${data.total})</p>`;
    })
    .join("");

  // 🔥 Strongest / Weakest
  let strongest = null;
  let weakest = null;

  Object.entries(domainStats).forEach(([domain, data]) => {
    if (!strongest || data.percent > strongest.percent) {
      strongest = { domain, ...data };
    }
    if (!weakest || data.percent < weakest.percent) {
      weakest = { domain, ...data };
    }
  });

  showScreen("result-screen");

  const scoreSummary = getEl("score-summary");

  if (scoreSummary) {
    scoreSummary.innerHTML = `
      <h2>${state.score}/${total} (${pct}%)</h2>
      <p>Avg Time: ${avgTime}s</p>

      <hr class="my-3"/>

      <h3>🎯 Readiness Score: ${readinessScore}%</h3>
      <p><strong>Status:</strong> ${readinessLabel}</p>

      <hr class="my-3"/>

      ${strongest ? `<p><strong>🟢 Strongest:</strong> ${strongest.domain} (${strongest.percent}%)</p>` : ""}
      ${weakest ? `<p><strong>🔴 Weakest:</strong> ${weakest.domain} (${weakest.percent}%)</p>` : ""}

      <hr class="my-3"/>

      <h3>📊 Domain Breakdown</h3>
      ${domainBreakdownHtml}
    `;
  }

  // Save progress
  saveAttempt({
    date: new Date().toLocaleString(),
    score: state.score,
    total,
    percent: pct,
    avgTime
  });
}
  showScreen("result-screen");

  const scoreSummary = getEl("score-summary");
  if (scoreSummary) {
    scoreSummary.innerHTML = `
      <h2>${state.score}/${total} (${pct}%)</h2>
      <p>Avg Time: ${avgTime}s</p>
      ${strongest ? `<p><strong>Strongest:</strong> ${strongest.domain} (${strongest.percent}%)</p>` : ""}
      ${weakest ? `<p><strong>Weakest:</strong> ${weakest.domain} (${weakest.percent}%)</p>` : ""}
    `;
  }

  saveAttempt({
    date: new Date().toLocaleString(),
    score: state.score,
    total,
    percent: pct,
    avgTime
  });
}

/* ================= REVIEW ================= */

function renderReview() {
  showScreen("review-screen");

  const container = getEl("review-container");
  if (!container) return;

  container.innerHTML = "";

  state.filteredQuestions.forEach((q, i) => {
    const userAnswer = state.userAnswers[i];

    const optionsHtml = q.options.map((opt) => {
      const isCorrect = q.answer.includes(opt);
      const isSelected = userAnswer.selected.has(opt);

      let cls = "option-review";
      if (isCorrect) cls += " correct";
      if (isSelected && !isCorrect) cls += " wrong";

      return `<div class="${cls}">${opt}</div>`;
    }).join("");

    const div = document.createElement("div");
    div.className = "review-item";

    div.innerHTML = `
      <h4>${i + 1}. ${q.question}</h4>
      <p>${q.domain}</p>
      ${optionsHtml}
      <small>${q.explanation}</small>
    `;

    container.appendChild(div);
  });
}

/* ================= PROGRESS ================= */

function renderProgress() {
  const container = getEl("history-list");
  if (!container) return;

  const attempts = getAttempts();
  container.innerHTML = "";

  if (!attempts.length) {
    container.innerHTML = "<p>No attempts yet.</p>";
    return;
  }

  attempts.forEach((attempt) => {
    const div = document.createElement("div");
    div.className = "progress-item";

    div.innerHTML = `
      <p><strong>${attempt.date}</strong></p>
      <p>${attempt.score}/${attempt.total} (${attempt.percent}%)</p>
      <p>${attempt.avgTime}s avg</p>
    `;

    container.appendChild(div);
  });
}

/* ================= TIMER ================= */

function startTimer() {
  state.startTime = Date.now();

  const timer = getEl("timer");
  if (timer) timer.innerText = "Time: 0:00";

  state.timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
    const timerNode = getEl("timer");
    if (timerNode) {
      timerNode.innerText = `Time: ${formatElapsed(elapsed)}`;
    }
  }, 1000);
}

/* ================= EVENTS ================= */

function bindEvents() {
  const startBtn = getEl("start-btn");
  const testBtn = getEl("test-btn");
  const nextBtn = getEl("next-btn");
  const reviewBtn = getEl("review-btn");
  const dashboardBtn = getEl("dashboard-btn");
  const closeProgressBtn = getEl("close-progress");
  const restartBtn = getEl("restart-btn");
  const clearFiltersBtn = getEl("clear-filters-btn");
  const backToResultsBtn = getEl("back-to-results-btn");

  if (startBtn) startBtn.onclick = startQuiz;
  if (testBtn) testBtn.onclick = startTestMode;
  if (nextBtn) nextBtn.onclick = nextQuestion;
  if (reviewBtn) reviewBtn.onclick = renderReview;

  if (dashboardBtn) {
    dashboardBtn.onclick = () => {
      renderProgress();
      showScreen("progress-screen");
    };
  }

  if (closeProgressBtn) {
    closeProgressBtn.onclick = () => showScreen("setup-screen");
  }

  if (restartBtn) {
    restartBtn.onclick = () => {
      resetState();
      showScreen("setup-screen");
    };
  }

  if (clearFiltersBtn) {
    clearFiltersBtn.onclick = () => {
      document.querySelectorAll(".domain-check").forEach((cb) => {
        cb.checked = false;
      });
    };
  }

  if (backToResultsBtn) {
    backToResultsBtn.onclick = () => showScreen("result-screen");
  }
}

/* ================= INIT ================= */

window.onload = async () => {
  bindEvents();
  showScreen("setup-screen");
  await loadQuestions();
};