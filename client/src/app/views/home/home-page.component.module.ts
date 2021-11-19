import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ButtonComponentModule,
  CarouselComponentModule,
  EventCardComponentModule,
  IconComponentModule,
  ProductCardComponentModule,
} from '../../components';
import { HomePageComponent } from './home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    EventCardComponentModule,
    ButtonComponentModule,
    IconComponentModule,
    ProductCardComponentModule,
    CarouselComponentModule,
  ],
  declarations: [HomePageComponent],
  exports: [HomePageComponent],
})
export class HomePageComponentModule {}
