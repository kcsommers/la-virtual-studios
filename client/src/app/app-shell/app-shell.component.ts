import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

interface IAppShellOptions {
  fixedHeader: boolean;
}

@Component({
  selector: 'app-shell',
  template: `
    <div class="app-container">
      <app-header [isFixed]="fixedHeader$ | async"></app-header>
      <div class="app-body-container">
        <router-outlet></router-outlet>
      </div>
      <app-footer></app-footer>
    </div>
  `,
  styleUrls: ['./app-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {
  public fixedHeader$ = new BehaviorSubject<boolean>(false);
  constructor(_router: Router, private _route: ActivatedRoute) {
    _router.events
      .pipe(filter((_navEvent) => _navEvent instanceof NavigationEnd))
      .subscribe({
        next: () => {
          const _activeChild = this._route.snapshot.firstChild;
          const _data: IAppShellOptions =
            _activeChild && (_activeChild.data as IAppShellOptions);
          if (!_data) {
            this.fixedHeader$.next(false);
          }
          this.fixedHeader$.next(_data.fixedHeader);
        },
      });
  }
}
