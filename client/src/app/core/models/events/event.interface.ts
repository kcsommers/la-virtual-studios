import { ICoach } from '../coaches/coach.interface';
import { IProduct } from '../products/product.interface';

export interface IEvent extends IProduct {
  slots: number;
  coach: ICoach;
  dates: number[];
}
