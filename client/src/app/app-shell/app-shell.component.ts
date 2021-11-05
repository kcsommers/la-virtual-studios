import { Component } from '@angular/core';

@Component({
  selector: 'app-shell',
  template: `
    <div class="app-container">
      <app-header></app-header>
      <div class="app-body-container">
        <router-outlet></router-outlet>
      </div>
      <app-footer></app-footer>
    </div>
  `,
  styleUrls: ['./app-shell.component.scss'],
})
export class AppShellComponent {}
