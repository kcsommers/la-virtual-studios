import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DummyDataService } from '@la/data';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarPageComponent {
  constructor(private _dummyDataService: DummyDataService) {}
}
