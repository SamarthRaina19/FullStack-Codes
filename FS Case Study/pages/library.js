// Library Page - User's Music Collection and Playlists
function renderLibraryPage() {
    const playlists = getAllPlaylists();
    const allSongs = getAllSongs();
    const likedSongs = getLikedSongs(); // Mock function for liked songs
    const recentlyPlayed = getRecentlyPlayed(); // Mock function for recently played
    
    return `
        <div class="library-page">
            ${renderMobileNavButton()}
            
            <!-- Library Header -->
            <div class="library-header mb-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h1>Your Library</h1>
                    <div class="library-actions">
                        <button class="btn btn-success" data-action="create-playlist">
                            <span class="material-icons me-1">add</span>
                            Create Playlist
                        </button>
                    </div>
                </div>
                
                <!-- Library Navigation Tabs -->
                <div class="library-tabs mb-4">
                    <div class="d-flex gap-2 flex-wrap">
                        <button class="btn btn-outline-light btn-sm active" data-tab="all">All</button>
                        <button class="btn btn-outline-light btn-sm" data-tab="playlists">Playlists</button>
                        <button class="btn btn-outline-light btn-sm" data-tab="artists">Artists</button>
                        <button class="btn btn-outline-light btn-sm" data-tab="albums">Albums</button>
                        <button class="btn btn-outline-light btn-sm" data-tab="downloaded">Downloaded</button>
                    </div>
                </div>
                
                <!-- Sort and Filter Options -->
                <div class="library-controls d-flex justify-content-between align-items-center">
                    <div class="view-options">
                        <button class="btn btn-sm btn-outline-light" data-view="list" title="List view">
                            <span class="material-icons small">view_list</span>
                        </button>
                        <button class="btn btn-sm btn-outline-light active" data-view="grid" title="Grid view">
                            <span class="material-icons small">grid_view</span>
                        </button>
                    </div>
                    
                    <div class="sort-options">
                        <select class="form-select form-select-sm bg-dark text-light border-secondary" style="width: auto;">
                            <option value="recent">Recently added</option>
                            <option value="alphabetical">Alphabetical</option>
                            <option value="artist">By artist</option>
                            <option value="created">Date created</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <!-- Library Content -->
            <div class="library-content">
                ${renderLibraryContent(playlists, allSongs, likedSongs, recentlyPlayed)}
            </div>
        </div>
    `;
}

function renderLibraryContent(playlists, allSongs, likedSongs, recentlyPlayed) {
    return `
        <!-- Quick Access Items -->
        <div class="quick-library-items mb-5">
            <div class="row g-3">
                <!-- Liked Songs -->
                <div class="col-12">
                    <div class="library-item d-flex align-items-center p-3 rounded music-card" data-type="liked-songs">
                        <div class="item-art me-3">
                            <div class="liked-songs-art d-flex align-items-center justify-content-center">
                                <span class="material-icons text-white">favorite</span>
                            </div>
                        </div>
                        <div class="item-info flex-grow-1">
                            <h6 class="mb-1 fw-bold">Liked Songs</h6>
                            <p class="text-muted small mb-0">${likedSongs.length} song${likedSongs.length !== 1 ? 's' : ''}</p>
                        </div>
                        <div class="item-actions">
                            <button class="btn btn-success btn-sm rounded-circle" data-action="play-liked">
                                <span class="material-icons small">play_arrow</span>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Recently Played -->
                <div class="col-12">
                    <div class="library-item d-flex align-items-center p-3 rounded music-card" data-type="recently-played">
                        <div class="item-art me-3">
                            <div class="recently-played-art d-flex align-items-center justify-content-center">
                                <span class="material-icons text-white">history</span>
                            </div>
                        </div>
                        <div class="item-info flex-grow-1">
                            <h6 class="mb-1 fw-bold">Recently Played</h6>
                            <p class="text-muted small mb-0">${recentlyPlayed.length} song${recentlyPlayed.length !== 1 ? 's' : ''}</p>
                        </div>
                        <div class="item-actions">
                            <button class="btn btn-success btn-sm rounded-circle" data-action="play-recent">
                                <span class="material-icons small">play_arrow</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- User Playlists -->
        ${playlists.length > 0 ? `
            <section class="user-playlists mb-5">
                <h4 class="mb-3">Made by you</h4>
                <div class="playlists-container">
                    ${renderPlaylistsLibrary(playlists)}
                </div>
            </section>
        ` : ''}
        
        <!-- All Songs -->
        <section class="all-songs">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h4>All Songs</h4>
                <span class="text-muted">${allSongs.length} song${allSongs.length !== 1 ? 's' : ''}</span>
            </div>
            ${renderMusicList(allSongs, { showIndex: true, showAlbum: true, showDuration: true })}
        </section>
    `;
}

