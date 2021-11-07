import { Injectable } from '@angular/core';
import { asyncScheduler, Observable, of } from 'rxjs';
import { IClass } from '../core/classes/class.interface';

@Injectable({
  providedIn: 'root',
})
export class DummyDataService {
  public getClasses(): Observable<IClass[]> {
    const _classes: IClass[] = [
      {
        name: 'Acting class 1',
        blurb: '',
        description: '',
        coverImage:
          'https://res.cloudinary.com/kcsommers/image/upload/v1636090931/LA%20Virtual%20Studios/acting-coach-2.jpg',
        images: [],
        slots: 10,
        coach: null,
      },
      {
        name: 'Acting class 2',
        blurb: '',
        description: '',
        coverImage:
          'https://res.cloudinary.com/kcsommers/image/upload/v1636090931/LA%20Virtual%20Studios/acting-coach-1.jpg',
        images: [],
        slots: 10,
        coach: null,
      },
      {
        name: 'Acting class 3',
        blurb: '',
        description: '',
        coverImage:
          'https://res.cloudinary.com/kcsommers/image/upload/v1636090931/LA%20Virtual%20Studios/acting-2.jpg',
        images: [],
        slots: 10,
        coach: null,
      },
    ];
    return of(_classes, asyncScheduler);
  }
}