/* ========================================================
   AWS CPC QUIZ TRAINER — CLEAN PRODUCTION VERSION
   ======================================================== */

const el = (id) => document.getElementById(id);

/* ================= CONFIG ================= */

const LOCAL_JSON_PATH = "./data/questions.json";

const DOMAIN_ORDER = [
  "Cloud Concepts",
  "Security and Compliance",
  "Cloud Technology and Services",
  "Billing, Pricing, and Support"
];

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

/* ================= HELPERS ================= */

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalizeLocalQuestion(q, i) {
  const options = q.answers || q.options || [];
  const correctIndexes = q.correct || [];

  return {
    id: q.id ?? i,
    question: q.question,
    options,
    answer: correctIndexes.map(idx => options[idx]),
    explanation: q.explanation || "",
    domain: q.domain
  };
}

/* ================= INIT ================= */

async function loadQuestions() {
  const res = await fetch(LOCAL_JSON_PATH);
  const data = await res.json();

  state.questions = data.map(normalizeLocalQuestion);
  state.isLoading = false;

  updateDomainUI();
  disableButtons(false);
}

/* ================= UI ================= */

function disableButtons(disabled) {
  if (el("start-btn")) el("start-btn").disabled = disabled;
  if (el("test-btn")) el("test-btn").disabled = disabled;
}

function updateDomainUI() {
  const container = el("dynamic-domain-options");
  container.innerHTML = "";

  const raw = [...new Set(state.questions.map(q => q.domain))];

  const domains = DOMAIN_ORDER.filter(d => raw.includes(d));

  domains.forEach((d, i) => {
    const label = document.createElement("label");

    label.innerHTML = `
      <input type="checkbox" class="domain-check" value="${d}">
      <span>${i + 1}. ${d}</span>
    `;

    container.appendChild(label);
  });
}

function getSelectedDomains() {
  return [...document.querySelectorAll(".domain-check:checked")]
    .map(cb => cb.value);
}

/* ================= QUIZ ================= */

function startQuiz() {
  reset();

  const selected = getSelectedDomains();
  const countVal = document.querySelector('input[name="count"]:checked').value;

  let pool = selected.length
    ? state.questions.filter(q => selected.includes(q.domain))
    : state.questions;

  state.filteredQuestions =
    countVal === "all"
      ? shuffle(pool)
      : shuffle(pool).slice(0, parseInt(countVal));

  initAnswers();
  startTimer();
  showScreen("quiz-screen");
  showQuestion();
}

function startTestMode() {
  reset();

  const DIST = {
    "Cloud Concepts": 12,
    "Security and Compliance": 15,
    "Cloud Technology and Services": 17,
    "Billing, Pricing, and Support": 6
  };

  let questions = [];

  Object.entries(DIST).forEach(([domain, count]) => {
    const pool = state.questions.filter(q => q.domain === domain);

    let selected = [];

    if (pool.length >= count) {
      selected = shuffle(pool).slice(0, count);
    } else {
      while (selected.length < count) {
        selected.push(...shuffle(pool));
      }
      selected = selected.slice(0, count);
    }

    questions.push(...selected);
  });

  state.filteredQuestions = shuffle(questions).slice(0, 50);

  initAnswers();
  startTimer();
  showScreen("quiz-screen");
  showQuestion();
}

/* ================= ENGINE ================= */

function showQuestion() {
  const q = state.filteredQuestions[state.currentQuestionIndex];
  state.questionStartTime = Date.now();

  el("question-text").innerText = q.question;
  el("question-number").innerText =
    `Question ${state.currentQuestionIndex + 1} of ${state.filteredQuestions.length}`;

  const list = el("options");
  list.innerHTML = "";

  q.options.forEach(opt => {
    const li = document.createElement("li");
    li.innerText = opt;
    li.className = "option";

    li.onclick = () => selectOption(li, opt);

    list.appendChild(li);
  });

  el("next-btn").disabled = true;
}

function selectOption(li, value) {
  const ans = state.userAnswers[state.currentQuestionIndex];

  document.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));

  ans.selected.clear();
  ans.selected.add(value);

  li.classList.add("selected");
  el("next-btn").disabled = false;
}

function nextQuestion() {
  const q = state.filteredQuestions[state.currentQuestionIndex];
  const ans = state.userAnswers[state.currentQuestionIndex];

  const correct =
    q.answer.length === ans.selected.size &&
    q.answer.every(a => ans.selected.has(a));

  if (correct) state.score++;

  ans.timeSpent = Math.floor((Date.now() - state.questionStartTime) / 1000);

  state.currentQuestionIndex++;

  if (state.currentQuestionIndex < state.filteredQuestions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

/* ================= RESULTS ================= */

function endQuiz() {
  clearInterval(state.timerInterval);

  const total = state.filteredQuestions.length;
  const pct = Math.round((state.score / total) * 100);

  showScreen("result-screen");

  el("score-summary").innerHTML = `
    <h2>${state.score}/${total} (${pct}%)</h2>
  `;
}

/* ================= REVIEW (🔥 UPGRADED) ================= */

function renderReview() {
  showScreen("review-screen");

  const container = el("review-container");
  container.innerHTML = "";

  state.filteredQuestions.forEach((q, i) => {
    const userAnswer = state.userAnswers[i];

    const optionsHtml = q.options.map(opt => {
      const isCorrect = q.answer.includes(opt);
      const isSelected = userAnswer.selected.has(opt);

      let cls = "option-review";

      if (isCorrect) cls += " correct";
      if (isSelected && !isCorrect) cls += " wrong";

      return `<div class="${cls}">${opt}</div>`;
    }).join("");

    const div = document.createElement("div");

    div.innerHTML = `
      <h4>${i + 1}. ${q.question}</h4>
      <p>${q.domain}</p>
      ${optionsHtml}
      <small>${q.explanation}</small>
    `;

    container.appendChild(div);
  });
}

/* ================= TIMER ================= */

function startTimer() {
  state.startTime = Date.now();

  state.timerInterval = setInterval(() => {
    const t = Math.floor((Date.now() - state.startTime) / 1000);
    el("timer").innerText = `Time: ${t}s`;
  }, 1000);
}

/* ================= STATE ================= */

function reset() {
  state.filteredQuestions = [];
  state.currentQuestionIndex = 0;
  state.score = 0;
  state.userAnswers = [];
  clearInterval(state.timerInterval);
}

function initAnswers() {
  state.userAnswers = state.filteredQuestions.map(() => ({
    selected: new Set(),
    timeSpent: 0
  }));
}

/* ================= NAV ================= */

function showScreen(id) {
  ["setup-screen", "quiz-screen", "result-screen", "review-screen"]
    .forEach(s => el(s)?.classList.add("hidden"));

  el(id).classList.remove("hidden");
}

/* ================= EVENTS ================= */

function bindEvents() {
  el("start-btn").onclick = startQuiz;
  el("test-btn").onclick = startTestMode;
  el("next-btn").onclick = nextQuestion;
  el("review-btn").onclick = renderReview;
}

/* ================= INIT ================= */

window.onload = async () => {
  bindEvents();
  await loadQuestions();
};