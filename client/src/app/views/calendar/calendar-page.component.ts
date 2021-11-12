import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICalendarDay, ICalendarMonth, IEvent } from '@la/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarPageComponent {
  public selectedDate$ = new BehaviorSubject<ICalendarDay>(null);

  public monthEvents$ = new BehaviorSubject<IEvent[]>(null);

  constructor() {}

  public setSelectedDate(_day: ICalendarDay): void {}

  public monthChanged(_month: ICalendarMonth): void {
    this.monthEvents$.next(_month.events);
  }
}
