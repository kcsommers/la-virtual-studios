import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Destroyer } from '@la/core';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventPageComponent extends Destroyer {}
