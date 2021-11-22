import { IPendingOrder } from '@la/core';
import { Schema, model } from 'mongoose';

const pendingOrderSchema = new Schema({
  _id: Schema.Types.ObjectId,
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'LAEvent',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const PendingOrderModel = model<IPendingOrder>(
  'PendingOrder',
  pendingOrderSchema
);
