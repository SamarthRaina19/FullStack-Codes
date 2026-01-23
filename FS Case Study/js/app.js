// Main Application Initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎵 Music Player App Starting...');
    
    // Add a small delay to ensure all scripts are loaded
    setTimeout(() => {
        initializeApp();
    }, 100);
});

function initializeApp() {
    try {
        console.log('🔍 Starting initialization...');
        
        // 1. Initialize state management
        if (typeof initializeState === 'function') {
            initializeState();
            console.log('✅ State initialized');
        } else {
            console.warn('⚠️ initializeState function not found');
        }
        
        // 2. Initialize router
        if (typeof initializeRouter === 'function') {
            initializeRouter();
            console.log('✅ Router initialized');
        } else {
            console.warn('⚠️ initializeRouter function not found');
            // Fallback: render home page directly
            renderFallbackHome();
        }
        
        // 3. Set up event listeners
        setupGlobalEventListeners();
        console.log('✅ Event listeners set up');
        
        // 4. Load initial data
        loadInitialData();
        console.log('✅ Initial data loaded');
        
        console.log('🎉 Music Player App Ready!');
        
    } catch (error) {
        console.error('❌ App initialization failed:', error);
        console.error('Error details:', error.message);
        renderFallbackHome();
    }
}

// Fallback home page if router fails
function renderFallbackHome() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="container-fluid p-0">
            <div class="row g-0">
                <div class="col-md-3 bg-dark" style="min-height: 100vh;">
                    <div class="p-3">
                        <h4 class="text-light mb-4">
                            <span class="material-icon me-2">music_note</span>
                            Music Player
                        </h4>
                        <div class="nav-item active mb-2">
                            <span class="material-icons">home</span>
                            Home
                        </div>
                        <div class="nav-item mb-2">
                            <span class="material-icons">search</span>
                            Search
                        </div>
                        <div class="nav-item mb-2">
                            <span class="material-icons">library_music</span>
                            Your Library
                        </div>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="p-4">
                        <h1 class="mb-4">Welcome to Music Player</h1>
                        <p class="text-muted mb-4">Your music collection awaits</p>
                        
                        <div class="row g-3">
                            <div class="col-6 col-md-4 col-lg-3">
                                <div class="music-card p-3">
                                    <div class="album-art mb-3">
                                        <span class="material-icon" style="font-size: 48px;">music_note</span>
                                    </div>
                                    <div class="song-title">Midnight Dreams</div>
                                    <div class="artist-name">Luna Eclipse</div>
                                </div>
                            </div>
                            <div class="col-6 col-md-4 col-lg-3">
                                <div class="music-card p-3">
                                    <div class="album-art mb-3">
                                        <span class="material-icon" style="font-size: 48px;">music_note</span>
                                    </div>
                                    <div class="song-title">Ocean Waves</div>
                                    <div class="artist-name">Coastal Sounds</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Bottom Player -->
            <div class="fixed-bottom bg-dark p-3">
                <div class="d-flex align-items-center justify-content-center">
                    <button class="btn btn-outline-light me-2">
                        ${typeof getCustomIcon === 'function' ? getCustomIcon('skipPrevious', { size: '20' }) : '<span class="material-icons">skip_previous</span>'}
                    </button>
                    <button class="btn btn-success rounded-circle me-2">
                        ${typeof getCustomIcon === 'function' ? getCustomIcon('play', { size: '20' }) : '<span class="material-icons">play_arrow</span>'}
                    </button>
                    <button class="btn btn-outline-light">
                        ${typeof getCustomIcon === 'function' ? getCustomIcon('skipNext', { size: '20' }) : '<span class="material-icons">skip_next</span>'}
                    </button>
                    <div class="ms-4">
                        <small class="text-light">Music Player Ready</small>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function setupGlobalEventListeners() {
    // Handle navigation clicks
    document.addEventListener('click', function(event) {
        const navItem = event.target.closest('.nav-item');
        if (navItem) {
            const route = navItem.getAttribute('data-route');
            if (route) {
                navigateTo(route);
            }
        }
        
        // Handle music card clicks (fallback for cards without onclick)
        const musicCard = event.target.closest('.music-card');
        if (musicCard && !musicCard.hasAttribute('onclick')) {
            const songId = parseInt(musicCard.getAttribute('data-song-id'));
            if (songId) {
                handleSongSelection(songId);
            }
        }
        
        // Handle player controls
        const playerBtn = event.target.closest('.player-btn');
        if (playerBtn) {
            handlePlayerControl(playerBtn);
        }
    });
    
    // Handle search input
    document.addEventListener('input', function(event) {
        if (event.target.classList.contains('search-input')) {
            handleSearchInput(event.target.value);
        }
    });
    
    // Handle keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        // Space bar for play/pause (when not in input)
        if (event.code === 'Space' && !event.target.matches('input, textarea')) {
            event.preventDefault();
            togglePlayback();
        }
        
        // Arrow keys for navigation
        if (event.code === 'ArrowLeft' && event.ctrlKey) {
            previousSong();
        }
        if (event.code === 'ArrowRight' && event.ctrlKey) {
            nextSong();
        }
    });
}

