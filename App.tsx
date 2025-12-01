import React, { useState, useEffect } from 'react';
import { LINK_GROUPS, BACKGROUND_IMAGES } from './constants';
import LinkTree from './components/LinkTree';
import Clock from './components/Clock';
import SearchBar from './components/SearchBar';
import WeatherWidget from './components/WeatherWidget';
import SportsTicker from './components/SportsTicker';
import CryptoTicker from './components/CryptoTicker';
import QuickNotes from './components/QuickNotes';
import PomodoroTimer from './components/PomodoroTimer';

const App: React.FC = () => {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    // Rotate background every 3 hours
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 10800000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-y-auto md:overflow-hidden text-zinc-200 font-sans selection:bg-purple-500/30">
      {/* Background with overlay */}
      {BACKGROUND_IMAGES.map((img, index) => (
        <div 
          key={img}
          className={`absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out ${index === bgIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${img})`, filter: 'grayscale(100%) brightness(0.7)' }}
        />
      ))}
      
      {/* Lightened gradient so background is visible but text remains readable */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/50 via-transparent to-black/90 backdrop-blur-[1px]" />
      
      {/* Top Widgets */}
      <WeatherWidget />

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
          {LINK_GROUPS.map((group) => (
            <LinkTree key={group.title} group={group} />
          ))}
        </section>
      </main>

      {/* Bottom Floating Dashboard - Uses Grid for perfect sizing */}
      {/* On mobile: relative/in-flow so content scrolls. On desktop: absolute at bottom */}
      <div className="relative md:absolute md:bottom-0 left-0 right-0 p-6 md:p-10 flex justify-center animate-fade-in z-20 md:pointer-events-none">
        <div className="md:pointer-events-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8 w-full max-w-[1600px]">
          <SportsTicker />
          <CryptoTicker />
          <QuickNotes />
          <PomodoroTimer />
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="absolute bottom-4 right-6 text-zinc-600 text-xs font-mono hidden md:block z-20">
        CMD/CTRL+K to search • Nexus Start
      </div>
    </div>
  );
};

export default App;