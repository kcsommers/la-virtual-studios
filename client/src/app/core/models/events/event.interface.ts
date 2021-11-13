import { IUser } from '@la/core';
import { ICoach } from '../coaches/coach.interface';
import { IProduct } from '../products/product.interface';

export interface IEvent extends IProduct {
  slots: number;
  attendees: IUser[];
  coach: ICoach;
  dates: number[];
  startTime: number;
  endTime: number;
}
