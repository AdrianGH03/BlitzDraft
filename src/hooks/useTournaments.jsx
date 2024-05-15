import { useMemo } from 'react';

export function useTournaments() {
  const tournaments = useMemo(() => ({
    'MSI': [{ name: '2024 Mid-Season Invitational', patchesPlayed: '14.8' }],
    'LCK': [{ name: 'LCK/2024 Season/Spring Season', patchesPlayed: '14.1-14.5' }, { name: 'LCK/2024 Season/Spring Playoffs', patchesPlayed: '14.6' }],
    'LCS': [{ name: 'LCS/2024 Season/Spring Season', patchesPlayed: '14.1-14.5' }, { name: 'LCS/2024 Season/Spring Playoffs', patchesPlayed: '14.5' }],
    'LEC': [{ name: 'LEC/2024 Season/Spring Season', patchesPlayed: '14.5' }, { name: 'LEC/2024 Season/Spring Playoffs', patchesPlayed: '14.6' }, { name: 'LEC/2024 Season/Winter Season', patchesPlayed: '14.1' }, { name: 'LEC/2024 Season/Winter Playoffs', patchesPlayed: '14.2' }],
    'LPL': [{ name: 'LPL/2024 Season/Spring Season', patchesPlayed: '14.2-14.5' }, { name: 'LPL/2024 Season/Spring Playoffs', patchesPlayed: '14.6' }],
    'PCS': [{ name: 'PCS/2024 Season/Spring Season', patchesPlayed: '14.1-14.3' }, { name: 'PCS/2024 Season/Spring Playoffs', patchesPlayed: '14.5' }],
    'VCS': [{ name: 'VCS/2024 Season/Spring Season', patchesPlayed: '14.1-14.3' }, { name: 'VCS/2024 Season/Spring Playoffs', patchesPlayed: '14.5' }],
    'CBLOL': [{ name: 'CBLOL/2024 Season/Split 1', patchesPlayed: '14.1-14.5' }, { name: 'CBLOL/2024 Season/Split 1 Playoffs', patchesPlayed: '14.5-14.6' }],
    'LLA': [{ name: 'LLA/2024 Season/Opening Season', patchesPlayed: '14.1-14.4' }, { name: 'LLA/2024 Season/Opening Playoffs', patchesPlayed: '14.4-14.5' }],
  }), []);

  const getRandomTournament = () => {
    const allTournaments = Object.values(tournaments).flat();
    return allTournaments[Math.floor(Math.random() * allTournaments.length)];
  };

  return { tournaments, getRandomTournament };
}