import { ILocation } from '@la/core';
import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    unit: String,
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    zip: {
      type: Number,
      required: true,
    },
  },
});

export const LocationModel = mongoose.model<ILocation>(
  'Location',
  locationSchema
);
