import { INITIAL_PLAYER } from '../config/character';
import { daySimulation, type DayResult } from './daySimulation';
import type { CombatTurnResult } from './combatSimulation';
import { EVENTS } from '../config/eventsConfig';
import type { Event } from './Event';
import type { Chapter } from './Chapter';

export type ChapterDailyResult = {
  day: number;
  event?: string;
  combat?: string;
  combatLog?: CombatTurnResult[];
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

//Auxiliars

function pickRandomEvent(tagWeights: { [tag: string]: number }): Event | undefined {
  const tags = Object.entries(tagWeights);

  // Calculate the total weight to perform weighted random selection
  const totalWeight = tags.reduce((sum, [, weight]) => sum + weight, 0);
  if (totalWeight === 0) return undefined;

  // Random value between 0 and totalWeight
  let r = Math.random() * totalWeight;

  for (const [tag, weight] of tags) {
    r -= weight;
    if (r <= 0) {
      const matchingEvents = EVENTS.filter((e) => e.tag === tag);
      if (matchingEvents.length === 0) return undefined;
      const index = Math.floor(Math.random() * matchingEvents.length);
      return matchingEvents[index];
    }
  }

  return undefined;
}

// Main functions

export function chapterSimulation(config: Chapter): ChapterDailyResult[] {
  const results: ChapterDailyResult[] = [];
  let player = INITIAL_PLAYER.clone();
  let previousStats = player.getStats();
  let status: ChapterRunStatus = ChapterStatus.Ongoing;

  for (let day = 1; day <= config.totalDays; day++) {
    const tagWeights = config.eventDistribution[day].eventChances;
    const event = pickRandomEvent(tagWeights);

    if (!event) continue;

    const dayResult: DayResult = daySimulation(day, player, event);
    const currentStats = player.getStats();
    const deltaStats = {
      atk: currentStats.atk - previousStats.atk,
      def: currentStats.def - previousStats.def,
      hp: currentStats.hp - previousStats.hp,
    };

    if (player.isDead()) {
      status = ChapterStatus.Lose;
    } else if (day === config.totalDays) {
      status = ChapterStatus.Win;
    }

    results.push({
      day,
      event: dayResult.event,
      combat: dayResult.combat,
      combatLog: dayResult.combatLog,
      stats: currentStats,
      delta: deltaStats,
      status,
    });

    if (status === ChapterStatus.Lose) break;

    previousStats = currentStats;
  }

  return results;
}