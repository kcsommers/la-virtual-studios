import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CalendarDay, ICalendarDay } from '@la/core';
import { BehaviorSubject } from 'rxjs';
import { CalendarConstants } from './calendar-constants';

@Component({
  selector: 'la-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  public calendarDays$ = new BehaviorSubject<ICalendarDay[]>([]);

  public displayedYear$ = new BehaviorSubject<number>(null);

  public displayedMonth$ = new BehaviorSubject<number>(null);

  public WEEKDAYS = CalendarConstants.DAYS;

  public MONTHS = CalendarConstants.MONTHS;

  ngOnInit() {
    const _dateModel = new Date();
    const _currentDate: number = _dateModel.getDate();
    const _currentMonth: number = _dateModel.getMonth();
    this.setMonth(_currentMonth);
  }

  public nextMonth(): void {
    const _displayedMonth: number = this.displayedMonth$.getValue();
    this.setMonth(_displayedMonth + 1);
  }

  public prevMonth(): void {
    const _displayedMonth: number = this.displayedMonth$.getValue();
    this.setMonth(_displayedMonth - 1);
  }

  private setMonth(_month: number): void {
    const _calendarDays: ICalendarDay[] = [];
    const _dateModel = new Date();
    _dateModel.setMonth(_month);
    _dateModel.setDate(1);
    const _displayedYear: number = _dateModel.getFullYear();
    const _firstDayOfMonth: number = _dateModel.getDay();
    const _prevMonthStart = 1 - _firstDayOfMonth;

    for (let i = _prevMonthStart; i < 35 + _prevMonthStart; i++) {
      const _date = new Date(_displayedYear, _month, i);
      _calendarDays.push(new CalendarDay(_date));
    }
    this.calendarDays$.next(_calendarDays);
    this.displayedMonth$.next(_month);
    this.displayedYear$.next(_displayedYear);
  }
}
