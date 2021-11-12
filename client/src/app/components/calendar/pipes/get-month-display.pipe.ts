import { Pipe, PipeTransform } from '@angular/core';
import { CalendarConstants } from '../calendar-constants';

@Pipe({
  name: 'getMonthDisplay',
})
export class GetMonthDisplayPipe implements PipeTransform {
  public transform(_month: number): string {
    return CalendarConstants.MONTHS[_month % 12] || '--';
  }
}
