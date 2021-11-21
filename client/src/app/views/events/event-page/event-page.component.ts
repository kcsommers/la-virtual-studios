import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Destroyer,
  ILAEvent,
  IProduct,
  LAConstants,
  RoutingService,
} from '@la/core';
import { DummyDataService } from '@la/data';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventPageComponent extends Destroyer implements OnInit {
  public event$ = new BehaviorSubject<IProduct>(null);

  constructor(
    private _dummyDataService: DummyDataService,
    private _routingService: RoutingService
  ) {
    super();
  }

  ngOnInit() {
    const _eventId: string = this._routingService.routeParameterMap.get(
      LAConstants.ID_PARAM
    );
    if (!_eventId) {
      return;
    }
    this.fetchEvent(_eventId);
  }

  private fetchEvent(_eventId: string): void {
    this._dummyDataService
      .getClass(_eventId)
      .pipe(take(1))
      .subscribe({
        next: (_event: IProduct) => {
          console.log('got it:::: ', _event);
          this.event$.next(_event);
        },
        error: (_error: any) => {
          console.error(_error);
        },
      });
  }
}
