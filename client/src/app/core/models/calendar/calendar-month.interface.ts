import { ICalendarDay } from '@la/core';

export interface ICalendarMonth<Day extends ICalendarDay = ICalendarDay> {
  year: number;
  month: number;
  calendarDays: ICalendarDay[];
  eventsDaysMap: Map<number, Day[]>;
  getEventDays(): ICalendarDay[];
  getMonthIndex(): number;
}
