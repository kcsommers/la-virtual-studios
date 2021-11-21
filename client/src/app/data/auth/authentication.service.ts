import { Injectable } from '@angular/core';
import { IUser } from '@la/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '@la/environment';
import { ILoginCredentials } from './login-credentials.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public authState$ = new BehaviorSubject<boolean>(false);

  public user$ = new BehaviorSubject<IUser>(null);

  constructor(private _http: HttpClient) {}

  public login(_credentials: ILoginCredentials): Observable<any> {
    return this._http.post(`${environment.apiUrl}/auth/login`, _credentials);
  }

  public signup(_credentials: ILoginCredentials): Observable<any> {
    return this._http.post(`${environment.apiUrl}/auth/signup`, _credentials);
  }
}
