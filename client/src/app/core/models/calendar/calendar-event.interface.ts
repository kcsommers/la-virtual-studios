import { ILocation, IProduct } from '@la/core';

export interface ICalendarEvent extends IProduct {
  date: number;
  location: ILocation;
}
