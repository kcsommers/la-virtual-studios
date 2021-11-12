import { IEvent } from '../events/event.interface';
import { ICalendarDay } from './calendar-day.interface';

export class CalendarDay implements ICalendarDay {
  public dateModel: Date;

  public date: number;

  public day: number;

  public month: number;

  public year: number;

  public isToday: boolean;

  public events: IEvent[];

  constructor(_dateModel: Date, isToday = false, events?: IEvent[]) {
    this.dateModel = _dateModel;
    this.isToday = isToday;
    this.date = _dateModel.getDate();
    this.day = _dateModel.getDay();
    this.month = _dateModel.getMonth();
    this.year = _dateModel.getFullYear();
    this.events = events;
  }
}
