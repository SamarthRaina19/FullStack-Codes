import { Slider, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAudio } from "../js/audioPlayer";

const formatTime = (t = 0) =>
  `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

export default function ProgressBar() {
  const audio = getAudio();
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!audio) return;

    const update = () => {
      setCurrent(audio.currentTime || 0);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", update);

    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("loadedmetadata", update);
    };
  }, []);

  return (
    <Box sx={{ width: "65%", mx: "auto" }}>
      <Slider
        value={current}
        min={0}
        max={duration || 1}
        onChange={(_, v) => (audio.currentTime = v)}
        sx={{ color: "#1db954" }}
      />
      <Box display="flex" justifyContent="space-between">
        <Typography variant="caption">{formatTime(current)}</Typography>
        <Typography variant="caption">{formatTime(duration)}</Typography>
      </Box>
    </Box>
  );
}
