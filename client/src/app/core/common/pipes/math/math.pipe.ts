import { Pipe, PipeTransform } from '@angular/core';

type MathMethods = 'abs';

@Pipe({
  name: 'math',
  pure: true,
})
export class MathPipe implements PipeTransform {
  public transform(_value: number, _method: MathMethods): number {
    if (!_value) {
      return _value;
    }
    switch (_method) {
      case 'abs':
        return Math.abs(_value);
      default:
        return _value;
    }
  }
}
