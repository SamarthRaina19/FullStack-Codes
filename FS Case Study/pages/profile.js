// Profile Page - User Settings and Preferences
function renderProfilePage() {
    const userStats = getUserStats(); // Mock user statistics
    const preferences = AppState.preferences;
    
    return `
        <div class="profile-page">
            ${renderMobileNavButton()}
            
            <!-- Profile Header -->
            <div class="profile-header mb-5">
                <div class="row align-items-center">
                    <div class="col-auto">
                        <div class="profile-avatar">
                            <span class="material-icons">person</span>
                        </div>
                    </div>
                    <div class="col">
                        <h1 class="mb-1">Music Lover</h1>
                        <p class="text-muted mb-2">Free account</p>
                        <button class="btn btn-success btn-sm">Upgrade to Premium</button>
                    </div>
                </div>
            </div>
            
            <!-- User Statistics -->
            <section class="user-stats mb-5">
                <h3 class="mb-3">Your music stats</h3>
                <div class="row g-3">
                    ${renderUserStats(userStats)}
                </div>
            </section>
            
            <!-- Settings Sections -->
            <div class="settings-container">
                <!-- Playback Settings -->
                <section class="settings-section mb-4">
                    <h4 class="mb-3">Playback</h4>
                    <div class="settings-group">
                        ${renderPlaybackSettings(preferences)}
                    </div>
                </section>
                
                <!-- Display Settings -->
                <section class="settings-section mb-4">
                    <h4 class="mb-3">Display</h4>
                    <div class="settings-group">
                        ${renderDisplaySettings(preferences)}
                    </div>
                </section>
                
                <!-- Privacy Settings -->
                <section class="settings-section mb-4">
                    <h4 class="mb-3">Privacy</h4>
                    <div class="settings-group">
                        ${renderPrivacySettings()}
                    </div>
                </section>
                
                <!-- Account Settings -->
                <section class="settings-section mb-4">
                    <h4 class="mb-3">Account</h4>
                    <div class="settings-group">
                        ${renderAccountSettings()}
                    </div>
                </section>
                
                <!-- About Section -->
                <section class="settings-section">
                    <h4 class="mb-3">About</h4>
                    <div class="settings-group">
                        ${renderAboutSection()}
                    </div>
                </section>
            </div>
        </div>
    `;
}

function renderUserStats(stats) {
    const statItems = [
        { label: 'Songs played', value: stats.songsPlayed, icon: 'play_circle' },
        { label: 'Hours listened', value: stats.hoursListened, icon: 'schedule' },
        { label: 'Playlists created', value: stats.playlistsCreated, icon: 'queue_music' },
        { label: 'Favorite artists', value: stats.favoriteArtists, icon: 'favorite' }
    ];
    
    return statItems.map(stat => `
        <div class="col-6 col-md-3">
            <div class="stat-card text-center p-3 rounded">
                <span class="material-icons mb-2 text-success" style="font-size: 32px;">${stat.icon}</span>
                <h4 class="mb-1">${stat.value}</h4>
                <p class="text-muted small mb-0">${stat.label}</p>
            </div>
        </div>
    `).join('');
}

function renderPlaybackSettings(preferences) {
    return `
        <div class="setting-item d-flex justify-content-between align-items-center py-3 border-bottom">
            <div>
                <h6 class="mb-1">Autoplay</h6>
                <p class="text-muted small mb-0">Automatically play similar songs when your music ends</p>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="autoplay" 
                       ${preferences.autoplay ? 'checked' : ''} data-setting="autoplay">
            </div>
        </div>
        
        <div class="setting-item d-flex justify-content-between align-items-center py-3 border-bottom">
            <div>
                <h6 class="mb-1">Crossfade</h6>
                <p class="text-muted small mb-0">Smooth transition between songs</p>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="crossfade" data-setting="crossfade">
            </div>
        </div>
        
        <div class="setting-item d-flex justify-content-between align-items-center py-3 border-bottom">
            <div>
                <h6 class="mb-1">Normalize volume</h6>
                <p class="text-muted small mb-0">Set the same volume level for all songs</p>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="normalize" data-setting="normalize">
            </div>
        </div>
        
        <div class="setting-item py-3">
            <div class="mb-2">
                <h6 class="mb-1">Audio quality</h6>
                <p class="text-muted small mb-0">Higher quality uses more data</p>
            </div>
            <select class="form-select bg-dark text-light border-secondary" data-setting="audioQuality">
                <option value="low">Low (96 kbps)</option>
                <option value="normal" selected>Normal (160 kbps)</option>
                <option value="high">High (320 kbps)</option>
            </select>
        </div>
    `;
}

