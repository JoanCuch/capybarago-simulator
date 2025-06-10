// daySimulation.ts

import { PlayerCharacter } from './PlayerCharacter';
import { Event } from './Event';
import { combatSimulation } from './combatSimulation';
import type { CombatTurnResult } from './combatSimulation';

export type DayResult = {
  day: number;
  event?: string;
  combat?: string;
  combatLog?: CombatTurnResult[];
};

export function daySimulation(
  day: number,
  player: PlayerCharacter,
  event: Event
): DayResult {
  if (event.enemy) {
    const combatLog = combatSimulation(player, event.enemy);
    const lastTurn = combatLog[combatLog.length - 1];
    player.hp = lastTurn.playerStats.hp;

    return {
      day,
      event: event.name,
      combat: event.enemy,
      combatLog,
    };
  } else {
    event.apply(player);
    return {
      day,
      event: event.name,
    };
  }
}