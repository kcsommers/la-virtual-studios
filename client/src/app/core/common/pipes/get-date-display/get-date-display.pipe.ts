import { Pipe, PipeTransform } from '@angular/core';
import { DateHelper } from '@la/core';

type DateDisplayType =
  | 'year'
  | 'month'
  | 'month-short'
  | 'date'
  | 'day'
  | 'day-short'
  | 'full'
  | 'month dd, yyyy'
  | 'mm/dd/yyyy';

@Pipe({
  name: 'getDateDisplay',
  pure: true,
})
export class GetDateDisplayPipe implements PipeTransform {
  public transform(_dateModel: Date, _displayType?: DateDisplayType): string {
    if (!_dateModel) {
      return null;
    }
    if (!_displayType) {
      _displayType = 'full';
    }
    const _year: number = _dateModel.getFullYear();
    const _month: number = _dateModel.getMonth();
    const _day: number = _dateModel.getDay();
    const _date: number = _dateModel.getDate();
    switch (_displayType) {
      case 'year':
        return String(_year);
      case 'month':
        return DateHelper.MONTHS[_month];
      case 'month-short':
        return DateHelper.MONTHS_ABREVIATED[_month];
      case 'date':
        return String(_date);
      case 'day':
        return DateHelper.DAYS[_day];
      case 'day-short':
        return DateHelper.DAYS_ABREVIATED[_day];
      case 'full':
        return `${DateHelper.DAYS[_day]} ${DateHelper.MONTHS[_month]} ${_date}, ${_year}`;
      case 'month dd, yyyy':
        return `${DateHelper.MONTHS[_month]} ${_date}, ${_year}`;
      case 'mm/dd/yyyy':
        return `${_month + 1}/${_date}/${_year}`;
      default:
        return '--';
    }
  }
}
