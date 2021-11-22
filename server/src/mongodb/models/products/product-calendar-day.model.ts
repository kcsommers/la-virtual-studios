import { IProductCalendarDay } from '@la/core';
import { model, Schema } from 'mongoose';

const productCalendarDaySchema = new Schema({
  _id: Schema.Types.ObjectId,
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: 'LAEvent',
    },
  ],
});

export const ProductCalendarDayModel = model<IProductCalendarDay>(
  'ProductCalendarDay',
  productCalendarDaySchema
);
