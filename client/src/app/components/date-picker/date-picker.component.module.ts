import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ButtonComponentModule,
  CalendarComponentModule,
  IconComponentModule,
} from '..';
import { DatePickerComponent } from './date-picker.component';

@NgModule({
  imports: [
    CommonModule,
    CalendarComponentModule,
    IconComponentModule,
    ButtonComponentModule,
  ],
  declarations: [DatePickerComponent],
  exports: [DatePickerComponent],
})
export class DatePickerComponentModule {}
