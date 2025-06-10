import { chapterSimulation } from './chapterSimulation';
import type { ChapterDailyResult } from './chapterSimulation';
import type { Chapter } from './Chapter';


export type AggregatedDay = {
  day: number;
  avgStats: { atk: number; def: number; hp: number };
  eventPercentage: number;
  combatPercentage: number;
  reachCount: number;
};

export function simulateMultipleRuns(runs: number, config: Chapter): AggregatedDay[] {
  const dailyStats = Array.from({ length: config.totalDays }, (_, i) => ({
    day: i + 1,
    totalAtk: 0,
    totalDef: 0,
    totalHp: 0,
    eventCount: 0,
    combatCount: 0,
    reachCount: 0,
  }));

  for (let i = 0; i < runs; i++) {
    const result: ChapterDailyResult[] = chapterSimulation(config);

    result.forEach((dayResult, index) => {
      dailyStats[index].totalAtk += dayResult.stats.atk;
      dailyStats[index].totalDef += dayResult.stats.def;
      dailyStats[index].totalHp += dayResult.stats.hp;

      if (dayResult.event) dailyStats[index].eventCount += 1;
      if (dayResult.combat) dailyStats[index].combatCount += 1;
      dailyStats[index].reachCount += 1;
    });
  }

  return dailyStats.map((d) => ({
    day: d.day,
    avgStats: {
      atk: d.totalAtk / d.reachCount,
      def: d.totalDef / d.reachCount,
      hp: d.totalHp / d.reachCount,
    },
    eventPercentage: (d.eventCount / d.reachCount) * 100,
    combatPercentage: (d.combatCount / d.reachCount) * 100,
    reachCount: d.reachCount,
  }));
}