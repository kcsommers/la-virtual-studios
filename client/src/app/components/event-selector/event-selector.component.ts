import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ILAEvent, IProductCalendarDay } from '@la/core';
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

  public setSelectedEvent(_event: ILAEvent): void {
    this.selectedEvent$.next(_event);
  }

  public goToCheckout(): void {}
}
