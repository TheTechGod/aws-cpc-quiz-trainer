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
  questionStartTime: null,
  isLoading: true
};

/* ================= HELPERS ================= */

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const formatTime = (sec) =>
  `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;

/* ================= STORAGE ================= */

function saveAttempt(attempt) {
  const data = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY) || "[]");
  data.unshift(attempt);
  localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(data));
}

function getAttempts() {
  return JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY) || "[]");
}

/* ================= LOAD ================= */

async function loadQuestions() {
  const res = await fetch(CONFIG.JSON_PATH);
  const data = await res.json();

  state.questions = data.map((q, i) => ({
    id: q.id ?? i + 1,
    question: q.question,
    options: q.options || q.answers || [],
    answer: (q.correct || []).map(i => (q.options || [])[i]),
    explanation: q.explanation || "",
    domain: q.domain || "General"
  }));

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
      : shuffle(pool).slice(0, parseInt(count));

  startSession();
}

function startTestMode() {
  reset();

  let questions = [];

  Object.entries(CONFIG.TEST_DISTRIBUTION).forEach(([domain, count]) => {
    const pool = state.questions.filter(q => q.domain === domain);

    while (questions.length < count) {
      questions.push(...shuffle(pool));
    }
  });

  state.filteredQuestions = shuffle(questions).slice(0, 50);
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

  getEl("question-text").innerText = q.question;
  getEl("question-number").innerText =
    `Question ${state.currentQuestionIndex + 1} of ${state.filteredQuestions.length}`;

  const list = getEl("options");
  list.innerHTML = "";

  q.options.forEach(opt => {
    const li = document.createElement("li");
    li.innerText = opt;
    li.className = "option";

    li.onclick = () => {
      document.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
      state.userAnswers[state.currentQuestionIndex].selected = new Set([opt]);
      li.classList.add("selected");
      getEl("next-btn").disabled = false;
    };

    list.appendChild(li);
  });

  getEl("next-btn").disabled = true;
}

function nextQuestion() {
  const q = state.filteredQuestions[state.currentQuestionIndex];
  const a = state.userAnswers[state.currentQuestionIndex];

  const correct =
    q.answer.length === a.selected.size &&
    q.answer.every(x => a.selected.has(x));

  if (correct) state.score++;

  state.currentQuestionIndex++;

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
    if (!stats[q.domain]) stats[q.domain] = { correct: 0, total: 0 };

    const a = state.userAnswers[i];

    const correct =
      q.answer.length === a.selected.size &&
      q.answer.every(x => a.selected.has(x));

    if (correct) stats[q.domain].correct++;
    stats[q.domain].total++;
  });

  Object.keys(stats).forEach(d => {
    stats[d].percent = Math.round((stats[d].correct / stats[d].total) * 100);
  });

  return stats;
}

function calculateReadinessScore(pct, domainStats) {
  const minDomain = Math.min(...Object.values(domainStats).map(d => d.percent));
  return Math.round(pct * 0.7 + minDomain * 0.3);
}

/* ================= RESULTS ================= */

function endQuiz() {
  clearInterval(state.timerInterval);

  const total = state.filteredQuestions.length;
  const pct = Math.round((state.score / total) * 100);

  const domainStats = calculateDomainStats();
  const readiness = calculateReadinessScore(pct, domainStats);

  const weakest = Object.entries(domainStats)
    .sort((a, b) => a[1].percent - b[1].percent)[0];

  const bars = Object.entries(domainStats)
    .map(([d, v]) => `
      <div class="domain-bar">
        <div class="domain-label">
          <span>${d}</span>
          <span>${v.percent}%</span>
        </div>
        <div class="bar">
          <div class="fill" style="width:${v.percent}%"></div>
        </div>
      </div>
    `).join("");

  getEl("score-summary").innerHTML = `
    <h2>${state.score}/${total} (${pct}%)</h2>
    <h3>🎯 Readiness: ${readiness}%</h3>
    <p><strong>Focus:</strong> ${weakest[0]}</p>
    ${bars}
  `;

  // ===== CHART RENDER =====
setTimeout(() => {
  const ctx = document.getElementById("domainChart");

  if (!ctx) return;

  // Destroy previous chart if it exists
  if (window.domainChartInstance) {
    window.domainChartInstance.destroy();
  }

  window.domainChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(domainStats),
      datasets: [{
        label: "Domain Performance (%)",
        data: Object.values(domainStats).map(d => d.percent),
        borderWidth: 1
      }]
    },
    options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      });
    }, 200);

  saveAttempt({
    date: new Date().toLocaleString(),
    score: state.score,
    total,
    percent: pct
  });

  showScreen("result-screen");
}

/* ================= REVIEW ================= */

function renderReview() {
  showScreen("review-screen");

  const container = getEl("review-container");
  container.innerHTML = "";

  state.filteredQuestions.forEach((q, i) => {
    const a = state.userAnswers[i];

    const html = q.options.map(opt => {
      const correct = q.answer.includes(opt);
      const selected = a.selected.has(opt);

      let cls = "option-review";
      if (correct) cls += " correct";
      if (selected && !correct) cls += " wrong";

      return `<div class="${cls}">${opt}</div>`;
    }).join("");

    container.innerHTML += `
      <div class="review-item">
        <h4>${q.question}</h4>
        <p>${q.domain}</p>
        ${html}
      </div>
    `;
  });
}

/* ================= PROGRESS ================= */

function renderProgress() {
  const attempts = getAttempts();
  getEl("total-quizzes").innerText = attempts.length;

  const avg = attempts.length
    ? Math.round(attempts.reduce((s, a) => s + a.percent, 0) / attempts.length)
    : 0;

  getEl("avg-score").innerText = `${avg}%`;

  const list = getEl("history-list");
  list.innerHTML = attempts.map(a => `
    <div class="progress-item">
      <p>${a.date}</p>
      <p>${a.score}/${a.total} (${a.percent}%)</p>
    </div>
  `).join("");
}

/* ================= TIMER ================= */

function startTimer() {
  state.timerInterval = setInterval(() => {
    const sec = Math.floor((Date.now() - state.startTime) / 1000);
    getEl("timer").innerText = `Time: ${formatTime(sec)}`;
  }, 1000);
}

/* ================= NAV ================= */

function showScreen(id) {
  ["setup-screen","quiz-screen","result-screen","review-screen","progress-screen"]
    .forEach(s => getEl(s)?.classList.add("hidden"));

  getEl(id)?.classList.remove("hidden");
}

function reset() {
  clearInterval(state.timerInterval);
  state.score = 0;
  state.currentQuestionIndex = 0;
}

/* ================= EVENTS ================= */

window.onload = async () => {
  getEl("start-btn").onclick = startQuiz;
  getEl("test-btn").onclick = startTestMode;
  getEl("next-btn").onclick = nextQuestion;
  getEl("review-btn").onclick = renderReview;
  getEl("dashboard-btn").onclick = () => {
    renderProgress();
    showScreen("progress-screen");
  };
  getEl("close-progress").onclick = () => showScreen("setup-screen");
  getEl("restart-btn").onclick = () => showScreen("setup-screen");
  getEl("back-to-results-btn").onclick = () => showScreen("result-screen");
  getEl("clear-filters-btn").onclick = () =>
    document.querySelectorAll(".domain-check").forEach(cb => cb.checked = false);

  await loadQuestions();
};