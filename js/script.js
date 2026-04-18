const GITHUB_USERNAME = "BaderQQ";
const STORAGE_KEYS = {
  theme: "portfolio-theme",
  visitorName: "portfolio-visitor-name",
  showProjects: "portfolio-show-projects"
};

const projects = [
  {
    title: "Campus Course Route Planner",
    description:
      "A smart campus navigation tool that visualizes class schedules, maps buildings, and calculates walking routes between classes.",
    category: "web",
    level: "advanced",
    date: "2026-02-11",
    image: "assets/images/campus-route.svg",
    tags: ["campus", "map", "schedule", "routing"]
  },
  {
    title: "Smart Event Booking System",
    description:
      "A booking platform for browsing events, purchasing tickets, and managing reservations with a smooth user flow.",
    category: "web",
    level: "advanced",
    date: "2026-02-08",
    image: "assets/images/event-booking.svg",
    tags: ["booking", "event", "tickets", "management"]
  },
  {
    title: "Study Habit Tracker",
    description:
      "A student-focused productivity tool that tracks goals, sessions, and progress trends.",
    category: "tools",
    level: "beginner",
    date: "2025-11-15",
    image: "assets/images/study-tracker.svg",
    tags: ["productivity", "study", "tracker"]
  },
  {
    title: "AI Notes Summarizer",
    description:
      "A lightweight experiment that summarizes learning notes into shorter review points.",
    category: "ai",
    level: "advanced",
    date: "2025-10-04",
    image: "assets/images/ai-notes.svg",
    tags: ["ai", "summary", "notes", "learning"]
  }
];

const themeBtn = document.getElementById("themeBtn");
const themeStatus = document.getElementById("themeStatus");
const welcomeBtn = document.getElementById("welcomeBtn");
const visitorNameEl = document.getElementById("visitorName");
const visitTimer = document.getElementById("visitTimer");
const yearEl = document.getElementById("year");
const projectsGrid = document.getElementById("projectsGrid");
const emptyState = document.getElementById("emptyState");
const projectSearch = document.getElementById("projectSearch");
const categoryFilter = document.getElementById("categoryFilter");
const levelFilter = document.getElementById("levelFilter");
const sortProjects = document.getElementById("sortProjects");
const projectHint = document.getElementById("projectHint");
const toggleProjectsBtn = document.getElementById("toggleProjectsBtn");
const projectsSection = document.getElementById("projectsGrid");
const refreshReposBtn = document.getElementById("refreshReposBtn");
const repoGrid = document.getElementById("repoGrid");
const repoMessage = document.getElementById("repoMessage");
const repoCount = document.getElementById("repoCount");
const repoStatus = document.getElementById("repoStatus");
const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");
const agreeInput = document.getElementById("agree");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const subjectError = document.getElementById("subjectError");
const messageError = document.getElementById("messageError");
const agreeError = document.getElementById("agreeError");

initializeApp();

function initializeApp() {
  yearEl.textContent = new Date().getFullYear();
  applySavedTheme();
  applySavedVisitorName();
  applySavedProjectVisibility();
  attachEventListeners();
  renderProjects();
  fetchGitHubRepos();
  startVisitTimer();
  setupRevealAnimation();
}

function attachEventListeners() {
  themeBtn.addEventListener("click", toggleTheme);
  welcomeBtn.addEventListener("click", saveVisitorName);
  projectSearch.addEventListener("input", renderProjects);
  categoryFilter.addEventListener("change", renderProjects);
  levelFilter.addEventListener("change", renderProjects);
  sortProjects.addEventListener("change", renderProjects);
  toggleProjectsBtn.addEventListener("click", toggleProjectSection);
  refreshReposBtn.addEventListener("click", fetchGitHubRepos);
  contactForm.addEventListener("submit", handleFormSubmit);
}

function applySavedTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
  updateThemeUI();
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem(STORAGE_KEYS.theme, currentTheme);
  updateThemeUI();
}

function updateThemeUI() {
  const isDark = document.body.classList.contains("dark");
  themeBtn.textContent = isDark ? "☀️ Light" : "🌙 Dark";
  themeStatus.textContent = isDark ? "Dark" : "Light";
}

function applySavedVisitorName() {
  const savedName = localStorage.getItem(STORAGE_KEYS.visitorName);
  if (savedName) {
    visitorNameEl.textContent = savedName;
  }
}

function saveVisitorName() {
  const currentName = localStorage.getItem(STORAGE_KEYS.visitorName) || "";
  const enteredName = window.prompt("What should I call you?", currentName);

  if (enteredName === null) return;

  const trimmedName = enteredName.trim();
  if (trimmedName.length < 2) {
    window.alert("Please enter at least 2 characters.");
    return;
  }

  localStorage.setItem(STORAGE_KEYS.visitorName, trimmedName);
  visitorNameEl.textContent = trimmedName;
}

function startVisitTimer() {
  const startTime = Date.now();
  updateTimerDisplay(0);

  setInterval(() => {
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    updateTimerDisplay(elapsedSeconds);
  }, 1000);
}

function updateTimerDisplay(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  visitTimer.textContent = `${minutes}:${seconds}`;
}

function renderProjects() {
  const query = projectSearch.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;
  const selectedLevel = levelFilter.value;
  const sortValue = sortProjects.value;

  let filteredProjects = projects.filter((project) => {
    const matchesText =
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tags.some((tag) => tag.includes(query));

    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || project.level === selectedLevel;

    return matchesText && matchesCategory && matchesLevel;
  });

  filteredProjects = sortProjectData(filteredProjects, sortValue);
  updateLevelHint(selectedLevel);
  drawProjectCards(filteredProjects);
}

