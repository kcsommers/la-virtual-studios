import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'la-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  ngOnInit() {
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

// document.querySelector('.prev').addEventListener('click', () => {
//   date.setMonth(date.getMonth() - 1);
//   renderCalendar();
// });

// document.querySelector('.next').addEventListener('click', () => {
//   date.setMonth(date.getMonth() + 1);
//   renderCalendar();
// });

// renderCalendar();
