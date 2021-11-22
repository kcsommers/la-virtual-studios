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
      {
        path: 'events',
        loadChildren: () =>
          import('./view-wrappers/events-page-wrapper.module').then(
            (_m) => _m.EventsPageWrapperModule
          ),
      },
      {
        path: 'checkout',
        loadChildren: () =>
          import('./view-wrappers/checkout-page-wrapper.module').then(
            (_m) => _m.CheckoutPageWrapperModule
          ),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./view-wrappers/auth-page-wrapper.module').then(
        (_m) => _m.AuthPageWrapperModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
