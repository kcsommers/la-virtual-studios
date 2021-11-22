import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  ICalendarDay,
  ICalendarMonth,
  IProduct,
  IProductCalendarDay,
  LAConstants,
} from '@la/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { CalendarMonth } from 'src/app/core/models/calendar/calendar-month';
import { BaseView } from '../base-view';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarPageComponent extends BaseView implements OnInit {
  public activeDay$ = new BehaviorSubject<ICalendarDay>(null);

  public activeMonth$ = new BehaviorSubject<ICalendarMonth>(null);

  public displayedDays$ = new BehaviorSubject<ICalendarDay[]>([]);

  public calendarMonthsMap = new Map<number, ICalendarMonth>();

  public productId: string;

  public productDayId: string;

  public showLoginOptions$ = new BehaviorSubject<boolean>(false);

  public showEventSelector$ = new BehaviorSubject<boolean>(false);

  public selectedProductDay$ = new BehaviorSubject<IProductCalendarDay>(null);

  ngOnInit() {
    this.productId = this.routingService.routeParameterMap.get(
      LAConstants.ID_PARAM
    );
    this.productDayId = this.routingService.routeParameterMap.get(
      LAConstants.PRODUCT_CALENDAR_DAY_PARAM
    );
    const _dateModel = new Date();
    this.setActiveMonth(_dateModel.getMonth());
  }

  public setActiveMonth(_month: number): void {
    this.setActiveDay(null);
    const _cachedMonth: ICalendarMonth = this.calendarMonthsMap.get(_month);
    if (_cachedMonth) {
      this.activeMonth$.next(_cachedMonth);
      this.setDisplayedDays();
      return;
    }
    this.fetchProductCalendarDays(_month);
  }

  public setActiveDay(_day: ICalendarDay): void {
    this.activeDay$.next(_day);
    this.showLoginOptions$.next(false);
    this.showEventSelector$.next(false);
    this.setDisplayedDays();
  }

  public eventSelected(_event: IProduct): void {
    this.routingService.router.navigate([`/events/${_event._id}`]);
  }

  public register(_productDay: IProductCalendarDay): void {
    if (this.isPlatformBrowser()) {
      window.scrollTo(0, 0);
    }
    this.selectedProductDay$.next(_productDay);
    const _isLoggedIn: boolean = this.authService.authState$.getValue();
    if (!_isLoggedIn) {
      this.showLoginOptions$.next(true);
    } else {
      this.showEventSelector$.next(true);
    }
  }

  public goToAuthPage(_page: 'login' | 'signup'): void {
    const _selectedProductDay: IProductCalendarDay =
      this.selectedProductDay$.getValue();
    this.routingService.router.navigate([`/auth/${_page}`], {
      queryParams: {
        [LAConstants.REQUESTED_URL_PARAM]: `events/${_selectedProductDay.product._id}`,
      },
    });
  }

  private fetchProductCalendarDays(_month: number): void {
    this.dummyDataService
      .getProductCalendarDays(_month, this.productId)
      .pipe(take(1))
      .subscribe({
        next: (_calendarDays: IProductCalendarDay[]) => {
          const _calendarMonth = new CalendarMonth<IProductCalendarDay>(
            _month,
            _calendarDays
          );
          this.activeMonth$.next(_calendarMonth);
          this.calendarMonthsMap.set(_calendarMonth.month, _calendarMonth);
          this.setDisplayedDays();
        },
      });
  }

  private setDisplayedDays(): void {
    const _activeMonth: ICalendarMonth = this.activeMonth$.getValue();
    if (!_activeMonth) {
      return;
    }
    const _activeDay: ICalendarDay = this.activeDay$.getValue();
    const _displayedDays: ICalendarDay[] = _activeDay
      ? [_activeDay]
      : _activeMonth.getEventDays();
    this.displayedDays$.next(_displayedDays);
  }
}
