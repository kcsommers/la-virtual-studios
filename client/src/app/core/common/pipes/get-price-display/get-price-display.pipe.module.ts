import { NgModule } from '@angular/core';
import { GetPriceDisplayPipe } from './get-price-display.pipe';

@NgModule({
  declarations: [GetPriceDisplayPipe],
  exports: [GetPriceDisplayPipe],
})
export class GetPriceDisplayPipeModule {}
