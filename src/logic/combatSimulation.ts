import type { PlayerCharacter } from './PlayerCharacter';
import { enemies } from '../config/enemyPool';

export type CombatTurnResult = {
  playerStats: { atk: number; def: number; hp: number };
  playerDelta: { atk: number; def: number; hp: number };
  enemyStats: { atk: number; def: number; hp: number };
  enemyDelta: { atk: number; def: number; hp: number };
  attacker: 'player' | 'enemy';
  enemyType: string;
};

export type CombatResult = CombatTurnResult[];


function turnSimulation(
  player: { atk: number; def: number; hp: number },
  enemy: { atk: number; def: number; hp: number },
  attacker: 'player' | 'enemy',
  enemyType: string
): CombatTurnResult {
  const playerBefore = { ...player };
  const enemyBefore = { ...enemy };

  if (attacker === 'player') {
    const damage = Math.max(0, player.atk - enemy.def);
    enemy.hp = Math.max(0, enemy.hp - damage);
  } else {
    const damage = Math.max(0, enemy.atk - player.def);
    player.hp = Math.max(0, player.hp - damage);
  }

  return {
    playerStats: { ...player },
    playerDelta: {
      atk: player.atk - playerBefore.atk,
      def: player.def - playerBefore.def,
      hp: player.hp - playerBefore.hp,
    },
    enemyStats: { ...enemy },
    enemyDelta: {
      atk: enemy.atk - enemyBefore.atk,
      def: enemy.def - enemyBefore.def,
      hp: enemy.hp - enemyBefore.hp,
    },
    attacker,
    enemyType,
  };
}

export function combatSimulation(
  player: PlayerCharacter,
  enemyId: string
): CombatResult {
  const enemy = enemies[enemyId];
  if (!enemy) {
    throw new Error(`Enemy with id "${enemyId}" not found.`);
  }

  const result: CombatResult = [];
  const playerCopy = player.clone();
  const enemyCopy = { ...enemy };

  let attacker: 'player' | 'enemy' = 'player';

  while (playerCopy.hp > 0 && enemyCopy.hp > 0) {
    const turn = turnSimulation(playerCopy, enemyCopy, attacker, enemy.type);
    result.push(turn);
    attacker = attacker === 'player' ? 'enemy' : 'player';
  }

  return result;
}