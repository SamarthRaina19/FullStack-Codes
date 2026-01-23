// Bottom Music Player Component
function renderPlayer() {
    const currentSong = AppState.currentSong;
    const isPlaying = AppState.isPlaying;
    
    if (!currentSong) {
        return renderEmptyPlayer();
    }
    
    return `
        <div class="player-container d-flex align-items-center h-100 px-3">
            <!-- Current Song Info -->
            <div class="current-song-info d-flex align-items-center" style="min-width: 200px;">
                <div class="album-art-player me-3">
                    ${currentSong.albumArt ? 
                        `<img src="${currentSong.albumArt}" alt="${currentSong.album}" class="rounded">` :
                        `<div class="placeholder-art d-flex align-items-center justify-content-center">
                            <span class="material-icon">music_note</span>
                        </div>`
                    }
                </div>
                <div class="song-details">
                    <div class="song-title small fw-bold">${currentSong.title}</div>
                    <div class="artist-name small text-muted">${currentSong.artist}</div>
                </div>
                <button class="btn btn-sm btn-outline-light ms-2" data-action="favorite" title="Add to favorites">
                    <span class="material-icons small">favorite_border</span>
                </button>
            </div>
            
            <!-- Player Controls -->
            <div class="player-controls-section flex-grow-1 d-flex flex-column align-items-center">
                <!-- Cassette Visual (when playing) -->
                ${isPlaying ? `
                    <div class="cassette-visual mb-2">
                        ${CassettePlayer()}
                    </div>
                ` : ''}
                
                <!-- Control Buttons -->
                <div class="player-controls mb-2">
                    ${MuiButton({
                        variant: 'text',
                        onClick: 'toggleShuffle()',
                        className: `player-btn ${AppState.preferences.shuffle ? 'text-success' : ''}`,
                        children: '<span class="material-icons">shuffle</span>'
                    })}
                    
                    ${MuiFab({
                        size: 'small',
                        onClick: 'previousSong()',
                        className: 'player-btn',
                        children: getCustomIcon('skipPrevious', { size: '20' })
                    })}
                    
                    ${MuiFab({
                        onClick: 'togglePlayback()',
                        className: 'player-btn play-pause',
                        children: isPlaying ? getCustomIcon('pause', { size: '20' }) : getCustomIcon('play', { size: '20' })
                    })}
                    
                    ${MuiFab({
                        size: 'small',
                        onClick: 'nextSong()',
                        className: 'player-btn',
                        children: getCustomIcon('skipNext', { size: '20' })
                    })}
                    
                    ${MuiButton({
                        variant: 'text',
                        onClick: 'toggleRepeat()',
                        className: `player-btn ${getRepeatIconClass()}`,
                        children: '<span class="material-icons">repeat</span>'
                    })}
                </div>
                
                <!-- Progress Bar -->
                <div class="progress-section d-flex align-items-center w-100" style="max-width: 500px;">
                    <span class="current-time small text-muted me-2">${formatTime(AppState.currentTime)}</span>
                    <div class="progress-bar flex-grow-1 mx-2">
                        <div class="progress-fill" style="width: ${getProgressPercentage()}%"></div>
                    </div>
                    <span class="total-time small text-muted ms-2">${currentSong.duration}</span>
                </div>
            </div>
            
            <!-- Volume and Additional Controls -->
            <div class="player-extras d-flex align-items-center" style="min-width: 200px; justify-content: flex-end;">
                <button class="btn btn-sm btn-outline-light me-2" data-action="queue" title="Queue">
                    <span class="material-icons small">queue_music</span>
                </button>
                
                <div class="volume-control d-flex align-items-center">
                    <button class="btn btn-sm btn-outline-light me-2" data-action="mute" title="Mute">
                        <span class="material-icons small">${getVolumeIcon()}</span>
                    </button>
                    <div class="volume-slider" style="width: 80px;">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${AppState.volume * 100}%"></div>
                        </div>
                    </div>
                </div>
                
                <button class="btn btn-sm btn-outline-light ms-2 d-none d-lg-block" data-action="fullscreen" title="Full screen">
                    <span class="material-icons small">fullscreen</span>
                </button>
            </div>
        </div>
    `;
}

