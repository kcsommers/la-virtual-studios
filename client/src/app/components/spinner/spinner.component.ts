import { ChangeDetectionStrategy, Component } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'la-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {}
