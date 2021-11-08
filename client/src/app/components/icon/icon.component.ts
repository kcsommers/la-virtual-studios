import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
  public color: string = '#171d2b';

  @Input()
  public size: string = 'large';

  @Input()
  public outlined: boolean = false;
}
