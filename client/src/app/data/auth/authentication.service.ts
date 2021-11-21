import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { IUser, LAConstants } from '@la/core';
import { environment } from '@la/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap, take } from 'rxjs/operators';
import { ILoginCredentials } from './login-credentials.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public authState$ = new BehaviorSubject<boolean>(false);

  public user$ = new BehaviorSubject<IUser>(null);

  constructor(
    @Inject(PLATFORM_ID) private _platformId,
    private _http: HttpClient
  ) {
    this.initSession();
  }

  public login(_credentials: ILoginCredentials): Observable<IUser> {
    return this._http
      .post<IUser>(`${environment.apiUrl}/auth/login`, _credentials)
      .pipe(
        tap(this.logUserIn.bind(this)),
        catchError((_error: any) => {
          console.error('AuthenticationService.login', _error);
          return throwError(_error);
        }),
        take(1)
      );
  }

  public signup(_credentials: ILoginCredentials): Observable<any> {
    return this._http
      .post<IUser>(`${environment.apiUrl}/auth/signup`, _credentials)
      .pipe(
        tap(this.logUserIn.bind(this)),
        catchError((_error: any) => {
          console.error('AuthenticationService.signup', _error);
          return throwError(_error);
        }),
        take(1)
      );
  }

  public logout(): Observable<any> {
    return this._http
      .post<boolean>(`${environment.apiUrl}/auth/logout`, this.user$.getValue())
      .pipe(
        tap(this.logUserOut.bind(this)),
        catchError((_error: any) => {
          console.error('AuthenticationService.logout', _error);
          return throwError(_error);
        }),
        take(1)
      );
  }

  private initSession(): void {
    if (!isPlatformBrowser(this._platformId)) {
      return;
    }
    let _cachedUser: string | IUser = localStorage.getItem(
      LAConstants.USER_STORAGE_KEY
    );
    if (!_cachedUser) {
      return;
    }
    _cachedUser = JSON.parse(_cachedUser as string) as IUser;
    this._http
      .post<boolean>(`${environment.apiUrl}/auth/verify`, _cachedUser)
      .pipe(take(1))
      .subscribe({
        next: (_tokenValid: boolean) => {
          if (_tokenValid) {
            this.logUserIn(_cachedUser as IUser);
          } else {
            this.logUserOut();
          }
        },
        error: (_error: any) => {
          console.error('AuthenticationService.initSession', _error);
          return throwError(_error);
        },
      });
  }

  private logUserOut(): void {
    this.authState$.next(false);
    this.user$.next(null);
    localStorage.removeItem(LAConstants.USER_STORAGE_KEY);
  }

  private logUserIn(_user: IUser): void {
    this.authState$.next(true);
    this.user$.next(_user);
    if (!isPlatformBrowser(this._platformId)) {
      return;
    }
    localStorage.setItem(LAConstants.USER_STORAGE_KEY, JSON.stringify(_user));
  }
}
