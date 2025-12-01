import { PremierLeagueMatch } from '../types';

const BASE_URL = 'https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1';

// Helper to map raw ESPN event to our internal structure
const mapEventToMatch = (event: any): PremierLeagueMatch => {
  const competition = event.competitions[0];
  const home = competition.competitors.find((c: any) => c.homeAway === 'home');
  const away = competition.competitors.find((c: any) => c.homeAway === 'away');
  
  // Handle inconsistent API structure: Status can be at root or inside competition
  const statusObj = event.status || competition.status;
  const status = statusObj?.type?.state || 'pre'; // 'pre', 'in', 'post'
  
  let displayStatus = 'UPCOMING';
  if (status === 'in') displayStatus = 'LIVE';
  if (status === 'post') displayStatus = 'FT';
  
  const getAbbrev = (team: any) => team.team.abbreviation || team.team.name.substring(0, 3).toUpperCase();
  
  // Handle clock
  const clock = statusObj?.displayClock || competition.status?.displayClock || '00:00';

  return {
    id: event.id,
    homeTeam: getAbbrev(home),
    awayTeam: getAbbrev(away),
    homeScore: home.score?.displayValue || home.score || '0',
    awayScore: away.score?.displayValue || away.score || '0',
    status: displayStatus,
    minute: clock,
    isLive: status === 'in',
    date: new Date(event.date).getTime()
  };
};

export const getEPLScores = async (): Promise<PremierLeagueMatch[]> => {
  try {
    // 1. Fetch Scoreboard (Live & Upcoming window)
    const scoreboardRes = await fetch(`${BASE_URL}/scoreboard`);
    const scoreboardData = await scoreboardRes.json();
    const scoreboardEvents = scoreboardData.events || [];
    const allScoreboardMatches = scoreboardEvents.map(mapEventToMatch);

    const liveMatches = allScoreboardMatches
        .filter((m: PremierLeagueMatch) => m.status === 'LIVE')
        .sort((a: PremierLeagueMatch, b: PremierLeagueMatch) => b.date - a.date);
    
    const upcomingMatches = allScoreboardMatches
        .filter((m: PremierLeagueMatch) => m.status === 'UPCOMING')
        .sort((a: PremierLeagueMatch, b: PremierLeagueMatch) => a.date - b.date);

    // If we have a live match, that is priority #1
    if (liveMatches.length > 0) {
        return [
            liveMatches[0], 
            ...upcomingMatches.filter(m => m.id !== liveMatches[0].id)
        ].slice(0, 3);
    }

    // 2. If no live match, fetch Standings to find Top 3 Teams and get the most recent result
    let featuredMatch: PremierLeagueMatch | null = null;

    try {
        const standingsRes = await fetch('https://site.api.espn.com/apis/v2/sports/soccer/eng.1/standings');
        const standingsData = await standingsRes.json();
        const entries = standingsData.children?.[0]?.standings?.entries || [];
        
        // Check top 3 teams in order
        const topTeams = entries.slice(0, 3).map((e: any) => e.team.id);

        for (const teamId of topTeams) {
            // Fetch Schedule for the team
            const scheduleRes = await fetch(`${BASE_URL}/teams/${teamId}/schedule`);
            const scheduleData = await scheduleRes.json();
            const teamEvents = scheduleData.events || [];
            
            // Find last completed match
            const completedTeamMatches = teamEvents
                .map(mapEventToMatch)
                .filter((m: PremierLeagueMatch) => m.status === 'FT')
                .sort((a: PremierLeagueMatch, b: PremierLeagueMatch) => b.date - a.date); // Newest first

            if (completedTeamMatches.length > 0) {
                featuredMatch = completedTeamMatches[0];
                break; // Found the top-most relevant match, stop searching
            }
        }
    } catch (e) {
        console.warn("Failed to fetch standings context", e);
    }

    // 3. Assemble Result
    const result: PremierLeagueMatch[] = [];

    // Slot 1: Featured Match (Top Team Result) or Fallback to generic scoreboard result
    if (featuredMatch) {
        result.push(featuredMatch);
    } else {
        const finishedGeneric = allScoreboardMatches
            .filter((m: PremierLeagueMatch) => m.status === 'FT')
            .sort((a: PremierLeagueMatch, b: PremierLeagueMatch) => b.date - a.date);
        if (finishedGeneric.length > 0) {
            result.push(finishedGeneric[0]);
        }
    }

    // Slot 2 & 3: Upcoming Matches
    const usedIds = new Set(result.map(r => r.id));
    for (const match of upcomingMatches) {
        if (result.length >= 3) break;
        if (!usedIds.has(match.id)) {
            result.push(match);
            usedIds.add(match.id);
        }
    }

    return result;

  } catch (error) {
    console.error("Failed to fetch EPL scores", error);
    return [];
  }
};