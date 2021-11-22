import { ILAEvent } from '../events/la-event.interface';
import { IProduct } from './product.interface';

export interface IProductCalendarDay {
  product: IProduct;
  date: number;
  events: ILAEvent[];
  dateModel?: Date;
  day?: number;
  month?: number;
  year?: number;
  isToday?: boolean;
  isPast?: boolean;
  _id?: string;
}
