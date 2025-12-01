export interface LinkItem {
  label: string;
  url: string;
  icon?: string;
}

export interface LinkGroupData {
  title: string;
  items: LinkItem[];
}

export enum SearchEngine {
  GOOGLE = 'Google',
  GEMINI_WEB = 'Gemini (Web)',
  GEMINI_API = 'Gemini (Quick Ask)',
  CHATGPT = 'ChatGPT',
  CLAUDE = 'Claude',
  KIMI = 'Kimi',
  DUCKDUCKGO = 'DuckDuckGo',
}

export interface WeatherData {
  temperature: number;
  weatherCode: number;
  isDay: boolean;
}

export interface PremierLeagueMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: string;
  awayScore: string;
  status: string; // 'Scheduled', 'Live', 'Final'
  minute?: string;
  isLive: boolean;
  date: number;
}

export interface CryptoData {
  id: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export interface QuoteData {
  quote: string;
  author: string;
}