import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state matching the vanilla JS version
const initialState = {
  currentSong: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.7,
  currentPlaylist: [],
  currentIndex: 0,
  currentRoute: 'home',
  isLoading: false,
  searchQuery: '',
  searchResults: [],
  preferences: {
    theme: 'dark',
    autoplay: true,
    shuffle: false,
    repeat: 'none'
  }
};

// Action types
const ActionTypes = {
  SET_CURRENT_SONG: 'SET_CURRENT_SONG',
  SET_PLAYBACK_STATE: 'SET_PLAYBACK_STATE',
  SET_CURRENT_TIME: 'SET_CURRENT_TIME',
  SET_DURATION: 'SET_DURATION',
  SET_VOLUME: 'SET_VOLUME',
  SET_CURRENT_PLAYLIST: 'SET_CURRENT_PLAYLIST',
  SET_CURRENT_ROUTE: 'SET_CURRENT_ROUTE',
  SET_LOADING: 'SET_LOADING',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
  UPDATE_PREFERENCES: 'UPDATE_PREFERENCES',
  NEXT_SONG: 'NEXT_SONG',
  PREVIOUS_SONG: 'PREVIOUS_SONG',
  TOGGLE_SHUFFLE: 'TOGGLE_SHUFFLE',
  TOGGLE_REPEAT: 'TOGGLE_REPEAT',
};

// Reducer function
function appStateReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_SONG:
      return { ...state, currentSong: action.payload, currentTime: 0 };
    
    case ActionTypes.SET_PLAYBACK_STATE:
      return { ...state, isPlaying: action.payload };
    
    case ActionTypes.SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload };
    
    case ActionTypes.SET_DURATION:
      return { ...state, duration: action.payload };
    
    case ActionTypes.SET_VOLUME:
      return { ...state, volume: action.payload };
    
    case ActionTypes.SET_CURRENT_PLAYLIST:
      return { 
        ...state, 
        currentPlaylist: action.payload.songs,
        currentIndex: action.payload.index || 0
      };
    
    case ActionTypes.SET_CURRENT_ROUTE:
      return { ...state, currentRoute: action.payload };
    
    case ActionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    
    case ActionTypes.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    
    case ActionTypes.SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload };
    
    case ActionTypes.UPDATE_PREFERENCES:
      return { 
        ...state, 
        preferences: { ...state.preferences, ...action.payload }
      };
    
    case ActionTypes.NEXT_SONG:
      if (state.currentPlaylist.length === 0) return state;
      let nextIndex = state.currentIndex + 1;
      if (nextIndex >= state.currentPlaylist.length) {
        nextIndex = state.preferences.repeat === 'all' ? 0 : state.currentIndex;
      }
      return {
        ...state,
        currentIndex: nextIndex,
        currentSong: state.currentPlaylist[nextIndex],
        currentTime: 0
      };
    
    case ActionTypes.PREVIOUS_SONG:
      if (state.currentPlaylist.length === 0) return state;
      let prevIndex = state.currentIndex - 1;
      if (prevIndex < 0) {
        prevIndex = state.preferences.repeat === 'all' ? state.currentPlaylist.length - 1 : 0;
      }
      return {
        ...state,
        currentIndex: prevIndex,
        currentSong: state.currentPlaylist[prevIndex],
        currentTime: 0
      };
    
    case ActionTypes.TOGGLE_SHUFFLE:
      return {
        ...state,
        preferences: { ...state.preferences, shuffle: !state.preferences.shuffle }
      };
    
    case ActionTypes.TOGGLE_REPEAT:
      const modes = ['none', 'one', 'all'];
      const currentIndex = modes.indexOf(state.preferences.repeat);
      const nextRepeatIndex = (currentIndex + 1) % modes.length;
      return {
        ...state,
        preferences: { ...state.preferences, repeat: modes[nextRepeatIndex] }
      };
    
    default:
      return state;
  }
}

// Create contexts
const AppStateContext = createContext();
const AppDispatchContext = createContext();

// Provider component
export function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('musicAppPreferences');
    if (savedPreferences) {
      dispatch({
        type: ActionTypes.UPDATE_PREFERENCES,
        payload: JSON.parse(savedPreferences)
      });
    }
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('musicAppPreferences', JSON.stringify(state.preferences));
  }, [state.preferences]);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

// Custom hooks
export function useAppState() {
  const state = useContext(AppStateContext);
  const dispatch = useContext(AppDispatchContext);
  
  if (state === undefined || dispatch === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  
  return { state, dispatch };
}

// Action creators
export const actions = {
  setCurrentSong: (song) => ({ type: ActionTypes.SET_CURRENT_SONG, payload: song }),
  setPlaybackState: (isPlaying) => ({ type: ActionTypes.SET_PLAYBACK_STATE, payload: isPlaying }),
  setCurrentTime: (time) => ({ type: ActionTypes.SET_CURRENT_TIME, payload: time }),
  setDuration: (duration) => ({ type: ActionTypes.SET_DURATION, payload: duration }),
  setVolume: (volume) => ({ type: ActionTypes.SET_VOLUME, payload: volume }),
  setCurrentPlaylist: (songs, index = 0) => ({ 
    type: ActionTypes.SET_CURRENT_PLAYLIST, 
    payload: { songs, index } 
  }),
  setCurrentRoute: (route) => ({ type: ActionTypes.SET_CURRENT_ROUTE, payload: route }),
  setLoading: (loading) => ({ type: ActionTypes.SET_LOADING, payload: loading }),
  setSearchQuery: (query) => ({ type: ActionTypes.SET_SEARCH_QUERY, payload: query }),
  setSearchResults: (results) => ({ type: ActionTypes.SET_SEARCH_RESULTS, payload: results }),
  updatePreferences: (preferences) => ({ type: ActionTypes.UPDATE_PREFERENCES, payload: preferences }),
  nextSong: () => ({ type: ActionTypes.NEXT_SONG }),
  previousSong: () => ({ type: ActionTypes.PREVIOUS_SONG }),
  toggleShuffle: () => ({ type: ActionTypes.TOGGLE_SHUFFLE }),
  toggleRepeat: () => ({ type: ActionTypes.TOGGLE_REPEAT }),
};