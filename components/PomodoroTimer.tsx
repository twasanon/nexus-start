import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';
import { getSetting, onSettingsChange } from '../services/settingsService';

const PomodoroTimer: React.FC = () => {
  const [duration, setDuration] = useState(getSetting('pomodoroMinutes'));
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isActive, setIsActive] = useState(false);

  // Listen for settings changes
  useEffect(() => {
    const unsubscribe = onSettingsChange((settings) => {
      const newDuration = settings.pomodoroMinutes;
      setDuration(newDuration);
      // Only update timeLeft if timer is not running and at initial state
      if (!isActive && timeLeft === duration * 60) {
        setTimeLeft(newDuration * 60);
      }
    });
    return unsubscribe;
  }, [isActive, timeLeft, duration]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(duration * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-zinc-950/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-96 shadow-2xl flex flex-col w-full hover:border-white/20 transition-colors">
      <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4 shrink-0">
        <Timer className="w-7 h-7 text-cyan-400" />
        <span className="text-xl font-bold text-zinc-200 uppercase tracking-widest">Focus</span>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div className="text-8xl font-mono font-bold text-white tracking-widest tabular-nums drop-shadow-lg">
          {formatTime(timeLeft)}
        </div>
        
        <div className="flex gap-8">
          <button 
            onClick={toggleTimer}
            className="p-4 rounded-full hover:bg-white/10 text-zinc-300 hover:text-white transition-all border border-transparent hover:border-white/10 active:scale-95 group"
          >
            {isActive ? <Pause className="w-12 h-12 fill-current" /> : <Play className="w-12 h-12 ml-1 fill-current" />}
          </button>
          <button 
            onClick={resetTimer}
            className="p-4 rounded-full hover:bg-white/10 text-zinc-500 hover:text-zinc-300 transition-all border border-transparent hover:border-white/10 active:scale-95"
          >
            <RotateCcw className="w-12 h-12" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;