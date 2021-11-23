import { NgModule } from '@angular/core';
import { CalendarComponentModule } from '..';
import { DatePickerComponent } from './date-picker.component';

@NgModule({
  imports: [CalendarComponentModule],
  declarations: [DatePickerComponent],
  exports: [DatePickerComponent],
})
export class DatePickerComponentModule {}
