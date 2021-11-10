import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar.component.module';

@NgModule({
  declarations: [CalendarComponent],
  exports: [CalendarComponent],
})
export class CalendarComponentModule {}
