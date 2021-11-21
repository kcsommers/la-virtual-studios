import { Injectable } from '@angular/core';
import {
  DateHelper,
  ICoach,
  ILAEvent,
  IProduct,
  IProductCalendarDay,
} from '@la/core';
import { asyncScheduler, Observable, scheduled, throwError } from 'rxjs';
import { dummyClasses } from './classes.dummy-data';
import { dummyCoaches } from './coaches.dummy-data';
import { dummyProductCalendarDays } from './product-calendar-days.dummy-data';
import { dummyProducts } from './products.dummy-data';

const _dateModel = new Date();
const _currentYear: number = _dateModel.getFullYear();
const _currentMonth: number = _dateModel.getMonth();
_dateModel.setDate(1);
const _firstDayOfMonth: number = _dateModel.getDate();
_dateModel.setMonth(_currentMonth + 1);
_dateModel.setDate(0);
const _lastDayOfMonth: number = _dateModel.getDate();

@Injectable({
  providedIn: 'root',
})
export class DummyDataService {
  public getClasses(_count = dummyClasses.length): Observable<IProduct[]> {
    return scheduled([dummyClasses.slice(0, _count)], asyncScheduler);
  }

  public getClass(_productId: string): Observable<IProduct> {
    const _event = dummyClasses.find((_e: IProduct) => _e._id === _productId);
    if (_event) {
      return scheduled([_event], asyncScheduler);
    } else {
      return throwError(new Error("Couldn't find that event"));
    }
  }

  public getCoaches(_count = dummyCoaches.length): Observable<ICoach[]> {
    return scheduled([dummyCoaches.slice(0, _count)], asyncScheduler);
  }

  public getProducts(_count = dummyProducts.length): Observable<IProduct[]> {
    return scheduled([dummyProducts.slice(0, _count)], asyncScheduler);
  }

  public getProduct(_productId: string): Observable<IProduct> {
    const _product = dummyProducts.find(
      (_e: IProduct) => _e._id === _productId
    );
    if (_product) {
      return scheduled([_product], asyncScheduler);
    } else {
      return throwError(new Error("Couldn't find that product"));
    }
  }

  public getProductCalendarDays(
    _month: number,
    _productId: string,
    _count = dummyClasses.length
  ): Observable<IProductCalendarDay[]> {
    return scheduled([dummyProductCalendarDays(_productId)], asyncScheduler);
  }
}
