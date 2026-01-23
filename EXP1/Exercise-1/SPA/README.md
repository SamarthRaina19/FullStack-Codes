Project functionality — SPA (Exercise 1)

🎯 Purpose

A small Single-Page Application (SPA) built as an exercise to demonstrate how a modern front-end app is structured and served with Vite.
🔌 Entry & tooling

⚡ Vite (dev server + fast HMR) serves the app during development and builds optimized production bundles.
🟩 Node.js / npm used to install dependencies and run scripts.
🧭 How it works (high-level)

index.html is the app entry point (loads the JS bundle and mounts the SPA).
🧩 src/ contains the application code (components, UI logic, and any client-side routing/state).
🔁 The app updates views and navigates between "pages" without full-page reloads (client-side routing typical to SPAs).
🗂️ public/ holds static assets (images, icons) that are copied to the build output as-is.
📦 Building with Vite produces a production-ready dist/ bundle that can be deployed to static hosting.
🛠️ Development workflow

npm run dev — ⚡ start Vite dev server with hot module replacement (fast local development)
npm run build — 📦 produce optimized production bundle
npm run preview — 🔍 locally serve the production build for testing
npm run lint — 🧹 run ESLint (code style / quality checks)
🧾 Tooling & quality

🔍 eslint.config.js provides linting rules to keep code consistent.
package.json / package-lock.json manage dependencies and scripts.
🧭 Typical responsibilities shown in this exercise

UI structure and components (HTML/CSS/JS)
Module-based JavaScript (ES modules imported from src/)
Fast feedback loop for development via Vite
Producing a static build for deployment
Icons / technologies at-a-glance

</> HTML — index.html
🟨 JavaScript — src/ (app logic)
🎨 CSS — styling files in src/ or imported styles
⚡ Vite — dev server + build
🟩 Node.js / npm — package management & scripts
🔍 ESLint — linting and code quality

<img src="screenshots/Exp-1-1.png" alt="Screenshot showing the working of the program" width="700">
