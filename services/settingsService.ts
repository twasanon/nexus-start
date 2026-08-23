// Settings Service - Manages all user configuration stored in localStorage

const SETTINGS_KEY = 'atrium_settings';

export interface LinkItem {
  label: string;
  url: string;
  icon: string;
}

export interface LinkGroup {
  title: string;
  items: LinkItem[];
}

export interface AtriumSettings {
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

const defaultSettings: AtriumSettings = {
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

export const getSettings = (): AtriumSettings => {
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

export const saveSettings = (settings: Partial<AtriumSettings>): void => {
  try {
    const current = getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    // Dispatch event so components can react to settings changes
    window.dispatchEvent(new CustomEvent('atrium-settings-changed', { detail: updated }));
  } catch (e) {
    console.error('Error saving settings:', e);
  }
};

export const getSetting = <K extends keyof AtriumSettings>(key: K): AtriumSettings[K] => {
  return getSettings()[key];
};

export const setSetting = <K extends keyof AtriumSettings>(key: K, value: AtriumSettings[K]): void => {
  saveSettings({ [key]: value });
};

// Hook helper for settings changes
export const onSettingsChange = (callback: (settings: AtriumSettings) => void): (() => void) => {
  const handler = (e: CustomEvent<AtriumSettings>) => callback(e.detail);
  window.addEventListener('atrium-settings-changed', handler as EventListener);
  return () => window.removeEventListener('atrium-settings-changed', handler as EventListener);
};

