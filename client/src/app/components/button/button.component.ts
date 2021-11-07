import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
  public isLoading$ = new BehaviorSubject<boolean>(false);

  @Input()
  public clickListener: (_event: MouseEvent) => void;
}
