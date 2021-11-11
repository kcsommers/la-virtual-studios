import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CalendarDay, ICalendarDay } from '@la/core';

@Component({
  selector: 'la-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  public calendarDays: ICalendarDay[];
  ngOnInit() {
    this.calendarDays = Array(35).map((_day) => {
      return new CalendarDay();
    });
    const _date = new Date();
    _date.setDate(1);
    const _lastDate = new Date(
      _date.getFullYear(),
      _date.getMonth() + 1,
      0
    ).getDate();
    const prevLastDate: number = new Date(
      _date.getFullYear(),
      _date.getMonth(),
      0
    ).getDate();
    const firstDay: number = _date.getDay();
    const lastDay: number = new Date(
      _date.getFullYear(),
      _date.getMonth() + 1,
      0
    ).getDay();
    const nextDays = 7 - lastDay - 1;
  }
}

// const date = new Date();

// const renderCalendar = () =>

//   let days = '';

//   for (let x = firstDayIndex; x > 0; x--) {
//     days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
//   }

//   for (let i = 1; i <= lastDay; i++) {
//     if (
//       i === new Date().getDate() &&
//       date.getMonth() === new Date().getMonth()
//     ) {
//       days += `<div class="today">${i}</div>`;
//     } else {
//       days += `<div>${i}</div>`;
//     }
//   }

//   for (let j = 1; j <= nextDays; j++) {
//     days += `<div class="next-date">${j}</div>`;
//     monthDays.innerHTML = days;
//   }
// };
