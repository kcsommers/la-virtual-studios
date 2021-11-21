import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IUser, LAConstants, RoutingService } from '@la/core';
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

  constructor(
    private _authService: AuthenticationService,
    private _routingService: RoutingService
  ) {}

  private _validateForm(): boolean {
    let _isValid: boolean = true;
    if (!this.emailAddress) {
      _isValid = false;
      this.emailError$.next('Please enter a valid email address');
    } else {
      this.emailError$.next('');
    }
    if (!this.password) {
      _isValid = false;
      this.passwordError$.next('Password is required');
    } else {
      this.passwordError$.next('');
    }
    return _isValid;
  }

  public login(): void {
    if (!this._validateForm()) {
      return;
    }
    this._authService
      .login({
        email: this.emailAddress,
        password: this.password,
      })
      .pipe(take(1))
      .subscribe({
        next: (_user: IUser) => {
          const _requestedUrl: string =
            this._routingService.queryParameterMap.get(
              LAConstants.REQUESTED_URL_PARAM
            );
          this._routingService.router.navigate([_requestedUrl || '/']);
        },
        error: (_error: any) => {
          console.error('LoginPageComponent.login', _error);
        },
      });
  }
}
