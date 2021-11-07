import { Injectable } from '@angular/core';
import { asyncScheduler, Observable, scheduled } from 'rxjs';
import { IClass } from '../core/classes/class.interface';

@Injectable({
  providedIn: 'root',
})
export class DummyDataService {
  public getClasses(_count = 3): Observable<IClass[]> {
    const _classes: IClass[] = [
      {
        name: 'Acting class 1',
        blurb: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
        description: '',
        coverImage:
          'https://res.cloudinary.com/kcsommers/image/upload/v1636090931/LA%20Virtual%20Studios/acting-coach-2.jpg',
        images: [],
        slots: 10,
        coach: null,
      },
      {
        name: 'Acting class 2',
        blurb: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
        description: '',
        coverImage:
          'https://res.cloudinary.com/kcsommers/image/upload/v1636090931/LA%20Virtual%20Studios/acting-coach-1.jpg',
        images: [],
        slots: 10,
        coach: null,
      },
      {
        name: 'Acting class 3',
        blurb: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
        description: '',
        coverImage:
          'https://res.cloudinary.com/kcsommers/image/upload/v1636090931/LA%20Virtual%20Studios/acting-2.jpg',
        images: [],
        slots: 10,
        coach: null,
      },
      {
        name: 'Acting class 4',
        blurb:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum suscipit dolorem aliquid quidem fugiat repudiandae deserunt quodnatus ratione architecto.',
        description: '',
        coverImage:
          'https://res.cloudinary.com/kcsommers/image/upload/v1636090931/LA%20Virtual%20Studios/acting-4.jpg',
        images: [],
        slots: 10,
        coach: null,
      },
      {
        name: 'Acting class 5',
        blurb:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum suscipit dolorem aliquid quidem fugiat repudiandae deserunt quodnatus ratione architecto, inventore ea, reiciendis autem sit saepe! Eveniet, quos',
        description: '',
        coverImage:
          'https://res.cloudinary.com/kcsommers/image/upload/v1636090931/LA%20Virtual%20Studios/acting-5.jpg',
        images: [],
        slots: 10,
        coach: null,
      },
      {
        name: 'Acting class 6',
        blurb:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum suscipit dolorem aliquid quidem fugiat repudiandae deserunt quodnatus ratione architecto, inventore ea, reiciendis autem sit saepe! Eveniet, quos',
        description: '',
        coverImage:
          'https://res.cloudinary.com/kcsommers/image/upload/v1636090931/LA%20Virtual%20Studios/acting-3.jpg',
        images: [],
        slots: 10,
        coach: null,
      },
    ];
    return scheduled([_classes.slice(0, _count)], asyncScheduler);
  }
}
