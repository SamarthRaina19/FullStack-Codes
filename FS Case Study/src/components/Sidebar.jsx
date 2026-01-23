export default function Sidebar({ playlist = [], darkMode, setDarkMode }) {
  return (
    <aside className="sidebar">
      <h2 className="logo">🎵 SamTunes</h2>

      <button className="nav-btn active">🏠 Home</button>

      <div className="section">
        <label className="toggle">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(prev => !prev)}
          />
          <span className="slider" />
          <span style={{ marginLeft: "8px" }}>Dark Mode</span>
        </label>
      </div>

      <div className="section">
        <p className="playlist-title">🎼 Your Playlist</p>
        
        {playlist.length === 0 && <span className="muted">No songs added</span>}

        {playlist.map(song => (
          <div key={song.id} style={{ marginBottom: "8px" }}>
            <strong style={{ display: "block", color: "white" }}>{song.title}</strong>
            <div style={{ fontSize: "12px", opacity: 0.7, color: "#b3b3b3" }}>
              {song.artist}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
