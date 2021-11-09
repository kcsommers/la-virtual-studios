import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ICoach, IEvent, IProduct } from '@la/core';
import { DummyDataService } from '@la/data';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  public products$ = new BehaviorSubject<IProduct[]>(null);

  public events$ = new BehaviorSubject<IEvent[]>(null);

  public coaches$ = new BehaviorSubject<ICoach[]>(null);

  constructor(private _dummyDataService: DummyDataService) {
    this._dummyDataService
      .getProducts()
      .pipe(take(1))
      .subscribe({
        next: (_products: IProduct[]) => this.products$.next(_products),
      });

    this._dummyDataService
      .getClasses()
      .pipe(take(1))
      .subscribe({
        next: (_events: IEvent[]) => this.events$.next(_events),
      });

    this._dummyDataService
      .getCoaches(1)
      .pipe(take(1))
      .subscribe({
        next: (_events: ICoach[]) => this.coaches$.next(_events),
      });
  }
}
