/* ========================================================
   AWS CPC QUIZ TRAINER — v8.2 (Fixed & Analytics Enabled)
   Author: Geoffrey D. Metzger | Integrity Programming
   ======================================================== */

const el = (id) => document.getElementById(id);

const DOMAIN_MAP = {
    "Cloud Concepts": "Cloud Concepts",
    "Security and Compliance": "Security and Compliance",
    "Technology": "Cloud Technology and Services",
    "Billing and Pricing": "Billing, Pricing, and Support"
};

// Official CLF-C02 Blueprint Weights for "Practice Mode"
const CLF_BLUEPRINT = {
    "Cloud Concepts": 24,
    "Security and Compliance": 30,
    "Cloud Technology and Services": 34,
    "Billing, Pricing, and Support": 12
};

// --- APP STATE ---
let questions = [];
let filteredQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = []; 
let timerInterval;
let startTime;
let questionStartTime; // For Lap Timer analytics
let isLoading = true;

/* =====================================================
   1. DATA FETCHING & PARSING
   ===================================================== */
async function loadQuestionsFromAPI(selectedDomainId = null) {
    try {
        let url = "https://xgob5q5wo5.execute-api.us-east-2.amazonaws.com/questions";
        if (selectedDomainId) {
            url += `?domain_id=${selectedDomainId}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        
        const data = await response.json(); // Fixed: was missing this line in your snippet

        questions = data.map((q, i) => ({
            id: i + 1,
            question: q.QuestionText,
            options: (q.Options || []).map(opt =>
                typeof opt === "object" ? opt.S || JSON.stringify(opt) : opt
            ),
            answer: Array.isArray(q.CorrectAnswer)
                ? q.CorrectAnswer
                : [q.CorrectAnswer],
            explanation: q.Explanation || "No explanation provided.",
            domain: parseDomain(q.SK)
        }));

        console.log(`✅ Loaded ${questions.length} questions.`);
        isLoading = false;
        updateDomainUI(); 

    } catch (err) {
        console.error("❌ Connection Error:", err);
        isLoading = false;
        alert("Couldn't reach Shanda's database. Check your connection.");
    }
}

function parseDomain(sk) {
    if (!sk) return "General";
    const parts = sk.split("#");
    const raw = parts[1] || "General";
    return raw.replace(/([a-z])([A-Z])/g, "$1 $2").trim();
}

/* =====================================================
   2. DYNAMIC UI GENERATION
   ===================================================== */
function updateDomainUI() {
    const container = el("dynamic-domain-options");
    if (!container) return;

    // 1. Get unique domains from the questions we just loaded
    const officialDomains = Object.keys(DOMAIN_MAP);
    const uniqueDomains = [...new Set(questions.map(q => q.domain))]
        .filter(d => officialDomains.includes(d)) 
        .sort();

    container.innerHTML = ""; 

    uniqueDomains.forEach(domain => {
        // 2. Map the DB name (e.g., "Technology") to the Official name
        // This uses the mapping we discussed, or defaults to the DB name if not found
        const officialName = DOMAIN_MAP[domain] || domain; 

        const label = document.createElement("label");
        label.className = "flex items-center space-x-2 p-2 bg-white rounded shadow-sm hover:bg-blue-50 cursor-pointer border border-transparent hover:border-blue-200 transition";
        
        // Note: The 'value' stays the DB name so the filter logic still works!
        label.innerHTML = `
            <input type="checkbox" class="domain-check" value="${domain}">
            <span class="text-gray-700">${officialName}</span>
        `;
        container.appendChild(label);
    });

    if (el("start-btn")) el("start-btn").disabled = false;
}

/* =====================================================
   3. QUIZ ENGINE
   ===================================================== */
function startQuiz(isPracticeMode = false) {
    if (isLoading) return alert("Still loading questions...");

    const selectedDomains = Array.from(
        document.querySelectorAll(".domain-check:checked")
    ).map(cb => cb.value);

    // If Practice Mode is pushed, we use the Blueprint scaling
    if (isPracticeMode) {
        if (selectedDomains.length === 0) return alert("Select at least one domain for Practice Mode!");
        
        filteredQuestions = [];
        selectedDomains.forEach(domain => {
            const countForDomain = CLF_BLUEPRINT[domain] || 5;
            const domainPool = questions.filter(q => q.domain === domain)
                .sort(() => 0.5 - Math.random())
                .slice(0, countForDomain);
            filteredQuestions.push(...domainPool);
        });
    } else {
        // Standard Quiz Mode
        const countInput = document.querySelector('input[name="count"]:checked');
        const count = countInput ? parseInt(countInput.value) : 10;

        filteredQuestions = selectedDomains.length > 0
            ? questions.filter(q => selectedDomains.includes(q.domain))
            : [...questions];

        filteredQuestions = filteredQuestions
            .sort(() => 0.5 - Math.random())
            .slice(0, count);
    }

    if (filteredQuestions.length === 0) return alert("No questions found!");

    currentQuestionIndex = 0;
    score = 0;
    userAnswers = filteredQuestions.map(() => ({ selected: new Set(), timeSpent: 0 }));

    el("start-screen").classList.add("hidden");
    el("quiz-screen").classList.remove("hidden");

    showQuestion();
    startTimer();
}

function showQuestion() {
    questionStartTime = Date.now(); // Reset Lap Timer
    const q = filteredQuestions[currentQuestionIndex];
    const isMulti = q.answer.length > 1;

    el("question-number").innerText = `Question ${currentQuestionIndex + 1} of ${filteredQuestions.length}`;
    el("question-text").innerText = q.question;

    const optionsList = el("options");
    optionsList.innerHTML = "";

    if (isMulti) {
        const hint = document.createElement("p");
        hint.className = "text-blue-600 font-bold mb-2";
        hint.innerText = `(Select ${q.answer.length})`;
        optionsList.appendChild(hint);
    }

    q.options.forEach(opt => {
        const li = document.createElement("li");
        li.className = "option-item p-3 mb-2 border rounded cursor-pointer hover:bg-gray-100 transition";
        li.innerText = opt;
        li.onclick = () => selectOption(li, opt, isMulti);
        optionsList.appendChild(li);
    });

    el("next-btn").disabled = true;
}

function selectOption(li, val, isMulti) {
    const currentSet = userAnswers[currentQuestionIndex].selected;
    const q = filteredQuestions[currentQuestionIndex];

    if (isMulti) {
        currentSet.has(val) ? currentSet.delete(val) : currentSet.add(val);
        li.classList.toggle("bg-blue-100");
        li.classList.toggle("border-blue-500");
        el("next-btn").disabled = currentSet.size !== q.answer.length;
    } else {
        document.querySelectorAll(".option-item").forEach(i => i.classList.remove("bg-blue-100", "border-blue-500"));
        currentSet.clear();
        currentSet.add(val);
        li.classList.add("bg-blue-100", "border-blue-500");
        el("next-btn").disabled = false;
    }
}

el("next-btn").onclick = () => {
    const q = filteredQuestions[currentQuestionIndex];
    const userAnswer = userAnswers[currentQuestionIndex];
    
    // Capture time spent on THIS question
    userAnswer.timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);

    const isCorrect = userAnswer.selected.size === q.answer.length && 
                      q.answer.every(ans => userAnswer.selected.has(ans));

    if (isCorrect) score++;

    currentQuestionIndex++;
    currentQuestionIndex < filteredQuestions.length ? showQuestion() : endQuiz();
};

/* =====================================================
   4. RESULTS & ANALYTICS
   ===================================================== */
function endQuiz() {
    clearInterval(timerInterval);
    el("quiz-screen").classList.add("hidden");
    el("result-screen").classList.remove("hidden");
    const pct = Math.round((score / filteredQuestions.length) * 100);
    
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    const avgTime = Math.round(totalTime / filteredQuestions.length);

    el("score-summary").innerHTML = `
        <h3 class="text-2xl font-bold">Score: ${score}/${filteredQuestions.length} (${pct}%)</h3>
        <p class="text-gray-600">Average Pace: ${avgTime}s per question</p>
        <p class="text-sm ${avgTime <= 83 ? 'text-green-600' : 'text-red-600'}">
            ${avgTime <= 83 ? '✅ On track for exam pace!' : '⚠️ Try to speed up (Target: 83s)'}
        </p>
    `;
}

function renderReview() {
    el("result-screen").classList.add("hidden");
    el("review-screen").classList.remove("hidden");
    const container = el("review-container");
    container.innerHTML = "";

    filteredQuestions.forEach((q, i) => {
        const userAnswer = userAnswers[i];
        const isCorrect = q.answer.every(ans => userAnswer.selected.has(ans)) && userAnswer.selected.size === q.answer.length;

        const div = document.createElement("div");
        div.className = "review-item mb-6 p-4 border rounded shadow-sm bg-white";
        div.innerHTML = `
            <div class="flex justify-between items-start">
                <p class="font-bold">${i + 1}. ${q.question}</p>
                <span class="text-xs px-2 py-1 bg-gray-100 rounded">${userAnswer.timeSpent}s</span>
            </div>
            <p class="text-sm mt-2"><strong>Correct:</strong> ${q.answer.join(", ")}</p>
            <p class="text-sm ${isCorrect ? 'text-green-600' : 'text-red-600'}"><strong>Yours:</strong> ${[...userAnswer.selected].join(", ") || 'None'}</p>
            <p class="text-xs text-gray-500 italic mt-2">${q.explanation}</p>
        `;
        container.appendChild(div);
    });
}

/* =====================================================
   5. INITIALIZATION
   ===================================================== */
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const diff = Math.floor((Date.now() - startTime) / 1000);
        el("timer").innerText = `Time: ${String(Math.floor(diff / 60)).padStart(2, '0')}:${String(diff % 60).padStart(2, '0')}`;
    }, 1000);
}

// Wire up buttons
if (el("start-btn")) el("start-btn").onclick = () => startQuiz(false);
if (el("practice-btn")) el("practice-btn").onclick = () => startQuiz(true); 
if (el("review-btn")) el("review-btn").onclick = renderReview;
if (el("restart-btn")) el("restart-btn").onclick = () => window.location.reload();

window.addEventListener("DOMContentLoaded", () => loadQuestionsFromAPI());