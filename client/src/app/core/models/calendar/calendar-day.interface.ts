import { IEvent } from '../events/event.interface';

export interface ICalendarDay {
  date: number;
  day: number;
  month: number;
  year: number;
  events: IEvent[];
}
