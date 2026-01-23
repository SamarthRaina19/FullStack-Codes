// Music Card Component for displaying songs/albums
function renderMusicCard(song, options = {}) {
    const { showArtist = true, showAlbum = false, size = 'normal' } = options;
    
    return `
        <div class="music-card ${size === 'small' ? 'music-card-small' : ''}" 
             data-song-id="${song.id}" 
             onclick="playSong(${JSON.stringify(song).replace(/"/g, '&quot;')})">
            <div class="album-art">
                ${song.albumArt ? 
                    `<img src="${song.albumArt}" alt="${song.album}" class="w-100 h-100 object-fit-cover">` :
                    `<span class="material-icon" style="font-size: 48px;">music_note</span>`
                }
                <div class="play-overlay">
                    <button class="btn btn-success rounded-circle play-btn" onclick="event.stopPropagation(); playSong(${JSON.stringify(song).replace(/"/g, '&quot;')})">
                        ${getCustomIcon('playFilled', { size: '20', className: 'text-white' })}
                    </button>
                </div>
            </div>
            
            <div class="card-content">
                <div class="song-title" title="${song.title}">
                    ${truncateText(song.title, 20)}
                </div>
                
                ${showArtist ? `
                    <div class="artist-name" title="${song.artist}">
                        ${truncateText(song.artist, 18)}
                    </div>
                ` : ''}
                
                ${showAlbum ? `
                    <div class="album-name text-muted small" title="${song.album}">
                        ${truncateText(song.album, 18)}
                    </div>
                ` : ''}
                
                <div class="song-meta d-flex justify-content-between align-items-center mt-2">
                    <span class="duration text-muted small">${song.duration}</span>
                    <div class="song-actions">
                        <button class="btn btn-sm btn-outline-light" data-action="add-to-playlist" title="Add to playlist" onclick="event.stopPropagation();">
                            <span class="material-icons small">add</span>
                        </button>
                        <button class="btn btn-sm btn-outline-light" data-action="favorite" title="Add to favorites" onclick="event.stopPropagation();">
                            <span class="material-icons small">favorite_border</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render a grid of music cards
function renderMusicGrid(songs, options = {}) {
    const { columns = 'auto', title = '', showHeader = true } = options;
    
    if (!songs || songs.length === 0) {
        return renderEmptyState('No songs found');
    }
    
    const gridClass = columns === 'auto' ? 'music-grid-auto' : `music-grid-${columns}`;
    
    return `
        ${showHeader && title ? `
            <div class="section-header mb-4">
                <h3>${title}</h3>
            </div>
        ` : ''}
        
        <div class="row g-3 ${gridClass}">
            ${songs.map(song => `
                <div class="col-6 col-md-4 col-lg-3 col-xl-2">
                    ${renderMusicCard(song, options)}
                </div>
            `).join('')}
        </div>
    `;
}

// Render a list view of songs (for playlists, search results)
function renderMusicList(songs, options = {}) {
    const { showIndex = false, showDuration = true, showAlbum = true } = options;
    
    if (!songs || songs.length === 0) {
        return renderEmptyState('No songs in this list');
    }
    
    return `
        <div class="music-list">
            <div class="list-header d-none d-md-flex text-muted small border-bottom pb-2 mb-2">
                ${showIndex ? '<div class="col-1">#</div>' : ''}
                <div class="col">Title</div>
                ${showAlbum ? '<div class="col-3">Album</div>' : ''}
                ${showDuration ? '<div class="col-2">Duration</div>' : ''}
                <div class="col-1"></div>
            </div>
            
            ${songs.map((song, index) => `
                <div class="list-item d-flex align-items-center p-2 rounded music-card" 
                     data-song-id="${song.id}"
                     onclick="playSong(${JSON.stringify(song).replace(/"/g, '&quot;')})">
                    ${showIndex ? `
                        <div class="col-1 text-muted small">
                            ${index + 1}
                        </div>
                    ` : ''}
                    
                    <div class="col d-flex align-items-center">
                        <div class="album-art-small me-3">
                            ${song.albumArt ? 
                                `<img src="${song.albumArt}" alt="${song.album}" class="rounded">` :
                                `<div class="placeholder-art d-flex align-items-center justify-content-center">
                                    <span class="material-icon">music_note</span>
                                </div>`
                            }
                        </div>
                        <div>
                            <div class="song-title">${song.title}</div>
                            <div class="artist-name text-muted small">${song.artist}</div>
                        </div>
                    </div>
                    
                    ${showAlbum ? `
                        <div class="col-3 d-none d-md-block text-muted">
                            ${song.album}
                        </div>
                    ` : ''}
                    
                    ${showDuration ? `
                        <div class="col-2 d-none d-md-block text-muted">
                            ${song.duration}
                        </div>
                    ` : ''}
                    
                    <div class="col-1">
                        <div class="dropdown">
                            <button class="btn btn-sm btn-outline-light" data-bs-toggle="dropdown" onclick="event.stopPropagation();">
                                <span class="material-icons">more_vert</span>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-dark">
                                <li><a class="dropdown-item" href="#" data-action="add-to-queue">Add to queue</a></li>
                                <li><a class="dropdown-item" href="#" data-action="add-to-playlist">Add to playlist</a></li>
                                <li><a class="dropdown-item" href="#" data-action="favorite">Add to favorites</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Render empty state when no content
function renderEmptyState(message, icon = 'music_off') {
    return `
        <div class="empty-state text-center py-5">
            <span class="material-icons mb-3" style="font-size: 64px; color: var(--text-muted);">${icon}</span>
            <h4 class="text-muted">${message}</h4>
        </div>
    `;
}

// Utility function to truncate text
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Extension points for music card features
// TODO: Add hover animations and transitions
// TODO: Implement drag-and-drop for playlist management
// TODO: Add context menu with more actions
// TODO: Implement virtual scrolling for large lists