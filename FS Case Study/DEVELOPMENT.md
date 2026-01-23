# Development Guide

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   This will:
   - Start live-server on http://localhost:3000
   - Automatically open your browser
   - Watch for changes in CSS, JS, components, and pages
   - Auto-reload when files change

3. **Alternative server options:**
   ```bash
   npm run dev:node    # Use custom Node.js/Express server
   npm run preview     # Start server without opening browser
   ```

## 🛠️ Development Workflow

### File Structure
- Edit HTML in `index.html`
- Modify styles in `css/` folder
- Update JavaScript in `js/`, `components/`, and `pages/`
- Add assets to `assets/` folders

### Live Reloading
The server watches these directories for changes:
- `css/` - Stylesheets
- `js/` - Core JavaScript
- `components/` - UI components
- `pages/` - Page components

### Browser DevTools
- Open DevTools (F12) to see console logs
- Check Network tab for any loading issues
- Use Elements tab to inspect CSS and layout

## 🎵 Testing the Music Player

### Navigation
- Click sidebar items to navigate between pages
- Use browser back/forward buttons (SPA routing works)

### Music Controls
- Click on music cards to "play" songs
- Use bottom player controls (play, pause, next, previous)
- Try search functionality on the Search page

### Responsive Design
- Resize browser window to test mobile layout
- Test on different screen sizes
- Check mobile navigation menu

## 🔧 Customization

### Adding New Songs
Edit `js/data.js`:
```javascript
const MOCK_DATA = {
    songs: [
        // Add your songs here
    ]
};
```

### Styling Changes
- Global styles: `css/main.css`
- Theme colors: `css/theme.css`
- Component styles: `css/components.css`

### New Components
1. Create new file in `components/`
2. Export render function
3. Include script in `index.html`
4. Use in page components

## 📱 Browser Testing

Recommended browsers for development:
- Chrome 80+ (best DevTools)
- Firefox 75+ (good CSS Grid support)
- Safari 13+ (WebKit testing)
- Edge 80+ (Chromium-based)

## 🐛 Troubleshooting

### Server won't start
- Check if port 3000 is available
- Try `npm run preview` (port 4000)
- Use `npm run dev:node` for alternative server

### Changes not reflecting
- Hard refresh (Ctrl+F5 or Cmd+Shift+R)
- Check browser console for errors
- Verify file paths are correct

### CSS not loading
- Check `index.html` for correct CSS links
- Verify CSS files exist in `css/` folder
- Check browser Network tab for 404 errors

## 📦 Production Build

This is a static frontend - no build process needed:
1. Copy all files to web server
2. Serve `index.html` as entry point
3. Configure server for SPA routing (optional)

## 🔄 Version Control

Recommended `.gitignore` is included. Key files to commit:
- All source files (HTML, CSS, JS)
- `package.json` and `package-lock.json`
- Documentation files

Don't commit:
- `node_modules/`
- IDE-specific files
- OS-generated files