import { ICoach, ILocation, IUser } from '@la/core';

export interface ILAEvent {
  attendees: IUser[];
  coaches: ICoach[];
  totalSlots: number;
  location: ILocation;
  _id?: string;
}

import mongoose, { Schema } from 'mongoose';

const laEventSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  totalSlots: Number,
  attendees: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  coaches: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Coach',
    },
  ],
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
  },
});

export const LAEventModel = mongoose.model<ILAEvent>('LAEvent', laEventSchema);
