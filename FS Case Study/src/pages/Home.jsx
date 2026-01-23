import { useState, useEffect } from "react";
import MusicCard from "../components/MusicCard";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour <= 11) return "Good morning";
  if (hour >= 12 && hour <= 16) return "Good afternoon";
  if (hour >= 17 && hour <= 20) return "Good evening";
  return "Good night";
};

export default function Home({ playlist, setPlaylist }) {
  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="app-background" />
      <div className="app-content">
        <h1>{greeting}</h1>
        <p className="subtitle">Discover your next favorite song</p>

        <input
          className="search-input"
          placeholder="Search songs, artists, genres..."
          disabled
        />

        <h2>Offline Tracks</h2>

        <div className="cards">
          <MusicCard
            song={{ id: 1, title: "Dark Cyberpunk", artist: "Free Music Lab", duration: "3:20", tag: "Cyberpunk", src: "/assets/audio/dark-cyberpunk.mp3" }}
            playlist={playlist}
            setPlaylist={setPlaylist}
          />
          <MusicCard
            song={{ id: 2, title: "Ambient Piano", artist: "Relaxing Sessions", duration: "4:10", tag: "Ambient", src: "/assets/audio/ambient-piano.mp3" }}
            playlist={playlist}
            setPlaylist={setPlaylist}
          />
          <MusicCard
            song={{ id: 3, title: "Cinematic Drop", artist: "Epic Scores", duration: "2:58", tag: "Cinematic", src: "/assets/audio/cinematic-drop.mp3" }}
            playlist={playlist}
            setPlaylist={setPlaylist}
          />
        </div>
      </div>
    </>
  );
}