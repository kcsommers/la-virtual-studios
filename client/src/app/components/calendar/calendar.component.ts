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
  Destroyer,
  ICalendarDay,
  ICalendarMonth,
} from '@la/core';
import { BehaviorSubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'la-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent extends Destroyer implements OnInit {
  @Input()
  public activeDay$: BehaviorSubject<ICalendarDay>;

  @Input()
  public activeMonth$: BehaviorSubject<ICalendarMonth>;

  @Input()
  public isPicker: boolean = false;

  public activeYear$ = new BehaviorSubject<number>(null);

  public WEEKDAYS = DateHelper.DAYS_ABREVIATED;

  public MONTHS = DateHelper.MONTHS;

  public calendarDays$ = new BehaviorSubject<ICalendarDay[]>([]);

  @Output()
  public activeDayChanged = new EventEmitter<ICalendarDay>();

  @Output()
  public activeMonthChanged = new EventEmitter<number>();

  ngOnInit() {
    this.activeMonth$
      .pipe(
        filter((_month) => !!_month),
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: (_month: ICalendarMonth) => {
          this.activeYear$.next(_month.year);
          this.calendarDays$.next(_month.calendarDays);
        },
      });
  }

  public setActiveDay(_day: ICalendarDay): void {
    const _activeMonth: ICalendarMonth = this.activeMonth$.getValue();
    if (
      !this.isPicker &&
      (_day.isPast ||
        _activeMonth.month !== _day.month ||
        !_day.events ||
        !_day.events.length)
    ) {
      return;
    }
    this.activeDayChanged.emit(_day);
  }

  public nextMonth(): void {
    const _activeMonth: ICalendarMonth = this.activeMonth$.getValue();
    this.activeMonthChanged.emit(_activeMonth.month + 1);
  }

  public prevMonth(): void {
    const _activeMonth: ICalendarMonth = this.activeMonth$.getValue();
    this.activeMonthChanged.emit(_activeMonth.month - 1);
  }
}
