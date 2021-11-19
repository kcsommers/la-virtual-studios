import { HttpClient, HttpHeaders } from '@angular/common/http';
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
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
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
    private _routingService: RoutingService,
    private _http: HttpClient
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
    // this.createMediaSource();
    this._landingVideo.nativeElement.muted = true;
    this._landingVideo.nativeElement.play();
  }

  private createMediaSource(): void {
    const _video: HTMLVideoElement = this._landingVideo.nativeElement;
    const _mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
    if ('MediaSource' in window && MediaSource.isTypeSupported(_mimeCodec)) {
      const _mediaSource = new MediaSource();
      _video.src = URL.createObjectURL(_mediaSource);
      console.log(_video.src);
      _mediaSource.addEventListener(
        'sourceopen',
        this.mediaSourceOpen.bind(this, _mediaSource)
      );
    } else {
      console.error('Unsupported MIME type or codec: ', _mimeCodec);
    }
  }

  private mediaSourceOpen(_mediaSource: MediaSource): void {
    console.log('media source open:::: ', _mediaSource);
    const _mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
    const _videoSourceBuffer: SourceBuffer =
      _mediaSource.addSourceBuffer(_mimeCodec);
    _videoSourceBuffer.addEventListener('updateend', () => {
      console.log('end of stream::::');
      _mediaSource.endOfStream();
      this._landingVideo.nativeElement.muted = true;
      this._landingVideo.nativeElement.play();
    });
    this._http
      .get(`${environment.apiUrl}/media/videos/greg_james_studio_tour`, {
        headers: new HttpHeaders({ Range: 'bytes=0-1000' }),
        responseType: 'arraybuffer',
      })
      .subscribe({
        next: (_chunk: ArrayBuffer) => {
          console.log('CHUNK:::: ', _chunk);
          _videoSourceBuffer.appendBuffer(_chunk);
        },
        error: (_error: any) => {
          console.error('HomPageComponent.mediaSourceOpen', _error);
        },
      });
  }

  public eventSelected(_event: IEvent): void {
    this._routingService.router.navigate([`/events/${_event._id}`]);
  }
}
