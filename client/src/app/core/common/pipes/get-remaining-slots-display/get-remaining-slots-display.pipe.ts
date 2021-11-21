import { Pipe, PipeTransform } from '@angular/core';
import { ILAEvent } from '../../../models';
import { EventsHelper } from '../../utils';

@Pipe({
  name: 'getRemainingSlotsDisplay',
})
export class GetRemainingSlotsDisplayPipe implements PipeTransform {
  transform(_event: ILAEvent): string {
    const _remaingSlots: number = EventsHelper.getRemainingSlots(_event);
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
