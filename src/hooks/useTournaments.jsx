import { useMemo } from 'react';

export function useTournaments() {
  const tournaments = useMemo(() => ({
    'MSI': [{ name: '2024 Mid-Season Invitational', patchesPlayed: '14.1-14.2' }],
    'LCK': [{ name: 'LCK/2024 Season/Spring Season', patchesPlayed: '14.3-14.4' }, { name: 'LCK/2024 Season/Spring Playoffs', patchesPlayed: '14.5-14.6' }],
    'LCS': [{ name: 'LCS/2024 Season/Spring Season', patchesPlayed: '14.7-14.8' }, { name: 'LCS/2024 Season/Spring Playoffs', patchesPlayed: '14.9-14.10' }],
    'LEC': [{ name: 'LEC/2024 Season/Spring Season', patchesPlayed: '14.4-14.5' }, { name: 'LEC/2024 Season/Spring Playoffs', patchesPlayed: '14.6-14.7' }, { name: 'LEC/2024 Season/Winter Season', patchesPlayed: '14.8-14.9' }, { name: 'LEC/2024 Season/Winter Playoffs', patchesPlayed: '14.10-14.11' }],
    'LPL': [{ name: 'LPL/2024 Season/Spring Season', patchesPlayed: '14.12-14.13' }, { name: 'LPL/2024 Season/Spring Playoffs', patchesPlayed: '14.14-14.15' }],
    'PCS': [{ name: 'PCS/2024 Season/Spring Season', patchesPlayed: '14.16-14.17' }, { name: 'PCS/2024 Season/Spring Playoffs', patchesPlayed: '14.18-14.19' }],
    'VCS': [{ name: 'VCS/2024 Season/Spring Season', patchesPlayed: '14.20-14.21' }, { name: 'VCS/2024 Season/Spring Playoffs', patchesPlayed: '14.22-14.23' }],
    'CBLOL': [{ name: 'CBLOL/2024 Season/Split 1', patchesPlayed: '14.24-14.25' }, { name: 'CBLOL/2024 Season/Split 1 Playoffs', patchesPlayed: '14.26-14.27' }],
    'LLA': [{ name: 'LLA/2024 Season/Opening Season', patchesPlayed: '14.28-14.29' }, { name: 'LLA/2024 Season/Opening Playoffs', patchesPlayed: '14.30-14.31' }],
  }), []);

  const getRandomTournament = () => {
    const allTournaments = Object.values(tournaments).flat();
    return allTournaments[Math.floor(Math.random() * allTournaments.length)];
  };

  return { tournaments, getRandomTournament };
}