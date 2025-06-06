// chapterSimulation.ts

import { PlayerCharacter } from './PlayerCharacter';
import { INITIAL_PLAYER } from '../config/character';
import { daySimulation, type DayResult } from './daySimulation';

export type ChapterDailyResult = {
  day: number;
  event?: string;
  combat?: string;
  stats: { atk: number; def: number; hp: number };
  delta?: { atk: number; def: number; hp: number };
  status: ChapterRunStatus;
};

export const ChapterStatus = {
  Ongoing: 'ongoing',
  Win: 'win',
  Lose: 'lose',
} as const;

export type ChapterRunStatus = (typeof ChapterStatus)[keyof typeof ChapterStatus];

export function chapterSimulation(totalDays: number): ChapterDailyResult[] {
  const results: ChapterDailyResult[] = [];
  let player = INITIAL_PLAYER.clone();
  let previousStats = player.getStats();
  let status: ChapterRunStatus = ChapterStatus.Ongoing;


  for (let day = 1; day <= totalDays; day++) {

    //Simulate the day
    const dayResult : DayResult  = daySimulation(day,player);

    //Compare to previus day
    const currentStats = player.getStats();
    const deltaStats = {
      atk: currentStats.atk - previousStats.atk,
      def: currentStats.def - previousStats.def,
      hp: currentStats.hp - previousStats.hp,
    };

    // Chest chapter status
    if (player.isDead()) {
      status = ChapterStatus.Lose;
    } else if (day === totalDays) {
      status = ChapterStatus.Win;
    }

    results.push({
      day,
      event: dayResult.event,
      combat: dayResult.combat,
      stats: currentStats,
      delta: deltaStats,
      status
    });

    if (status === ChapterStatus.Lose) break;

    previousStats = currentStats;
  }

  return results;
}