import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Destroyer,
  ICalendarDay,
  ICalendarMonth,
  ILAEvent,
  IProduct,
  IProductCalendarDay,
  LAConstants,
  RoutingService,
} from '@la/core';
import { DummyDataService } from '@la/data';
import { BehaviorSubject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { CalendarMonth } from 'src/app/core/models/calendar/calendar-month';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarPageComponent extends Destroyer implements OnInit {
  public activeDay$ = new BehaviorSubject<ICalendarDay>(null);

  public activeMonth$ = new BehaviorSubject<ICalendarMonth>(null);

  public displayedDays$ = new BehaviorSubject<ICalendarDay[]>([]);

  public calendarMonthsMap = new Map<number, ICalendarMonth>();

  public productId: string;

  constructor(
    private _dummyDataService: DummyDataService,
    private _routingService: RoutingService
  ) {
    super();
  }

  ngOnInit() {
    this.productId = this._routingService.routeParameterMap.get(
      LAConstants.ID_PARAM
    );
    const _dateModel = new Date();
    this.setActiveMonth(_dateModel.getMonth());
  }

  public setActiveMonth(_month: number): void {
    this.setActiveDay(null);
    const _cachedMonth: ICalendarMonth = this.calendarMonthsMap.get(_month);
    if (_cachedMonth) {
      this.activeMonth$.next(_cachedMonth);
      this.setDisplayedDays();
      return;
    }
    this.fetchProductCalendarDays(_month);
  }

  private fetchProductCalendarDays(_month: number): void {
    this._dummyDataService
      .getProductCalendarDays(_month, this.productId)
      .pipe(take(1))
      .subscribe({
        next: (_calendarDays: IProductCalendarDay[]) => {
          const _calendarMonth = new CalendarMonth<IProductCalendarDay>(
            _month,
            _calendarDays
          );
          this.activeMonth$.next(_calendarMonth);
          this.calendarMonthsMap.set(_calendarMonth.month, _calendarMonth);
          this.setDisplayedDays();
        },
      });
  }

  private setDisplayedDays(): void {
    const _activeMonth: ICalendarMonth = this.activeMonth$.getValue();
    if (!_activeMonth) {
      return;
    }
    const _activeDay: ICalendarDay = this.activeDay$.getValue();
    const _displayedDays: ICalendarDay[] = _activeDay
      ? [_activeDay]
      : _activeMonth.getEventDays();
    this.displayedDays$.next(_displayedDays);
  }

  public setActiveDay(_day: ICalendarDay): void {
    this.activeDay$.next(_day);
    this.setDisplayedDays();
  }

  public eventSelected(_event: IProduct): void {
    this._routingService.router.navigate([`/events/${_event._id}`]);
  }

  public register(_event: IProduct): void {}
}
