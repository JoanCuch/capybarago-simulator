import type { Enemy } from '../logic/Enemy';

export const enemies: Record<string, Enemy> = {
  slime: { atk: 5, def: 2, hp: 20, type: 'Slime' },
  goblin: { atk: 8, def: 4, hp: 30, type: 'Goblin' },
  orc: { atk: 12, def: 6, hp: 45, type: 'Orc' },
};