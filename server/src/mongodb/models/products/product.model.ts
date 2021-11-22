import { IProduct } from '@la/core';
import { model, Schema } from 'mongoose';

const productSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  blurb: String,
  description: String,
  coverImage: String,
  images: [String],
  price: {
    type: Number,
    required: true,
  },
  route: String,
});

export const ProductModel = model<IProduct>('Product', productSchema);
