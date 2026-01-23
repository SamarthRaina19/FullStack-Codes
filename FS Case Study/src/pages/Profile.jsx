import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Avatar,
  Divider,
  Stack,
} from '@mui/material';
import {
  Person as PersonIcon,
  PlayCircle as PlayCircleIcon,
  Schedule as ScheduleIcon,
  QueueMusic as QueueMusicIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';
import { useAppState, actions } from '../context/AppStateContext';

const Profile = () => {
  const { state, dispatch } = useAppState();
  const { preferences } = state;

  const handlePreferenceChange = (key, value) => {
    dispatch(actions.updatePreferences({ [key]: value }));
  };

  const userStats = [
    { label: 'Songs played', value: '1,234', icon: <PlayCircleIcon /> },
    { label: 'Hours listened', value: '156', icon: <ScheduleIcon /> },
    { label: 'Playlists created', value: '3', icon: <QueueMusicIcon /> },
    { label: 'Favorite artists', value: '23', icon: <FavoriteIcon /> },
  ];

  const SettingCard = ({ title, children }) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );

  const SettingItem = ({ label, description, control }) => (
    <Box sx={{ py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="body1" fontWeight="medium">
            {label}
          </Typography>
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </Box>
        {control}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ pb: 4 }}>
      {/* Profile Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'primary.main',
              fontSize: '2rem',
            }}
          >
            <PersonIcon fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h4" gutterBottom>
              Music Lover
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Free account
            </Typography>
            <Button variant="contained" size="small">
              Upgrade to Premium
            </Button>
          </Box>
        </Box>
      </Box>

      {/* User Statistics */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Your music stats
        </Typography>
        <Grid container spacing={2}>
          {userStats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Card
                sx={{
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ color: 'primary.main', mb: 1 }}>
                    {React.cloneElement(stat.icon, { fontSize: 'large' })}
                  </Box>
                  <Typography variant="h4" fontWeight="bold">
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Settings */}
      <Box>
        <Typography variant="h5" gutterBottom>
          Settings
        </Typography>

        {/* Playback Settings */}
        <SettingCard title="Playback">
          <SettingItem
            label="Autoplay"
            description="Automatically play similar songs when your music ends"
            control={
              <Switch
                checked={preferences.autoplay}
                onChange={(e) => handlePreferenceChange('autoplay', e.target.checked)}
              />
            }
          />
          <SettingItem
            label="Crossfade"
            description="Smooth transition between songs"
            control={
              <Switch
                checked={false}
                onChange={(e) => console.log('Crossfade:', e.target.checked)}
              />
            }
          />
          <SettingItem
            label="Audio quality"
            description="Higher quality uses more data"
            control={
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value="normal"
                  onChange={(e) => console.log('Audio quality:', e.target.value)}
                >
                  <MenuItem value="low">Low (96 kbps)</MenuItem>
                  <MenuItem value="normal">Normal (160 kbps)</MenuItem>
                  <MenuItem value="high">High (320 kbps)</MenuItem>
                </Select>
              </FormControl>
            }
          />
        </SettingCard>

        {/* Display Settings */}
        <SettingCard title="Display">
          <SettingItem
            label="Theme"
            description="Choose your preferred theme"
            control={
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={preferences.theme}
                  onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                >
                  <MenuItem value="dark">Dark</MenuItem>
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="auto">Auto</MenuItem>
                </Select>
              </FormControl>
            }
          />
          <SettingItem
            label="Show friend activity"
            description="See what your friends are listening to"
            control={
              <Switch
                checked={false}
                onChange={(e) => console.log('Friend activity:', e.target.checked)}
              />
            }
          />
        </SettingCard>

        {/* Privacy Settings */}
        <SettingCard title="Privacy">
          <SettingItem
            label="Private session"
            description="Hide your activity from friends and don't save to history"
            control={
              <Switch
                checked={false}
                onChange={(e) => console.log('Private session:', e.target.checked)}
              />
            }
          />
          <SettingItem
            label="Make playlists public"
            description="Allow others to see and follow your playlists"
            control={
              <Switch
                checked={true}
                onChange={(e) => console.log('Public playlists:', e.target.checked)}
              />
            }
          />
        </SettingCard>

        {/* Account Settings */}
        <SettingCard title="Account">
          <Stack spacing={2}>
            <Button variant="outlined" fullWidth>
              Edit profile
            </Button>
            <Button variant="outlined" fullWidth>
              Change password
            </Button>
            <Button variant="outlined" fullWidth>
              Manage subscription
            </Button>
            <Divider />
            <Button variant="outlined" color="error" fullWidth>
              Sign out
            </Button>
          </Stack>
        </SettingCard>

        {/* About */}
        <SettingCard title="About">
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Version</Typography>
              <Typography color="text.secondary">1.0.0</Typography>
            </Box>
            <Button variant="outlined" fullWidth>
              Help & Support
            </Button>
            <Button variant="outlined" fullWidth>
              Terms & Privacy Policy
            </Button>
          </Stack>
        </SettingCard>
      </Box>
    </Box>
  );
};

export default Profile;