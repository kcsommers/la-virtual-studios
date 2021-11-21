import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { AuthenticationService } from '@la/data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private _isFixed: boolean;

  public set isFixed(_isFixed: boolean) {
    this._isFixed = _isFixed;
  }

  @Input()
  @HostBinding('class.header-fixed')
  public get isFixed(): boolean {
    return this._isFixed;
  }

  constructor(public authService: AuthenticationService) {}
}
