import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
];

const HomeRouterModule: ModuleWithProviders<RouterModule> =
  RouterModule.forChild(routes);

@NgModule({
  imports: [HomeRouterModule],
  declarations: [HomePageComponent],
  exports: [HomePageComponent],
})
export class HomePageComponentModule {}
