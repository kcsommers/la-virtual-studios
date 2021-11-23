import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ICalendarDay, ICalendarMonth } from '@la/core';
import { BehaviorSubject } from 'rxjs';
import { CalendarMonth } from 'src/app/core/models/calendar/calendar-month';

@Component({
  selector: 'la-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent implements OnInit {
  public activeDay$ = new BehaviorSubject<ICalendarDay>(null);

  public activeMonth$ = new BehaviorSubject<ICalendarMonth>(null);

  public displayedDays$ = new BehaviorSubject<ICalendarDay[]>([]);

  ngOnInit() {
    const _dateModel = new Date();
    this.setActiveMonth(_dateModel.getMonth());
  }

  public setActiveMonth(_month: number): void {
    this.setActiveDay(null);
    this.activeMonth$.next(new CalendarMonth(_month));
    this.setDisplayedDays();
  }

  public setActiveDay(_day: ICalendarDay): void {
    if (_day) {
      console.log('day:::: ', _day.date, _day.dateModel.getTime());
    }
    this.activeDay$.next(_day);
  }

  private setDisplayedDays(): void {
    const _activeMonth: ICalendarMonth = this.activeMonth$.getValue();
    if (!_activeMonth) {
      return;
    }
    this.displayedDays$.next(_activeMonth.calendarDays);
  }
}
