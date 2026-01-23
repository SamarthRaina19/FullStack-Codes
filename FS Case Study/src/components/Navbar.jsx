import {
  Button,
  Stack,
  Switch,
  FormControlLabel,
  Typography,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";

export default function Navbar({ mode, setMode, playlist }) {
  return (
    <div
      className="sidebar p-3"
      style={{ width: "260px", overflowY: "auto" }}
    >
      <Typography variant="h6" mb={2}>
        🎵 SamTunes
      </Typography>

      <Stack spacing={2}>
        <Button
          startIcon={<HomeIcon />}
          variant="contained"
          color="primary"
        >
          Home
        </Button>

        <FormControlLabel
          label={mode === "light" ? "Light Mode" : "Dark Mode"}
          control={
            <Switch
              checked={mode === "light"}
              onChange={() =>
                setMode(mode === "dark" ? "light" : "dark")
              }
            />
          }
        />
      </Stack>

      {/* Playlist Section */}
      <Typography
        variant="subtitle1"
        mt={4}
        mb={1}
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <LibraryMusicIcon fontSize="small" />
        Your Playlist
      </Typography>

      {playlist.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No songs added
        </Typography>
      ) : (
        <List dense>
          {playlist.map((song, i) => (
            <ListItem key={i} disablePadding>
              <ListItemText
                primary={song.title}
                secondary={song.artist}
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}