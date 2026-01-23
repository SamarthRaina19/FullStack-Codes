// Frontend Application State Management
const AppState = {
    // Current playback state
    currentSong: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.7,
    
    // Current playlist/queue
    currentPlaylist: [],
    currentIndex: 0,
    
    // UI state
    currentRoute: 'home',
    isLoading: false,
    searchQuery: '',
    
    // User preferences (stored in localStorage)
    preferences: {
        theme: 'dark',
        autoplay: true,
        shuffle: false,
        repeat: 'none' // 'none', 'one', 'all'
    }
};

// Audio element for actual playback
const audio = new Audio();

// Audio event listeners
audio.addEventListener('loadedmetadata', () => {
    AppState.duration = audio.duration;
    updateCassetteAnimation();
    notifyStateChange();
});

audio.addEventListener('timeupdate', () => {
    AppState.currentTime = audio.currentTime;
    notifyStateChange();
});

audio.addEventListener('ended', () => {
    stopCassetteAnimation();
    if (AppState.preferences.autoplay) {
        nextSong();
    } else {
        setPlaybackState(false);
    }
});

audio.addEventListener('play', () => {
    AppState.isPlaying = true;
    startCassetteAnimation();
    notifyStateChange();
});

audio.addEventListener('pause', () => {
    AppState.isPlaying = false;
    stopCassetteAnimation();
    notifyStateChange();
});

// State management functions
function updateState(newState) {
    Object.assign(AppState, newState);
    // Trigger UI updates if needed
    notifyStateChange();
}

function setCurrentSong(song) {
    AppState.currentSong = song;
    AppState.currentTime = 0;
    
    // Load audio if song has a source
    if (song && song.src) {
        audio.src = song.src;
        audio.load();
    } else if (song) {
        // For demo purposes, use a placeholder duration
        AppState.duration = parseDurationToSeconds(song.duration);
        updateCassetteAnimation();
    }
    
    notifyStateChange();
}

function setPlaybackState(isPlaying) {
    AppState.isPlaying = isPlaying;
    
    if (isPlaying && AppState.currentSong) {
        if (AppState.currentSong.src) {
            audio.play().catch(error => {
                console.warn('Audio playback failed:', error);
                // Fallback to visual-only playback
                startCassetteAnimation();
            });
        } else {
            // Visual-only playback for demo
            startCassetteAnimation();
        }
    } else {
        if (AppState.currentSong && AppState.currentSong.src) {
            audio.pause();
        } else {
            // Visual-only pause
            stopCassetteAnimation();
        }
    }
    
    notifyStateChange();
}

// Cassette animation control functions
function startCassetteAnimation() {
    const cassettes = document.querySelectorAll('.cassette-container');
    const reels = document.querySelectorAll('.reel');
    
    cassettes.forEach(cassette => {
        cassette.classList.add('playing');
    });
    
    // Set animation duration based on song duration
    if (AppState.duration > 0) {
        const animationDuration = Math.max(AppState.duration / 10, 2); // At least 2 seconds per rotation
        reels.forEach(reel => {
            reel.style.animationDuration = `${animationDuration}s`;
        });
    }
}

function stopCassetteAnimation() {
    const cassettes = document.querySelectorAll('.cassette-container');
    
    cassettes.forEach(cassette => {
        cassette.classList.remove('playing');
    });
}

function updateCassetteAnimation() {
    if (AppState.isPlaying && AppState.duration > 0) {
        const reels = document.querySelectorAll('.reel');
        const animationDuration = Math.max(AppState.duration / 10, 2);
        
        reels.forEach(reel => {
            reel.style.animationDuration = `${animationDuration}s`;
        });
    }
}

// Helper function to parse duration string to seconds
function parseDurationToSeconds(durationString) {
    if (!durationString) return 180; // Default 3 minutes
    
    const parts = durationString.split(':');
    if (parts.length === 2) {
        const minutes = parseInt(parts[0]) || 0;
        const seconds = parseInt(parts[1]) || 0;
        return minutes * 60 + seconds;
    }
    return 180; // Default fallback
}

// Enhanced play song function
function playSong(song) {
    if (!song) return;
    
    setCurrentSong(song);
    setPlaybackState(true);
    
    console.log(`Playing: ${song.title} by ${song.artist}`);
}

// Make functions available globally for React components
window.playSong = playSong;
window.AppState = AppState;
window.getAllSongs = getAllSongs;
window.togglePlayback = () => setPlaybackState(!AppState.isPlaying);
window.nextSong = nextSong;
window.previousSong = previousSong;

function setCurrentPlaylist(songs, startIndex = 0) {
    AppState.currentPlaylist = songs;
    AppState.currentIndex = startIndex;
    if (songs.length > 0) {
        setCurrentSong(songs[startIndex]);
    }
}

function nextSong() {
    if (AppState.currentPlaylist.length === 0) return;
    
    let nextIndex = AppState.currentIndex + 1;
    if (nextIndex >= AppState.currentPlaylist.length) {
        nextIndex = AppState.preferences.repeat === 'all' ? 0 : AppState.currentIndex;
    }
    
    if (nextIndex !== AppState.currentIndex) {
        AppState.currentIndex = nextIndex;
        setCurrentSong(AppState.currentPlaylist[nextIndex]);
    }
}

function previousSong() {
    if (AppState.currentPlaylist.length === 0) return;
    
    let prevIndex = AppState.currentIndex - 1;
    if (prevIndex < 0) {
        prevIndex = AppState.preferences.repeat === 'all' ? AppState.currentPlaylist.length - 1 : 0;
    }
    
    AppState.currentIndex = prevIndex;
    setCurrentSong(AppState.currentPlaylist[prevIndex]);
}

function toggleShuffle() {
    AppState.preferences.shuffle = !AppState.preferences.shuffle;
    savePreferences();
    notifyStateChange();
}

function toggleRepeat() {
    const modes = ['none', 'one', 'all'];
    const currentIndex = modes.indexOf(AppState.preferences.repeat);
    const nextIndex = (currentIndex + 1) % modes.length;
    AppState.preferences.repeat = modes[nextIndex];
    savePreferences();
    notifyStateChange();
}

// Persistence functions
function savePreferences() {
    localStorage.setItem('musicAppPreferences', JSON.stringify(AppState.preferences));
}

function loadPreferences() {
    const saved = localStorage.getItem('musicAppPreferences');
    if (saved) {
        AppState.preferences = { ...AppState.preferences, ...JSON.parse(saved) };
    }
}

// Event system for state changes
const stateListeners = [];

function addStateListener(callback) {
    stateListeners.push(callback);
}

function removeStateListener(callback) {
    const index = stateListeners.indexOf(callback);
    if (index > -1) {
        stateListeners.splice(index, 1);
    }
}

function notifyStateChange() {
    stateListeners.forEach(callback => {
        try {
            callback(AppState);
        } catch (error) {
            console.error('State listener error:', error);
        }
    });
}

// Initialize state on app load
function initializeState() {
    loadPreferences();
    // TODO: Load last played song from localStorage
    // TODO: Restore playback position if applicable
}

// Initialize when the script loads
initializeState();

// Extension points for future features
// TODO: Add user session management
// TODO: Implement offline mode state
// TODO: Add social features (sharing, following)
// TODO: Implement advanced queue management