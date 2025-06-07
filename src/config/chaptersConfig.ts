import { EVENT_TAGS} from '../logic/Event'
import type { Chapter } from '../logic/Chapter'


const tutorialChapter: Chapter = {
  name: 'Tutorial',
  totalDays: 5,
  eventDistribution: {
    1: { eventChances: { [EVENT_TAGS.StatIncrease]: 1 } },
    2: { eventChances: { [EVENT_TAGS.StatIncrease]: 1 } },
    3: { eventChances: { [EVENT_TAGS.StatIncrease]: 1 } },
    4: { eventChances: { [EVENT_TAGS.Combat]: 0.5, [EVENT_TAGS.StatIncrease]: 0.5 } },
    5: { eventChances: { [EVENT_TAGS.Combat]: 1 } }
  }
};

export const CHAPTERS_CONFIG = {
  1: tutorialChapter
};