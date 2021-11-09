import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

type IconSize = 'small' | 'medium' | 'large' | 'xlarge';

@Component({
  selector: 'la-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input()
  public icon: string = 'faQuestion';

  @Input()
  public color: string;

  @Input()
  public size: IconSize = 'large';

  @Input()
  public outlined: boolean = false;
}
