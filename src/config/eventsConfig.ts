import { Event, EVENT_TAGS } from "../logic/Event";
import { PlayerCharacter } from "../logic/PlayerCharacter";

export const EVENTS: Event[] = [
    new Event(
        'Major Healing',
        EVENT_TAGS.StatIncrease,
        (pc: PlayerCharacter) => pc.modifyHp(10)
    ),
    new Event(
        'Minor Training',
        EVENT_TAGS.StatIncrease,
        (pc: PlayerCharacter) => pc.modifyAtk(2)
    ),
    new Event(
        'Shield Practice',
        EVENT_TAGS.StatIncrease,
        (pc: PlayerCharacter) => pc.modifyDef(2),
    ),
    new Event(
        'Basic Combat',
        EVENT_TAGS.Combat,
        undefined,
        "slime"
    ),
    new Event(
        'Goblin Ambush',
        EVENT_TAGS.Combat,
        undefined,
        "goblin"
    ),
    new Event(
        'Orc Duel',
        EVENT_TAGS.Combat,
        undefined,
        "orc"
    )
];