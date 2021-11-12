import { Pipe, PipeTransform } from '@angular/core';
import { DateHelper, ICalendarMonth } from '@la/core';

@Pipe({
  name: 'getMonthDisplay',
})
export class GetMonthDisplayPipe implements PipeTransform {
  public transform(_month: ICalendarMonth): string {
    if (!_month) {
      return '--';
    }
    return DateHelper.MONTHS[_month.month % 12] || '--';
  }
}
