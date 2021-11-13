import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IEvent } from '@la/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'la-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCardComponent implements OnInit {
  @Input()
  public event: IEvent;

  @Input()
  public showRemainingSlots: boolean = false;

  @Output()
  public eventSelected = new EventEmitter<IEvent>();

  public remaingSlotsDisplay$: BehaviorSubject<string>;

  private _remaingSlots: number;

  ngOnInit() {
    if (this.showRemainingSlots) {
      this.remaingSlotsDisplay$ = new BehaviorSubject('');
      this.setRemainingSlots();
    }
  }

  private setRemainingSlots(): void {
    const _slots = this.event.slots;
    const _totalAttendees = (this.event.attendees || []).length;
    const _remaingSlots = _slots - _totalAttendees;
    let _display: string = '';
    if (_remaingSlots <= 0) {
      _display += 'This event is sold out!';
    } else if (_remaingSlots <= 5) {
      _display += `Only ${_remaingSlots} spot${
        _remaingSlots > 1 ? 's' : ''
      } left!`;
    } else {
      _display = `${_remaingSlots} openings`;
    }
    this.remaingSlotsDisplay$.next(_display);
    this._remaingSlots = _remaingSlots;
  }
}
