import React, { useState, useEffect, useRef } from 'react';
import { Search, Settings, X, Globe } from 'lucide-react';
import SettingsPanel from './SettingsPanel';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

type View = 'search' | 'settings';

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [view, setView] = useState<View>('search');
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setView('search');
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (view === 'settings') {
          setView('search');
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, view, onClose]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  const searchActions = [
    { 
      id: 'google', 
      label: 'Search Google', 
      icon: Globe, 
      action: () => {
        if (query) window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      }
    },
    { 
      id: 'settings', 
      label: 'Open Settings', 
      icon: Settings, 
      shortcut: '⌘ ,',
      action: () => setView('settings')
    },
  ];

  const filteredActions = query 
    ? searchActions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()))
    : searchActions;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        ref={modalRef}
        className="w-full max-w-xl bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-slide-up"
      >
        {view === 'search' ? (
          <>
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
              <Search className="w-5 h-5 text-zinc-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search or type a command..."
                className="flex-1 bg-transparent text-white text-lg font-mono placeholder-zinc-500 outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && filteredActions.length > 0) {
                    filteredActions[0].action();
                  }
                }}
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs text-zinc-500 bg-zinc-800 rounded border border-zinc-700 font-mono">
                ESC
              </kbd>
            </div>

            {/* Actions List */}
            <div className="py-2 max-h-80 overflow-y-auto">
              {filteredActions.map((action, index) => (
                <button
                  key={action.id}
                  onClick={action.action}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors ${
                    index === 0 ? 'bg-white/5' : ''
                  }`}
                >
                  <div className="p-2 bg-zinc-800 rounded-lg">
                    <action.icon className="w-4 h-4 text-zinc-300" />
                  </div>
                  <span className="flex-1 text-zinc-200 font-medium">{action.label}</span>
                  {action.shortcut && (
                    <kbd className="px-2 py-1 text-xs text-zinc-500 bg-zinc-800 rounded border border-zinc-700 font-mono">
                      {action.shortcut}
                    </kbd>
                  )}
                </button>
              ))}

              {query && filteredActions.length === 0 && (
                <div className="px-4 py-8 text-center text-zinc-500">
                  No commands found for "{query}"
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-white/10 bg-zinc-950/50">
              <span className="text-xs text-zinc-500 font-mono">Nexus Command Palette</span>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700">↑↓</kbd>
                <span>navigate</span>
                <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700">↵</kbd>
                <span>select</span>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Settings Header */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
              <button 
                onClick={() => setView('search')}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <X className="w-5 h-5 text-zinc-400" />
              </button>
              <Settings className="w-5 h-5 text-zinc-400" />
              <span className="text-lg font-medium text-white">Settings</span>
            </div>

            {/* Settings Panel */}
            <SettingsPanel onClose={() => setView('search')} />
          </>
        )}
      </div>
    </div>
  );
};

export default CommandPalette;

