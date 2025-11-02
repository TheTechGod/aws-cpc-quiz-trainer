// =====================================================
// AWS CPC Quiz Trainer - Learning Modules (Front-End)
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
      data centers and servers, customers can access technology services, such as 
      computing power, storage, and databases, on an as-needed basis.
    `,
    audioUrl: "audio/cloud-concepts-1.mp3"
  },
  {
    id: 2,
    domain: "Cloud Concepts",
    title: "Benefits of Cloud Computing",
    duration: "3m",
    text: `
      The AWS Cloud provides several key advantages:
      - Trade capital expense for variable expense.
      - Benefit from massive economies of scale.
      - Stop guessing capacity.
      - Increase speed and agility.
      - Go global in minutes.
    `,
    audioUrl: "audio/cloud-concepts-2.mp3"
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
    audioUrl: "audio/security-shared-model.mp3"
  }
];

// =====================================================
// Navigation & Display Logic
// =====================================================

let currentModule = 0;

// 🔹 Show a module by index
function showModule(index) {
  const module = awsModules[index];
  if (!module) return;

  const contentDiv = document.getElementById("module-content");
  const audioPlayer = document.getElementById("module-audio");

  contentDiv.innerHTML = `
    <h3>${module.title}</h3>
    <p><strong>Domain:</strong> ${module.domain}</p>
    <p>${module.text}</p>
    <p><em>Duration: ${module.duration}</em></p>
  `;

  audioPlayer.src = module.audioUrl || "";
  audioPlayer.load();
}

// 🔹 Start the learning section
function startModules() {
  hideAllScreens();
  document.getElementById("modules-screen").classList.remove("hidden");
  currentModule = 0;
  showModule(currentModule);
}

// 🔹 Navigation buttons
document.getElementById("next-module").addEventListener("click", () => {
  if (currentModule < awsModules.length - 1) {
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

// 🔹 Exit back to start
document.getElementById("exit-modules").addEventListener("click", () => {
  hideAllScreens();
  document.getElementById("start-screen").classList.add("active");
});

// 🔹 "Learn Mode" button on start screen
document.getElementById("learn-btn").addEventListener("click", startModules);

// =====================================================
// Helper: Hide all screens (matches app.js pattern)
// =====================================================
function hideAllScreens() {
  const sections = document.querySelectorAll("section");
  sections.forEach(s => {
    s.classList.add("hidden");
    s.classList.remove("active");
  });
}
