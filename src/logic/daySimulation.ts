// daySimulation.ts

import { PlayerCharacter } from './PlayerCharacter';
import { Event } from './Event';
import { EVENTS } from '../config/events';
import { combatSimulation } from './combatSimulation';

export type DayResult = {
    day: number;
    event?: string;
    combat?: string;
}

export function daySimulation(
  day: number,
  player: PlayerCharacter
): DayResult {
  const isEvent = Math.random() < 0.7;

  if (isEvent) {
    const event = pickRandomEvent();
    event?.apply(player);

    return {
      day,
      event: event?.name,
    };
  } else {
    const combatResult = combatSimulation(player);

    return {
      day,
      combat: combatResult,
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