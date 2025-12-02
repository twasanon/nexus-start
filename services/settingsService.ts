// Settings Service - Manages all user configuration stored in localStorage

const SETTINGS_KEY = 'nexus_settings';

export interface LinkItem {
  label: string;
  url: string;
  icon: string;
}

export interface LinkGroup {
  title: string;
  items: LinkItem[];
}

export interface NexusSettings {
  // General
  userName: string;
  
  // API Keys
  geminiApiKey: string;
  spotifyClientId: string;
  
  // Widgets
  pomodoroMinutes: number;
  showWeather: boolean;
  showCrypto: boolean;
  showSports: boolean;
  showNotes: boolean;
  showPomodoro: boolean;
  
  // Links (null means use defaults from constants.tsx)
  customLinks: LinkGroup[] | null;
  
  // Wallpaper
  customWallpapers: string[] | null; // null means use defaults
  wallpaperGrayscale: boolean;
  wallpaperRotationHours: number;
}

const defaultSettings: NexusSettings = {
  userName: 'friend',
  geminiApiKey: '',
  spotifyClientId: '',
  pomodoroMinutes: 25,
  showWeather: true,
  showCrypto: true,
  showSports: true,
  showNotes: true,
  showPomodoro: true,
  customLinks: null,
  customWallpapers: null,
  wallpaperGrayscale: true,
  wallpaperRotationHours: 3,
};

export const getSettings = (): NexusSettings => {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      return { ...defaultSettings, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error('Error reading settings:', e);
  }
  return defaultSettings;
};

export const saveSettings = (settings: Partial<NexusSettings>): void => {
  try {
    const current = getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    // Dispatch event so components can react to settings changes
    window.dispatchEvent(new CustomEvent('nexus-settings-changed', { detail: updated }));
  } catch (e) {
    console.error('Error saving settings:', e);
  }
};

export const getSetting = <K extends keyof NexusSettings>(key: K): NexusSettings[K] => {
  return getSettings()[key];
};

export const setSetting = <K extends keyof NexusSettings>(key: K, value: NexusSettings[K]): void => {
  saveSettings({ [key]: value });
};

// Hook helper for settings changes
export const onSettingsChange = (callback: (settings: NexusSettings) => void): (() => void) => {
  const handler = (e: CustomEvent<NexusSettings>) => callback(e.detail);
  window.addEventListener('nexus-settings-changed', handler as EventListener);
  return () => window.removeEventListener('nexus-settings-changed', handler as EventListener);
};

