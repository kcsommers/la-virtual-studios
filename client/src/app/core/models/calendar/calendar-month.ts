import {
  CalendarDay,
  ICalendarDay,
  ICalendarMonth,
  ILAEvent,
  IProductCalendarDay,
} from '@la/core';

export class CalendarMonth<Day extends ICalendarDay = ICalendarDay>
  implements ICalendarMonth
{
  public month: number;

  public year: number;

  public eventDays: Day[] = [];

  public eventsDaysMap: Map<number, Day[]>;

  public calendarDays: ICalendarDay<Day>[];

  constructor(_month: number, _eventDays: Day[]) {
    this.month = _month;
    if (_eventDays) {
      this.eventDays = _eventDays;
      this.setEventDaysMap();
      this.setCalendarDays();
    }
  }

  public getEventDays(): ICalendarDay<Day>[] {
    return (this.calendarDays || []).filter(
      (_day: ICalendarDay<Day>) => !!(_day.events && _day.events.length)
    );
  }

  public getMonthIndex(): number {
    let _monthIndex = this.month % 12;
    if (_monthIndex < 0) {
      _monthIndex = 12 - Math.abs(_monthIndex);
    }
    return _monthIndex;
  }

  private setEventDaysMap(): void {
    const _eventDaysMap = new Map<number, Day[]>();
    this.eventDays.forEach((_day: Day) => {
      const _dateNum: number = _day.date;
      if (!_dateNum) {
        return;
      }
      const _dateModel = new Date(_dateNum);
      const _date: number = _dateModel.getDate();
      if (_eventDaysMap.has(_date)) {
        _eventDaysMap.get(_date).push(_day);
      } else {
        _eventDaysMap.set(_date, [_day]);
      }
    });
    this.eventsDaysMap = _eventDaysMap;
  }

  private setCalendarDays(): void {
    const _calendarDays: ICalendarDay<Day>[] = [];
    const _dateModel = new Date();
    _dateModel.setMonth(this.month);
    _dateModel.setDate(1);
    this.year = _dateModel.getFullYear();
    const _firstDayOfMonth: number = _dateModel.getDay();
    const _prevMonthStart = 1 - _firstDayOfMonth;
    for (let i = _prevMonthStart; i < 35 + _prevMonthStart; i++) {
      const _date: Date = new Date(this.year, this.month, i);
      const _eventDays: Day[] = this.eventsDaysMap.get(i);
      _calendarDays.push(new CalendarDay(_date, _eventDays || []));
    }
    this.calendarDays = _calendarDays;
  }
}
