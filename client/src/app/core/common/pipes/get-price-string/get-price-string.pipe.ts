import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getPriceString',
  pure: true,
})
export class GetPriceStringPipe implements PipeTransform {
  public transform(_price: number): string {
    if (!_price) {
      return '$0.00';
    }
    return `$${(_price / 100).toFixed(2)}`;
  }
}
