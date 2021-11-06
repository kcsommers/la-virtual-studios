import { ICoach } from '../coaches/coach.interface';
import { IProduct } from '../common/product.interface';

export interface IClass extends IProduct {
  slots: number;
  coach: ICoach;
}
