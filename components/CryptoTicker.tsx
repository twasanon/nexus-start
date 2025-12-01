import React, { useEffect, useState } from 'react';
import { CryptoData } from '../types';
import { getCryptoPrices } from '../services/cryptoService';
import { TrendingUp, TrendingDown, Bitcoin } from 'lucide-react';

const CryptoTicker: React.FC = () => {
  const [coins, setCoins] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrypto = async () => {
      const data = await getCryptoPrices();
      setCoins(data);
      setLoading(false);
    };

    fetchCrypto();
    // Refresh every 3 hours
    const interval = setInterval(fetchCrypto, 10800000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-zinc-950/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-96 shadow-2xl flex flex-col w-full hover:border-white/20 transition-colors">
      <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4 shrink-0">
        <Bitcoin className="w-8 h-8 text-orange-500" />
        <span className="text-xl font-bold text-zinc-200 uppercase tracking-widest">Market</span>
      </div>
      
      {coins.length > 0 ? (
        <div className="flex flex-col flex-1 justify-evenly gap-4">
          {coins.map((coin) => {
            const isPositive = coin.price_change_percentage_24h >= 0;
            return (
              <div key={coin.id} className="flex items-center justify-between font-mono border-b border-white/5 last:border-0 pb-4 last:pb-0">
                <span className="text-zinc-300 font-bold text-2xl truncate pr-2 tracking-wide">{coin.symbol}</span>
                <div className="flex flex-col items-end shrink-0">
                  <span className="text-white text-2xl font-medium tracking-tight">${coin.current_price.toLocaleString()}</span>
                  <span className={`text-lg flex items-center gap-1.5 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-xl text-zinc-500 font-mono">
           {loading ? 'Loading market...' : 'Data unavailable'}
        </div>
      )}
    </div>
  );
};

export default CryptoTicker;