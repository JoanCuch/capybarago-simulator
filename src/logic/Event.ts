import { PlayerCharacter } from './PlayerCharacter';

export const EVENT_TAGS = {
  StatIncrease: 'statIncrease',
  StatDecrease: 'statDecrease',
  Combat: 'combat',
} as const;

export type EventTag = typeof EVENT_TAGS[keyof typeof EVENT_TAGS];

export class Event {
  name: string;
  tag: EventTag;
  applyEffect?: (stats: PlayerCharacter) => void;
  enemy?:string;

  constructor(
    name: string,
    tag: EventTag,
    applyEffect?: (stats: PlayerCharacter) => void,
    enemy?: string,
  ) {
    this.name = name;
    this.applyEffect = applyEffect;
    this.tag = tag;
    this.enemy = enemy;
  }

  apply(stats: PlayerCharacter): void {
    this.applyEffect?.(stats);
  }
}