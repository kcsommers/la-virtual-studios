import { isPlatformBrowser } from '@angular/common';
import { Directive, Inject, PLATFORM_ID } from '@angular/core';
import { Destroyer, RoutingService } from '@la/core';
import { AuthenticationService, DummyDataService } from '@la/data';

@Directive()
export class BaseView extends Destroyer {
  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    protected dummyDataService: DummyDataService,
    protected routingService: RoutingService,
    protected authService: AuthenticationService
  ) {
    super();
  }

  protected isPlatformBrowser(): boolean {
    return isPlatformBrowser(this._platformId);
  }
}
