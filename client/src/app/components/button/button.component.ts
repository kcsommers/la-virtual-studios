import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorType } from '@la/core';
import { BehaviorSubject } from 'rxjs';

type ButtonLook = 'solid' | 'outline' | 'flat';
type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'la-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input()
  public text: string;

  @Input()
  public look: ButtonLook = 'solid';

  @Input()
  public size: ButtonSize = 'medium';

  @Input()
  public color: ColorType = 'primary';

  @Input()
  public isDisabled: boolean = false;

  @Input()
  public isFullWidth: boolean = false;

  @Input()
  public isResponsive: boolean = false;

  @Input()
  public path: string;

  @Input()
  public isLoading$ = new BehaviorSubject<boolean>(false);

  @Input()
  public clickHandler: (_event: MouseEvent) => void;

  @HostBinding('class.full-width-btn')
  get fullWidth(): boolean {
    return this.isFullWidth;
  }

  @HostBinding('class.responsive-btn')
  get responsive(): boolean {
    return this.isResponsive;
  }

  constructor(private _router: Router, private _route: ActivatedRoute) {}

  public handleClick(_event: MouseEvent): void {
    if (this.path) {
      this._router.navigate([this.path], {
        relativeTo: this._route,
        queryParamsHandling: 'merge',
      });
      return;
    }
    if (this.clickHandler) {
      this.clickHandler(_event);
    }
  }
}
