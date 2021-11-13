import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({ template: '' })
export abstract class Destroyer implements OnDestroy {
  protected destroyed$ = new Subject();

  protected destroyed: boolean = false;

  public destroy(): void {
    this.destroyed = true;
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnDestroy() {
    this.destroy();
  }
}
