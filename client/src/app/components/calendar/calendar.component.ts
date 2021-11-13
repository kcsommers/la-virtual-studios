import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
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
import { CalendarMonth } from 'src/app/core/models/calendar/calendar-month';

@Component({
  selector: 'la-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  @Input()
  public selectedDate$: BehaviorSubject<ICalendarDay>;

  public WEEKDAYS = DateHelper.DAYS_ABREVIATED;

  public MONTHS = DateHelper.MONTHS;

  public calendarDays$ = new BehaviorSubject<ICalendarDay[]>([]);

  public displayedYear$ = new BehaviorSubject<number>(null);

  public displayedMonth$ = new BehaviorSubject<ICalendarMonth>(null);

  public calendarMonthsMap = new Map<number, ICalendarMonth>();

  public currentMonth: number;

  @Output()
  public monthChanged = new EventEmitter<ICalendarMonth>();

  constructor(private _dummyDataService: DummyDataService) {
    const _dateModel = new Date();
    this.currentMonth = _dateModel.getMonth();
    this.setMonth(this.currentMonth);
  }

  ngOnInit() {
    if (!this.selectedDate$) {
      this.selectedDate$ = new BehaviorSubject<ICalendarDay>(null);
    }
  }

  public setSelectedDate(_day: CalendarDay): void {
    const _displayedMonth: ICalendarMonth = this.displayedMonth$.getValue();
    if (_day.isPast || _displayedMonth.month !== _day.month) {
      return;
    }
    this.selectedDate$.next(_day);
  }

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
