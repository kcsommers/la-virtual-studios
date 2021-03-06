import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GetPriceDisplayPipeModule } from '@la/core';
import { ButtonComponentModule } from '../button/button.component.module';
import { ProductCardComponent } from './product-card.component';

@NgModule({
  imports: [CommonModule, ButtonComponentModule, GetPriceDisplayPipeModule],
  declarations: [ProductCardComponent],
  exports: [ProductCardComponent],
})
export class ProductCardComponentModule {}
