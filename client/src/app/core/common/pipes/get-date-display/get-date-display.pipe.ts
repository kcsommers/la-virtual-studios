import { Pipe, PipeTransform } from '@angular/core';
import { DateHelper } from '@la/core';

type DateDisplayType =
  | 'year'
  | 'month'
  | 'month-short'
  | 'date'
  | 'day'
  | 'day-short'
  | 'time'
  | 'full'
  | 'month dd, yyyy'
  | 'mm/dd/yyyy';

@Pipe({
  name: 'getDateDisplay',
  pure: true,
})
export class GetDateDisplayPipe implements PipeTransform {
  public transform(
    _dateInput: Date | number,
    _displayType?: DateDisplayType
  ): string {
    if (!_dateInput) {
      return '';
    }
    if (typeof _dateInput === 'number') {
      _dateInput = new Date(_dateInput);
    }
    if (!_displayType) {
      _displayType = 'full';
    }
    const _year: number = _dateInput.getFullYear();
    const _month: number = _dateInput.getMonth();
    const _day: number = _dateInput.getDay();
    const _date: number = _dateInput.getDate();
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
      case 'time':
        let _meridiem: string = 'AM';
        const _minutes: number = _dateInput.getMinutes();
        let _hours: number = _dateInput.getHours();
        if (_hours >= 12) {
          _meridiem = 'PM';
          _hours = _hours >= 13 ? _hours - 12 : _hours;
        }
        const _hoursStr: string = String(_hours < 10 ? `0${_hours}` : _hours);
        const _minutesStr: string = String(
          _minutes < 10 ? `0${_minutes}` : _minutes
        );
        return `${_hoursStr}:${_minutesStr} ${_meridiem}`;
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
