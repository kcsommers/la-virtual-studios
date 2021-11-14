import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IEvent } from '@la/core';

@Component({
  selector: 'la-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCardComponent {
  @Input()
  public event: IEvent;

  @Input()
  public showRemainingSlots: boolean = false;

  @Output()
  public eventSelected = new EventEmitter<IEvent>();
}
