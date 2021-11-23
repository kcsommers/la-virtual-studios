import { ILAEvent } from '../events/la-event.interface';
import { IProduct } from './product.interface';

export interface IProductCalendarDay {
  product: IProduct | string;
  date: number;
  events: ILAEvent[] | string[];
}
