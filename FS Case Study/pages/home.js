// Home Page - Discover and Featured Content
function renderHomePage() {
    const recentSongs = getAllSongs().slice(0, 6); // Get first 6 songs as "recent"
    const popularSongs = getAllSongs().slice(2, 8); // Different subset as "popular"
    const playlists = getAllPlaylists();
    
    return `
        <div class="home-page">
            ${renderMobileNavButton()}
            
            <!-- Welcome Header -->
            <div class="welcome-section mb-5">
                <h1 class="display-6 mb-2">Good ${getTimeOfDayGreeting()}</h1>
                <p class="text-muted lead">Discover your next favorite song</p>
            </div>
            
            <!-- Quick Access Cards -->
            <div class="quick-access-section mb-5">
                <div class="row g-3">
                    ${renderQuickAccessCards()}
                </div>
            </div>
            
            <!-- Recently Played -->
            <section class="recently-played-section mb-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h3>Recently Played</h3>
                    ${MuiButton({
                        variant: 'outlined',
                        size: 'small',
                        children: 'Show all'
                    })}
                </div>
                ${renderMusicGrid(recentSongs, { columns: 6, showHeader: false })}
            </section>
            
            <!-- Popular This Week -->
            <section class="popular-section mb-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h3>Popular This Week</h3>
                    ${MuiButton({
                        variant: 'outlined',
                        size: 'small',
                        children: 'Show all'
                    })}
                </div>
                <div class="row g-3">
                    ${popularSongs.map(song => `
                        <div class="col-6 col-md-4 col-lg-3 col-xl-2">
                            ${MuiMusicCard(song, { showArtist: true })}
                        </div>
                    `).join('')}
                </div>
            </section>
            
            <!-- Your Playlists -->
            ${playlists.length > 0 ? `
                <section class="playlists-section mb-5">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h3>Your Playlists</h3>
                        <button class="btn btn-success btn-sm" data-action="create-playlist">
                            <span class="material-icons me-1 small">add</span>
                            Create Playlist
                        </button>
                    </div>
                    <div class="row g-3">
                        ${renderPlaylistCards(playlists)}
                    </div>
                </section>
            ` : ''}
            
            <!-- Discover New Music -->
            <section class="discover-section mb-5">
                <h3 class="mb-3">Discover New Music</h3>
                <div class="row g-3">
                    ${renderDiscoverCards()}
                </div>
            </section>
            
            <!-- Made For You -->
            <section class="recommendations-section mb-5">
                <h3 class="mb-3">Made For You</h3>
                <p class="text-muted mb-4">Personalized recommendations based on your listening history</p>
                ${renderMusicList(getAllSongs().slice(0, 5), { showIndex: true, showAlbum: true })}
            </section>
            
            <!-- Retro Cassette Player -->
            <section class="retro-player-section">
                <div class="row justify-content-center">
                    <div class="col-md-8 col-lg-6">
                        <div class="text-center mb-4">
                            <h4>🎵 Retro Player</h4>
                            <p class="text-muted">Experience your music with a vintage cassette player</p>
                        </div>
                        ${typeof CassettePlayerWithInfo === 'function' ? CassettePlayerWithInfo() : CassettePlayer()}
                        <div class="text-center mt-3">
                            <small class="text-muted">Click play to see the cassette reels spin!</small>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    `;
}

// Mobile navigation button (defined here to avoid missing function error)
function renderMobileNavButton() {
    return `
        <button class="btn btn-outline-light d-md-none mb-3" onclick="toggleMobileNav()">
            <span class="material-icons">menu</span>
            Menu
        </button>
    `;
}

