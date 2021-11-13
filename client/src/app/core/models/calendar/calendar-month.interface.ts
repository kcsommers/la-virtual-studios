import { ICalendarDay, IEvent } from '@la/core';

export interface ICalendarMonth {
  year: number;
  month: number;
  calendarDays: ICalendarDay[];
  eventsByDay: Map<number, IEvent[]>;
  getDaysWithEvents(): ICalendarDay[];
}