function renderEmptyPlayer() {
    return `
        <div class="player-container d-flex align-items-center justify-content-center h-100">
            <div class="text-center text-muted">
                <span class="material-icons mb-2" style="font-size: 32px;">music_off</span>
                <div class="small">No song selected</div>
            </div>
        </div>
    `;
}

// Helper functions for player state
function getRepeatIconClass() {
    const repeat = AppState.preferences.repeat;
    if (repeat === 'none') return '';
    if (repeat === 'one') return 'text-success';
    if (repeat === 'all') return 'text-success';
    return '';
}

function getProgressPercentage() {
    if (!AppState.currentSong || AppState.duration === 0) return 0;
    return (AppState.currentTime / AppState.duration) * 100;
}

function getVolumeIcon() {
    const volume = AppState.volume;
    if (volume === 0) return 'volume_off';
    if (volume < 0.5) return 'volume_down';
    return 'volume_up';
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Mobile-optimized player for smaller screens
function renderMobilePlayer() {
    const currentSong = AppState.currentSong;
    const isPlaying = AppState.isPlaying;
    
    if (!currentSong) {
        return renderEmptyPlayer();
    }
    
    return `
        <div class="mobile-player-container d-flex align-items-center h-100 px-3">
            <!-- Song Info (Compact) -->
            <div class="current-song-info d-flex align-items-center flex-grow-1">
                <div class="album-art-mobile me-2">
                    ${currentSong.albumArt ? 
                        `<img src="${currentSong.albumArt}" alt="${currentSong.album}" class="rounded">` :
                        `<div class="placeholder-art-small">
                            <span class="material-icon small">music_note</span>
                        </div>`
                    }
                </div>
                <div class="song-details flex-grow-1">
                    <div class="song-title small fw-bold">${truncateText(currentSong.title, 25)}</div>
                    <div class="artist-name small text-muted">${truncateText(currentSong.artist, 20)}</div>
                </div>
            </div>
            
            <!-- Essential Controls -->
            <div class="mobile-controls d-flex align-items-center">
                <button class="player-btn" data-action="previous">
                    ${getCustomIcon('skipPrevious', { size: '18' })}
                </button>
                
                <button class="player-btn play-pause" data-action="play-pause">
                    ${isPlaying ? getCustomIcon('pause', { size: '18' }) : getCustomIcon('play', { size: '18' })}
                </button>
                
                <button class="player-btn" data-action="next">
                    ${getCustomIcon('skipNext', { size: '18' })}
                </button>
            </div>
        </div>
        
        <!-- Progress bar overlay -->
        <div class="mobile-progress-overlay">
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${getProgressPercentage()}%"></div>
            </div>
        </div>
    `;
}

// Extension points for player features
// TODO: Add waveform visualization
// TODO: Implement touch gestures for mobile
// TODO: Add lyrics display functionality
// TODO: Implement crossfade between songs
// TODO: Add equalizer controls

// Cassette Player Component
function CassettePlayer() {
    const isPlaying = AppState.isPlaying;
    return `
        <div class="cassette-container ${isPlaying ? 'playing' : ''}">
            <div class="cassette">
                <div class="reel left"></div>
                <div class="reel right"></div>
            </div>
        </div>
    `;
}

// Enhanced Cassette Player with song info
function CassettePlayerWithInfo() {
    const currentSong = AppState.currentSong;
    const isPlaying = AppState.isPlaying;
    
    if (!currentSong) return '';
    
    return `
        <div class="cassette-player-full">
            <div class="cassette-info mb-2 text-center">
                <div class="small text-muted">Now Playing</div>
                <div class="fw-bold">${currentSong.title}</div>
                <div class="small text-muted">${currentSong.artist}</div>
            </div>
            ${CassettePlayer()}
        </div>
    `;
}