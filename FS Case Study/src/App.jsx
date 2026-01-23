import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Player from "./components/Player";

export default function App() {
  const [playlist, setPlaylist] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`app ${darkMode ? "theme-dark" : "theme-light"}`}>
      <Sidebar playlist={playlist} darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="content">
        <Home playlist={playlist} setPlaylist={setPlaylist} />
      </main>
      <Player />
    </div>
  );
}
