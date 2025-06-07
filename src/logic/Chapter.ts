import { type EventTag } from "./Event";


export type Chapter = {
  name: string;
  totalDays: number;
  eventDistribution: {
    [day: number]: {
      eventChances: Partial<Record<EventTag, number>>;
    };
  };
};
