import React, { useEffect, useState } from 'react';
import { PremierLeagueMatch } from '../types';
import { getEPLScores } from '../services/sportsService';
import { Trophy, AlertCircle } from 'lucide-react';

const SportsTicker: React.FC = () => {
  const [matches, setMatches] = useState<PremierLeagueMatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      const data = await getEPLScores();
      setMatches(data);
      setLoading(false);
    };

    fetchMatches();
    // Refresh every 3 hours
    const interval = setInterval(fetchMatches, 10800000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-zinc-950/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-96 shadow-2xl flex flex-col w-full hover:border-white/20 transition-colors">
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4 shrink-0">
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <span className="text-xl font-bold text-zinc-200 uppercase tracking-widest">Premier League</span>
        </div>
        <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </div>
      
      <div className="flex flex-col justify-evenly flex-1 gap-2">
        {loading ? (
           <div className="text-xl text-zinc-500 font-mono animate-pulse text-center">Loading scores...</div>
        ) : matches.length === 0 ? (
           <div className="flex flex-col items-center justify-center h-full text-zinc-500 gap-4">
             <AlertCircle className="w-12 h-12" />
             <span className="text-xl font-mono">No matches active</span>
           </div>
        ) : (
          matches.map((match) => {
            const isUpcoming = match.status === 'UPCOMING';
            
            return (
              <div key={match.id} className="flex items-center justify-between font-mono group border-b border-white/5 last:border-0 pb-4 last:pb-0">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col w-24 gap-1">
                    <span className="text-zinc-300 font-bold text-2xl group-hover:text-white transition-colors tracking-wide">{match.homeTeam}</span>
                    <span className="text-zinc-300 font-bold text-2xl group-hover:text-white transition-colors tracking-wide">{match.awayTeam}</span>
                  </div>
                  
                  <div className="flex flex-col w-12 gap-1 text-center">
                    {isUpcoming ? (
                      <span className="text-zinc-600 text-lg italic py-1">vs</span>
                    ) : (
                      <>
                        <span className="text-white font-bold text-2xl">{match.homeScore}</span>
                        <span className="text-white font-bold text-2xl">{match.awayScore}</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  {match.status === 'LIVE' && (
                    <span className="text-green-400 font-bold animate-pulse text-lg">
                      {match.minute}'
                    </span>
                  )}
                  {match.status === 'FT' && <span className="text-zinc-500 text-lg font-bold">FT</span>}
                  {match.status === 'UPCOMING' && (
                    <span className="text-zinc-600 text-base uppercase tracking-wide font-medium">SOON</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SportsTicker;