import { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import { pauseAudio, getAudio } from "../js/audioPlayer";

export default function Player() {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const SEEK_SECONDS = 10;

  useEffect(() => {
    const audio = getAudio();
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
    };
  }, []);

  const handleSeek = (_, newValue) => {
    const audio = getAudio();
    audio.currentTime = newValue;
    setProgress(newValue);
  };

  const handleRewind = () => {
    const audio = getAudio();
    audio.currentTime = Math.max(0, audio.currentTime - SEEK_SECONDS);
  };

  const handleFastForward = () => {
    const audio = getAudio();
    audio.currentTime = Math.min(
      audio.duration || 0,
      audio.currentTime + SEEK_SECONDS
    );
  };

  const handlePlayPause = () => {
    const audio = getAudio();
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      pauseAudio();
    }
  };

  const formatTime = (time = 0) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="player">
      <div className="player-controls">
        <button onClick={handleRewind}>⏮</button>
        <button className="play" onClick={handlePlayPause}>⏯</button>
        <button onClick={handleFastForward}>⏭</button>
      </div>

      <div className="progress-wrapper">
        <span className="time">{formatTime(progress)}</span>

        <Slider
          min={0}
          max={duration}
          value={progress}
          onChange={handleSeek}
          size="small"
          sx={{
            color: "#1DB954",
            height: 6,
            "& .MuiSlider-thumb": {
              width: 14,
              height: 14,
              backgroundColor: "#1DB954",
            },
            "& .MuiSlider-track": {
              backgroundImage: "linear-gradient(90deg, #1DB954 25%, #1ed760 50%, #1DB954 75%)",
              backgroundSize: "200% 100%",
              animation: "waveMove 2s linear infinite",
            },
            "& .MuiSlider-rail": {
              opacity: 0.3,
            },
          }}
        />

        <span className="time">{formatTime(duration)}</span>
      </div>
    </div>
  );
}