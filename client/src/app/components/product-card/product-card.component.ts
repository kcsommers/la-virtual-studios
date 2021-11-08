import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IProduct } from '@la/core';

@Component({
  selector: 'la-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  @Input()
  public product: IProduct;
}
