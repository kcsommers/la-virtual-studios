import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsHelper } from '@la/core';
import { EventsPageComponent } from './events-page.component';

const routes: Routes = [
  {
    path: '',
    component: EventsPageComponent,
    children: [
      {
        path: `:${EventsHelper.EVENT_PARAM}`,
        loadChildren: () =>
          import('../event-page/event-page.component.module').then(
            (_m) => _m.EventPageComponentModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  declarations: [EventsPageComponent],
  exports: [EventsPageComponent],
})
export class EventsPageComponentModule {}
