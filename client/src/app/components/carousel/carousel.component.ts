import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ContentChild,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import { Destroyer } from '@la/core';
import { CarouselItemWrapperComponent } from './carousel-item.component';
import { CarouselItemDirective } from './carousel-item.directive';

@Component({
  selector: 'la-carousel',
  template: `
    <ng-container #ViewContainer>
      <ng-content></ng-content>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-wrap: nowrap;
        overflow: hidden;
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class CarouselComponent {
  @Input()
  slideDuration: number = 2000;

  @Input()
  animationDuration: number = 1000;

  @ViewChild('ViewContainer', { read: ViewContainerRef })
  private _viewContainer: ViewContainerRef;

  @ContentChildren(CarouselItemDirective, { read: TemplateRef })
  private _itemTemplates: QueryList<TemplateRef<any>>;

  private _viewMap = new Map<number, ViewRef>();

  private _currentIndex: number = 0;

  constructor(private _cfr: ComponentFactoryResolver) {}

  ngAfterViewInit() {
    console.log(this._itemTemplates);
    this.createWrapperComponents();
  }

  private createWrapperComponents(): void {
    const _cmpFactory: ComponentFactory<CarouselItemWrapperComponent> =
      this._cfr.resolveComponentFactory(CarouselItemWrapperComponent);
    this._itemTemplates.forEach((_template: TemplateRef<any>) => {
      const _cmpRef: ComponentRef<CarouselItemWrapperComponent> =
        this._viewContainer.createComponent(_cmpFactory);
      console.log('cmp::: ', _cmpRef);
    });
  }
}
