import {
  Box,
  IconButton
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";

export default function PlayerBar({
  isPlaying,
  onPlayPause,
  onForward,
  onRewind
}) {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        bgcolor: "#121212",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
        borderTop: "1px solid #222",
        zIndex: 100,
      }}
    >
      <IconButton onClick={onRewind} sx={{ color: "#aaa" }}>
        <FastRewindIcon />
      </IconButton>

      <IconButton
        onClick={onPlayPause}
        sx={{
          bgcolor: "#1db954",
          color: "#000",
          width: 56,
          height: 56,
          "&:hover": { bgcolor: "#1ed760" },
        }}
      >
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>

      <IconButton onClick={onForward} sx={{ color: "#aaa" }}>
        <FastForwardIcon />
      </IconButton>
    </Box>
  );
}
