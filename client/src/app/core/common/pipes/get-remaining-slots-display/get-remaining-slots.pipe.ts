import { Pipe, PipeTransform } from '@angular/core';
import { ILAEvent } from '../../../models';
import { EventsHelper } from '../../utils';

@Pipe({
  name: 'getRemainingSlots',
})
export class GetRemainingSlotsPipe implements PipeTransform {
  transform(_event: ILAEvent, _isDisplay = true): string | number {
    const _remaingSlots: number = EventsHelper.getRemainingSlots(_event);
    if (!_isDisplay) {
      return _remaingSlots;
    }
    let _display: string = '';
    if (_remaingSlots <= 0) {
      _display += 'This event is sold out!';
    } else if (_remaingSlots <= 5) {
      _display += `Only ${_remaingSlots} spot${
        _remaingSlots > 1 ? 's' : ''
      } left!`;
    } else {
      _display = `${_remaingSlots} spots available`;
    }
    return _display;
  }
}
