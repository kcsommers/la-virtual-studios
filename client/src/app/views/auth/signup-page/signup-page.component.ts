import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'la-signup-page',
  templateUrl: './signup-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupPageComponent {
  public isLoading$ = new BehaviorSubject<boolean>(false);

  public emailAddress: string;

  public password: string;
}
