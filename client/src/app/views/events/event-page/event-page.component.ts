import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Destroyer, EventsHelper, IEvent, RoutingService } from '@la/core';
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
  public event$ = new BehaviorSubject<IEvent>(null);

  constructor(
    private _dummyDataService: DummyDataService,
    private _routingService: RoutingService
  ) {
    super();
  }

  ngOnInit() {
    const _eventId: string = this._routingService.routeParameterMap.get(
      EventsHelper.EVENT_PARAM
    );
    if (!_eventId) {
      return;
    }
    this.fetchEvent(_eventId);
  }

  private fetchEvent(_eventId: string): void {
    this._dummyDataService
      .getEvent(_eventId)
      .pipe(take(1))
      .subscribe({
        next: (_event: IEvent) => {
          this.event$.next(_event);
        },
        error: (_error: any) => {
          console.error(_error);
        },
      });
  }
}
