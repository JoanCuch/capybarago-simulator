

import { chapterSimulation } from './chapterSimulation';
import type { ChapterDailyResult } from './chapterSimulation';

export type AggregatedDay = {
  day: number;
  avgStats: { atk: number; def: number; hp: number };
  eventPercentage: number;
  combatPercentage: number;
};

export function simulateMultipleRuns(runs: number, totalDays: number): AggregatedDay[] {
  const dailyStats = Array.from({ length: totalDays }, (_, i) => ({
    day: i + 1,
    totalAtk: 0,
    totalDef: 0,
    totalHp: 0,
    eventCount: 0,
    combatCount: 0,
  }));

  for (let i = 0; i < runs; i++) {
    const result: ChapterDailyResult[] = chapterSimulation(totalDays);

    result.forEach((dayResult, index) => {
      dailyStats[index].totalAtk += dayResult.stats.atk;
      dailyStats[index].totalDef += dayResult.stats.def;
      dailyStats[index].totalHp += dayResult.stats.hp;

      if (dayResult.event) dailyStats[index].eventCount += 1;
      if (dayResult.combat) dailyStats[index].combatCount += 1;
    });
  }

  return dailyStats.map((d) => ({
    day: d.day,
    avgStats: {
      atk: d.totalAtk / runs,
      def: d.totalDef / runs,
      hp: d.totalHp / runs,
    },
    eventPercentage: (d.eventCount / runs) * 100,
    combatPercentage: (d.combatCount / runs) * 100,
  }));
}