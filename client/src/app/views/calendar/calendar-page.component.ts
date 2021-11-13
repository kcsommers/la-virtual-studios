import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import {
  Destroyer,
  ICalendarDay,
  ICalendarMonth,
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
export class CalendarPageComponent extends Destroyer {
  public selectedDate$ = new BehaviorSubject<ICalendarDay>(null);

  public displayedDays$ = new BehaviorSubject<ICalendarDay[]>([]);

  private _daysWithEventsCache: ICalendarDay[];

  public setSelectedDate(_day: ICalendarDay): void {
    this.selectedDate$.next(_day);
    this.displayedDays$.next([_day]);
  }

  public monthChanged(_month: ICalendarMonth): void {
    const _daysWithEvents: ICalendarDay[] = _month.getDaysWithEvents();
    this._daysWithEventsCache = _daysWithEvents;
    this.displayedDays$.next(_daysWithEvents);
  }

  public browseAllEvents(): void {
    this.selectedDate$.next(null);
    this.displayedDays$.next(this._daysWithEventsCache);
  }
}
