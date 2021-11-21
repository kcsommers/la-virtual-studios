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

  @Input()
  public buttonText: string = 'Book Now';

  @Output()
  public productSelected = new EventEmitter<IProduct>();

  @Output()
  public productButtonSelected = new EventEmitter<IProduct>();

  public handleProductSelected(): void {
    this.productSelected.emit(this.product);
  }

  public handleButtonClick(): void {
    this.productButtonSelected.emit(this.product);
  }
}
