import { ILAEvent } from '@la/core';

export interface ICalendarDay<EventType = any> {
  date: number;
  events: EventType[];
  dateModel?: Date;
  day?: number;
  month?: number;
  year?: number;
  isToday?: boolean;
  isPast?: boolean;
}
