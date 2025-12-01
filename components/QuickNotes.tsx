import React, { useState, useEffect } from 'react';
import { Edit3 } from 'lucide-react';

const QuickNotes: React.FC = () => {
  const [note, setNote] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('nexus_quick_note');
    if (saved) setNote(saved);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setNote(newValue);
    localStorage.setItem('nexus_quick_note', newValue);
  };

  return (
    <div className="bg-zinc-950/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-96 shadow-2xl flex flex-col w-full hover:border-white/20 transition-colors">
      <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4 shrink-0">
        <Edit3 className="w-7 h-7 text-pink-500" />
        <span className="text-xl font-bold text-zinc-200 uppercase tracking-widest">Brain Dump</span>
      </div>
      <textarea
        className="flex-1 w-full bg-transparent resize-none outline-none text-zinc-300 text-xl font-mono placeholder-zinc-700 custom-scrollbar leading-relaxed"
        placeholder="// scratchpad..."
        value={note}
        onChange={handleChange}
        spellCheck={false}
      />
    </div>
  );
};

export default QuickNotes;