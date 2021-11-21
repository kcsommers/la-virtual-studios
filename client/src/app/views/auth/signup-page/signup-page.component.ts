import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'la-signup-page',
  templateUrl: './signup-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupPageComponent {
  public emailAddress: string;

  public password: string;
}
