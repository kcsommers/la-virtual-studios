import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ButtonComponentModule,
  EventCardComponentModule,
} from '@la/components';
import {
  EventsHelper,
  GetDateDisplayPipeModule,
  GetPriceDisplayPipeModule,
  GetRemainingSlotsDisplayPipeModule,
  LAConstants,
} from '@la/core';
import { EventPageComponent } from './event-page/event-page.component';
import { EventsPageComponent } from './events-page/events-page.component';
import { EventsWrapperComponent } from './events-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: EventsWrapperComponent,
    children: [
      {
        path: `:${LAConstants.ID_PARAM}`,
        component: EventPageComponent,
      },
      {
        path: '',
        component: EventsPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ButtonComponentModule,
    GetPriceDisplayPipeModule,
    GetRemainingSlotsDisplayPipeModule,
    GetDateDisplayPipeModule,
    EventCardComponentModule,
  ],
  declarations: [
    EventsWrapperComponent,
    EventsPageComponent,
    EventPageComponent,
  ],
  exports: [EventsWrapperComponent, EventsPageComponent, EventPageComponent],
})
export class EventsWrapperModule {}
