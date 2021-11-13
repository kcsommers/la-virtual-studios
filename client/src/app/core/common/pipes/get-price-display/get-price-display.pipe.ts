import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getPriceDisplay',
  pure: true,
})
export class GetPriceDisplayPipe implements PipeTransform {
  public transform(_price: number): string {
    if (!_price) {
      return '$0.00';
    }
    return `$${(_price / 100).toFixed(2)}`;
  }
}