function renderDisplaySettings(preferences) {
    return `
        <div class="setting-item d-flex justify-content-between align-items-center py-3 border-bottom">
            <div>
                <h6 class="mb-1">Theme</h6>
                <p class="text-muted small mb-0">Choose your preferred theme</p>
            </div>
            <select class="form-select bg-dark text-light border-secondary" style="width: auto;" data-setting="theme">
                <option value="dark" ${preferences.theme === 'dark' ? 'selected' : ''}>Dark</option>
                <option value="light" ${preferences.theme === 'light' ? 'selected' : ''}>Light</option>
                <option value="auto" ${preferences.theme === 'auto' ? 'selected' : ''}>Auto</option>
            </select>
        </div>
        
        <div class="setting-item d-flex justify-content-between align-items-center py-3 border-bottom">
            <div>
                <h6 class="mb-1">Show friend activity</h6>
                <p class="text-muted small mb-0">See what your friends are listening to</p>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="friendActivity" data-setting="friendActivity">
            </div>
        </div>
        
        <div class="setting-item d-flex justify-content-between align-items-center py-3">
            <div>
                <h6 class="mb-1">Show recently played</h6>
                <p class="text-muted small mb-0">Display recently played songs on home screen</p>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="recentlyPlayed" checked data-setting="recentlyPlayed">
            </div>
        </div>
    `;
}

function renderPrivacySettings() {
    return `
        <div class="setting-item d-flex justify-content-between align-items-center py-3 border-bottom">
            <div>
                <h6 class="mb-1">Private session</h6>
                <p class="text-muted small mb-0">Hide your activity from friends and don't save to history</p>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="privateSession" data-setting="privateSession">
            </div>
        </div>
        
        <div class="setting-item d-flex justify-content-between align-items-center py-3 border-bottom">
            <div>
                <h6 class="mb-1">Make playlists public</h6>
                <p class="text-muted small mb-0">Allow others to see and follow your playlists</p>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="publicPlaylists" checked data-setting="publicPlaylists">
            </div>
        </div>
        
        <div class="setting-item py-3">
            <button class="btn btn-outline-light w-100" data-action="download-data">
                <span class="material-icons me-2">download</span>
                Download your data
            </button>
        </div>
    `;
}

function renderAccountSettings() {
    return `
        <div class="setting-item py-3 border-bottom">
            <button class="btn btn-outline-light w-100" data-action="edit-profile">
                <span class="material-icons me-2">edit</span>
                Edit profile
            </button>
        </div>
        
        <div class="setting-item py-3 border-bottom">
            <button class="btn btn-outline-light w-100" data-action="change-password">
                <span class="material-icons me-2">lock</span>
                Change password
            </button>
        </div>
        
        <div class="setting-item py-3 border-bottom">
            <button class="btn btn-outline-light w-100" data-action="manage-subscription">
                <span class="material-icons me-2">credit_card</span>
                Manage subscription
            </button>
        </div>
        
        <div class="setting-item py-3">
            <button class="btn btn-outline-danger w-100" data-action="sign-out">
                <span class="material-icons me-2">logout</span>
                Sign out
            </button>
        </div>
    `;
}

function renderAboutSection() {
    return `
        <div class="setting-item py-3 border-bottom">
            <div class="d-flex justify-content-between align-items-center">
                <span>Version</span>
                <span class="text-muted">1.0.0</span>
            </div>
        </div>
        
        <div class="setting-item py-3 border-bottom">
            <button class="btn btn-outline-light w-100" data-action="help-support">
                <span class="material-icons me-2">help</span>
                Help & Support
            </button>
        </div>
        
        <div class="setting-item py-3 border-bottom">
            <button class="btn btn-outline-light w-100" data-action="terms-privacy">
                <span class="material-icons me-2">description</span>
                Terms & Privacy Policy
            </button>
        </div>
        
        <div class="setting-item py-3">
            <button class="btn btn-outline-light w-100" data-action="about-app">
                <span class="material-icons me-2">info</span>
                About Music Player
            </button>
        </div>
    `;
}

// Mock function for user statistics
function getUserStats() {
    return {
        songsPlayed: '1,234',
        hoursListened: '156',
        playlistsCreated: getAllPlaylists().length,
        favoriteArtists: '23'
    };
}

// Handle setting changes
function handleSettingChange(setting, value) {
    AppState.preferences[setting] = value;
    savePreferences();
    
    // Apply immediate changes if needed
    switch (setting) {
        case 'theme':
            applyTheme(value);
            break;
        case 'autoplay':
            console.log(`Autoplay ${value ? 'enabled' : 'disabled'}`);
            break;
        // Add more setting handlers as needed
    }
}

function applyTheme(theme) {
    // In a real app, this would switch CSS themes
    console.log(`Theme changed to: ${theme}`);
    // TODO: Implement theme switching logic
}

// Extension points for profile features
// TODO: Add user avatar upload functionality
// TODO: Implement social features (friends, following)
// TODO: Add listening history and statistics
// TODO: Implement account management and billing