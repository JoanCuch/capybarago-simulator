// daySimulation.ts

import { PlayerCharacter } from './PlayerCharacter';
import { Event } from './Event';
import { EVENTS } from '../config/events';
import { combatSimulation } from './combatSimulation';
import type { SimulationResult } from './chapterSimulation';

export function daySimulation(
  day: number,
  totalDays: number,
  player: PlayerCharacter
): SimulationResult {
  const isEvent = Math.random() < 0.7;

  if (isEvent) {
    const event = pickRandomEvent();
    event?.apply(player);
    const isDead = player.isDead();

    return {
      day,
      stats: player.getStats(),
      event: event?.name,
      status: isDead ? 'dead' : day === totalDays ? 'win' : 'alive',
    };
  } else {
    const combatResult = combatSimulation(player);

    return {
      day,
      stats: player.getStats(),
      combat: combatResult,
      status: player.isDead() ? 'dead' : day === totalDays ? 'win' : 'alive',
    };
  }
}

function pickRandomEvent(): Event | undefined {
  const totalChance = EVENTS.reduce((sum, e) => sum + (e.chance ?? 0), 0);
  const roll = Math.random() * totalChance;
  let acc = 0;
  for (const event of EVENTS) {
    acc += event.chance ?? 0;
    if (roll < acc) return event;
  }
  return undefined;
}