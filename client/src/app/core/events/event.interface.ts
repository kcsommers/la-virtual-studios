import { ICoach } from '../coaches/coach.interface';
import { IProduct } from '../common/product.interface';

export interface IEvent extends IProduct {
  slots: number;
  coach: ICoach;
}
