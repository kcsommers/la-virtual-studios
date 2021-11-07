import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  public isDisabled: boolean = false;

  @Input()
  public isFullWidth: boolean = false;

  @Input()
  public isLoading$ = new BehaviorSubject<boolean>(false);

  @Input()
  public clickListener: (_event: MouseEvent) => void;
}
