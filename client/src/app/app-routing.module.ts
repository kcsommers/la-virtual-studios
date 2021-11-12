import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShellComponent } from './app-shell';

const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./view-wrappers/home-page-wrapper.module').then(
            (_m) => _m.HomePageWrapperModule
          ),
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('./view-wrappers/calendar-page-wrapper.module').then(
            (_m) => _m.CalendarPageWrapperModule
          ),
        data: {
          fixedHeader: true,
        },
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
