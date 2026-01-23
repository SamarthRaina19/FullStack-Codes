import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  IconButton,
  Stack,
} from '@mui/material';
import {
  Add as AddIcon,
  PlayArrow as PlayArrowIcon,
  Favorite as FavoriteIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import MusicCard from '../components/MusicCard';

const Library = () => {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (window.getAllSongs) {
      setSongs(window.getAllSongs());
    }
    if (window.getAllPlaylists) {
      setPlaylists(window.getAllPlaylists());
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const QuickLibraryItem = ({ title, subtitle, icon, color, onClick }) => (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: '#2a2a2a',
        },
      }}
      onClick={onClick}
    >
      <CardContent sx={{ py: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: 1,
              background: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem',
            }}
          >
            {icon}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          </Box>
          <IconButton color="primary">
            <PlayArrowIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );

  const PlaylistItem = ({ playlist }) => {
    const playlistSongs = playlist.songIds
      .map(id => songs.find(song => song.id === id))
      .filter(Boolean);

    return (
      <Card
        sx={{
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: '#2a2a2a',
          },
        }}
      >
        <CardContent sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                bgcolor: '#2a2a2a',
                borderRadius: 1,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '1fr 1fr',
                gap: 0.25,
                p: 0.5,
              }}
            >
              {Array.from({ length: 4 }).map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    bgcolor: '#333',
                    borderRadius: 0.25,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.5rem',
                  }}
                >
                  🎵
                </Box>
              ))}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight="bold">
                {playlist.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {playlist.description}
              </Typography>
              <Typography variant="caption" color="text.disabled">
                {playlistSongs.length} song{playlistSongs.length !== 1 ? 's' : ''}
              </Typography>
            </Box>
            <IconButton color="primary">
              <PlayArrowIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{ pb: 4 }}>
      {/* Library Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h3">Your Library</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
          >
            Create Playlist
          </Button>
        </Box>

        {/* Library Tabs */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
            },
          }}
        >
          <Tab label="All" />
          <Tab label="Playlists" />
          <Tab label="Artists" />
          <Tab label="Albums" />
        </Tabs>
      </Box>

      {/* Quick Access Items */}
      <Box sx={{ mb: 4 }}>
        <Stack spacing={2}>
          <QuickLibraryItem
            title="Liked Songs"
            subtitle={`${songs.slice(0, 3).length} songs`}
            icon={<FavoriteIcon />}
            color="linear-gradient(135deg, #ff6b6b, #ee5a24)"
          />
          <QuickLibraryItem
            title="Recently Played"
            subtitle={`${songs.slice(1, 4).length} songs`}
            icon={<HistoryIcon />}
            color="linear-gradient(135deg, #4834d4, #686de0)"
          />
        </Stack>
      </Box>

      {/* User Playlists */}
      {playlists.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Made by you
          </Typography>
          <Stack spacing={2}>
            {playlists.map((playlist) => (
              <PlaylistItem key={playlist.id} playlist={playlist} />
            ))}
          </Stack>
        </Box>
      )}

      {/* All Songs */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5">All Songs</Typography>
          <Typography variant="body2" color="text.secondary">
            {songs.length} song{songs.length !== 1 ? 's' : ''}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {songs.map((song) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={song.id}>
              <MusicCard song={song} showArtist={true} showAlbum={true} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Library;