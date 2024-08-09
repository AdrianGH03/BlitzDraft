import { useMemo } from 'react';

export function useTournaments() {
  const tournaments = useMemo(() => ({
    'MSI': [{ name: '2024 Mid-Season Invitational', patchesPlayed: '14.8' }],
    'LCK': [{ name: 'LCK/2024 Season/Spring Season', patchesPlayed: '14.1-14.5' }, { name: 'LCK/2024 Season/Spring Playoffs', patchesPlayed: '14.6' }, {name: 'LCK/2024 Season/Summer Season', patchesPlayed: '14.11-14.14'}],
    'LCS': [{ name: 'LCS/2024 Season/Spring Season', patchesPlayed: '14.1-14.5' }, { name: 'LCS/2024 Season/Spring Playoffs', patchesPlayed: '14.5' }, { name: 'LCS/2024 Season/Summer Season', patchesPlayed: '14.12-14.15' }],
    'LEC': [{ name: 'LEC/2024 Season/Spring Season', patchesPlayed: '14.5' }, { name: 'LEC/2024 Season/Spring Playoffs', patchesPlayed: '14.6' }, { name: 'LEC/2024 Season/Winter Season', patchesPlayed: '14.1' }, { name: 'LEC/2024 Season/Winter Playoffs', patchesPlayed: '14.2' }, { name: 'LEC/2024 Season/Summer Season', patchesPlayed: '14.11-14.12' }, { name: 'LEC/2024 Season/Summer Playoffs', patchesPlayed: '14.13' }],
    'LPL': [{ name: 'LPL/2024 Season/Spring Season', patchesPlayed: '14.2-14.5' }, { name: 'LPL/2024 Season/Spring Playoffs', patchesPlayed: '14.6' }, { name: 'LPL/2024 Season/Summer Placements', patchesPlayed: '14.10-14.13' }, { name: 'LPL/2024 Season/Summer Season', patchesPlayed: '14.13-14.14' }, { name: 'LPL/2024 Season/Summer Playoffs', patchesPlayed: '14.14-14.15' }],
    'PCS': [{ name: 'PCS/2024 Season/Spring Season', patchesPlayed: '14.1-14.3' }, { name: 'PCS/2024 Season/Spring Playoffs', patchesPlayed: '14.5' }, { name: 'PCS/2024 Season/Summer Season', patchesPlayed: '14.11-14.13' }, { name: 'PCS/2024 Season/Summer Playoffs', patchesPlayed: '14.15' }],
    'VCS': [{ name: 'VCS/2024 Season/Spring Season', patchesPlayed: '14.1-14.3' }, { name: 'VCS/2024 Season/Spring Playoffs', patchesPlayed: '14.5'}, { name: 'VCS/2024 Season/Summer Season', patchesPlayed: '14.12-14.14' }],
    'CBLOL': [{ name: 'CBLOL/2024 Season/Split 1', patchesPlayed: '14.1-14.5' }, { name: 'CBLOL/2024 Season/Split 1 Playoffs', patchesPlayed: '14.5-14.6' }, { name: 'CBLOL/2024 Season/Split 2', patchesPlayed: '14.10-14.14'}, { name: 'CBLOL/2024 Season/Split 2 Playoffs', patchesPlayed: '14.15-14.16' }],
    'LLA': [{ name: 'LLA/2024 Season/Opening Season', patchesPlayed: '14.1-14.4' }, { name: 'LLA/2024 Season/Opening Playoffs', patchesPlayed: '14.4-14.5' }, { name: 'LLA/2024 Season/Closing Season', patchesPlayed: '14.11-14.14' }, { name: 'LLA/2024 Season/Closing Playoffs', patchesPlayed: '14.14-14.15' }],
    'PCL': [{ name: 'PCL/2024 Season/Spring Season', patchesPlayed: '14.1-14.5' }, { name: 'PCL/2024 Season/Spring Playoffs', patchesPlayed: '14.5' }, { name: 'PCL/2024 Season/Summer Season', patchesPlayed: '14.10-14.13' }, { name: 'PCL/2024 Season/Summer Playoffs', patchesPlayed: '14.14' }],
    'LJL': [{ name: 'LJL/2024 Season/Spring Season', patchesPlayed: '14.1b-14.2' }, { name: 'LJL/2024 Season/Spring Playoffs', patchesPlayed: '14.3' }, { name: 'LJL/2024 Season/Summer Season', patchesPlayed: '14.11-14.13' }, { name: 'LJL/2024 Season/Summer Playoffs', patchesPlayed: '14.13' }],
    'NACL': [{ name: 'North American Challengers League/2024 Season/Spring Promotion', patchesPlayed: '13.16' }, { name: 'North American Challengers League/2024 Season/Spring Season', patchesPlayed: '14.1-14.5' }, { name: 'North American Challengers League/2024 Season/Spring Playoffs', patchesPlayed: '14.5' }, { name: 'North American Challengers League/2024 Season/Summer Promotion', patchesPlayed: '14.6' }, { name: 'North American Challengers League/2024 Season/Summer Season', patchesPlayed: '14.12-14.15' }],
    'LVPSL': [{ name: 'LVP SuperLiga/2024 Season/Spring Season', patchesPlayed: '14.1-b-14.4' }, { name: 'LVP SuperLiga/2024 Season/Spring Playoffs', patchesPlayed: '14.5' }, { name: 'LVP SuperLiga/2024 Season/Summer Season', patchesPlayed: '14.9-14.13' }, { name: 'LVP SuperLiga/2024 Season/Summer Playoffs', patchesPlayed: '14.13' }],
    'LFL': [{ name: 'LFL/2024 Season/Spring Season', patchesPlayed: '14.1b-14.4' }, { name: 'LFL/2024 Season/Spring Playoffs', patchesPlayed: '14.5' }, { name: 'LFL/2024 Season/Summer Season', patchesPlayed: '14.9-14.13' }, { name: 'LFL/2024 Season/Summer Playoffs', patchesPlayed: '14.13' }],
    'EMEAM': [{ name: 'EMEA Masters/2024 Season/Spring Play-In', patchesPlayed: '14.7' }, { name: 'EMEA Masters/2024 Season/Spring Main Event', patchesPlayed: '14.7' }, { name: 'EMEA Masters/2024 Season/Summer LCQ', patchesPlayed: '14.13' }, { name: 'EMEA Masters/2024 Season/Summer Main Event', patchesPlayed: '14.15' }],
    'LCO': [{ name: 'LCO/2024 Season/Split 1', patchesPlayed: '14.1-14.3' }, { name: 'LCO/2024 Season/Split 1 Playoffs', patchesPlayed: '14.3' }, { name: 'LCO/2024 Season/Split 2', patchesPlayed: '14.10-14.13' }, { name: 'LCO/2024 Season/Split 2 Playoffs', patchesPlayed: '14.13' }],
    'LCKCL': [{ name: 'LCK CL/2024 Season/Spring Season', patchesPlayed: '14.1b-14.5' }, { name: 'LCK CL/2024 Season/Spring Playoffs', patchesPlayed: '14.5-14.6' }, { name: 'LCK CL/2024 Season/Summer Season', patchesPlayed: '14.11-14.15' }],
  }), []);

  const getRandomTournament = () => {
    const allTournaments = Object.values(tournaments).flat();
    return allTournaments[Math.floor(Math.random() * allTournaments.length)];
  };

  return { tournaments, getRandomTournament };
}