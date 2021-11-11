import { IEvent } from '../events/event.interface';
import { ICalendarDay } from './calendar-day.interface';

export class CalendarDay implements ICalendarDay {
  date: number;
  day: number;
  month: number;
  year: number;
  events: IEvent[];

  constructor(_calendarDay?: Partial<ICalendarDay>) {
    if (_calendarDay) {
      Object.keys(_calendarDay).forEach(
        (_key: string) => (this[_key] = _calendarDay[_key])
      );
    }
  }
}
