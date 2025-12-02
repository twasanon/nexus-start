import React, { useState, useEffect } from 'react';
import { 
  User, 
  Key, 
  Layout, 
  Link2, 
  Sparkles, 
  Music, 
  Check, 
  ExternalLink,
  Plus,
  Trash2,
  GripVertical,
  Clock,
  Cloud,
  TrendingUp,
  Trophy,
  FileText,
  Image,
  RotateCw
} from 'lucide-react';
import { getSettings, saveSettings, NexusSettings, LinkGroup } from '../services/settingsService';
import { LINK_GROUPS, BACKGROUND_IMAGES } from '../constants';

type SettingsTab = 'general' | 'apis' | 'links' | 'widgets' | 'wallpaper';

interface SettingsPanelProps {
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [settings, setSettings] = useState<NexusSettings>(getSettings());
  const [savedIndicator, setSavedIndicator] = useState<string | null>(null);
  const [linkGroups, setLinkGroups] = useState<LinkGroup[]>(
    settings.customLinks || LINK_GROUPS.map(g => ({ title: g.title, items: [...g.items] }))
  );
  const [wallpapers, setWallpapers] = useState<string[]>(
    settings.customWallpapers || [...BACKGROUND_IMAGES]
  );

  const showSaved = (key: string) => {
    setSavedIndicator(key);
    setTimeout(() => setSavedIndicator(null), 1500);
  };

  const handleSettingChange = (key: keyof NexusSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    saveSettings({ [key]: value });
    showSaved(key);
  };

  const handleLinksChange = (groups: LinkGroup[]) => {
    setLinkGroups(groups);
    saveSettings({ customLinks: groups });
    showSaved('links');
  };

  const handleWallpapersChange = (urls: string[]) => {
    setWallpapers(urls);
    saveSettings({ customWallpapers: urls });
    showSaved('wallpapers');
  };

  const tabs: { id: SettingsTab; label: string; icon: React.FC<any> }[] = [
    { id: 'general', label: 'General', icon: User },
    { id: 'apis', label: 'API Keys', icon: Key },
    { id: 'links', label: 'Links', icon: Link2 },
    { id: 'widgets', label: 'Widgets', icon: Layout },
    { id: 'wallpaper', label: 'Wallpaper', icon: Image },
  ];

