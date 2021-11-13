import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MathPipeModule, TemplateVariableDirectiveModule } from '@la/core';
import { IconComponentModule } from '..';
import { CalendarComponent } from './calendar.component';
import { GetMonthDisplayPipe } from './pipes/get-month-display.pipe';

@NgModule({
  imports: [
    CommonModule,
    IconComponentModule,
    MathPipeModule,
    TemplateVariableDirectiveModule,
  ],
  declarations: [CalendarComponent, GetMonthDisplayPipe],
  exports: [CalendarComponent],
})
export class CalendarComponentModule {}
