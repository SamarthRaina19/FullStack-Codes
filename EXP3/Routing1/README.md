# Experiment 3.1: Basic Client-Side Routing Using React Router

## 🎯 Aim
To implement basic client-side routing in a Single Page Application (SPA) using React Router and enhance the user interface to create a modern, interactive web application.

---

## 🛠️ Software Requirements
- Node.js (v14 or later recommended)
- React
- React Router DOM
- Web Browser (Google Chrome / Firefox)
- Code Editor (VS Code recommended)

---

## 📖 Theory

### Single Page Application (SPA)
A Single Page Application (SPA) loads a single HTML page and dynamically updates its content without reloading the entire page. This results in:
- Faster navigation
- Better user experience
- Smooth transitions between views

### Client-Side Routing
Client-side routing allows navigation between different views or components using URLs, without making requests to the server for new pages.

### React Router
React Router is a popular routing library for React that enables client-side routing using components such as:

- **BrowserRouter** – Wraps the application and enables routing using the browser’s history API.
- **Routes** – Acts as a container for all defined routes.
- **Route** – Maps a URL path to a specific React component.
- **NavLink** – Used for navigation with active link styling.

---

## 🧪 Procedure

1. Create a React application using Vite.
2. Install the `react-router-dom` package.
3. Wrap the root component with `BrowserRouter`.
4. Create multiple pages such as Home, About, and Contact.
5. Define routes using `Routes` and `Route`.
6. Use `NavLink` for navigation without page reloads.
7. Store and import images using the `src/assets` folder.
8. Enhance the UI using CSS (gradients, shadows, animations).
9. Test navigation to ensure smooth SPA behavior.

---

## 🎨 UI Enhancements & Interactivity

To improve the visual appeal and user experience, the following UI enhancements were implemented:

- Gradient-based responsive navigation bar
- Reduced navbar height for better content focus
- Active link highlighting using `NavLink`
- Hero-style Home page with centered heading and image
- Imported images from `src/assets` for proper bundling
- Card-style layout with shadows and rounded corners
- Hover effects and subtle animations
- Responsive design for desktop and mobile screens
- Consistent color theme across pages

These improvements make the application feel modern, interactive, and aligned with real-world React SPA standards.

---

## 📂 Project Structure (Simplified)

src/
├── assets/
│ └── spider-man.jpg
├── components/
│ └── Navbar.jsx
├── pages/
│ ├── Home.jsx
│ ├── About.jsx
│ └── Contact.jsx
├── App.jsx
├── App.css
└── main.jsx

![Working Screenshot](screenshots/Screenshot.png)