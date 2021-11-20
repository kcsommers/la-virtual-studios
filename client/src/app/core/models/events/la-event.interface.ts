import { ILocation, IUser } from '@la/core';
import { ICoach } from '../coaches/coach.interface';
import { IProduct } from '../products/product.interface';

export interface ILAEvent extends IProduct {
  slots: number;
  attendees: IUser[];
  coach: ICoach;
  date: number;
  startTime: number;
  endTime: number;
  location: ILocation;
}
