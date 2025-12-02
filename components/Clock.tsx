import React, { useState, useEffect } from 'react';
import { getSetting, onSettingsChange } from '../services/settingsService';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [userName, setUserName] = useState(getSetting('userName'));

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Listen for settings changes
  useEffect(() => {
    const unsubscribe = onSettingsChange((settings) => {
      setUserName(settings.userName);
    });
    return unsubscribe;
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getGreeting = () => {
    const hour = time.getHours();
    const name = userName || 'friend';
    if (hour < 12) return `good morning, ${name}.`;
    if (hour < 18) return `good afternoon, ${name}.`;
    return `good evening, ${name}.`;
  };

  return (
    <div className="flex flex-col items-center justify-center font-mono select-none">
      <h2 className="text-xl md:text-2xl text-zinc-300 mb-2 tracking-widest lowercase shadow-black drop-shadow-sm animate-fade-in">
        {getGreeting()}
      </h2>
      <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-4 drop-shadow-2xl shadow-black">
        {formatTime(time)}
      </h1>
      <p className="text-zinc-400 font-bold tracking-wide text-sm md:text-base uppercase bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5">
        {formatDate(time)}
      </p>
    </div>
  );
};

export default Clock;