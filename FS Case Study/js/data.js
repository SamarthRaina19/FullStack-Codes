// Static Mock Music Data
const MOCK_DATA = {
    // Sample songs with metadata
    songs: [
        {
            id: 1,
            title: "Midnight Dreams",
            artist: "Luna Eclipse",
            album: "Nocturnal Vibes",
            duration: "3:45",
            genre: "Electronic",
            year: 2023,
            albumArt: null, // Will use placeholder
            src: null // No actual audio file for demo
        },
        {
            id: 2,
            title: "Ocean Waves",
            artist: "Coastal Sounds",
            album: "Serenity",
            duration: "4:12",
            genre: "Ambient",
            year: 2023,
            albumArt: null,
            src: null
        },
        {
            id: 3,
            title: "City Lights",
            artist: "Urban Pulse",
            album: "Metropolitan",
            duration: "3:28",
            genre: "Pop",
            year: 2024,
            albumArt: null,
            src: null
        },
        {
            id: 4,
            title: "Forest Path",
            artist: "Nature's Symphony",
            album: "Wilderness",
            duration: "5:03",
            genre: "Folk",
            year: 2022,
            albumArt: null,
            src: null
        },
        {
            id: 5,
            title: "Neon Nights",
            artist: "Synthwave Collective",
            album: "Retro Future",
            duration: "4:35",
            genre: "Synthwave",
            year: 2024,
            albumArt: null,
            src: null
        }
    ],

    // Sample playlists
    playlists: [
        {
            id: 1,
            name: "Chill Vibes",
            description: "Perfect for relaxing",
            songIds: [2, 4],
            createdAt: "2024-01-15"
        },
        {
            id: 2,
            name: "Workout Mix",
            description: "High energy tracks",
            songIds: [1, 3, 5],
            createdAt: "2024-01-20"
        },
        {
            id: 3,
            name: "Focus Mode",
            description: "Background music for work",
            songIds: [2, 4],
            createdAt: "2024-01-25"
        }
    ],

    // Sample artists
    artists: [
        {
            id: 1,
            name: "Luna Eclipse",
            genre: "Electronic",
            followers: 125000,
            verified: true
        },
        {
            id: 2,
            name: "Coastal Sounds",
            genre: "Ambient",
            followers: 89000,
            verified: false
        },
        {
            id: 3,
            name: "Urban Pulse",
            genre: "Pop",
            followers: 250000,
            verified: true
        }
    ]
};

// Data access functions
function getAllSongs() {
    return MOCK_DATA.songs;
}

function getSongById(id) {
    return MOCK_DATA.songs.find(song => song.id === id);
}

function getAllPlaylists() {
    return MOCK_DATA.playlists;
}

function getPlaylistById(id) {
    return MOCK_DATA.playlists.find(playlist => playlist.id === id);
}

function searchSongs(query) {
    const lowercaseQuery = query.toLowerCase();
    return MOCK_DATA.songs.filter(song => 
        song.title.toLowerCase().includes(lowercaseQuery) ||
        song.artist.toLowerCase().includes(lowercaseQuery) ||
        song.album.toLowerCase().includes(lowercaseQuery)
    );
}

function getSongsByGenre(genre) {
    return MOCK_DATA.songs.filter(song => song.genre === genre);
}

// Make data functions globally available for React components
window.getAllSongs = getAllSongs;
window.getSongById = getSongById;
window.getAllPlaylists = getAllPlaylists;
window.getPlaylistById = getPlaylistById;
window.searchSongs = searchSongs;
window.getSongsByGenre = getSongsByGenre;

// Extension points for future backend integration
// TODO: Replace with actual API calls when backend is ready
// TODO: Add user authentication and personalized data
// TODO: Implement real-time data updates

// To add real audio files:
// 1. Place audio files in assets/audio/ folder
// 2. Update the src property for each song:
//    src: 'assets/audio/midnight-dreams.mp3'
// 3. The cassette animation will automatically sync with the actual audio duration