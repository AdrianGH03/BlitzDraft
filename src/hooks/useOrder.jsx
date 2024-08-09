import { useMemo } from 'react';

export function useOrder() {
 const order = useMemo(() => [
    "Team1Ban1",
    "Team2Ban1",
    "Team1Ban2",
    "Team2Ban2",
    "Team1Ban3",
    "Team2Ban3",
    "Team1Pick1",
    "Team2Pick1",
    "Filler",
    "Team1Pick2",
    "Filler",
    "Team2Pick3",
    "Team2Ban4",
    "Team1Ban4",
    "Team2Ban5",
    "Team1Ban5",
    "Team2Pick4",
    "Team1Pick4",
    "Filler",
    "Team2Pick5",
  ], []);

 return order;
}