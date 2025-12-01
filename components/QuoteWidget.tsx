import React, { useEffect, useState } from 'react';
import { QuoteData } from '../types';
import { Quote } from 'lucide-react';

const QuoteWidget: React.FC = () => {
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch('https://dummyjson.com/quotes/random');
        const data = await res.json();
        setQuoteData({ quote: data.quote, author: data.author });
      } catch (e) {
        setQuoteData({ 
          quote: "The only way to do great work is to love what you do.", 
          author: "Steve Jobs" 
        });
      }
    };
    fetchQuote();
  }, []);

  if (!quoteData) return null;

  return (
    <div className="hidden lg:flex flex-col items-center text-center max-w-md animate-fade-in mt-8 opacity-80 hover:opacity-100 transition-opacity">
      <Quote className="w-6 h-6 text-zinc-600 mb-2" />
      <p className="text-zinc-300 font-serif italic text-lg leading-relaxed">
        "{quoteData.quote}"
      </p>
      <span className="text-zinc-500 text-xs font-mono mt-2 uppercase tracking-widest">
        — {quoteData.author}
      </span>
    </div>
  );
};

export default QuoteWidget;