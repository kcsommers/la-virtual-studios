import { ILAEvent } from '@la/core';

export namespace EventsHelper {
  export const getRemainingSlots = (_event: ILAEvent): number => {
    const _slots: number = _event.totalSlots;
    const _totalAttendees: number = (_event.attendees || []).length;
    const _remaingSlots: number = _slots - _totalAttendees;
    return _remaingSlots;
  };
}
