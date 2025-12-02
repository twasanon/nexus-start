// Spotify API Service
// Requires a Spotify Developer App: https://developer.spotify.com/dashboard

import { getSetting } from './settingsService';

const getSpotifyClientId = () => getSetting('spotifyClientId');
const REDIRECT_URI = typeof window !== 'undefined' 
  ? `${window.location.origin}${window.location.pathname}`
  : '';
const SCOPES = 'user-read-currently-playing user-read-playback-state';

export interface SpotifyTrack {
  name: string;
  artist: string;
  albumArt: string;
  isPlaying: boolean;
  progressMs: number;
  durationMs: number;
}

// Generate auth URL for Spotify login
export const getSpotifyAuthUrl = (): string => {
  const clientId = getSpotifyClientId();
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'token',
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    show_dialog: 'false',
  });
  return `https://accounts.spotify.com/authorize?${params.toString()}`;
};

// Extract token from URL hash after redirect
export const extractTokenFromUrl = (): string | null => {   
  if (typeof window === 'undefined') return null;
  
  const hash = window.location.hash;
  if (!hash) return null;
  
  const params = new URLSearchParams(hash.substring(1));
  const token = params.get('access_token');
  
  if (token) {  
    // Store token and expiry
    const expiresIn = params.get('expires_in');
    const expiryTime = Date.now() + (parseInt(expiresIn || '3600') * 1000);
    localStorage.setItem('spotify_token', token);
    localStorage.setItem('spotify_token_expiry', expiryTime.toString());
    
    // Clean up URL
    window.history.replaceState(null, '', window.location.pathname);
  }
  
  return token;
};

// Get stored token if still valid
export const getStoredToken = (): string | null => {
  const token = localStorage.getItem('spotify_token');
  const expiry = localStorage.getItem('spotify_token_expiry');
  
  if (!token || !expiry) return null;
  if (Date.now() > parseInt(expiry)) {
    localStorage.removeItem('spotify_token');
    localStorage.removeItem('spotify_token_expiry');
    return null;
  }
  
  return token;
};

// Fetch currently playing track
export const getCurrentlyPlaying = async (token: string): Promise<SpotifyTrack | null> => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (response.status === 204 || response.status === 401) {
      return null; // No track playing or token expired
    }
    
    if (!response.ok) {
      throw new Error('Failed to fetch currently playing');
    }
    
    const data = await response.json();
    
    if (!data.item) return null;
    
    return {
      name: data.item.name,
      artist: data.item.artists.map((a: any) => a.name).join(', '),
      albumArt: data.item.album.images[2]?.url || data.item.album.images[0]?.url,
      isPlaying: data.is_playing,
      progressMs: data.progress_ms,
      durationMs: data.item.duration_ms,
    };
  } catch (error) {
    console.error('Spotify API error:', error);
    return null;
  }
};

// Disconnect Spotify
export const disconnectSpotify = (): void => {
  localStorage.removeItem('spotify_token');
  localStorage.removeItem('spotify_token_expiry');
};

// Check if Spotify is configured
export const isSpotifyConfigured = (): boolean => {
  return !!getSpotifyClientId();
};

