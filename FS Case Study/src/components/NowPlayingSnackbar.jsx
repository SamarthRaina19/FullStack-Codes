import { Snackbar, Alert, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";

export default function NowPlayingSnackbar() {
  const [open, setOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    // Listen for song changes
    const checkForSongChange = () => {
      const newSong = window.AppState?.currentSong;
      if (newSong && newSong !== currentSong) {
        setCurrentSong(newSong);
        setOpen(true);
      }
    };

    // Check every 500ms for song changes
    const interval = setInterval(checkForSongChange, 500);
    
    return () => clearInterval(interval);
  }, [currentSong]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  if (!currentSong) return null;

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        sx={{
          width: '100%',
          bgcolor: '#1db954',
          color: 'white',
          '& .MuiAlert-icon': {
            color: 'white'
          }
        }}
      >
        <Box>
          <Typography variant="body2" fontWeight="bold">
            Now Playing
          </Typography>
          <Typography variant="caption">
            {currentSong.title} • {currentSong.artist}
          </Typography>
        </Box>
      </Alert>
    </Snackbar>
  );
}