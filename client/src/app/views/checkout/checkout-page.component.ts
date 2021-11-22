import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { IAlertConfig, LAConstants, RoutingService } from '@la/core';
import { AuthenticationService, DummyDataService } from '@la/data';
import { BehaviorSubject } from 'rxjs';
import { BaseView } from '../base-view';

@Component({
  selector: 'la-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
  public alert$ = new BehaviorSubject<IAlertConfig>(null);

  constructor(
    private _routingService: RoutingService,
    private _authService: AuthenticationService
  ) {}

  ngOnInit() {
    const _orderNumber: string = this._routingService.queryParameterMap.get(
      LAConstants.ORDER_PARAM
    );
    if (!_orderNumber) {
      this.alert$.next({
        message: 'Uh oh!',
        details: "We couldn't find that order. Please try again",
      });
    }
  }
}
