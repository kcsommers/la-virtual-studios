import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconComponentModule } from '..';
import { CalendarComponent } from './calendar.component';
import { GetMonthDisplayPipe } from './pipes/get-month-display.pipe';

@NgModule({
  imports: [CommonModule, IconComponentModule],
  declarations: [CalendarComponent, GetMonthDisplayPipe],
  exports: [CalendarComponent],
})
export class CalendarComponentModule {}
