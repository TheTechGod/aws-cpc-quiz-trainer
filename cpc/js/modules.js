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
  },

  // =====================================================
  // 🆕 Module 1: Introduction to the Cloud
  // =====================================================
  {
    id: 101,
    domain: "Cloud Concepts",
    title: "Defining Cloud Computing",
    duration: "2m",
    text: `
      Cloud computing is the on-demand delivery of IT resources over the internet 
      with pay-as-you-go pricing. Instead of buying, owning, and maintaining servers 
      or data centers, customers access computing power, storage, and databases as needed.
    `,
    audioUrl: "audio/intro-cloud-1.mp3"
  },
  {
    id: 102,
    domain: "Cloud Concepts",
    title: "The Shared Cloud Model",
    duration: "2m",
    text: `
      The cloud provides a shared pool of configurable resources—networks, servers, 
      storage, and applications—that can be provisioned and released rapidly 
      with minimal management effort.
    `,
    audioUrl: "audio/intro-cloud-2.mp3"
  },
  {
    id: 103,
    domain: "Cloud Concepts",
    title: "Five Characteristics of Cloud Computing",
    duration: "3m",
    text: `
      Cloud computing is defined by five key characteristics:
      1. On-demand self-service  
      2. Broad network access  
      3. Resource pooling  
      4. Rapid elasticity  
      5. Measured service
    `,
    audioUrl: "audio/intro-cloud-3.mp3"
  },
  {
    id: 104,
    domain: "Cloud Concepts",
    title: "Cloud Deployment Models",
    duration: "3m",
    text: `
      AWS supports multiple deployment models:
      • Public Cloud – fully hosted by AWS  
      • Private Cloud – dedicated to one organization  
      • Hybrid Cloud – combines on-premises and cloud resources
    `,
    audioUrl: "audio/intro-cloud-4.mp3"
  },
  {
    id: 105,
    domain: "Cloud Concepts",
    title: "Cloud Service Models",
    duration: "3m",
    text: `
      • IaaS – Infrastructure as a Service (EC2, S3)  
      • PaaS – Platform as a Service (Elastic Beanstalk)  
      • SaaS – Software as a Service (Amazon WorkMail)
    `,
    audioUrl: "audio/intro-cloud-5.mp3"
  },

  // =====================================================
  // 🆕 Module 1: Cloud Deployment Types
  // =====================================================
  {
    id: 106,
    domain: "Cloud Concepts",
    title: "Cloud Deployment Overview",
    duration: "2m",
    text: `
      You can deploy cloud resources in multiple ways: cloud, on-premises, and hybrid.
      Each model offers unique benefits and considerations. 
      Choosing the right mix helps you design an effective cloud strategy.
    `,
    audioUrl: "audio/deployment-overview.mp3"
  },
  {
    id: 107,
    domain: "Cloud Concepts",
    title: "Cloud Deployment Model",
    duration: "2m",
    text: `
      In a cloud-based deployment, you can migrate existing workloads or build new 
      applications directly in the cloud. Example: a company migrates its databases 
      and creates virtual servers and storage entirely hosted on AWS.
    `,
    audioUrl: "audio/deployment-cloud.mp3"
  },
  {
    id: 108,
    domain: "Cloud Concepts",
    title: "On-Premises Deployment Model",
    duration: "2m",
    text: `
      On-premises deployments use local infrastructure with virtualization and 
      management tools. While they provide dedicated resources and low latency, 
      they lack most cloud benefits such as scalability and elasticity.
    `,
    audioUrl: "audio/deployment-onprem.mp3"
  },
  {
    id: 109,
    domain: "Cloud Concepts",
    title: "Hybrid Deployment Model",
    duration: "3m",
    text: `
      Hybrid deployments connect cloud resources with on-premises infrastructure. 
      Useful when legacy systems must remain local for maintenance or compliance. 
      Example: keep regulated apps on-premises while using AWS for analytics. 
      Multi-cloud setups are also considered hybrid deployments.
    `,
    audioUrl: "audio/deployment-hybrid.mp3"
  },
  // =====================================================
  // 🆕 Module 1: Key Benefits of the AWS Cloud
  // =====================================================
  {
    id: 110,
    domain: "Cloud Concepts",
    title: "Trade Fixed Expense for Variable Expense",
    duration: "2m",
    text: `
      By using the AWS Cloud, businesses can shift from large, up-front capital 
      investments to variable costs that scale with usage.  
      This aligns expenses with actual demand and increases financial flexibility.
    `,
    audioUrl: "audio/aws-benefit-variable-expense.mp3"
  },
  {
    id: 111,
    domain: "Cloud Concepts",
    title: "Benefit from Massive Economies of Scale",
    duration: "2m",
    text: `
      AWS operates a vast global infrastructure.  
      As more customers use AWS, the cost per unit of resources decreases, 
      passing savings to customers of all sizes—from startups to large enterprises.
    `,
    audioUrl: "audio/aws-benefit-economies.mp3"
  },
  {
    id: 112,
    domain: "Cloud Concepts",
    title: "Stop Guessing Capacity",
    duration: "2m",
    text: `
      AWS resources can be scaled up or down dynamically based on demand.  
      Businesses avoid over- or under-provisioning infrastructure and maintain 
      optimal performance as usage changes.
    `,
    audioUrl: "audio/aws-benefit-capacity.mp3"
  },
  {
    id: 113,
    domain: "Cloud Concepts",
    title: "Increase Speed and Agility",
    duration: "2m",
    text: `
      The AWS Cloud enables rapid provisioning of applications and services.  
      Teams can experiment faster, deploy updates quickly, and respond 
      to changing business needs with greater agility.
    `,
    audioUrl: "audio/aws-benefit-agility.mp3"
  },
  {
    id: 114,
    domain: "Cloud Concepts",
    title: "Stop Spending Money on Data Centers",
    duration: "2m",
    text: `
      AWS removes the need to buy, power, and maintain physical servers.  
      With AWS handling the infrastructure, businesses can redirect time 
      and budget toward innovation and customer value.
    `,
    audioUrl: "audio/aws-benefit-datacenter.mp3"
  },
  {
    id: 115,
    domain: "Cloud Concepts",
    title: "Go Global in Minutes",
    duration: "2m",
    text: `
      AWS’s worldwide infrastructure allows customers to deploy applications 
      across multiple Regions within minutes.  
      This global reach supports low-latency user experiences and faster expansion.
    `,
    audioUrl: "audio/aws-benefit-global.mp3"
  }
];

