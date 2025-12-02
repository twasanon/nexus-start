import React, { useState, useEffect } from 'react';
import { Music } from 'lucide-react';
import {
  getSpotifyAuthUrl,
  extractTokenFromUrl,
  getStoredToken,
  getCurrentlyPlaying,
  disconnectSpotify,
  isSpotifyConfigured,
  SpotifyTrack,
} from '../services/spotifyService';
import { onSettingsChange } from '../services/settingsService';

const SpotifyWidget: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isConfigured, setIsConfigured] = useState(isSpotifyConfigured());

  // Listen for settings changes
  useEffect(() => {
    const unsubscribe = onSettingsChange(() => {
      setIsConfigured(isSpotifyConfigured());
    });
    return unsubscribe;
  }, []);

  // Check for token on mount
  useEffect(() => {
    // First check URL for new token (after OAuth redirect)
    const urlToken = extractTokenFromUrl();
    if (urlToken) {
      setToken(urlToken);
      return;
    }
    
    // Otherwise check localStorage
    const storedToken = getStoredToken();
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Poll for currently playing track
  useEffect(() => {
    if (!token) return;

    const fetchTrack = async () => {
      const currentTrack = await getCurrentlyPlaying(token);
      setTrack(currentTrack);
      
      // If token expired, clear it
      if (!currentTrack && !getStoredToken()) {
        setToken(null);
      }
    };

    fetchTrack();
    const interval = setInterval(fetchTrack, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [token]);

  // Don't render if Spotify isn't configured
  if (!isConfigured) {
    return null;
  }

  // Not connected - show connect button (small, unobtrusive)
  if (!token) {
    return (
      <a
        href={getSpotifyAuthUrl()}
        className="fixed top-6 right-6 z-30 flex items-center gap-2 px-3 py-2 bg-zinc-950/80 backdrop-blur-sm border border-white/10 rounded-xl hover:border-green-500/50 hover:bg-zinc-900/80 transition-all group"
      >
        <Music className="w-4 h-4 text-green-500" />
        <span className="text-xs font-mono text-zinc-400 group-hover:text-white transition-colors">
          connect spotify
        </span>
      </a>
    );
  }

  // Connected but nothing playing - don't show anything
  if (!track || !track.isPlaying) {
    return null;
  }

  // Show now playing
  return (
    <div
      className="fixed top-6 right-6 z-30 flex items-center gap-3 px-3 py-2 bg-zinc-950/80 backdrop-blur-sm border border-white/10 rounded-xl hover:border-green-500/30 transition-all max-w-[280px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Album Art */}
      {track.albumArt && (
        <img
          src={track.albumArt}
          alt="Album art"
          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
        />
      )}
      
      {/* Track Info */}
      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-mono text-green-500 uppercase tracking-wider">
            playing
          </span>
        </div>
        <span className="text-sm font-medium text-white truncate" title={track.name}>
          {track.name}
        </span>
        <span className="text-xs text-zinc-400 truncate" title={track.artist}>
          {track.artist}
        </span>
      </div>

      {/* Disconnect button (shows on hover) */}
      {isHovered && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            disconnectSpotify();
            setToken(null);
            setTrack(null);
          }}
          className="absolute -top-2 -right-2 w-5 h-5 bg-zinc-800 border border-white/10 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/50 transition-all"
          title="Disconnect Spotify"
        >
          <span className="text-xs">×</span>
        </button>
      )}
    </div>
  );
};

export default SpotifyWidget;

