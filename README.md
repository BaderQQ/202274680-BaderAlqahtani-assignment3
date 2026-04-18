# Bader Alqahtani Portfolio

## Overview

This project is a personal portfolio website built with HTML, CSS, and JavaScript. It presents my profile, selected projects, live GitHub repository data, and an interactive contact experience in a clean and responsive interface.

The site is designed to feel professional and practical for long-term personal use while also demonstrating stronger frontend engineering practices such as API integration, client-side state management, structured validation, and performance-aware implementation.

---

## Features

### Live GitHub Integration
- Fetches public repositories from the GitHub API
- Displays repository name, description, stars, language, and last update time
- Includes friendly fallback messaging if the API is unavailable

### Interactive Project Experience
- Search projects by keyword
- Filter by category and project depth
- Sort by newest, oldest, or alphabetical order
- Show contextual guidance based on the selected project level

### State Management
- Saves light/dark mode preference
- Saves the visitor name shown in the hero section
- Remembers whether the project section is expanded or hidden

### Contact Form Logic
- Validates name, email, subject, and message before accepting submission
- Requires confirmation before submission
- Shows clear success and error feedback

### Performance and UX
- Uses lightweight SVG assets
- Lazy-loads project media where appropriate
- Keeps the site dependency-free for fast loading
- Uses reusable JavaScript functions and responsive CSS layouts

---

## Project Structure

```text
202274680-BaderAlqahtani-assignment3/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore
```

---

## Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/202274680-BaderAlqahtani-assignment3.git
   ```
2. Open the project folder:
   ```bash
   cd 202274680-BaderAlqahtani-assignment3
   ```
3. Open `index.html` in your browser.

No build step or package installation is required.

---

## AI Usage Summary

AI tools were used to support planning, implementation, debugging, and documentation refinement. A detailed explanation is included in:

`docs/ai-usage-report.md`

---

## Deployment

This site can be deployed easily with:
- GitHub Pages
- Netlify
- Vercel

