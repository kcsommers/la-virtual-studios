import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ILAEvent, IProductCalendarDay, LAConstants } from '@la/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'la-event-selector',
  templateUrl: './event-selector.component.html',
  styleUrls: ['./event-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventSelectorComponent {
  @Input()
  productDay: IProductCalendarDay;

  public selectedEvent$ = new BehaviorSubject<ILAEvent>(null);

  constructor(private _router: Router) {}

  public setSelectedEvent(_event: ILAEvent): void {
    this.selectedEvent$.next(_event);
  }

  public goToCheckout(): void {
    console.log('go::::');
    // create temporary order
    this._router.navigate(['/checkout'], {
      queryParams: {
        [LAConstants.ORDER_PARAM]: this.selectedEvent$.getValue()._id,
      },
    });
  }
}
