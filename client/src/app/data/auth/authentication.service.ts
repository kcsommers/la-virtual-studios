import { Injectable } from '@angular/core';
import { IUser } from '@la/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public authState$ = new BehaviorSubject<boolean>(false);

  public user$ = new BehaviorSubject<IUser>(null);
}