function loadInitialData() {
    try {
        // Load mock data (in real app, this would be API calls)
        if (typeof getAllSongs === 'function' && typeof getAllPlaylists === 'function') {
            const songs = getAllSongs();
            const playlists = getAllPlaylists();
            
            console.log(`Loaded ${songs.length} songs and ${playlists.length} playlists`);
            
            // Set up initial playlist if none exists
            if (AppState && AppState.currentPlaylist && AppState.currentPlaylist.length === 0) {
                if (typeof setCurrentPlaylist === 'function') {
                    setCurrentPlaylist(songs);
                }
            }
        } else {
            console.warn('⚠️ Data functions not available, using fallback');
        }
    } catch (error) {
        console.warn('⚠️ Error loading initial data:', error.message);
    }
}

function handleSongSelection(songId) {
    const song = getSongById(songId);
    if (song) {
        // Create playlist from current context or use all songs
        const contextSongs = getCurrentContextSongs();
        const songIndex = contextSongs.findIndex(s => s.id === songId);
        
        setCurrentPlaylist(contextSongs, songIndex);
        playSong(song); // Use the enhanced playSong function
        
        console.log(`Playing: ${song.title} by ${song.artist}`);
    }
}

function getCurrentContextSongs() {
    // Return songs based on current page context
    switch (AppState.currentRoute) {
        case 'search':
            return AppState.searchResults || getAllSongs();
        case 'library':
            // Return songs from selected playlist or all songs
            return getAllSongs();
        default:
            return getAllSongs();
    }
}

function handlePlayerControl(button) {
    const action = button.getAttribute('data-action');
    
    switch (action) {
        case 'play-pause':
            togglePlayback();
            break;
        case 'previous':
            previousSong();
            break;
        case 'next':
            nextSong();
            break;
        case 'shuffle':
            toggleShuffle();
            break;
        case 'repeat':
            toggleRepeat();
            break;
    }
}

function togglePlayback() {
    if (AppState.currentSong) {
        setPlaybackState(!AppState.isPlaying);
    } else {
        // If no song is selected, play the first song
        const songs = getAllSongs();
        if (songs.length > 0) {
            playSong(songs[0]);
        }
    }
    updatePlayerUI();
}

function handleSearchInput(query) {
    AppState.searchQuery = query;
    
    // Debounce search to avoid too many updates
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
        if (AppState.currentRoute === 'search') {
            performSearch(query);
        }
    }, 300);
}

function performSearch(query) {
    if (query.trim() === '') {
        AppState.searchResults = [];
    } else {
        AppState.searchResults = searchSongs(query);
    }
    
    // Re-render search results if on search page
    if (AppState.currentRoute === 'search') {
        const contentArea = document.querySelector('.content-area');
        if (contentArea) {
            contentArea.innerHTML = renderSearchPage();
        }
    }
}

function updatePlayerUI() {
    const player = document.querySelector('.bottom-player');
    if (player) {
        player.innerHTML = renderPlayer();
    }
}

function showErrorMessage(message) {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
            <div class="text-center">
                <div class="material-icons" style="font-size: 48px; color: var(--text-muted);">error</div>
                <h3 class="mt-3">Oops! Something went wrong</h3>
                <p class="text-muted">${message}</p>
                <button class="btn btn-primary" onclick="location.reload()">Refresh Page</button>
            </div>
        </div>
    `;
}

// Extension points for future features
// TODO: Add service worker for offline functionality
// TODO: Implement push notifications for new releases
// TODO: Add analytics tracking
// TODO: Implement error reporting and logging