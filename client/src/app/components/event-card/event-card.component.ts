import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IProduct } from '@la/core';

@Component({
  selector: 'la-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCardComponent {
  @Input()
  public product: IProduct;
}
