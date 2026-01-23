// Search Page - Find Music, Artists, and Playlists
function renderSearchPage() {
    const searchQuery = AppState.searchQuery || '';
    const searchResults = AppState.searchResults || [];
    const hasQuery = searchQuery.trim().length > 0;
    
    return `
        <div class="search-page">
            ${renderMobileNavButton()}
            
            <!-- Search Header -->
            <div class="search-header mb-4">
                <h1 class="mb-3">Search</h1>
                
                <!-- Search Input -->
                <div class="search-input-container mb-4">
                    <div class="position-relative">
                        <span class="material-icons position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
                            search
                        </span>
                        <input type="text" 
                               class="search-input ps-5" 
                               placeholder="What do you want to listen to?"
                               value="${searchQuery}"
                               autocomplete="off">
                        ${searchQuery ? `
                            <button class="btn btn-sm position-absolute top-50 end-0 translate-middle-y me-2" 
                                    onclick="clearSearch()" 
                                    title="Clear search">
                                <span class="material-icons small">close</span>
                            </button>
                        ` : ''}
                    </div>
                </div>
                
                <!-- Search Filters -->
                ${hasQuery ? renderSearchFilters() : ''}
            </div>
            
            <!-- Search Content -->
            <div class="search-content">
                ${hasQuery ? renderSearchResults(searchResults, searchQuery) : renderBrowseContent()}
            </div>
        </div>
    `;
}

