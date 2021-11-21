import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthenticationService } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(_authService: AuthenticationService) {}
}
