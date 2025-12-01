import { CryptoData } from '../types';

export const getCryptoPrices = async (): Promise<CryptoData[]> => {
  try {
    // Using CoinGecko public API
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana&order=market_cap_desc&per_page=3&page=1&sparkline=false'
    );
    
    if (!response.ok) throw new Error('Rate limit or error');
    
    const data = await response.json();
    
    return data.map((coin: any) => ({
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      current_price: coin.current_price,
      price_change_percentage_24h: coin.price_change_percentage_24h
    }));
  } catch (error) {
    console.error("Failed to fetch crypto", error);
    // Return empty array on failure (API rate limits are common on free tier)
    return [];
  }
};