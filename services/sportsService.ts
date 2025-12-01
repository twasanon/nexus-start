import { PremierLeagueMatch } from '../types';

export const getEPLScores = async (): Promise<PremierLeagueMatch[]> => {
  try {
    // ESPN Public API for English Premier League
    const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard');
    const data = await response.json();
    
    if (!data.events) return [];

    const allMatches: PremierLeagueMatch[] = data.events.map((event: any) => {
      const competition = event.competitions[0];
      const home = competition.competitors.find((c: any) => c.homeAway === 'home');
      const away = competition.competitors.find((c: any) => c.homeAway === 'away');
      const status = event.status.type.state; // 'pre', 'in', 'post'
      
      // Map ESPN status to our display format
      let displayStatus = 'UPCOMING';
      if (status === 'in') displayStatus = 'LIVE';
      if (status === 'post') displayStatus = 'FT';
      
      // Shorten team names to 3 letters if possible, or use abbrev
      const getAbbrev = (team: any) => team.team.abbreviation || team.team.name.substring(0, 3).toUpperCase();

      return {
        id: event.id,
        homeTeam: getAbbrev(home),
        awayTeam: getAbbrev(away),
        homeScore: home.score || '0',
        awayScore: away.score || '0',
        status: displayStatus,
        minute: event.status.displayClock,
        isLive: status === 'in',
        date: new Date(event.date).getTime()
      };
    });

    // Strategy: Always return exactly 3 matches if possible.
    // Slot 1: The "Headline" match. Either the most recent finished game OR the current live game.
    // Slot 2 & 3: The next upcoming games.
    
    const live = allMatches.filter(m => m.status === 'LIVE').sort((a, b) => b.date - a.date);
    const finished = allMatches.filter(m => m.status === 'FT').sort((a, b) => b.date - a.date); // Newest finished first
    const upcoming = allMatches.filter(m => m.status === 'UPCOMING').sort((a, b) => a.date - b.date); // Soonest upcoming first

    const result: PremierLeagueMatch[] = [];

    // 1. Pick the primary match
    if (live.length > 0) {
      result.push(live[0]);
    } else if (finished.length > 0) {
      result.push(finished[0]);
    } else if (upcoming.length > 0) {
      // If literally nothing has happened yet (season start), pick first upcoming
      result.push(upcoming[0]);
    }

    // 2. Fill remaining 2 slots with UPCOMING matches
    const primaryId = result[0]?.id;
    let nextUp = upcoming.filter(m => m.id !== primaryId);
    
    result.push(...nextUp.slice(0, 2));

    // 3. If we still don't have 3, backfill with more FINISHED matches (history)
    if (result.length < 3) {
      const moreHistory = finished.filter(m => m.id !== primaryId);
      const needed = 3 - result.length;
      result.push(...moreHistory.slice(0, needed));
    }
    
    // 4. If STILL < 3 (rare, e.g., only 1 match exists in API window), return what we have
    return result.slice(0, 3);

  } catch (error) {
    console.error("Failed to fetch EPL scores", error);
    return [];
  }
};