function renderQuickAccessCards() {
    const recentPlaylists = getAllPlaylists().slice(0, 4);
    const quickItems = [
        { name: 'Liked Songs', icon: 'favorite', color: 'linear-gradient(135deg, #ff6b6b, #ee5a24)' },
        { name: 'Recently Played', icon: 'history', color: 'linear-gradient(135deg, #4834d4, #686de0)' },
        ...recentPlaylists.map(playlist => ({
            name: playlist.name,
            icon: 'queue_music',
            color: 'linear-gradient(135deg, #00d2d3, #54a0ff)'
        }))
    ].slice(0, 6);
    
    return quickItems.map(item => `
        <div class="col-6 col-md-4 col-lg-2">
            <div class="quick-access-card p-3 rounded d-flex align-items-center" 
                 style="background: ${item.color}; cursor: pointer;">
                <span class="material-icons me-2">${item.icon}</span>
                <span class="fw-bold small">${truncateText(item.name, 12)}</span>
            </div>
        </div>
    `).join('');
}

function renderPlaylistCards(playlists) {
    return playlists.map(playlist => {
        const songs = playlist.songIds.map(id => getSongById(id)).filter(Boolean);
        const songCount = songs.length;
        
        return `
            <div class="col-6 col-md-4 col-lg-3">
                <div class="playlist-card music-card" data-playlist-id="${playlist.id}">
                    <div class="playlist-art album-art">
                        <div class="playlist-grid">
                            ${songs.slice(0, 4).map(song => `
                                <div class="playlist-grid-item">
                                    ${song.albumArt ? 
                                        `<img src="${song.albumArt}" alt="${song.album}">` :
                                        `<div class="placeholder-art">
                                            <span class="material-icon">music_note</span>
                                        </div>`
                                    }
                                </div>
                            `).join('')}
                            ${Array(Math.max(0, 4 - songs.length)).fill(0).map(() => `
                                <div class="playlist-grid-item placeholder-art">
                                    <span class="material-icon">music_note</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="song-title">${playlist.name}</div>
                        <div class="artist-name">${songCount} song${songCount !== 1 ? 's' : ''}</div>
                        <div class="text-muted small mt-1">${playlist.description}</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderDiscoverCards() {
    const genres = ['Electronic', 'Pop', 'Folk', 'Ambient', 'Synthwave'];
    
    return genres.map(genre => {
        const genreSongs = getSongsByGenre(genre);
        const colors = [
            'linear-gradient(135deg, #667eea, #764ba2)',
            'linear-gradient(135deg, #f093fb, #f5576c)',
            'linear-gradient(135deg, #4facfe, #00f2fe)',
            'linear-gradient(135deg, #43e97b, #38f9d7)',
            'linear-gradient(135deg, #fa709a, #fee140)'
        ];
        
        return `
            <div class="col-6 col-md-4 col-lg-3">
                <div class="discover-card p-4 rounded text-white position-relative overflow-hidden" 
                     style="background: ${colors[genres.indexOf(genre) % colors.length]}; cursor: pointer; min-height: 120px;"
                     data-genre="${genre}">
                    <h5 class="fw-bold mb-1">${genre}</h5>
                    <p class="small mb-0 opacity-75">${genreSongs.length} song${genreSongs.length !== 1 ? 's' : ''}</p>
                    <span class="material-icon position-absolute" 
                          style="bottom: 10px; right: 10px; font-size: 32px; opacity: 0.7;">
                        music_note
                    </span>
                </div>
            </div>
        `;
    }).join('');
}

function getTimeOfDayGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
}

// Additional cassette player section function
function renderCassetteSection() {
    return `
        <section class="retro-player-section mt-5 mb-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-8 col-lg-6">
                        <div class="text-center mb-4">
                            <h4>🎵 Retro Player</h4>
                            <p class="text-muted">Experience your music with a vintage cassette player</p>
                        </div>
                        ${typeof CassettePlayerWithInfo === 'function' ? CassettePlayerWithInfo() : CassettePlayer()}
                        <div class="text-center mt-3">
                            <small class="text-muted">Click play to see the cassette reels spin!</small>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// Extension points for home page features
// TODO: Add personalized recommendations based on listening history
// TODO: Implement dynamic content based on time of day/week
// TODO: Add social features (friends' activity, shared playlists)
// TODO: Implement content refresh and infinite scroll