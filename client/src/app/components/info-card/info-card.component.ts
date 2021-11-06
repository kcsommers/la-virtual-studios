import { Component, Input } from '@angular/core';
import { IProduct } from '@la/core';

@Component({
  selector: 'la-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent {
  @Input()
  public product: IProduct;
}
