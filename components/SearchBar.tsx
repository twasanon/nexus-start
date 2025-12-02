import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Sparkles, Command, Key, ExternalLink } from 'lucide-react';
import { SearchEngine } from '../types';
import { quickAskGemini, hasGeminiApiKey, saveGeminiApiKey, removeGeminiApiKey } from '../services/geminiService';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [engine, setEngine] = useState<SearchEngine>(SearchEngine.GOOGLE);
  const [isOpen, setIsOpen] = useState(false);
  const [geminiResult, setGeminiResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [hasKey, setHasKey] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check for existing key on mount
  useEffect(() => {
    setHasKey(hasGeminiApiKey());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (engine === SearchEngine.GEMINI_API) {
      // Check if API key exists
      if (!hasGeminiApiKey()) {
        setShowApiKeyModal(true);
        return;
      }

      setIsLoading(true);
      setGeminiResult(null);
      const answer = await quickAskGemini(query);
      
      // Handle special responses
      if (answer === 'API_KEY_REQUIRED' || answer === 'API_KEY_INVALID') {
        setIsLoading(false);
        setHasKey(false);
        setShowApiKeyModal(true);
        return;
      }
      
      setGeminiResult(answer);
      setIsLoading(false);
      return;
    }

    let url = '';
    const q = encodeURIComponent(query);

    switch (engine) {
      case SearchEngine.GOOGLE: url = `https://www.google.com/search?q=${q}`; break;
      case SearchEngine.GEMINI_WEB: url = `https://gemini.google.com/app`; break;
      case SearchEngine.CHATGPT: url = `https://chatgpt.com/?q=${q}`; break;
      case SearchEngine.CLAUDE: url = `https://claude.ai/new?q=${q}`; break;
      case SearchEngine.KIMI: url = `https://kimi.moonshot.cn/`; break;
      case SearchEngine.DUCKDUCKGO: url = `https://duckduckgo.com/?q=${q}`; break;
      default: url = `https://www.google.com/search?q=${q}`;
    }

    window.location.href = url;
  };

  const handleSaveApiKey = () => {
    if (apiKeyInput.trim()) {
      saveGeminiApiKey(apiKeyInput.trim());
      setHasKey(true);
      setShowApiKeyModal(false);
      setApiKeyInput('');
    }
  };

  const handleRemoveApiKey = () => {
    removeGeminiApiKey();
    setHasKey(false);
  };

  return (
    <div className="relative w-full max-w-2xl z-50">
      <form onSubmit={handleSearch} className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-xl blur opacity-20 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative flex items-center bg-zinc-950/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-visible">
          {/* Dropdown Trigger */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-4 py-4 text-zinc-300 hover:text-white transition-colors border-r border-white/10 font-mono text-sm"
            >
              {engine === SearchEngine.GEMINI_API ? <Sparkles className="w-4 h-4 text-purple-400" /> : null}
              {engine.split(' ')[0]}
              <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-zinc-900 border border-white/10 rounded-lg shadow-xl overflow-hidden py-1 z-50 animate-fade-in ring-1 ring-black/50">
                {Object.values(SearchEngine).map((e) => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => {
                      setEngine(e);
                      setIsOpen(false);
                      setGeminiResult(null);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm font-mono transition-colors flex items-center gap-2 ${
                      engine === e ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {e === SearchEngine.GEMINI_API && <Sparkles className="w-3 h-3 text-purple-400" />}
                    {e}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex-1 flex items-center px-4">
            <Search className="w-5 h-5 text-zinc-400 mr-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={engine === SearchEngine.GEMINI_API ? "Ask Gemini..." : `Search ${engine}...`}
              className="w-full bg-transparent border-none outline-none text-white placeholder-zinc-500 font-mono text-lg h-full py-4"
              autoFocus
            />
          </div>

           {/* Keyboard Hint */}
           <div className="pr-4 hidden md:flex">
             <span className="flex items-center gap-1 text-xs text-zinc-500 border border-zinc-700 rounded px-1.5 py-0.5 font-mono">
               <Command className="w-3 h-3" /> K
             </span>
           </div>
        </div>
      </form>

      {/* Gemini API Result Modal */}
      {(isLoading || geminiResult) && (
        <div className="absolute top-full left-0 right-0 mt-4 p-6 bg-zinc-950/95 backdrop-blur-xl border border-purple-500/30 rounded-xl shadow-2xl animate-slide-up z-40">
           <div className="flex items-start gap-4">
             <div className="p-2 bg-purple-500/10 rounded-lg">
                <Sparkles className="w-6 h-6 text-purple-400" />
             </div>
             <div className="flex-1">
               <h3 className="text-sm font-bold text-zinc-300 mb-2 uppercase tracking-wider">Gemini Answer</h3>
               {isLoading ? (
                 <div className="flex gap-1 items-center h-6">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                 </div>
               ) : (
                 <p className="text-zinc-200 leading-relaxed font-mono text-sm whitespace-pre-wrap">
                   {geminiResult}
                 </p>
               )}
             </div>
             <button onClick={() => setGeminiResult(null)} className="text-zinc-500 hover:text-white">✕</button>
           </div>
        </div>
      )}

      {/* API Key Input Modal */}
      {showApiKeyModal && (
        <div className="absolute top-full left-0 right-0 mt-4 p-6 bg-zinc-950/95 backdrop-blur-xl border border-purple-500/30 rounded-xl shadow-2xl animate-slide-up z-40">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Key className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-zinc-300 mb-2 uppercase tracking-wider">Gemini API Key Required</h3>
              <p className="text-zinc-400 text-sm mb-4">
                Enter your Gemini API key to use Quick Ask. Your key is stored locally in your browser.
              </p>
              <div className="flex gap-2 mb-3">
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="AIza..."
                  className="flex-1 bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-purple-500/50"
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveApiKey()}
                />
                <button
                  onClick={handleSaveApiKey}
                  className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 hover:bg-purple-500/30 transition-colors text-sm font-medium"
                >
                  Save
                </button>
              </div>
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-purple-400 transition-colors"
              >
                Get a free API key from Google AI Studio <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <button onClick={() => setShowApiKeyModal(false)} className="text-zinc-500 hover:text-white">✕</button>
          </div>
        </div>
      )}

      {/* Show key status indicator when Gemini API is selected */}
      {engine === SearchEngine.GEMINI_API && hasKey && (
        <div className="absolute -top-8 right-0 flex items-center gap-2">
          <span className="text-xs text-zinc-500 font-mono">API key saved</span>
          <button
            onClick={handleRemoveApiKey}
            className="text-xs text-zinc-600 hover:text-red-400 transition-colors"
          >
            (remove)
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;