  return (
    <div className="flex flex-col h-full max-h-[70vh]">
      {/* Tabs */}
      <div className="flex border-b border-white/10 px-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'text-white border-purple-500'
                : 'text-zinc-400 border-transparent hover:text-white hover:border-zinc-600'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'general' && (
          <GeneralTab 
            settings={settings} 
            onChange={handleSettingChange}
            savedIndicator={savedIndicator}
          />
        )}
        {activeTab === 'apis' && (
          <APIsTab 
            settings={settings} 
            onChange={handleSettingChange}
            savedIndicator={savedIndicator}
          />
        )}
        {activeTab === 'links' && (
          <LinksTab 
            linkGroups={linkGroups}
            onChange={handleLinksChange}
            savedIndicator={savedIndicator}
          />
        )}
        {activeTab === 'widgets' && (
          <WidgetsTab 
            settings={settings} 
            onChange={handleSettingChange}
            savedIndicator={savedIndicator}
          />
        )}
        {activeTab === 'wallpaper' && (
          <WallpaperTab 
            settings={settings}
            wallpapers={wallpapers}
            onChange={handleSettingChange}
            onWallpapersChange={handleWallpapersChange}
            savedIndicator={savedIndicator}
          />
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/10 bg-zinc-950/50">
        <p className="text-xs text-zinc-500 text-center">
          All settings are stored locally in your browser
        </p>
      </div>
    </div>
  );
};

// General Tab
const GeneralTab: React.FC<{
  settings: NexusSettings;
  onChange: (key: keyof NexusSettings, value: any) => void;
  savedIndicator: string | null;
}> = ({ settings, onChange, savedIndicator }) => (
  <div className="space-y-6">
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
        <User className="w-4 h-4" />
        Your Name
        {savedIndicator === 'userName' && <SavedBadge />}
      </label>
      <input
        type="text"
        value={settings.userName}
        onChange={(e) => onChange('userName', e.target.value)}
        placeholder="Your name for greeting"
        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-purple-500/50"
      />
      <p className="text-xs text-zinc-500">Displayed in the greeting message</p>
    </div>
  </div>
);

// APIs Tab
const APIsTab: React.FC<{
  settings: NexusSettings;
  onChange: (key: keyof NexusSettings, value: any) => void;
  savedIndicator: string | null;
}> = ({ settings, onChange, savedIndicator }) => (
  <div className="space-y-6">
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
        <Sparkles className="w-4 h-4 text-purple-400" />
        Gemini API Key
        {savedIndicator === 'geminiApiKey' && <SavedBadge />}
      </label>
      <input
        type="password"
        value={settings.geminiApiKey}
        onChange={(e) => onChange('geminiApiKey', e.target.value)}
        placeholder="AIza..."
        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-purple-500/50"
      />
      <a
        href="https://aistudio.google.com/apikey"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-purple-400 transition-colors"
      >
        Get a free API key <ExternalLink className="w-3 h-3" />
      </a>
    </div>

    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
        <Music className="w-4 h-4 text-green-400" />
        Spotify Client ID
        {savedIndicator === 'spotifyClientId' && <SavedBadge />}
      </label>
      <input
        type="text"
        value={settings.spotifyClientId}
        onChange={(e) => onChange('spotifyClientId', e.target.value)}
        placeholder="64f74d7b674243b0..."
        className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-purple-500/50"
      />
      <a
        href="https://developer.spotify.com/dashboard"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-green-400 transition-colors"
      >
        Get Client ID from Spotify <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  </div>
);

// Links Tab
const LinksTab: React.FC<{
  linkGroups: LinkGroup[];
  onChange: (groups: LinkGroup[]) => void;
  savedIndicator: string | null;
}> = ({ linkGroups, onChange, savedIndicator }) => {
  const [expandedGroup, setExpandedGroup] = useState<number | null>(0);

  const updateGroup = (groupIndex: number, updates: Partial<LinkGroup>) => {
    const newGroups = [...linkGroups];
    newGroups[groupIndex] = { ...newGroups[groupIndex], ...updates };
    onChange(newGroups);
  };

  const updateLink = (groupIndex: number, linkIndex: number, updates: Partial<{ label: string; url: string }>) => {
    const newGroups = [...linkGroups];
    newGroups[groupIndex].items[linkIndex] = { 
      ...newGroups[groupIndex].items[linkIndex], 
      ...updates 
    };
    onChange(newGroups);
  };

  const addLink = (groupIndex: number) => {
    const newGroups = [...linkGroups];
    newGroups[groupIndex].items.push({ label: 'new-link', url: 'https://', icon: 'ExternalLink' });
    onChange(newGroups);
  };

  const removeLink = (groupIndex: number, linkIndex: number) => {
    const newGroups = [...linkGroups];
    newGroups[groupIndex].items.splice(linkIndex, 1);
    onChange(newGroups);
  };

  const resetToDefaults = () => {
    const defaults = LINK_GROUPS.map(g => ({ title: g.title, items: [...g.items] }));
    onChange(defaults);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-zinc-500">Customize your quick access links</p>
        <button
          onClick={resetToDefaults}
          className="text-xs text-zinc-500 hover:text-white transition-colors"
        >
          Reset to defaults
        </button>
      </div>

      {linkGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="border border-white/10 rounded-lg overflow-hidden">
          {/* Group Header */}
          <button
            onClick={() => setExpandedGroup(expandedGroup === groupIndex ? null : groupIndex)}
            className="w-full flex items-center justify-between px-3 py-2 bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
          >
            <div className="flex items-center gap-2">
              <GripVertical className="w-4 h-4 text-zinc-600" />
              <input
                type="text"
                value={group.title}
                onChange={(e) => {
                  e.stopPropagation();
                  updateGroup(groupIndex, { title: e.target.value });
                }}
                onClick={(e) => e.stopPropagation()}
                className="bg-transparent text-white font-mono text-sm uppercase tracking-wider focus:outline-none focus:bg-zinc-700 px-1 rounded"
              />
              <span className="text-xs text-zinc-500">({group.items.length} links)</span>
            </div>
            <span className="text-zinc-500 text-sm">
              {expandedGroup === groupIndex ? '−' : '+'}
            </span>
          </button>

          {/* Group Links */}
          {expandedGroup === groupIndex && (
            <div className="p-3 space-y-2 bg-zinc-900/50">
              {group.items.map((link, linkIndex) => (
                <div key={linkIndex} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => updateLink(groupIndex, linkIndex, { label: e.target.value })}
                    placeholder="Label"
                    className="flex-1 bg-zinc-800 border border-white/10 rounded px-2 py-1.5 text-white text-xs font-mono focus:outline-none focus:border-purple-500/50"
                  />
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => updateLink(groupIndex, linkIndex, { url: e.target.value })}
                    placeholder="https://..."
                    className="flex-[2] bg-zinc-800 border border-white/10 rounded px-2 py-1.5 text-white text-xs font-mono focus:outline-none focus:border-purple-500/50"
                  />
                  <button
                    onClick={() => removeLink(groupIndex, linkIndex)}
                    className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addLink(groupIndex)}
                className="w-full flex items-center justify-center gap-1 py-1.5 text-xs text-zinc-500 hover:text-white hover:bg-white/5 rounded transition-colors"
              >
                <Plus className="w-3 h-3" /> Add Link
              </button>
            </div>
          )}
        </div>
      ))}

