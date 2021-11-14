import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselItemWrapperComponent } from './carousel-item.component';
import { CarouselItemDirective } from './carousel-item.directive';
import { CarouselComponent } from './carousel.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CarouselComponent,
    CarouselItemDirective,
    CarouselItemWrapperComponent,
  ],
  exports: [
    CarouselComponent,
    CarouselItemDirective,
    CarouselItemWrapperComponent,
  ],
})
export class CarouselComponentModule {}
