import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Chip,
  Stack,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import MusicCard from '../components/MusicCard';
import { useAppState, actions } from '../context/AppStateContext';

const Search = () => {
  const { state, dispatch } = useAppState();
  const [songs, setSongs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (window.getAllSongs) {
      setSongs(window.getAllSongs());
    }
  }, []);

  const handleSearch = (query) => {
    dispatch(actions.setSearchQuery(query));
    
    if (query.trim() === '') {
      setSearchResults([]);
      dispatch(actions.setSearchResults([]));
    } else {
      const results = songs.filter(song =>
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase()) ||
        song.album.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      dispatch(actions.setSearchResults(results));
    }
  };

  const genres = ['Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Jazz', 'Classical'];
  const genreColors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'
  ];

  return (
    <Box sx={{ pb: 4 }}>
      {/* Search Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          Search
        </Typography>
        
        <TextField
          fullWidth
          placeholder="What do you want to listen to?"
          value={state.searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: 400,
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              bgcolor: 'background.paper',
            },
          }}
        />
      </Box>

      {/* Search Results */}
      {state.searchQuery && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Search Results
          </Typography>
          {searchResults.length > 0 ? (
            <Grid container spacing={2}>
              {searchResults.map((song) => (
                <Grid item xs={6} sm={4} md={3} lg={2} key={song.id}>
                  <MusicCard song={song} showArtist={true} showAlbum={true} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography color="text.secondary">
              No results found for "{state.searchQuery}"
            </Typography>
          )}
        </Box>
      )}

      {/* Browse Categories */}
      {!state.searchQuery && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Browse all
          </Typography>
          <Grid container spacing={2}>
            {genres.map((genre, index) => (
              <Grid item xs={6} sm={4} md={3} key={genre}>
                <Box
                  sx={{
                    bgcolor: genreColors[index % genreColors.length],
                    borderRadius: 2,
                    p: 2,
                    minHeight: 100,
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" color="white">
                    {genre}
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{
                      position: 'absolute',
                      bottom: -10,
                      right: 10,
                      opacity: 0.7,
                      transform: 'rotate(15deg)',
                      color: 'rgba(255,255,255,0.3)',
                    }}
                  >
                    🎵
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Search;