import { ICalendarDay, IProduct } from '@la/core';

export interface IProductCalendarDay extends ICalendarDay {
  product: IProduct;
  _id?: string;
}
