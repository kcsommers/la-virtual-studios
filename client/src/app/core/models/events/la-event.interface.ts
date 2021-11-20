import { IUser } from '@la/core';
import { ICalendarEvent } from '../calendar/calendar-event.interface';
import { ICoach } from '../coaches/coach.interface';

export interface ILAEvent extends ICalendarEvent {
  slots: number;
  attendees: IUser[];
  coach: ICoach;
  startTime: number;
  endTime: number;
}
