# FullStack-Codes 🚀

A curated collection of small, self-contained full‑stack experiments and code snippets created for learning and demonstration purposes. Each experiment demonstrates one or more full‑stack concepts — frontend, backend, data handling, and simple deployment or testing patterns.

🔧 Languages & Tools

- HTML5 🔶
- CSS3 🎨
- JavaScript 🟨
- React ⚛️
- Bootstrap 💠
- Node.js 🟩 (if backend present)
- Python 🐍 (if backend scripts present)
- JSON 🗂️

---

## Repository overview 📁

This repository currently contains:

- `EXP1/` — Experiment 1 (see details and topics below)
- `EXP2/` — Experiment 2 (React + Bootstrap — see topics below)
- `employee.json` — sample JSON dataset included at the repository root
- `.gitignore` — repository ignore rules

Each experiment folder is intended to include code and a README describing the purpose. The sections below focus on the technical topics covered in each experiment rather than system-specific setup instructions.

---

## Experiments and topics 🧩

### EXP1 — Topics touched

This experiment focuses on the fundamentals of building an interactive web application and the simplest forms of backend integration.

- 🔹 Frontend fundamentals
  - HTML structure and semantic elements
  - CSS basics and layout techniques (Flexbox/Grid)
  - Responsive design considerations
- 🔹 JavaScript essentials
  - DOM manipulation and event handling
  - Form handling and client-side validation
  - Using Fetch / AJAX to request data from an API
- 🔹 Simple API integration
  - Creating and consuming RESTful endpoints (CRUD operations)
  - Handling JSON request/response cycles
- 🔹 Data handling & mock data
  - Using local mock data or small JSON files as a data source
  - Parsing and rendering JSON data into views
- 🔹 UX considerations
  - Loading states and basic error handling
  - Progressive enhancement and graceful degradation
- 🔹 Learnings / focus areas
  - How the frontend and API communicate
  - Basic patterns for keeping UI and data in sync

If EXP1 includes a backend folder, it likely demonstrates a minimal server (Node/Express, Flask, or similar) implementing the API endpoints used by the frontend.

 <img src = "C:\Users\samra\OneDrive\Pictures\Screenshots 1\Screenshot 2026-01-23 141741.png" alt = "Image failed to load"/>

---

### EXP2 — Topics touched (React + Bootstrap) ⚛️💠

EXP2 focuses on a modern frontend stack using React for component-based UI and Bootstrap for rapid styling and responsive layout. The list below highlights the design and implementation topics demonstrated.

- 🔸 React fundamentals
  - Component architecture (functional components)
  - Props and component composition
  - Local component state and derived state patterns
- 🔸 React Hooks
  - useState and useEffect for lifecycle and side effects
  - Custom hooks for reusable logic (if present)
  - useRef and other hooks where applicable
- 🔸 State management & data flow
  - Lifting state up and passing callbacks to children
  - Managing async data and handling loading/error states
  - Simple global state approaches (context or prop drilling, if used)
- 🔸 Routing and navigation
  - Client-side routing (React Router or equivalent) for multi-view apps
  - Route parameters and nested routes patterns
- 🔸 Styling with Bootstrap
  - Using Bootstrap classes for grid layout, forms, and components
  - Combining Bootstrap with custom CSS or CSS modules
  - Responsive design patterns using Bootstrap utilities
  - Theming / customizing Bootstrap variables (if present)
- 🔸 Component library & UI patterns
  - Reusable presentational components (buttons, cards, lists)
  - Higher-level UI composition (layout, headers, footers, navigation)

EXP2 demonstrates how to structure a modern frontend project and how to use Bootstrap effectively with React. (Per your request, REST API / build / accessibility bullets that were not used in EXP2 have been removed.)

---

## How to read these experiments (short) 🔎

- Open the folder `EXP1` or `EXP2` and look for a README inside that folder for experiment‑specific notes.
- Inspect code files to see patterns and approaches used for each topic listed above.
- `employee.json` at the repository root is a small sample dataset that may be referenced by experiments.

---

Example topics checklist to include in experiment READMEs:

- Frontend: HTML, CSS, JS, frameworks used (React, Vue, etc.)
- Backend: language, framework, routing design
- Data: sample dataset, persistence approach
- Testing: how the experiment was validated
- Security & deployment notes
