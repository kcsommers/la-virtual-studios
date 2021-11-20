import { Injectable } from '@angular/core';
import { ICoach, IProduct } from '@la/core';
import { asyncScheduler, Observable, scheduled, throwError } from 'rxjs';
import { dummyEvents } from './events.dummy-data';
import { IEvent } from '../../core/models/events/event.interface';
import { dummyCoaches } from './coaches.dummy-data';
import { dummyProducts } from './products.dummy-data';

@Injectable({
  providedIn: 'root',
})
export class DummyDataService {
  public getClasses(_count = dummyEvents.length): Observable<IEvent[]> {
    return scheduled([dummyEvents.slice(0, _count)], asyncScheduler);
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

  public getEvents(
    _month: number,
    _count = dummyEvents.length
  ): Observable<IEvent[]> {
    return this.getClasses(_count);
  }

  public getEvent(_eventId: string): Observable<IEvent> {
    const _event = dummyEvents.find((_e: IEvent) => _e._id === _eventId);
    if (_event) {
      return scheduled([_event], asyncScheduler);
    } else {
      return throwError(new Error("Couldn't find that event"));
    }
  }
}
