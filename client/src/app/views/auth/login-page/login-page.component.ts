import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IUser } from '@la/core';
import { AuthenticationService } from '@la/data';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'la-login-page',
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  public emailAddress: string;

  public password: string;

  public emailError$ = new BehaviorSubject<string>('');

  public passwordError$ = new BehaviorSubject<string>('');

  public loginError$ = new BehaviorSubject<string>('');

  constructor(private _authService: AuthenticationService) {}

  private _validateForm(): boolean {
    let _isValid: boolean = true;
    if (!this.emailAddress) {
      _isValid = false;
      this.emailError$.next('Email required');
    } else {
      this.emailError$.next('');
    }
    if (!this.password) {
      _isValid = false;
      this.passwordError$.next('Password required');
    } else {
      this.passwordError$.next('');
    }
    return _isValid;
  }

  public login(): void {
    this._authService
      .login({
        email: this.emailAddress,
        password: this.password,
      })
      .pipe(take(1))
      .subscribe({
        next: (_user: IUser) => {
          console.log('user:::: ', _user);
        },
        error: (_error: any) => {
          console.error('LoginPageComponent.login', _error);
        },
      });
  }
}
