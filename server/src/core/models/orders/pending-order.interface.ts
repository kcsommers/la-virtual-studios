import { IUser } from '@la/core';
import { ILAEvent } from '../events/la-event.interface';
import { IProduct } from '../products/product.interface';

export interface IPendingOrder {
  product: IProduct;
  event: ILAEvent;
  user: IUser;
}
