import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '@la/core';
import { environment } from '@la/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILoginCredentials } from './login-credentials.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public authState$ = new BehaviorSubject<boolean>(false);

  public user$ = new BehaviorSubject<IUser>(null);

  constructor(private _http: HttpClient) {}

  public login(_credentials: ILoginCredentials): Observable<IUser> {
    return this._http.post<IUser>(
      `${environment.apiUrl}/auth/login`,
      _credentials
    );
  }

  public signup(_credentials: ILoginCredentials): Observable<any> {
    return this._http.post(`${environment.apiUrl}/auth/signup`, _credentials);
  }
}
