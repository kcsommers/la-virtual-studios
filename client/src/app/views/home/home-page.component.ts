import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ICoach, IEvent, IProduct, RoutingService } from '@la/core';
import {
  DummyDataService,
  dummyHeadshots1,
  dummyHeadshots2,
  dummyHeadshots3,
} from '@la/data';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

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

  public headshotsGroup1: string[] = dummyHeadshots1;

  public headshotsGroup2: string[] = dummyHeadshots2;

  public headshotsGroup3: string[] = dummyHeadshots3;

  @ViewChild('LandingVideo', { read: ElementRef })
  private _landingVideo: ElementRef<HTMLVideoElement>;

  constructor(
    private _dummyDataService: DummyDataService,
    private _routingService: RoutingService
  ) {
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
      .getCoaches()
      .pipe(take(1))
      .subscribe({
        next: (_events: ICoach[]) => this.coaches$.next(_events),
      });
  }

  ngAfterViewInit() {
    // this._landingVideo.nativeElement.muted = true;
    // this._landingVideo.nativeElement.play();
  }

  public eventSelected(_event: IEvent): void {
    this._routingService.router.navigate([`/events/${_event._id}`]);
  }
}
