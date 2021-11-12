import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  CalendarDay,
  DateHelper,
  ICalendarDay,
  ICalendarMonth,
  IEvent,
} from '@la/core';
import { DummyDataService } from '@la/data';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'la-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  public WEEKDAYS = DateHelper.DAYS_ABREVIATED;

  public MONTHS = DateHelper.MONTHS;

  public calendarDays$ = new BehaviorSubject<ICalendarDay[]>([]);

  public displayedYear$ = new BehaviorSubject<number>(null);

  public displayedMonth$ = new BehaviorSubject<ICalendarMonth>(null);

  public dayEventsMap = new Map<number, Map<number, IEvent[]>>();

  private monthEventsCache = new Map<number, ICalendarMonth>();

  @Output()
  public dateSelected = new EventEmitter<ICalendarDay>();

  @Output()
  public monthChanged = new EventEmitter<ICalendarMonth>();

  constructor(private _dummyDataService: DummyDataService) {
    const _dateModel = new Date();
    const _currentMonth: number = _dateModel.getMonth();
    this.setMonth(_currentMonth);
  }

  ngOnInit() {}

  public nextMonth(): void {
    const _displayedMonth: ICalendarMonth = this.displayedMonth$.getValue();
    this.setMonth(_displayedMonth.month + 1);
  }

  public prevMonth(): void {
    const _displayedMonth: ICalendarMonth = this.displayedMonth$.getValue();
    this.setMonth(_displayedMonth.month - 1);
  }

  private setMonth(_month: number): void {
    const _monthCache: ICalendarMonth = this.monthEventsCache.get(_month);
    if (_monthCache) {
      this.setCalendarDays(_monthCache);
      return;
    }
    this._dummyDataService
      // DB returns all events for month
      .getEvents(_month)
      .pipe(take(1))
      .subscribe({
        next: (_events: IEvent[]) => {
          const _calendarMonth: ICalendarMonth = {
            month: _month,
            events: _events,
          };
          this.monthEventsCache.set(_month, _calendarMonth);
          this.setDayEventsMap(_calendarMonth);
          this.setCalendarDays({ month: _month, events: _events });
        },
      });
  }

  private setCalendarDays(_month: ICalendarMonth): void {
    const _calendarDays: ICalendarDay[] = [];
    const _dateModel = new Date();
    const _currentMonth: number = _dateModel.getMonth();
    const _currentDate: number = _dateModel.getDate();
    _dateModel.setMonth(_month.month);
    _dateModel.setDate(1);
    const _displayedYear: number = _dateModel.getFullYear();
    const _firstDayOfMonth: number = _dateModel.getDay();
    const _prevMonthStart = 1 - _firstDayOfMonth;

    for (let i = _prevMonthStart; i < 35 + _prevMonthStart; i++) {
      const _date: Date = new Date(_displayedYear, _month.month, i);
      const _isToday: boolean =
        _month.month === _currentMonth && i === _currentDate;
      _calendarDays.push(
        new CalendarDay(
          _date,
          _isToday,
          this.dayEventsMap.get(_month.month).get(i)
        )
      );
    }
    this.calendarDays$.next(_calendarDays);
    this.displayedMonth$.next(_month);
    this.displayedYear$.next(_displayedYear);
    this.monthChanged.emit(_month);
  }

  private setDayEventsMap(_month: ICalendarMonth): void {
    this.dayEventsMap.clear();
    const _monthMap = new Map<number, IEvent[]>();
    (_month.events || []).forEach((_event: IEvent) => {
      const _dates: number[] = _event.dates;
      if (!_dates || !_dates.length) {
        return;
      }
      _dates.forEach((_date: number) => {
        if (_monthMap.has(_date)) {
          _monthMap.get(_date).push(_event);
        } else {
          _monthMap.set(_date, [_event]);
        }
      });
    });
    this.dayEventsMap.set(_month.month, _monthMap);
  }
}
