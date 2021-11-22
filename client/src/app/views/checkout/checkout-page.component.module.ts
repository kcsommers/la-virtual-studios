import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponentModule, SpinnerComponentModule } from '@la/components';
import { CheckoutPageComponent } from './checkout-page.component';

@NgModule({
  imports: [CommonModule, ButtonComponentModule, SpinnerComponentModule],
  declarations: [CheckoutPageComponent],
  exports: [CheckoutPageComponent],
})
export class CheckoutPageComponentModule {}
