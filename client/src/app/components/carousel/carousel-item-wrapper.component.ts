import { Component, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'la-carousel-item-wrapper',
  template: '<ng-container #ViewContainer></ng-container>',
  styles: [
    `
      :host {
        display: block;
        min-width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class CarouselItemWrapperComponent {
  constructor(public viewContainer: ViewContainerRef) {}
}
