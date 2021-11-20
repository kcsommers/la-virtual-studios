import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IProduct, RoutingService } from '@la/core';
import { Router } from '@angular/router';

@Component({
  selector: 'la-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  @Input()
  public product: IProduct;

  constructor(private _router: Router) {}

  public bookNow(): void {
    this._router.navigate([`/calendar/${this.product._id}`]);
  }
}
