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
  public selectedDay$ = new BehaviorSubject<ICalendarDay>(null);

  public activeMonth$ = new BehaviorSubject<ICalendarMonth>(null);

  public displayedDays$ = new BehaviorSubject<ICalendarDay[]>([]);

  public selectedInput$ = new BehaviorSubject<'hours' | 'minutes'>('hours');

  public hours$ = new BehaviorSubject<string>('12');

  public minutes$ = new BehaviorSubject<string>('00');

  public meridiem$ = new BehaviorSubject<'AM' | 'PM'>('AM');

  ngOnInit() {
    const _dateModel = new Date();
    this.setActiveMonth(_dateModel.getMonth());
  }

  public setActiveMonth(_month: number): void {
    this.setSelectedDay(null);
    this.activeMonth$.next(new CalendarMonth(_month));
    this.setDisplayedDays();
  }

  public setSelectedDay(_day: ICalendarDay): void {
    this.selectedDay$.next(_day);
  }

  public increaseTime(): void {
    if (this.selectedInput$.getValue() === 'hours') {
      let _time: number = +this.hours$.getValue();
      if (_time === 12) {
        _time = 1;
      } else {
        _time++;
      }
      let _timeStr: string = (_time < 10 ? '0' : '') + _time;
      this.hours$.next(_timeStr);
    } else {
      let _time: number = +this.minutes$.getValue();
      if (_time === 59) {
        _time = 0;
      } else {
        _time++;
      }
      let _timeStr: string = (_time < 10 ? '0' : '') + _time;
      this.minutes$.next(_timeStr);
    }
  }

  public decreaseTime(): void {
    if (this.selectedInput$.getValue() === 'hours') {
      let _time: number = +this.hours$.getValue();
      if (_time === 1) {
        _time = 12;
      } else {
        _time--;
      }
      let _timeStr: string = (_time < 10 ? '0' : '') + _time;
      this.hours$.next(_timeStr);
    } else {
      let _time: number = +this.minutes$.getValue();
      if (_time === 0) {
        _time = 59;
      } else {
        _time--;
      }
      let _timeStr: string = (_time < 10 ? '0' : '') + _time;
      this.minutes$.next(_timeStr);
    }
  }

  public submit(): void {
    const _meridiem: 'AM' | 'PM' = this.meridiem$.getValue();
    const _dateModel = this.selectedDay$.getValue().dateModel;
    const _minutes: number = +this.minutes$.getValue();
    let _hours: number = +this.hours$.getValue();
    if (_meridiem === 'PM' && _hours !== 12) {
      _hours += 12;
    }
    if (_meridiem === 'AM' && _hours === 12) {
      _hours = 0;
    }
    _dateModel.setHours(_hours);
    _dateModel.setMinutes(_minutes);
    console.log('DATEMODEL', _dateModel, _dateModel.getTime());
  }

  private setDisplayedDays(): void {
    const _activeMonth: ICalendarMonth = this.activeMonth$.getValue();
    if (!_activeMonth) {
      return;
    }
    this.displayedDays$.next(_activeMonth.calendarDays);
  }
}
