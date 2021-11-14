import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselItemDirective } from './carousel-item.directive';
import { CarouselComponent } from './carousel.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CarouselComponent, CarouselItemDirective],
  exports: [CarouselComponent, CarouselItemDirective],
})
export class CarouselComponentModule {}
