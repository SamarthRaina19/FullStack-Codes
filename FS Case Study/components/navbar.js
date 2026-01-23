// Navigation Sidebar Component
function renderNavbar() {
    return `
        <div class="p-3">
            <!-- App Logo/Title -->
            <div class="mb-4">
                <h4 class="text-light mb-0">
                    <span class="material-icon me-2" style="vertical-align: middle;">music_note</span>
                    Music Player
                </h4>
            </div>
            
            <!-- Main Navigation -->
            <nav class="mb-4">
                <div class="nav-item ${AppState.currentRoute === 'home' ? 'active' : ''}" data-route="home">
                    <span class="material-icons">home</span>
                    Home
                </div>
                <div class="nav-item ${AppState.currentRoute === 'search' ? 'active' : ''}" data-route="search">
                    <span class="material-icons">search</span>
                    Search
                </div>
                <div class="nav-item ${AppState.currentRoute === 'library' ? 'active' : ''}" data-route="library">
                    <span class="material-icons">library_music</span>
                    Your Library
                </div>
            </nav>
            
            <!-- Playlists Section -->
            <div class="mb-4">
                <h6 class="text-muted text-uppercase small mb-3 px-3">Playlists</h6>
                ${renderPlaylistNavigation()}
            </div>
            
            <!-- User Section -->
            <div class="mt-auto">
                <div class="nav-item ${AppState.currentRoute === 'profile' ? 'active' : ''}" data-route="profile">
                    <span class="material-icons">person</span>
                    Profile
                </div>
            </div>
        </div>
    `;
}

function renderPlaylistNavigation() {
    const playlists = getAllPlaylists();
    
    if (playlists.length === 0) {
        return `
            <div class="px-3 text-muted small">
                No playlists yet
            </div>
        `;
    }
    
    return playlists.map(playlist => `
        <div class="nav-item" data-playlist-id="${playlist.id}">
            <span class="material-icons">queue_music</span>
            ${playlist.name}
        </div>
    `).join('');
}

// Mobile navigation toggle (for responsive design)
function toggleMobileNav() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('show');
    }
}

// Add mobile nav button to content area when needed
function renderMobileNavButton() {
    return `
        <button class="btn btn-outline-light d-md-none mb-3" onclick="toggleMobileNav()">
            <span class="material-icons">menu</span>
            Menu
        </button>
    `;
}

// Extension points for navigation features
// TODO: Add playlist creation/editing functionality
// TODO: Implement drag-and-drop playlist reordering
// TODO: Add recently played section
// TODO: Implement navigation breadcrumbs for deep pages