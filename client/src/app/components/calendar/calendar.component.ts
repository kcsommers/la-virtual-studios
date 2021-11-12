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

  public WEEKDAYS = CalendarConstants.DAYS;

  ngOnInit() {
    const _calendarDays: ICalendarDay[] = [];
    const _dateModel = new Date();
    const _currentMonth: number = _dateModel.getMonth();
    const _currentYear: number = _dateModel.getFullYear();
    const _currentDate: number = _dateModel.getDate();
    _dateModel.setDate(1);
    const _firstDayOfMonth: number = _dateModel.getDay();
    const _prevMonthStart = 1 - _firstDayOfMonth;

    for (let i = _prevMonthStart; i < 35 + _prevMonthStart; i++) {
      const _date = new Date(_currentYear, _currentMonth, i);
      _calendarDays.push(new CalendarDay(_date));
    }
    this.calendarDays$.next(_calendarDays);
  }
}