// =====================================================
// Navigation + Display
// =====================================================
let currentModule = 0;
let autoReadEnabled = false;
let preferredVoice = null;
let isSpeaking = false;

// Show a module
function showModule(index) {
  if (index < 0 || index >= awsModules.length) return;

  const module = awsModules[index];
  const contentDiv = document.getElementById("module-content");
  contentDiv.innerHTML = `
    <h3>${module.title}</h3>
    <p><strong>Domain:</strong> ${module.domain}</p>
    <p>${module.text}</p>
    <p><em>Duration: ${module.duration}</em></p>
    <p class="mt-2"><small>Lesson ${index + 1} of ${awsModules.length}</small></p>
  `;
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (autoReadEnabled) readCurrentModule();
}

// Button listeners
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

// =====================================================
// 🗣️ Text-to-Speech Logic (Female Voice Preference)
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
  console.log("Selected voice:", preferredVoice ? preferredVoice.name : "default");
}
loadVoices();

function readCurrentModule() {
  const module = awsModules[currentModule];
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
// 🎛️ Auto-Read Toggle
// =====================================================
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

document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("modules-screen");
  section.appendChild(autoBtn);
  showModule(currentModule);
});

// =====================================================
// 🧭 Manual Read Buttons
// =====================================================
const readBtn = document.getElementById("read-btn");
const stopBtn = document.getElementById("stop-btn");

if (readBtn) readBtn.addEventListener("click", readCurrentModule);
if (stopBtn) stopBtn.addEventListener("click", stopReading);