      {savedIndicator === 'links' && (
        <div className="flex items-center justify-center gap-1 text-green-400 text-xs">
          <Check className="w-3 h-3" /> Links saved
        </div>
      )}
    </div>
  );
};

// Widgets Tab
const WidgetsTab: React.FC<{
  settings: NexusSettings;
  onChange: (key: keyof NexusSettings, value: any) => void;
  savedIndicator: string | null;
}> = ({ settings, onChange, savedIndicator }) => {
  const widgets = [
    { key: 'showWeather' as const, label: 'Weather', icon: Cloud, description: 'Current weather in top-left' },
    { key: 'showSports' as const, label: 'Sports Ticker', icon: Trophy, description: 'Premier League scores' },
    { key: 'showCrypto' as const, label: 'Crypto Market', icon: TrendingUp, description: 'BTC, ETH, SOL prices' },
    { key: 'showNotes' as const, label: 'Brain Dump', icon: FileText, description: 'Quick notes scratchpad' },
    { key: 'showPomodoro' as const, label: 'Focus Timer', icon: Clock, description: 'Pomodoro timer' },
  ];

  return (
    <div className="space-y-6">
      {/* Widget Toggles */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-zinc-300">Show/Hide Widgets</h3>
        {widgets.map((widget) => (
          <label
            key={widget.key}
            className="flex items-center justify-between p-3 bg-zinc-800/50 border border-white/10 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors"
          >
            <div className="flex items-center gap-3">
              <widget.icon className="w-5 h-5 text-zinc-400" />
              <div>
                <div className="text-sm text-white">{widget.label}</div>
                <div className="text-xs text-zinc-500">{widget.description}</div>
              </div>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={settings[widget.key]}
                onChange={(e) => onChange(widget.key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-zinc-700 rounded-full peer-checked:bg-purple-500 transition-colors"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
            </div>
          </label>
        ))}
      </div>

      {/* Pomodoro Duration */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
          <Clock className="w-4 h-4" />
          Focus Timer Duration
          {savedIndicator === 'pomodoroMinutes' && <SavedBadge />}
        </label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="5"
            max="60"
            step="5"
            value={settings.pomodoroMinutes}
            onChange={(e) => onChange('pomodoroMinutes', parseInt(e.target.value))}
            className="flex-1 h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
          <span className="text-white font-mono text-sm w-16 text-right">
            {settings.pomodoroMinutes} min
          </span>
        </div>
      </div>
    </div>
  );
};

// Wallpaper Tab
const WallpaperTab: React.FC<{
  settings: NexusSettings;
  wallpapers: string[];
  onChange: (key: keyof NexusSettings, value: any) => void;
  onWallpapersChange: (urls: string[]) => void;
  savedIndicator: string | null;
}> = ({ settings, wallpapers, onChange, onWallpapersChange, savedIndicator }) => {
  const [newUrl, setNewUrl] = useState('');

  const addWallpaper = () => {
    if (newUrl.trim() && newUrl.startsWith('http')) {
      onWallpapersChange([...wallpapers, newUrl.trim()]);
      setNewUrl('');
    }
  };

  const removeWallpaper = (index: number) => {
    const newWallpapers = wallpapers.filter((_, i) => i !== index);
    onWallpapersChange(newWallpapers);
  };

  const resetToDefaults = () => {
    onWallpapersChange([...BACKGROUND_IMAGES]);
  };

  return (
    <div className="space-y-6">
      {/* Grayscale Toggle */}
      <label className="flex items-center justify-between p-3 bg-zinc-800/50 border border-white/10 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors">
        <div className="flex items-center gap-3">
          <Image className="w-5 h-5 text-zinc-400" />
          <div>
            <div className="text-sm text-white">Grayscale Filter</div>
            <div className="text-xs text-zinc-500">Apply black & white effect to backgrounds</div>
          </div>
        </div>
        <div className="relative">
          <input
            type="checkbox"
            checked={settings.wallpaperGrayscale}
            onChange={(e) => onChange('wallpaperGrayscale', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-10 h-6 bg-zinc-700 rounded-full peer-checked:bg-purple-500 transition-colors"></div>
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
        </div>
      </label>

      {/* Rotation Interval */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
          <RotateCw className="w-4 h-4" />
          Rotation Interval
          {savedIndicator === 'wallpaperRotationHours' && <SavedBadge />}
        </label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="1"
            max="24"
            step="1"
            value={settings.wallpaperRotationHours}
            onChange={(e) => onChange('wallpaperRotationHours', parseInt(e.target.value))}
            className="flex-1 h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
          <span className="text-white font-mono text-sm w-20 text-right">
            {settings.wallpaperRotationHours} {settings.wallpaperRotationHours === 1 ? 'hour' : 'hours'}
          </span>
        </div>
      </div>

      {/* Wallpaper URLs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-zinc-300">Background Images</h3>
          <button
            onClick={resetToDefaults}
            className="text-xs text-zinc-500 hover:text-white transition-colors"
          >
            Reset to defaults
          </button>
        </div>

        {/* Current wallpapers */}
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {wallpapers.map((url, index) => (
            <div key={index} className="flex items-center gap-2 group">
              <div 
                className="w-12 h-8 rounded bg-cover bg-center border border-white/10 flex-shrink-0"
                style={{ backgroundImage: `url(${url})` }}
              />
              <input
                type="text"
                value={url}
                onChange={(e) => {
                  const newWallpapers = [...wallpapers];
                  newWallpapers[index] = e.target.value;
                  onWallpapersChange(newWallpapers);
                }}
                className="flex-1 bg-zinc-800 border border-white/10 rounded px-2 py-1.5 text-white text-xs font-mono focus:outline-none focus:border-purple-500/50 truncate"
              />
              <button
                onClick={() => removeWallpaper(index)}
                className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Add new wallpaper */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="flex-1 bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white text-xs font-mono focus:outline-none focus:border-purple-500/50"
            onKeyDown={(e) => e.key === 'Enter' && addWallpaper()}
          />
          <button
            onClick={addWallpaper}
            className="px-3 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 hover:bg-purple-500/30 transition-colors text-xs font-medium flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> Add
          </button>
        </div>
        <p className="text-xs text-zinc-500">
          Use direct image URLs from Unsplash, Pexels, or any image host
        </p>
      </div>

      {savedIndicator === 'wallpapers' && (
        <div className="flex items-center justify-center gap-1 text-green-400 text-xs">
          <Check className="w-3 h-3" /> Wallpapers saved
        </div>
      )}
    </div>
  );
};

// Saved Badge Component
const SavedBadge: React.FC = () => (
  <span className="flex items-center gap-1 text-green-400 text-xs ml-2">
    <Check className="w-3 h-3" /> Saved
  </span>
);

export default SettingsPanel;

