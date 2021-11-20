import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-events-wrapper',
  template: '<router-outlet></router-outlet>',
  styles: [
    `
      host: {
        display: block;
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsWrapperComponent {}