function renderPlaylistsLibrary(playlists) {
    return `
        <div class="row g-3">
            ${playlists.map(playlist => {
                const songs = playlist.songIds.map(id => getSongById(id)).filter(Boolean);
                const totalDuration = calculatePlaylistDuration(songs);
                
                return `
                    <div class="col-12">
                        <div class="playlist-library-item d-flex align-items-center p-3 rounded music-card" 
                             data-playlist-id="${playlist.id}">
                            <div class="playlist-art me-3">
                                ${renderPlaylistArtwork(songs)}
                            </div>
                            <div class="playlist-info flex-grow-1">
                                <h6 class="mb-1 fw-bold">${playlist.name}</h6>
                                <p class="text-muted small mb-1">${playlist.description}</p>
                                <div class="playlist-meta text-muted small">
                                    ${songs.length} song${songs.length !== 1 ? 's' : ''} • ${totalDuration}
                                </div>
                            </div>
                            <div class="playlist-actions d-flex align-items-center gap-2">
                                <button class="btn btn-sm btn-outline-light" data-action="edit-playlist" title="Edit playlist">
                                    <span class="material-icons small">edit</span>
                                </button>
                                <button class="btn btn-success btn-sm rounded-circle" data-action="play-playlist" title="Play playlist">
                                    <span class="material-icons small">play_arrow</span>
                                </button>
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-outline-light" data-bs-toggle="dropdown">
                                        <span class="material-icons small">more_vert</span>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-dark">
                                        <li><a class="dropdown-item" href="#" data-action="share-playlist">Share</a></li>
                                        <li><a class="dropdown-item" href="#" data-action="duplicate-playlist">Duplicate</a></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item text-danger" href="#" data-action="delete-playlist">Delete</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function renderPlaylistArtwork(songs) {
    if (songs.length === 0) {
        return `
            <div class="playlist-art-empty">
                <span class="material-icons">queue_music</span>
            </div>
        `;
    }
    
    if (songs.length === 1) {
        const song = songs[0];
        return `
            <div class="playlist-art-single">
                ${song.albumArt ? 
                    `<img src="${song.albumArt}" alt="${song.album}">` :
                    `<div class="placeholder-art">
                        <span class="material-icon">music_note</span>
                    </div>`
                }
            </div>
        `;
    }
    
    // Multiple songs - create a grid
    return `
        <div class="playlist-art-grid">
            ${songs.slice(0, 4).map(song => `
                <div class="art-grid-item">
                    ${song.albumArt ? 
                        `<img src="${song.albumArt}" alt="${song.album}">` :
                        `<div class="placeholder-art">
                            <span class="material-icon small">music_note</span>
                        </div>`
                    }
                </div>
            `).join('')}
            ${Array(Math.max(0, 4 - songs.length)).fill(0).map(() => `
                <div class="art-grid-item placeholder-art">
                    <span class="material-icon small">music_note</span>
                </div>
            `).join('')}
        </div>
    `;
}

function renderEmptyLibrary() {
    return `
        <div class="empty-library text-center py-5">
            <span class="material-icons mb-3" style="font-size: 64px; color: var(--text-muted);">library_music</span>
            <h4>Your library is empty</h4>
            <p class="text-muted mb-4">Start building your music collection by creating playlists and liking songs</p>
            <div class="d-flex justify-content-center gap-2">
                <button class="btn btn-success" data-action="create-playlist">
                    <span class="material-icons me-1">add</span>
                    Create Playlist
                </button>
                <button class="btn btn-outline-light" onclick="navigateTo('search')">
                    <span class="material-icons me-1">search</span>
                    Find Music
                </button>
            </div>
        </div>
    `;
}

// Mock functions for demo data
function getLikedSongs() {
    // In a real app, this would fetch user's liked songs
    return getAllSongs().slice(0, 3); // Mock: first 3 songs as liked
}

function getRecentlyPlayed() {
    // In a real app, this would fetch recently played songs
    return getAllSongs().slice(1, 4); // Mock: songs 2-4 as recently played
}

function calculatePlaylistDuration(songs) {
    // Mock calculation - in real app would sum actual durations
    const totalMinutes = songs.length * 3.5; // Average 3.5 minutes per song
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    
    if (hours > 0) {
        return `${hours} hr ${minutes} min`;
    }
    return `${minutes} min`;
}

// Extension points for library features
// TODO: Add playlist creation and editing functionality
// TODO: Implement drag-and-drop song reordering
// TODO: Add bulk operations (select multiple, delete, move)
// TODO: Implement library sync and backup features