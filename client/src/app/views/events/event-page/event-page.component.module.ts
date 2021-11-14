import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonComponentModule } from '@la/components';
import {
  GetDateDisplayPipeModule,
  GetPriceDisplayPipeModule,
  GetRemainingSlotsDisplayPipeModule,
} from '@la/core';
import { EventPageComponent } from './event-page.component';

const routes: Routes = [
  {
    path: '',
    component: EventPageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ButtonComponentModule,
    GetDateDisplayPipeModule,
    GetPriceDisplayPipeModule,
    GetRemainingSlotsDisplayPipeModule,
  ],
  declarations: [EventPageComponent],
  exports: [EventPageComponent],
})
export class EventPageComponentModule {}
