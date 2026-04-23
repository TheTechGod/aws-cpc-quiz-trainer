const getEl = (id) => document.getElementById(id);

/* ================= CONFIG ================= */

const CONFIG = {
  JSON_PATH: "./data/questions.json",
  STORAGE_KEY: "cpc_quiz_history",
  DOMAIN_ORDER: [
    "Cloud Concepts",
    "Security and Compliance",
    "Cloud Technology and Services",
    "Billing, Pricing, and Support"
  ],
  TEST_DISTRIBUTION: {
    "Cloud Concepts": 12,
    "Security and Compliance": 15,
    "Cloud Technology and Services": 17,
    "Billing, Pricing, and Support": 6
  }
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
  isLoading: true,
  answerSubmitted: false
};

/* ================= HELPERS ================= */

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
const normalize = (x) => String(x).trim().toLowerCase();

function formatTime(sec) {
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
}

function speakText(text) {
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const preferred =
    voices.find(v => v.name.includes("Zira")) ||
    voices.find(v => v.name.includes("Samantha")) ||
    voices[0];

  if (preferred) utterance.voice = preferred;

  window.speechSynthesis.speak(utterance);
}

function isAnswerCorrect(question, answerSet) {
  const selected = [...answerSet].map(normalize);
  const correct = question.answer.map(normalize);

  return (
    selected.length === correct.length &&
    correct.every(ans => selected.includes(ans))
  );
}

function getRequiredSelectionCount(question) {
  return question.answer.length;
}

/* ================= STORAGE ================= */

function saveAttempt(attempt) {
  const data = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY) || "[]");
  data.unshift(attempt);
  localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(data));
}

/* ================= LOAD ================= */

async function loadQuestions() {
  const res = await fetch(CONFIG.JSON_PATH);
  const data = await res.json();

  state.questions = data.map((q, i) => {
    const options = q.options || [];
    const correctIndexes = Array.isArray(q.correct) ? q.correct : [q.correct];

    return {
      id: q.id ?? i + 1,
      question: q.question,
      options,
      answer: correctIndexes
        .filter(idx => typeof idx === "number" && options[idx] !== undefined)
        .map(idx => options[idx]),
      explanation: q.explanation || "",
      domain: q.domain || "General"
    };
  });

  state.isLoading = false;
  renderDomains();
}

/* ================= UI ================= */

function renderDomains() {
  const container = getEl("dynamic-domain-options");
  const domains = [...new Set(state.questions.map(q => q.domain))];

  container.innerHTML = CONFIG.DOMAIN_ORDER
    .filter(d => domains.includes(d))
    .map((d, i) => `
      <label>
        <input type="checkbox" class="domain-check" value="${d}">
        ${i + 1}. ${d}
      </label>
    `)
    .join("");
}

function getSelectedDomains() {
  return [...document.querySelectorAll(".domain-check:checked")]
    .map(cb => cb.value);
}

function resetExplanation() {
  const box = getEl("explanation-box");
  const text = getEl("explanation-text");
  const btn = getEl("speak-btn");

  if (box) box.classList.add("hidden");
  if (text) text.innerHTML = "";
  if (btn) btn.onclick = null;

  window.speechSynthesis?.cancel();
}

function showExplanation(question, isCorrect) {
  const box = getEl("explanation-box");
  const text = getEl("explanation-text");
  const btn = getEl("speak-btn");

  if (box) box.classList.remove("hidden");

  if (text) {
    text.innerHTML = `
      <strong>${isCorrect ? "✅ Correct" : "❌ Incorrect"}</strong><br>
      ${question.explanation}
    `;
  }

  if (btn) {
    btn.onclick = () => {
      speakText(`${isCorrect ? "Correct." : "Incorrect."} ${question.explanation}`);
    };
  }
}

function updateNextButtonState(question) {
  const nextBtn = getEl("next-btn");
  const selectedCount = state.userAnswers[state.currentQuestionIndex].selected.size;
  const requiredCount = getRequiredSelectionCount(question);

  if (!state.answerSubmitted) {
    nextBtn.disabled = selectedCount < requiredCount;
    nextBtn.textContent = "Submit Answer";
  } else {
    nextBtn.disabled = false;
    nextBtn.textContent =
      state.currentQuestionIndex === state.filteredQuestions.length - 1
        ? "Finish Quiz"
        : "Next";
  }
}

/* ================= QUIZ ================= */

function startQuiz() {
  if (state.isLoading) return alert("Loading...");

  reset();

  const selected = getSelectedDomains();
  const count = document.querySelector('input[name="count"]:checked').value;

  const pool = selected.length
    ? state.questions.filter(q => selected.includes(q.domain))
    : state.questions;

  state.filteredQuestions =
    count === "all"
      ? shuffle(pool)
      : shuffle(pool).slice(0, parseInt(count, 10));

  startSession();
}

function startTestMode() {
  reset();

  let questions = [];

  Object.entries(CONFIG.TEST_DISTRIBUTION).forEach(([domain, count]) => {
    const pool = state.questions.filter(q => q.domain === domain);
    questions.push(...shuffle(pool).slice(0, count));
  });

  state.filteredQuestions = shuffle(questions);
  startSession();
}

