import { CalendarDay, ICalendarDay, ICalendarMonth, IEvent } from '@la/core';

export class CalendarMonth implements ICalendarMonth {
  public month: number;

  public year: number;

  public events: IEvent[] = [];

  public eventsByDay: Map<number, IEvent[]>;

  public calendarDays: ICalendarDay[];

  constructor(_month: number, _events?: IEvent[]) {
    this.month = _month;
    if (_events) {
      this.events = _events;
      this.setEventsByDay();
      this.setCalendarDays();
    }
  }

  public getDaysWithEvents(): ICalendarDay[] {
    return this.calendarDays.filter(
      (_day: ICalendarDay) => !!(_day.events && _day.events.length)
    );
  }

  public getMonthIndex(): number {
    let _monthIndex = this.month % 12;
    if (_monthIndex < 0) {
      _monthIndex = 12 - Math.abs(_monthIndex);
    }
    return _monthIndex;
  }

  private setEventsByDay(): void {
    const _eventsByDayMap = new Map<number, IEvent[]>();
    this.events.forEach((_event: IEvent) => {
      const _dateNum: number = _event.date;
      if (!_dateNum) {
        return;
      }
      const _dateModel = new Date(_dateNum);
      const _date: number = _dateModel.getDate();
      if (_eventsByDayMap.has(_date)) {
        _eventsByDayMap.get(_date).push(_event);
      } else {
        _eventsByDayMap.set(_date, [_event]);
      }
    });
    this.eventsByDay = _eventsByDayMap;
  }

  private setCalendarDays(): void {
    const _calendarDays: ICalendarDay[] = [];
    const _dateModel = new Date();
    _dateModel.setMonth(this.month);
    _dateModel.setDate(1);
    this.year = _dateModel.getFullYear();
    const _firstDayOfMonth: number = _dateModel.getDay();
    const _prevMonthStart = 1 - _firstDayOfMonth;
    for (let i = _prevMonthStart; i < 35 + _prevMonthStart; i++) {
      const _date: Date = new Date(this.year, this.month, i);
      const _events: IEvent[] = this.eventsByDay.get(i);
      _calendarDays.push(new CalendarDay(_date, _events || []));
    }
    this.calendarDays = _calendarDays;
  }
}
