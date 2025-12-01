import React from 'react';
import { LinkGroupData } from './types';
import { 
  Github, 
  Twitter, 
  Youtube, 
  Music, 
  BookOpen, 
  Terminal, 
  Cpu, 
  Cloud, 
  Server,
  Code2,
  Newspaper,
  TrendingUp,
  BrainCircuit,
  MessageSquare,
  Mountain
} from 'lucide-react';

export const LINK_GROUPS: LinkGroupData[] = [
  {
    title: 'intel',
    items: [
      { label: 'hacker-news', url: 'https://news.ycombinator.com', icon: 'Newspaper' },
      { label: 'marginal-rev', url: 'https://marginalrevolution.com', icon: 'TrendingUp' },
      { label: 'less-wrong', url: 'https://www.lesswrong.com', icon: 'BrainCircuit' },
    ]
  },
  {
    title: 'social',
    items: [
      { label: 'twitter-x', url: 'https://x.com', icon: 'Twitter' },
    ]
  },
  {
    title: 'media',
    items: [
      { label: 'youtube', url: 'https://youtube.com', icon: 'Youtube' },
      { label: 'spotify', url: 'https://open.spotify.com', icon: 'Music' },
      { label: 'netflix', url: 'https://netflix.com', icon: 'Cloud' },
    ]
  },
  {
    title: 'dev',
    items: [
      { label: 'github', url: 'https://github.com', icon: 'Github' },
      { label: 'himalora', url: 'https://himalora.com', icon: 'Mountain' },
      { label: 'himai', url: 'https://himai.com.np', icon: 'Code2' },
    ]
  }
];

export const ICONS: Record<string, React.FC<any>> = {
  Github, Twitter, Youtube, Music, BookOpen, Terminal, Cpu, Cloud, Server, Code2, 
  Newspaper, TrendingUp, BrainCircuit, MessageSquare, Mountain
};

// Curated list of Dark/Himalayan/Cyberpunk images
export const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1519681393798-38e43269d877?q=80&w=1920&auto=format&fit=crop", // Dark Mountain Starry
  "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=1920&auto=format&fit=crop", // Cyberpunk Rainy City
  "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1920&auto=format&fit=crop", // Dark Valley
  "https://images.unsplash.com/photo-1518098268026-4e1877a1c3d9?q=80&w=1920&auto=format&fit=crop", // Misty Peak
  "https://images.unsplash.com/photo-1515462277126-2dd0c162007a?q=80&w=1920&auto=format&fit=crop", // Neon Tech
];