function renderSearchFilters() {
    const filters = ['All', 'Songs', 'Artists', 'Albums', 'Playlists'];
    const activeFilter = AppState.searchFilter || 'All';
    
    return `
        <div class="search-filters mb-4">
            <div class="d-flex gap-2 flex-wrap">
                ${filters.map(filter => `
                    <button class="btn ${activeFilter === filter ? 'btn-success' : 'btn-outline-light'} btn-sm" 
                            data-filter="${filter}">
                        ${filter}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

function renderSearchResults(results, query) {
    if (results.length === 0) {
        return renderNoResults(query);
    }
    
    // Group results by type for better organization
    const songs = results;
    const artists = getUniqueArtists(results);
    const albums = getUniqueAlbums(results);
    
    return `
        <div class="search-results">
            <!-- Top Result -->
            ${songs.length > 0 ? `
                <section class="top-result-section mb-5">
                    <h3 class="mb-3">Top result</h3>
                    <div class="row">
                        <div class="col-12 col-md-6">
                            ${renderTopResult(songs[0])}
                        </div>
                    </div>
                </section>
            ` : ''}
            
            <!-- Songs -->
            ${songs.length > 0 ? `
                <section class="songs-section mb-5">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h3>Songs</h3>
                        ${songs.length > 5 ? `
                            <button class="btn btn-outline-light btn-sm">Show all</button>
                        ` : ''}
                    </div>
                    ${renderMusicList(songs.slice(0, 5), { showAlbum: true, showDuration: true })}
                </section>
            ` : ''}
            
            <!-- Artists -->
            ${artists.length > 0 ? `
                <section class="artists-section mb-5">
                    <h3 class="mb-3">Artists</h3>
                    <div class="row g-3">
                        ${renderArtistCards(artists.slice(0, 6))}
                    </div>
                </section>
            ` : ''}
            
            <!-- Albums -->
            ${albums.length > 0 ? `
                <section class="albums-section mb-5">
                    <h3 class="mb-3">Albums</h3>
                    ${renderMusicGrid(songs.slice(0, 6), { showAlbum: true, columns: 6, showHeader: false })}
                </section>
            ` : ''}
        </div>
    `;
}

function renderTopResult(song) {
    return `
        <div class="top-result-card p-4 rounded music-card" 
             data-song-id="${song.id}"
             style="background: linear-gradient(135deg, var(--accent-primary), var(--accent-hover)); min-height: 200px;">
            <div class="d-flex flex-column h-100">
                <div class="mb-auto">
                    <div class="album-art-large mb-3" style="width: 80px; height: 80px;">
                        ${song.albumArt ? 
                            `<img src="${song.albumArt}" alt="${song.album}" class="w-100 h-100 rounded object-fit-cover">` :
                            `<div class="placeholder-art w-100 h-100 rounded d-flex align-items-center justify-content-center">
                                <span class="material-icon" style="font-size: 32px;">music_note</span>
                            </div>`
                        }
                    </div>
                    <h4 class="fw-bold text-white mb-1">${song.title}</h4>
                    <p class="text-white-50 mb-2">${song.artist}</p>
                    <span class="badge bg-dark bg-opacity-50">Song</span>
                </div>
                <div class="mt-3">
                    <button class="btn btn-success btn-lg rounded-circle" data-action="play">
                        <span class="material-icons">play_arrow</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderArtistCards(artists) {
    return artists.map(artist => `
        <div class="col-6 col-md-4 col-lg-2">
            <div class="artist-card text-center music-card" data-artist="${artist}">
                <div class="artist-avatar mx-auto mb-3" 
                     style="width: 120px; height: 120px; border-radius: 50%; background: var(--tertiary-bg); display: flex; align-items: center; justify-content: center;">
                    <span class="material-icons" style="font-size: 48px; color: var(--text-muted);">person</span>
                </div>
                <h6 class="fw-bold mb-1">${artist}</h6>
                <p class="text-muted small">Artist</p>
            </div>
        </div>
    `).join('');
}

function renderBrowseContent() {
    const genres = ['Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Jazz', 'Classical', 'Country', 'R&B', 'Folk', 'Reggae'];
    const moods = ['Happy', 'Sad', 'Energetic', 'Chill', 'Romantic', 'Focus'];
    
    return `
        <div class="browse-content">
            <!-- Browse Categories -->
            <section class="browse-categories mb-5">
                <h3 class="mb-4">Browse all</h3>
                <div class="row g-3">
                    ${renderBrowseCategories(genres)}
                </div>
            </section>
            
            <!-- Mood and Activity -->
            <section class="mood-section mb-5">
                <h3 class="mb-4">Mood and activity</h3>
                <div class="row g-3">
                    ${renderMoodCards(moods)}
                </div>
            </section>
            
            <!-- Recent Searches -->
            ${renderRecentSearches()}
        </div>
    `;
}

function renderBrowseCategories(categories) {
    const colors = [
        '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', 
        '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'
    ];
    
    return categories.map((category, index) => `
        <div class="col-6 col-md-4 col-lg-3">
            <div class="browse-category-card p-3 rounded text-white position-relative overflow-hidden" 
                 style="background-color: ${colors[index % colors.length]}; cursor: pointer; min-height: 100px;"
                 data-category="${category}">
                <h6 class="fw-bold">${category}</h6>
                <span class="material-icon position-absolute" 
                      style="bottom: 10px; right: 10px; font-size: 24px; opacity: 0.7; transform: rotate(15deg);">
                    music_note
                </span>
            </div>
        </div>
    `).join('');
}

function renderMoodCards(moods) {
    return moods.map(mood => `
        <div class="col-6 col-md-4 col-lg-2">
            <div class="mood-card text-center p-3 rounded music-card" data-mood="${mood}">
                <div class="mood-icon mb-2">
                    <span class="material-icons" style="font-size: 32px;">${getMoodIcon(mood)}</span>
                </div>
                <h6 class="fw-bold">${mood}</h6>
            </div>
        </div>
    `).join('');
}

function renderRecentSearches() {
    const recentSearches = getRecentSearches();
    
    if (recentSearches.length === 0) {
        return '';
    }
    
    return `
        <section class="recent-searches">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h4>Recent searches</h4>
                <button class="btn btn-outline-light btn-sm" onclick="clearRecentSearches()">Clear all</button>
            </div>
            <div class="d-flex flex-wrap gap-2">
                ${recentSearches.map(search => `
                    <button class="btn btn-outline-light btn-sm" onclick="performSearch('${search}')">
                        <span class="material-icons me-1 small">history</span>
                        ${search}
                    </button>
                `).join('')}
            </div>
        </section>
    `;
}

function renderNoResults(query) {
    return `
        <div class="no-results text-center py-5">
            <span class="material-icons mb-3" style="font-size: 64px; color: var(--text-muted);">search_off</span>
            <h4>No results found for "${query}"</h4>
            <p class="text-muted mb-4">Try searching for something else or check your spelling</p>
            <div class="d-flex justify-content-center gap-2">
                <button class="btn btn-outline-light" onclick="clearSearch()">Clear search</button>
                <button class="btn btn-success" onclick="navigateTo('home')">Browse music</button>
            </div>
        </div>
    `;
}

// Helper functions
function getUniqueArtists(songs) {
    return [...new Set(songs.map(song => song.artist))];
}

function getUniqueAlbums(songs) {
    return [...new Set(songs.map(song => song.album))];
}

function getMoodIcon(mood) {
    const icons = {
        'Happy': 'sentiment_very_satisfied',
        'Sad': 'sentiment_very_dissatisfied',
        'Energetic': 'flash_on',
        'Chill': 'ac_unit',
        'Romantic': 'favorite',
        'Focus': 'center_focus_strong'
    };
    return icons[mood] || 'music_note';
}

function getRecentSearches() {
    const searches = localStorage.getItem('recentSearches');
    return searches ? JSON.parse(searches) : [];
}

function clearSearch() {
    AppState.searchQuery = '';
    AppState.searchResults = [];
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
    }
    renderCurrentPage();
}

function clearRecentSearches() {
    localStorage.removeItem('recentSearches');
    renderCurrentPage();
}

// Extension points for search features
// TODO: Add voice search functionality
// TODO: Implement search suggestions and autocomplete
// TODO: Add advanced search filters (year, genre, duration)
// TODO: Implement search history and favorites