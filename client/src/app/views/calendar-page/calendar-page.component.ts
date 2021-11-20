import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Destroyer,
  ICalendarDay,
  ICalendarMonth,
  ILAEvent,
  LAConstants,
  RoutingService,
} from '@la/core';
import { BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarPageComponent extends Destroyer implements OnInit {
  public selectedDate$ = new BehaviorSubject<ICalendarDay>(null);

  public displayedDays$ = new BehaviorSubject<ICalendarDay[]>([]);

  private _daysWithEventsCache: ICalendarDay[] = [];

  constructor(private _routingService: RoutingService) {
    super();
  }

  ngOnInit() {
    this.selectedDate$.pipe(takeUntil(this.destroyed$)).subscribe({
      next: (_selectedDay: ICalendarDay) => {
        const _displayedDays: ICalendarDay[] = _selectedDay
          ? [_selectedDay]
          : this._daysWithEventsCache;
        this.displayedDays$.next(_displayedDays);
      },
    });
    const _productId: string = this._routingService.routeParameterMap.get(
      LAConstants.ID_PARAM
    );
    console.log('_product:::: ', _productId);
  }

  public setSelectedDate(_day: ICalendarDay): void {
    this.selectedDate$.next(_day);
  }

  public monthChanged(_month: ICalendarMonth): void {
    const _daysWithEvents: ICalendarDay[] = _month.getDaysWithEvents();
    this._daysWithEventsCache = _daysWithEvents;
    this.displayedDays$.next(_daysWithEvents);
  }

  public eventSelected(_event: ILAEvent): void {
    this._routingService.router.navigate([`/events/${_event._id}`]);
  }
}
