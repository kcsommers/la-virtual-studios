import { Injectable, OnDestroy } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Params,
  Router,
} from '@angular/router';
import { isEqual } from 'lodash';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoutingService implements OnDestroy {
  protected destroyed$ = new Subject();

  public queryParameterMap = new Map<string, any>();

  public routeParameterMap = new Map<string, any>();

  public queryParams$: BehaviorSubject<Params>;

  public routeParams$: BehaviorSubject<Params>;

  public currentUrl: string;

  public previousUrl: string;

  constructor(public router: Router, private _route: ActivatedRoute) {
    this.consumeRouterEvents();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private consumeRouterEvents(): void {
    this.currentUrl = this.router.url;
    this.router.events
      .pipe(
        filter((_event) => _event instanceof NavigationEnd),
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: (_event) => {
          this.previousUrl = this.currentUrl;
          this.currentUrl = (_event as NavigationEnd).url;
          this.updateRouteParams();
        },
      });
    this.listenToQueryParams();
    if (this.router.navigated) {
      this.updateRouteParams();
    }
  }

  private listenToQueryParams(): void {
    const _initialQueryParams: Params = this._route.snapshot.queryParams;
    this.queryParams$ = new BehaviorSubject<Params>(_initialQueryParams);
    this._route.queryParams
      .pipe(
        filter((_params: Params) => !!_params),
        takeUntil(this.destroyed$)
      )
      .subscribe({
        next: (_params: Params) => {
          const _paramNames: string[] = Object.keys(_params || {});
          if (!_paramNames.length) {
            this.queryParameterMap.clear();
          } else {
            _paramNames.forEach((_param: string) => {
              if (_params[_param]) {
                this.queryParameterMap.set(_param, _params[_param]);
              } else {
                this.queryParameterMap.delete(_param);
              }
            });
          }
          this.queryParams$.next(_params);
        },
      });
  }

  private updateRouteParams(): void {
    const _params: Params = {};
    const _routeStack: ActivatedRouteSnapshot[] = [
      this.router.routerState.snapshot.root,
    ];
    while (_routeStack.length > 0) {
      const _route = _routeStack.pop();
      Object.keys(_route.params || {}).forEach((_paramName: string) => {
        this.routeParameterMap.set(_paramName, _route.params[_paramName]);
        _params[_paramName] = _route.params[_paramName];
      });
      _routeStack.push(..._route.children);
    }
    if (!this.routeParams$) {
      this.routeParams$ = new BehaviorSubject<Params>(_params);
      return;
    }
    const _currentParams: Params = this.routeParams$.getValue();
    if (!isEqual(_currentParams, _params)) {
      this.routeParams$.next(_params);
    }
  }
}
