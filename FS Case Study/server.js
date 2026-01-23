// Optional: Simple Node.js server for development
// This is an alternative to live-server if you prefer a custom server

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the root directory
app.use(express.static('.'));

// Handle SPA routing - serve index.html for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🎵 Music Player running at http://localhost:${PORT}`);
    console.log(`📱 Open your browser and navigate to the URL above`);
    console.log(`🔄 Server will auto-reload when you make changes`);
});

module.exports = app;