function startSession() {
  state.userAnswers = state.filteredQuestions.map(() => ({
    selected: new Set()
  }));

  state.startTime = Date.now();
  startTimer();

  showScreen("quiz-screen");
  showQuestion();
}

/* ================= ENGINE ================= */

function showQuestion() {
  const q = state.filteredQuestions[state.currentQuestionIndex];
  const isMulti = q.answer.length > 1;

  state.answerSubmitted = false;

  getEl("question-text").innerText = isMulti
    ? `${q.question}`
    : q.question;

  getEl("question-number").innerText =
    `Question ${state.currentQuestionIndex + 1} of ${state.filteredQuestions.length}`;

  const list = getEl("options");
  list.innerHTML = "";

  resetExplanation();

  q.options.forEach(opt => {
    const li = document.createElement("li");
    li.innerText = opt;
    li.className = "option";

    li.onclick = () => {
      if (state.answerSubmitted) return;

      const answerSet = state.userAnswers[state.currentQuestionIndex].selected;

      if (isMulti) {
        if (answerSet.has(opt)) {
          answerSet.delete(opt);
          li.classList.remove("selected");
        } else {
          answerSet.add(opt);
          li.classList.add("selected");
        }
      } else {
        document.querySelectorAll(".option").forEach(o => {
          o.classList.remove("selected");
        });

        answerSet.clear();
        answerSet.add(opt);
        li.classList.add("selected");
      }

      updateNextButtonState(q);
    };

    list.appendChild(li);
  });

  updateNextButtonState(q);
}

function nextQuestion() {
  const q = state.filteredQuestions[state.currentQuestionIndex];
  const a = state.userAnswers[state.currentQuestionIndex];

  if (!state.answerSubmitted) {
    const selectedCount = a.selected.size;
    const requiredCount = getRequiredSelectionCount(q);

    if (selectedCount < requiredCount) return;

    state.answerSubmitted = true;

    const correct = isAnswerCorrect(q, a.selected);
    if (correct) state.score++;

    showExplanation(q, correct);
    updateNextButtonState(q);
    return;
  }

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
  window.speechSynthesis?.cancel();

  const total = state.filteredQuestions.length;
  const pct = Math.round((state.score / total) * 100);

  getEl("score-summary").innerHTML = `<h2>${state.score}/${total} (${pct}%)</h2>`;

  saveAttempt({
    date: new Date().toLocaleString(),
    score: state.score,
    total,
    percent: pct
  });

  showScreen("result-screen");
}

/* ================= REVIEW ================= */

function showReview() {
  const container = getEl("review-container");
  container.innerHTML = "";

  state.filteredQuestions.forEach((q, i) => {
    const userAnswers = [...state.userAnswers[i].selected];
    const isCorrect = isAnswerCorrect(q, state.userAnswers[i].selected);

    const div = document.createElement("div");
    div.className = "review-item";

    div.innerHTML = `
      <h4>${i + 1}. ${q.question}</h4>
      <p><strong>Your Answer:</strong> ${userAnswers.length ? userAnswers.join(", ") : "None"}</p>
      <p><strong>Correct:</strong> ${q.answer.join(", ")}</p>
      <p style="color:${isCorrect ? "#22c55e" : "#ef4444"}; font-weight: bold;">
        ${isCorrect ? "✅ Correct" : "❌ Incorrect"}
      </p>
      <p><em>${q.explanation}</em></p>
      <hr />
    `;

    container.appendChild(div);
  });

  showScreen("review-screen");
}

/* ================= TIMER ================= */

function startTimer() {
  clearInterval(state.timerInterval);

  state.timerInterval = setInterval(() => {
    const sec = Math.floor((Date.now() - state.startTime) / 1000);
    getEl("timer").innerText = `Time: ${formatTime(sec)}`;
  }, 1000);
}

/* ================= NAV ================= */

function showScreen(id) {
  ["setup-screen", "quiz-screen", "result-screen", "review-screen", "progress-screen"]
    .forEach(screenId => getEl(screenId)?.classList.add("hidden"));

  getEl(id)?.classList.remove("hidden");
}

function reset() {
  clearInterval(state.timerInterval);
  window.speechSynthesis?.cancel();

  state.score = 0;
  state.currentQuestionIndex = 0;
  state.filteredQuestions = [];
  state.userAnswers = [];
  state.answerSubmitted = false;

  resetExplanation();
}

/* ================= EVENTS ================= */

window.onload = async () => {
  getEl("start-btn").onclick = startQuiz;
  getEl("test-btn").onclick = startTestMode;
  getEl("next-btn").onclick = nextQuestion;
  getEl("review-btn").onclick = showReview;

  getEl("restart-btn").onclick = () => showScreen("setup-screen");
  getEl("back-to-results-btn").onclick = () => showScreen("result-screen");

  await loadQuestions();

  if ("speechSynthesis" in window) {
    window.speechSynthesis.getVoices();
  }
};