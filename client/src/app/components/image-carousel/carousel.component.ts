import {
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnDestroy,
  QueryList,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CarouselItemDirective } from './carousel-item.directive';

const FADE_OUT_CLASS = 'fade-out';

const DEFAULT_FADE_DURATION = 1000;

const DEFAULT_SLIDE_DURATION = 5000;

@Component({
  selector: 'la-carousel',
  template: `<div #Container class="carousel-container"></div>`,
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnDestroy {
  @Input()
  slideDurations: number[] = [DEFAULT_SLIDE_DURATION];

  @ViewChild('Container', { read: ElementRef })
  private _container: ElementRef;

  @ContentChildren(CarouselItemDirective, { read: ElementRef })
  private _items: QueryList<ElementRef>;

  private _currentIndex: number = 0;

  private _interval: number;

  private _timeout: number;

  constructor(private _renderer: Renderer2) {}

  ngAfterViewInit() {
    this.appendElement(0);
    if (this.slideDurations.length < 2) {
      this.setCarouselInterval(
        this.slideDurations[0] || DEFAULT_SLIDE_DURATION
      );
    }
  }

  ngOnDestroy() {
    window.clearInterval(this._interval);
  }

  private setCarouselInterval(_duration: number): void {
    this._interval = window.setInterval(
      this.nextTemplate.bind(this),
      _duration
    );
  }

  private setCarouselTimeout(): void {
    window.clearTimeout(this._timeout);
    const _index: number = Math.floor(
      Math.random() * this.slideDurations.length
    );
    const _duration: number = this.slideDurations[_index];
    this._timeout = window.setTimeout(this.nextTemplate.bind(this), _duration);
  }

  private nextTemplate(): void {
    this._currentIndex = this.getNextIndex();
    this.appendElement(this._currentIndex);
  }

  private appendElement(_itemIndex: number): void {
    const _childEls: HTMLCollection = this._container.nativeElement.children;
    const _newEl: ElementRef = this._items.get(_itemIndex);
    const _newElWrapper: HTMLDivElement = this._renderer.createElement('div');
    _newElWrapper.classList.add('carousel-item-wrap');
    this._renderer.appendChild(_newElWrapper, _newEl.nativeElement);
    if (!_childEls.length) {
      this._renderer.appendChild(this._container.nativeElement, _newElWrapper);
    } else {
      const _displayedEl: Element = _childEls[1] || _childEls[0];
      this._renderer.insertBefore(
        this._container.nativeElement,
        _newElWrapper,
        _displayedEl
      );
      this.removeLastElement();
    }
    if (this.slideDurations.length > 1) {
      this.setCarouselTimeout();
    }
  }

  private removeLastElement(): void {
    const _childEls: HTMLCollection = this._container.nativeElement.children;
    const _lastEl: Element = _childEls[_childEls.length - 1];
    this._renderer.addClass(_lastEl, FADE_OUT_CLASS);
    window.setTimeout(() => {
      this._renderer.removeChild(
        this._container.nativeElement,
        _childEls[_childEls.length - 1]
      );
    }, DEFAULT_FADE_DURATION);
  }

  private getNextIndex(): number {
    let _nextIndex = this._currentIndex + 1;
    if (_nextIndex >= this._items.length) {
      _nextIndex = 0;
    }
    return _nextIndex;
  }
}
