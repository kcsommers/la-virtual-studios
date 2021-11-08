import { NgModule } from '@angular/core';
import { GetPriceStringPipe } from './get-price-string.pipe';

@NgModule({
  declarations: [GetPriceStringPipe],
  exports: [GetPriceStringPipe],
})
export class GetPriceStringPipeModule {}
