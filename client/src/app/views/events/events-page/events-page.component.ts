import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ILAEvent, RoutingService } from '@la/core';
import { DummyDataService } from '@la/data';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsPageComponent {
  public events$ = new BehaviorSubject<ILAEvent[]>(null);

  constructor(
    private _dummyDataService: DummyDataService,
    private _routingService: RoutingService
  ) {
    this._dummyDataService
      .getClasses()
      .pipe(take(1))
      .subscribe({
        next: (_events: ILAEvent[]) => this.events$.next(_events),
      });
  }

  public eventSelected(_event: ILAEvent): void {
    this._routingService.router.navigate([`/events/${_event._id}`]);
  }
}
