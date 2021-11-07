import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
  public isDisabled: boolean;

  @Input()
  public isLoading: boolean;

  @Input()
  public clickListener: (_event: MouseEvent) => void;
}
