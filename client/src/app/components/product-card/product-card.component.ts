import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
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

  @Output()
  public productSelected = new EventEmitter<IProduct>();

  constructor(private _router: Router) {}

  public goToProductRoute(): void {
    if (!this.product.route) {
      this.productSelected.emit(this.product);
      return;
    }
    let _route: string = this.product.route;
    const _paramRegex: RegExp = /\/\{\{([\w]+)\}\}/;
    const _paramMatch: string[] = this.product.route.match(_paramRegex);
    if (_paramMatch && _paramMatch[1]) {
      _route += `/${this.product[_paramMatch[1]]}`;
    }
    this._router.navigate([this.product.route]);
  }

  public goToCalendar(): void {
    this._router.navigate([`/calendar/${this.product._id}`]);
  }
}
