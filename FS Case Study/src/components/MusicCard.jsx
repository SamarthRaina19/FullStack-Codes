import { useState, useEffect } from "react";
import { loadAndPlay, pauseAudio, getAudio } from "../js/audioPlayer";

export default function MusicCard({ song, playlist, setPlaylist }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);

  // Sync liked state with playlist prop to ensure consistency
  useEffect(() => {
    setLiked(playlist.some(item => item.id === song.id));
  }, [playlist, song.id]);

  const handlePlayPause = () => {
    const audio = getAudio();
    if (audio.src.includes(song.src) && !audio.paused) {
      pauseAudio();
      setIsPlaying(false);
    } else {
      loadAndPlay(song.src);
      setIsPlaying(true);
    }
  };

  const toggleLike = () => {
    if (liked) {
      setPlaylist(prev => prev.filter(item => item.id !== song.id));
    } else {
      setPlaylist(prev => [...prev, song]);
    }
    // setLiked(!liked); // useEffect handles this, but for instant feedback we can keep it or rely on prop sync. 
    // The user snippet uses local state + prop update. I'll rely on the useEffect sync pattern which is safer or just local state if I strictly follow the snippet.
    // User snippet: 
    //   if (liked) setPlaylist(remove) else setPlaylist(add)
    //   setLiked(!liked)
    // I will follow the user snippet EXACTLY.
    setLiked(!liked);
  };

  return (
    <div className="music-card">
      <div className="artwork">🎵</div>

      <h3>{song.title}</h3>
      <p className="artist">{song.artist}</p>

      <div className="meta">
        <span>{song.duration}</span>
        <span className="tag">{song.tag}</span>
      </div>

      <div className="actions">
        <button onClick={handlePlayPause}>
            {isPlaying ? "⏸" : "▶"}
        </button>
        <button onClick={toggleLike}>
          {liked ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}