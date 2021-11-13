import { Pipe, PipeTransform } from '@angular/core';
import { DateHelper, ICalendarMonth } from '@la/core';

@Pipe({
  name: 'getMonthDisplay',
})
export class GetMonthDisplayPipe implements PipeTransform {
  public transform(
    _month: ICalendarMonth,
    _returnIndex = false
  ): string | number {
    if (!_month) {
      return '--';
    }
    const _monthIndex = _month.getMonthIndex();
    if (_returnIndex) {
      return _monthIndex;
    }
    return DateHelper.MONTHS[_monthIndex] || '--';
  }
}
