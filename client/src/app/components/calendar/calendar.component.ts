import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { DateHelper, ICalendarDay, ICalendarMonth, IEvent } from '@la/core';
import { DummyDataService } from '@la/data';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { CalendarMonth } from 'src/app/core/models/calendar/calendar-month';

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

  public calendarMonthsMap = new Map<number, ICalendarMonth>();

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
    const _cachedMonth: ICalendarMonth = this.calendarMonthsMap.get(_month);
    if (_cachedMonth) {
      this.renderMonth(_cachedMonth);
      return;
    }
    this._dummyDataService
      // DB returns all events for month
      .getEvents(_month)
      .pipe(take(1))
      .subscribe({
        next: (_events: IEvent[]) => {
          const _calendarMonth = new CalendarMonth(_month, _events);
          this.renderMonth(_calendarMonth);
        },
      });
  }

  private renderMonth(_month: ICalendarMonth): void {
    this.calendarMonthsMap.set(_month.month, _month);
    this.calendarDays$.next(_month.calendarDays);
    this.displayedMonth$.next(_month);
    this.displayedYear$.next(_month.year);
    this.monthChanged.emit(_month);
  }
}
