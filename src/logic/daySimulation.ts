// daySimulation.ts

import { PlayerCharacter } from './PlayerCharacter';
import { Event } from './Event';
import { EVENTS } from '../config/events';
import { combatSimulation } from './combatSimulation';
import { enemies } from '../config/enemyPool';
import type { Enemy } from './Enemy';
import type { CombatTurnResult } from './combatSimulation';

export type DayResult = {
    day: number;
    event?: string;
    combat?: string;
    combatLog?: CombatTurnResult[];
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
    const enemy = getRandomEnemy();
    const combatLog = combatSimulation(player, enemy);
    const lastTurn = combatLog[combatLog.length - 1];
    player.hp = lastTurn.playerStats.hp;

    return {
      day,
      combat: enemy.type,
      combatLog,
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

function getRandomEnemy(): Enemy {
  const keys = Object.keys(enemies);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return { ...enemies[randomKey] };
}