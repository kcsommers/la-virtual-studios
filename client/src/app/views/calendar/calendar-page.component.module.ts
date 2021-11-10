import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ButtonComponentModule,
  CalendarComponentModule,
  IconComponentModule,
} from '@la/components';
import { CalendarPageComponent } from './calendar-page.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarPageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ButtonComponentModule,
    IconComponentModule,
    CalendarComponentModule,
  ],
  declarations: [CalendarPageComponent],
  exports: [CalendarPageComponent],
})
export class CalendarPageComponentModule {}
