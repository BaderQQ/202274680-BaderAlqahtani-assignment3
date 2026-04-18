# Technical Documentation

## 1. Project Overview

This project is a personal portfolio web application developed with:
- **HTML** for semantic structure
- **CSS** for styling, layout, responsiveness, and transitions
- **JavaScript** for rendering, state management, API integration, validation, and interactivity

The site is designed as a clean personal portfolio while also demonstrating stronger frontend engineering practices such as dynamic rendering, API usage, multi-step logic, saved interface state, and performance-aware implementation.

---

## 2. Folder Structure

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

## 3. Main Features

### A. GitHub API Integration
The application connects to the GitHub public API using:
- endpoint: `https://api.github.com/users/BaderQQ/repos?sort=updated&per_page=6`
- method: `fetch()`
- output: public repositories with name, description, stars, language, and update date
- error handling: shows a user-friendly message when data cannot be loaded

### B. Project Filtering and Sorting Logic
The projects section uses multi-step client-side logic:
1. Read the current search query
2. Read selected category and project level
3. Filter projects using all active conditions
4. Sort the filtered results
5. Render the updated list of cards
6. Display contextual guidance based on the selected level

### C. Contact Form Validation
The contact form performs multiple checks:
- name is required and must contain valid letters/spaces
- email must match a valid format
- subject must meet minimum length
- message must meet both character and word-count requirements
- confirmation checkbox must be selected

Only after all rules pass does the form show a success state.

### D. State Management
`localStorage` is used to persist:
- theme preference
- visitor name
- project section visibility

This keeps the user experience consistent across page reloads.

### E. Visit Timer
A live timer starts on page load and updates every second to show time spent on the site.

---

## 4. JavaScript Architecture

The JavaScript file is organized around small focused functions, including:
- `initializeApp()`
- `attachEventListeners()`
- `renderProjects()`
- `sortProjectData()`
- `fetchGitHubRepos()`
- `handleFormSubmit()`
- helper functions such as `isValidEmail()`, `countWords()`, `capitalize()`, and `formatDate()`

This structure improves readability, maintainability, and debugging.

---

## 5. CSS Strategy

The stylesheet uses:
- CSS custom properties for theme colors
- reusable button, card, and grid patterns
- responsive layouts with media queries
- transitions for hover states, theme changes, and reveal animations
- section-based spacing for a clean reading flow

The overall styling approach focuses on clarity, consistency, and responsive usability.

---

## 6. Performance Considerations

The following choices were made to keep the site efficient:
- lightweight **SVG assets** instead of large image files
- lazy loading for project media
- no external libraries or frameworks
- reusable helper functions to reduce repeated code
- DOM updates limited to the content that actually changes

These steps help the website load faster and remain easy to maintain.

---

## 7. Browser Compatibility

The site is designed for modern browsers including:
- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari

It relies on browser features such as:
- `fetch`
- `localStorage`
- `IntersectionObserver`

---

## 8. Limitations

- The contact form is frontend-only and does not send data to a backend service.
- The GitHub API can be rate-limited if requested too frequently.
- Project data is currently stored locally in JavaScript rather than coming from a CMS or database.

---

## 9. Future Improvements

Possible next enhancements include:
- adding a backend or form service for real message delivery
- replacing placeholder illustrations with real project screenshots and a personal photo
- adding deployment analytics and accessibility audits
- expanding the project dataset and adding case-study pages

