import { IEvent } from '../events/event.interface';
import { ICalendarDay } from './calendar-day.interface';

export class CalendarDay implements ICalendarDay {
  date: number;
  day: number;
  month: number;
  year: number;
  events: IEvent[];
}
