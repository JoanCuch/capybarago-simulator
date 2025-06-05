import { PlayerCharacter } from './PlayerCharacter';

export class Event {
  name: string;
  description: string;
  chance?: number;
  applyEffect: (stats: PlayerCharacter) => void;

  constructor(
    name: string,
    description: string,
    applyEffect: (stats: PlayerCharacter) => void,
    chance?: number
  ) {
    this.name = name;
    this.description = description;
    this.applyEffect = applyEffect;
    this.chance = chance;
  }

  apply(stats: PlayerCharacter): void {
    this.applyEffect(stats);
  }
}