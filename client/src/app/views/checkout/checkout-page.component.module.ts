import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ButtonComponentModule,
  DatePickerComponentModule,
  SpinnerComponentModule,
} from '@la/components';
import { CheckoutPageComponent } from './checkout-page.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutPageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ButtonComponentModule,
    SpinnerComponentModule,
    DatePickerComponentModule,
  ],
  declarations: [CheckoutPageComponent],
  exports: [CheckoutPageComponent],
})
export class CheckoutPageComponentModule {}