function sortProjectData(projectList, sortValue) {
  const sorted = [...projectList];

  if (sortValue === "name") {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortValue === "oldest") {
    sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else {
    sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return sorted;
}

function updateLevelHint(level) {
  if (level === "beginner") {
    projectHint.textContent = "Showing projects with a lighter implementation scope and simpler user flows.";
  } else if (level === "advanced") {
    projectHint.textContent = "Showing projects with deeper logic, richer features, and more involved implementation.";
  } else {
    projectHint.textContent = "Showing all project levels. Use filters to narrow the list.";
  }
}

function drawProjectCards(projectList) {
  projectsGrid.innerHTML = "";
  emptyState.hidden = projectList.length !== 0;

  projectList.forEach((project) => {
    const card = document.createElement("article");
    card.className = "card project-card";
    card.innerHTML = `
      <img src="${project.image}" alt="${project.title} preview" width="640" height="360" loading="lazy" />
      <div class="card-body">
        <div class="badges">
          <span class="badge">${capitalize(project.category)}</span>
          <span class="badge">${capitalize(project.level)}</span>
          <span class="badge">${project.date}</span>
        </div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
    `;
    projectsGrid.appendChild(card);
  });
}

function toggleProjectSection() {
  const isHidden = projectsSection.classList.toggle("hidden-section");
  document.querySelector(".control-panel").classList.toggle("hidden-section", isHidden);
  projectHint.classList.toggle("hidden-section", isHidden);
  emptyState.classList.toggle("hidden-section", isHidden);
  toggleProjectsBtn.textContent = isHidden ? "Show Projects" : "Hide Projects";
  localStorage.setItem(STORAGE_KEYS.showProjects, String(!isHidden));
}

function applySavedProjectVisibility() {
  const savedValue = localStorage.getItem(STORAGE_KEYS.showProjects);
  if (savedValue === "false") {
    projectsSection.classList.add("hidden-section");
    document.querySelector(".control-panel").classList.add("hidden-section");
    projectHint.classList.add("hidden-section");
    emptyState.classList.add("hidden-section");
    toggleProjectsBtn.textContent = "Show Projects";
  }
}

async function fetchGitHubRepos() {
  repoGrid.innerHTML = "";
  repoMessage.textContent = "Loading repositories...";
  repoStatus.textContent = "Loading...";

  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);

    if (!response.ok) {
      throw new Error(`GitHub request failed with status ${response.status}`);
    }

    const repos = await response.json();
    const filteredRepos = repos.filter((repo) => !repo.fork);

    repoCount.textContent = String(filteredRepos.length);
    repoStatus.textContent = "Connected";
    repoMessage.textContent = filteredRepos.length
      ? "Showing the latest public repositories from GitHub."
      : "No repositories were found for this account.";

    filteredRepos.forEach((repo) => {
      const article = document.createElement("article");
      article.className = "card repo-card";
      article.innerHTML = `
        <h3><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a></h3>
        <p>${repo.description || "No description provided."}</p>
        <div class="badges">
          <span class="badge">⭐ ${repo.stargazers_count}</span>
          <span class="badge">${repo.language || "N/A"}</span>
          <span class="badge">Updated ${formatDate(repo.updated_at)}</span>
        </div>
      `;
      repoGrid.appendChild(article);
    });
  } catch (error) {
    repoCount.textContent = "--";
    repoStatus.textContent = "Unavailable";
    repoMessage.textContent = "GitHub data could not be loaded right now. Please try again later.";
    console.error("GitHub API error:", error);
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  clearFormErrors();
  formMsg.textContent = "";
  formMsg.className = "form-message";

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const subject = subjectInput.value.trim();
  const message = messageInput.value.trim();
  const agreed = agreeInput.checked;

  let isValid = true;

  if (!name) {
    nameError.textContent = "Please enter your name.";
    isValid = false;
  } else if (!isValidName(name)) {
    nameError.textContent = "Use letters and spaces only, with at least 2 characters.";
    isValid = false;
  }

  if (!email) {
    emailError.textContent = "Please enter your email address.";
    isValid = false;
  } else if (!isValidEmail(email)) {
    emailError.textContent = "Please enter a valid email format.";
    isValid = false;
  }

  if (!subject) {
    subjectError.textContent = "Please enter a subject.";
    isValid = false;
  } else if (subject.length < 3) {
    subjectError.textContent = "Subject should be at least 3 characters long.";
    isValid = false;
  }

  if (!message) {
    messageError.textContent = "Please enter your message.";
    isValid = false;
  } else if (message.length < 20 || countWords(message) < 4) {
    messageError.textContent = "Message should be at least 20 characters and 4 words.";
    isValid = false;
  }

  if (!agreed) {
    agreeError.textContent = "Please confirm the information before sending.";
    isValid = false;
  }

  if (!isValid) {
    formMsg.textContent = "Please fix the highlighted fields and try again.";
    formMsg.classList.add("error");
    return;
  }

  formMsg.textContent = `Thanks, ${name}! Your message looks great and is ready to send.`;
  formMsg.classList.add("success");
  contactForm.reset();
}

function clearFormErrors() {
  nameError.textContent = "";
  emailError.textContent = "";
  subjectError.textContent = "";
  messageError.textContent = "";
  agreeError.textContent = "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidName(name) {
  return /^[A-Za-z\s]{2,}$/.test(name);
}

function countWords(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

function setupRevealAnimation() {
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
