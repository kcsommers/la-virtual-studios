import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ContentChildren,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
  QueryList,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Destroyer } from '@la/core';
import { interval, timer } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { CarouselItemDirective } from './carousel-item.directive';

const FADE_OUT_CLASS = 'fade-out';

const DEFAULT_FADE_DURATION = 1000;

const DEFAULT_SLIDE_DURATION = 5000;

@Component({
  selector: 'la-carousel',
  template: `<div #Container class="carousel-container"></div>`,
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent extends Destroyer {
  @Input()
  slideDurations: number[] = [DEFAULT_SLIDE_DURATION];

  @ViewChild('Container', { read: ElementRef })
  private _container: ElementRef;

  @ContentChildren(CarouselItemDirective, { read: ElementRef })
  private _items: QueryList<ElementRef>;

  private _currentIndex: number = 0;

  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private _renderer: Renderer2
  ) {
    super();
  }

  ngAfterViewInit() {
    this.appendElement(0);
    if (this.slideDurations.length < 2) {
      this.setCarouselInterval(
        this.slideDurations[0] || DEFAULT_SLIDE_DURATION
      );
    }
  }

  private setCarouselInterval(_duration: number): void {
    if (!isPlatformBrowser(this._platformId)) {
      return;
    }
    const _interval$ = interval(_duration);
    _interval$.pipe(takeUntil(this.destroyed$)).subscribe({
      next: this.nextTemplate.bind(this),
    });
  }

  private setCarouselTimeout(): void {
    if (!isPlatformBrowser(this._platformId)) {
      return;
    }
    const _index: number = Math.floor(
      Math.random() * this.slideDurations.length
    );
    const _delay: number = this.slideDurations[_index];
    const _delay$ = timer(_delay);
    _delay$.pipe(take(1)).subscribe({
      next: this.nextTemplate.bind(this),
    });
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
    const fadeDelay$ = timer(DEFAULT_FADE_DURATION);
    fadeDelay$.pipe(take(1)).subscribe({
      next: () => {
        this._renderer.removeChild(
          this._container.nativeElement,
          _childEls[_childEls.length - 1]
        );
      },
    });
  }

  private getNextIndex(): number {
    let _nextIndex = this._currentIndex + 1;
    if (_nextIndex >= this._items.length) {
      _nextIndex = 0;
    }
    return _nextIndex;
  }
}
