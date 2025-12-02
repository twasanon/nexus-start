import React, { useState, useEffect } from 'react';
import { LINK_GROUPS, BACKGROUND_IMAGES } from './constants';
import LinkTree from './components/LinkTree';
import Clock from './components/Clock';
import SearchBar from './components/SearchBar';
import WeatherWidget from './components/WeatherWidget';
import SpotifyWidget from './components/SpotifyWidget';
import SportsTicker from './components/SportsTicker';
import CryptoTicker from './components/CryptoTicker';
import QuickNotes from './components/QuickNotes';
import PomodoroTimer from './components/PomodoroTimer';
import CommandPalette from './components/CommandPalette';
import { getSettings, onSettingsChange, NexusSettings } from './services/settingsService';

const App: React.FC = () => {
  const [bgIndex, setBgIndex] = useState(0);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [settings, setSettings] = useState<NexusSettings>(getSettings());

  // Get wallpapers (custom or default)
  const wallpapers = settings.customWallpapers || BACKGROUND_IMAGES;
  const rotationMs = settings.wallpaperRotationHours * 60 * 60 * 1000;

  useEffect(() => {
    // Rotate background based on settings
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % wallpapers.length);
    }, rotationMs);
    return () => clearInterval(interval);
  }, [wallpapers.length, rotationMs]);

  // Listen for settings changes
  useEffect(() => {
    const unsubscribe = onSettingsChange((newSettings) => {
      setSettings(newSettings);
    });
    return unsubscribe;
  }, []);

  // Cmd+K / Ctrl+K handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Get link groups (custom or default)
  const linkGroups = settings.customLinks || LINK_GROUPS;
  
  // Wallpaper filter style
  const wallpaperFilter = settings.wallpaperGrayscale 
    ? 'grayscale(100%) brightness(0.7)' 
    : 'brightness(0.7)';

  return (
    <div className="relative w-full min-h-screen overflow-y-auto md:overflow-hidden text-zinc-200 font-sans selection:bg-purple-500/30">
      {/* Background with overlay */}
      {wallpapers.map((img, index) => (
        <div 
          key={img}
          className={`absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out ${index === bgIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${img})`, filter: wallpaperFilter }}
        />
      ))}
      
      {/* Lightened gradient so background is visible but text remains readable */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/50 via-transparent to-black/90 backdrop-blur-[1px]" />
      
      {/* Top Widgets */}
      {settings.showWeather && <WeatherWidget />}
      <SpotifyWidget />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center md:justify-center md:min-h-screen p-6 gap-16 pb-8 md:pb-[30rem]">
        
        {/* Clock Section */}
        <section className="animate-fade-in flex flex-col items-center mt-12 md:mt-0">
           <Clock />
        </section>

        {/* Search Section */}
        <section className="w-full flex justify-center animate-slide-up" style={{ animationDelay: '100ms' }}>
          <SearchBar />
        </section>

        {/* Links Grid - Now Fluid */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 w-full max-w-[1600px] mt-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
          {linkGroups.map((group) => (
            <LinkTree key={group.title} group={group} />
          ))}
        </section>
      </main>

      {/* Bottom Floating Dashboard - Uses Grid for perfect sizing */}
      {/* On mobile: relative/in-flow so content scrolls. On desktop: absolute at bottom */}
      <div className="relative md:absolute md:bottom-0 left-0 right-0 p-6 md:p-10 flex justify-center animate-fade-in z-20 md:pointer-events-none">
        <div className="md:pointer-events-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8 w-full max-w-[1600px]">
          {settings.showSports && <SportsTicker />}
          {settings.showCrypto && <CryptoTicker />}
          {settings.showNotes && <QuickNotes />}
          {settings.showPomodoro && <PomodoroTimer />}
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="absolute bottom-4 right-6 text-zinc-600 text-xs font-mono hidden md:block z-20">
        <button 
          onClick={() => setIsCommandPaletteOpen(true)}
          className="hover:text-zinc-400 transition-colors"
        >
          ⌘K for commands
        </button>
        {' • Nexus Start'}
      </div>

      {/* Command Palette */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
      />
    </div>
  );
};

export default App;