import { Injectable } from '@angular/core';
import { ICoach, IProduct } from '@la/core';
import { asyncScheduler, Observable, scheduled } from 'rxjs';
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
}
