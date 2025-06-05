// chapterSimulation.ts

import { PlayerCharacter } from './PlayerCharacter';
import { INITIAL_PLAYER } from '../config/character';
import { daySimulation } from './daySimulation';

export type SimulationResult = {
  day: number;
  stats: { atk: number; def: number; hp: number };
  event?: string;
  combat?: string;
  status: 'alive' | 'dead' | 'win';
};

export function chapterSimulation(totalDays: number): SimulationResult[] {
  const results: SimulationResult[] = [];
  const player = INITIAL_PLAYER.clone();

  for (let day = 1; day <= totalDays; day++) {
    const result = daySimulation(day, totalDays, player);
    results.push(result);
    if (result.status === 'dead' || result.status === 'win') break;
  }

  return results;
}