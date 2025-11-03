// =====================================================
// AWS CPC Quiz Trainer - Learning Modules (Full Integration)
// Author: Geoffrey D. Metzger | Integrity Programming
// =====================================================

// 🧠 Bite-size AWS learning content
const awsModules = [
  {
    id: 1,
    domain: "Cloud Concepts",
    title: "What is Cloud Computing?",
    duration: "2m",
    text: `
      Cloud computing is the on-demand delivery of IT resources over the internet 
      with pay-as-you-go pricing. Instead of buying, owning, and maintaining physical 
      data centers and servers, customers can access technology services such as 
      computing power, storage, and databases on an as-needed basis.
    `,
  },
  {
    id: 2,
    domain: "Cloud Concepts",
    title: "Benefits of Cloud Computing",
    duration: "3m",
    text: `
      The AWS Cloud provides several key advantages:
      • Trade capital expense for variable expense  
      • Benefit from massive economies of scale  
      • Stop guessing capacity  
      • Increase speed and agility  
      • Go global in minutes
    `,
  },
  {
    id: 3,
    domain: "Security & Compliance",
    title: "Shared Responsibility Model",
    duration: "2m",
    text: `
      AWS manages security *of* the cloud (infrastructure, hardware, global network),
      while customers are responsible for security *in* the cloud 
      (data, applications, IAM configurations, encryption).
    `,
  },
  // ... (keep all your existing lessons 101–115)
];

// =====================================================
// 🌐 Global State
// =====================================================
let currentModule = 0;
let filteredModules = [...awsModules];
let autoReadEnabled = false;
let preferredVoice = null;
let isSpeaking = false;

// =====================================================
// 📘 Display Logic
// =====================================================
function showModule(index) {
  if (index < 0 || index >= filteredModules.length) return;

  const module = filteredModules[index];
  const contentDiv = document.getElementById("module-content");

  contentDiv.innerHTML = `
    <h3>${module.title}</h3>
    <p><strong>Domain:</strong> ${module.domain}</p>
    <p>${module.text}</p>
    <p><em>Duration: ${module.duration}</em></p>
    <p class="mt-2"><small>Lesson ${index + 1} of ${filteredModules.length}</small></p>
  `;

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (autoReadEnabled) readCurrentModule();
}

// =====================================================
// 🧩 Domain Filter Logic
// =====================================================
function applyDomainFilter() {
  const checked = Array.from(document.querySelectorAll(".domain-check:checked")).map(cb => cb.value);

  filteredModules = checked.length
    ? awsModules.filter(m => checked.includes(m.domain))
    : [...awsModules];

  currentModule = 0;
  showModule(currentModule);
  updateHeader();
}

// Header dynamically reflects selected domains
function updateHeader() {
  const checked = Array.from(document.querySelectorAll(".domain-check:checked")).map(cb => cb.value);
  const title = document.querySelector("#modules-screen h1");

  title.textContent = checked.length
    ? `📘 Studying: ${checked.join(" + ")}`
    : "📘 AWS Bite-Size Learning";
}

// =====================================================
// 🧹 Clear Filters Button (with flash feedback)
// =====================================================
const clearBtn = document.getElementById("clear-filters-btn");
if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    document.querySelectorAll(".domain-check").forEach(cb => (cb.checked = false));
    filteredModules = [...awsModules];
    currentModule = 0;
    showModule(currentModule);
    updateHeader();

    // Flash green for feedback
    clearBtn.style.backgroundColor = "#00ffcc";
    clearBtn.textContent = "✅ Filters Cleared!";
    setTimeout(() => {
      clearBtn.style.backgroundColor = "";
      clearBtn.textContent = "🧹 Clear Filters";
    }, 1000);
  });
}

// =====================================================
// 🗣️ Voice Logic (Female Voice Preference)
// =====================================================
function loadVoices() {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return;
  }

  const femaleCandidates = voices.filter(v =>
    /female|Google US English|Microsoft Aria|Jenny|Samantha|en-US/i.test(v.name)
  );

  preferredVoice = femaleCandidates[0] || voices.find(v => /en/i.test(v.lang)) || voices[0];
  console.log("🎤 Selected voice:", preferredVoice ? preferredVoice.name : "default");
}
loadVoices();

function readCurrentModule() {
  const module = filteredModules[currentModule];
  if (!module || !window.speechSynthesis) return;

  window.speechSynthesis.cancel();
  const textToSpeak = `${module.title}. ${module.text.replace(/(<([^>]+)>)/gi, "")}`;
  const utterance = new SpeechSynthesisUtterance(textToSpeak);

  utterance.lang = preferredVoice?.lang || "en-US";
  utterance.rate = 1.0;
  utterance.pitch = 1.05;
  if (preferredVoice) utterance.voice = preferredVoice;

  window.speechSynthesis.speak(utterance);
  isSpeaking = true;
}

function stopReading() {
  window.speechSynthesis.cancel();
  isSpeaking = false;
}

// =====================================================
// ⏩ Navigation
// =====================================================
document.getElementById("next-module").addEventListener("click", () => {
  if (currentModule < filteredModules.length - 1) {
    currentModule++;
    showModule(currentModule);
  }
});

document.getElementById("prev-module").addEventListener("click", () => {
  if (currentModule > 0) {
    currentModule--;
    showModule(currentModule);
  }
});

// =====================================================
// 🎛️ Read + Auto-Read Controls
// =====================================================
document.getElementById("read-btn").addEventListener("click", readCurrentModule);
document.getElementById("stop-btn").addEventListener("click", stopReading);

const autoBtn = document.createElement("button");
autoBtn.id = "auto-toggle";
autoBtn.className = "warning-btn";
autoBtn.style.marginTop = "1rem";
autoBtn.textContent = "🗣️ Auto-Read: OFF";

autoBtn.addEventListener("click", () => {
  autoReadEnabled = !autoReadEnabled;
  autoBtn.textContent = autoReadEnabled ? "🟢 Auto-Read: ON" : "🗣️ Auto-Read: OFF";
  if (autoReadEnabled) readCurrentModule();
});

// =====================================================
// 🚀 Initialize
// =====================================================
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("modules-screen").appendChild(autoBtn);

  document.querySelectorAll(".domain-check").forEach(cb =>
    cb.addEventListener("change", applyDomainFilter)
  );

  showModule(currentModule);
  updateHeader();
});
