## 📝 Explanation

A simple Theme Toggle component that lets users switch between Light and Dark modes on the client side. The toggle updates the document root with a theme class (e.g., `.dark`) and persists the user's preference in `localStorage`. It respects the system preference via the `prefers-color-scheme` media query when no saved choice exists, and applies smooth CSS transitions for a pleasant UX. Accessibility concerns are handled by updating ARIA attributes and supporting keyboard interaction.

Languages & tech used:
- </> 🟦 HTML — structure & toggle button
- {} 🎨 CSS — theme variables, transitions, `.dark` styles
- ƒ ⚡ JavaScript — toggle logic, persistence (`localStorage`), system-preference detection

---

## 🚀 Functionality

- 🌗 Toggle button
  - Click or press Enter/Space to switch themes.
  - Button updates `aria-pressed` / `aria-label` for screen readers.

- 💾 Persistent preference
  - Selected theme saved to `localStorage` so choice survives page reloads.

- 🖥️ System preference fallback
  - When no stored preference, the site uses `prefers-color-scheme` to match OS-level theme.

- ✨ Smooth transitions
  - Color changes use CSS transitions for a non-jarring experience.

- ♿ Accessibility
  - Keyboard operable toggle and ARIA attributes ensure compatibility with assistive tech.

- 🔁 How it works (high level)
  1. On page load, script checks `localStorage` for a saved theme.  
  2. If none, it checks `window.matchMedia('(prefers-color-scheme: dark)')`.  
  3. The script adds or removes a `.dark` class on `document.documentElement` accordingly.  
  4. When the user toggles theme, the class is updated and the choice is saved to `localStorage`.

- 📁 Typical files
  - index.html 📄 — markup and toggle button
  - styles.css 🎨 — CSS variables and theme rules
  - script.js ⚙️ — theme detection, toggle handler, persistence

Enjoy customizing the theme behavior and styles — the component is intentionally minimal and easy to extend!```