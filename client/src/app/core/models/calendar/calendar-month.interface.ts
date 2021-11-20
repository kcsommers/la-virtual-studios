import { ICalendarDay, ILAEvent } from '@la/core';

export interface ICalendarMonth {
  year: number;
  month: number;
  calendarDays: ICalendarDay[];
  eventsByDay: Map<number, ILAEvent[]>;
  getDaysWithEvents(): ICalendarDay[];
  getMonthIndex(): number;
}
