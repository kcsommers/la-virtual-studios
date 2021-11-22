import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IProductCalendarDay } from '@la/core';

@Component({
  selector: 'la-event-selector',
  templateUrl: './event-selector.component.html',
  styleUrls: ['./event-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventSelectorComponent {
  @Input()
  productDay: IProductCalendarDay;

  constructor() {
    setTimeout(() => {
      console.log(this.productDay);
    });
  }
}
