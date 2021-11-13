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

  constructor(_dateModel: Date, _events?: IEvent[]) {
    const _currentDateModel: Date = new Date();
    const _currentYear: number = _currentDateModel.getFullYear();
    const _currentMonth: number = _currentDateModel.getMonth();
    const _currentDate: number = _currentDateModel.getDate();
    this.dateModel = _dateModel;
    this.date = _dateModel.getDate();
    this.day = _dateModel.getDay();
    this.month = _dateModel.getMonth();
    this.year = _dateModel.getFullYear();
    this.events = _events;
    this.isToday =
      this.year === _currentYear &&
      this.month === _currentMonth &&
      this.date === _currentDate;
  }
}
