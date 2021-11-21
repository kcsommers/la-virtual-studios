import { Directive } from '@angular/core';
import { Destroyer, RoutingService } from '@la/core';
import { AuthenticationService, DummyDataService } from '@la/data';

@Directive()
export class BaseView extends Destroyer {
  constructor(
    protected dummyDataService: DummyDataService,
    protected routingService: RoutingService,
    protected authService: AuthenticationService
  ) {
    super();
  }
}
