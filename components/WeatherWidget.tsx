import React, { useEffect, useState } from 'react';
import { getWeather, getWeatherDescription } from '../services/weatherService';
import { WeatherData } from '../types';
import { Cloud, Sun, Moon, CloudRain, CloudSnow, CloudLightning } from 'lucide-react';

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDefault = () => loadWeather(51.5074, -0.1278);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          loadWeather(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.warn("Geo access denied, using default.", err);
          fetchDefault();
        }
      );
    } else {
      fetchDefault();
    }
  }, []);

  const loadWeather = async (lat: number, lon: number) => {
    try {
      const data = await getWeather(lat, lon);
      setWeather(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (code: number, isDay: boolean) => {
    if (code === 0 && isDay) return <Sun className="w-8 h-8 text-yellow-400" />;
    if (code === 0 && !isDay) return <Moon className="w-8 h-8 text-blue-200" />;
    if (code > 90) return <CloudLightning className="w-8 h-8 text-purple-400" />;
    if (code >= 71) return <CloudSnow className="w-8 h-8 text-white" />;
    if (code >= 51) return <CloudRain className="w-8 h-8 text-blue-400" />;
    return <Cloud className="w-8 h-8 text-gray-400" />;
  };

  if (loading) return <div className="animate-pulse w-32 h-20 bg-zinc-900 rounded-xl"></div>;
  if (!weather) return null;

  return (
    <div className="absolute top-6 left-6 flex items-center gap-4 p-4 bg-zinc-950/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl transition-all hover:bg-black/90 group">
      <div className="group-hover:scale-110 transition-transform duration-300 drop-shadow-glow">
        {getWeatherIcon(weather.weatherCode, weather.isDay)}
      </div>
      <div className="flex flex-col font-mono">
        <span className="text-2xl font-bold text-white leading-none">
          {Math.round(weather.temperature)}°
        </span>
        <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider mt-1 group-hover:text-zinc-300">
          {getWeatherDescription(weather.weatherCode)}
        </span>
      </div>
    </div>
  );
};

export default WeatherWidget;