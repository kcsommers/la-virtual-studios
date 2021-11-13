import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  Destroyer,
  ICalendarDay,
  ICalendarMonth,
  RoutingService,
} from '@la/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarPageComponent extends Destroyer {
  public selectedDate$ = new BehaviorSubject<ICalendarDay>(null);

  public calendarDays$ = new BehaviorSubject<ICalendarDay[]>([]);

  constructor(private _routingService: RoutingService) {
    super();
  }

  public setSelectedDate(_day: ICalendarDay): void {}

  public monthChanged(_month: ICalendarMonth): void {
    const _daysWithEvents: ICalendarDay[] = _month.getDaysWithEvents();
    this.calendarDays$.next(_daysWithEvents);
  }
}
