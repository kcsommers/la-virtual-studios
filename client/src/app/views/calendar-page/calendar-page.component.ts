import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Destroyer,
  ICalendarDay,
  ICalendarMonth,
  ILAEvent,
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

  constructor(
    private _dummyDataService: DummyDataService,
    private _routingService: RoutingService
  ) {
    super();
    const _dateModel = new Date();
    this.setActiveMonth(_dateModel.getMonth());
  }

  ngOnInit() {
    const _productId: string = this._routingService.routeParameterMap.get(
      LAConstants.ID_PARAM
    );
  }

  public setActiveMonth(_month: number): void {
    this.setActiveDay(null);
    const _cachedMonth: ICalendarMonth = this.calendarMonthsMap.get(_month);
    if (_cachedMonth) {
      this.activeMonth$.next(_cachedMonth);
      this.setDisplayedDays();
      return;
    }
    this._dummyDataService
      .getEvents(_month)
      .pipe(take(1))
      .subscribe({
        next: (_events: ILAEvent[]) => {
          const _calendarMonth = new CalendarMonth(_month, _events);
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
      : _activeMonth.getDaysWithEvents();
    console.log(_displayedDays);
    this.displayedDays$.next(_displayedDays);
  }

  public setActiveDay(_day: ICalendarDay): void {
    this.activeDay$.next(_day);
    this.setDisplayedDays();
  }

  public eventSelected(_event: ILAEvent): void {
    this._routingService.router.navigate([`/events/${_event._id}`]);
  }
}
