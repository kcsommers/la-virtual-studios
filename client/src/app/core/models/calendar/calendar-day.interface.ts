import { IEvent } from '../events/event.interface';

export interface ICalendarDay {
  dateModel: Date;
  date: number;
  day: number;
  month: number;
  year: number;
  isToday: boolean;
  events: IEvent[];
}
