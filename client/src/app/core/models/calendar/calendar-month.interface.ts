import { IEvent } from '@la/core';

export interface ICalendarMonth {
  month: number;
  events: IEvent[];
}
