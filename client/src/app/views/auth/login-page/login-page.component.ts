import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'la-login-page',
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  public emailAddress: string;

  public password: string;
}
