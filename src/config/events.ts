import { Event } from "../logic/Event";
import { PlayerCharacter } from "../logic/PlayerCharacter";

export const EVENTS: Event[] = [
    new Event(
        'Minor Hit',
        'Lose HP',
        (pc: PlayerCharacter) => pc.applyDamage(5),
        0.3
    ),
    new Event(
        'Healing Fountain',
        'Heal',
        (pc: PlayerCharacter) => pc.heal(10),
        0.2
    ),
    new Event(
        'Training',
        'Increase ATK',
        (pc: PlayerCharacter) => pc.boostAttack(2),
        0.2
    ),
    new Event(
        'Shield Practice',
        'Increase DEF',
        (pc: PlayerCharacter) => pc.boostDefense(2),
        0.2
    ),
]