import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { IEvent } from '../core';
import { DummyDataService } from '../data';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  public events$ = new BehaviorSubject<IEvent[]>(null);

  constructor(private _dummyDataService: DummyDataService) {
    this._dummyDataService
      .getClasses()
      .pipe(take(1))
      .subscribe({
        next: (_events: IEvent[]) => this.events$.next(_events),
      });
  }
}
