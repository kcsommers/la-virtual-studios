import {
  Component,
  ContentChildren,
  Input,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Destroyer } from '@la/core';
import { CarouselItemDirective } from './carousel-item.directive';

@Component({
  selector: 'la-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent extends Destroyer {
  @Input()
  slideDuration: number = 2000;

  @Input()
  animationDuration: number = 1000;

  @ContentChildren(CarouselItemDirective, { read: TemplateRef })
  private _items: QueryList<TemplateRef<any>>;

  @ViewChild('ViewContainer', { read: ViewContainerRef })
  private _viewContainer: ViewContainerRef;
  @ViewChild('ViewContainer2', { read: ViewContainerRef })
  private _viewContainer2: ViewContainerRef;

  @ViewChild('ItemTemplate', { read: TemplateRef })
  private _itemTemplate: TemplateRef<any>;

  private _currentIndex: number = 0;

  constructor(private _renderer: Renderer2) {
    super();
  }

  ngAfterViewInit() {
    this.attachTemplate(this._currentIndex);
    this._nextItem();
    console.log('tempalte::: ', this._itemTemplate, this._viewContainer2);
  }

  private _nextItem(): void {
    let _nextIndex: number = this._currentIndex + 1;
    if (_nextIndex >= this._items.length) {
      _nextIndex = 0;
    }
    this.attachTemplate(_nextIndex);
  }

  private attachTemplate(_index: number): void {
    const _template: TemplateRef<any> = this._items.get(_index);
    if (this._viewContainer.length > 1) {
      this._viewContainer.detach(1);
    }
    this._viewContainer.createEmbeddedView(_template);
  }
}
