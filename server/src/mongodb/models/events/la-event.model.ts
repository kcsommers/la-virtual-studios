import { ICoach, ILocation, IUser } from '@la/core';

export interface ILAEvent {
  startTime: number;
  endTime: number;
  attendees: IUser[];
  coaches: ICoach[];
  totalSlots: number;
  location: ILocation;
  _id?: string;
}

import mongoose, { Schema } from 'mongoose';

const laEventSchema = new mongoose.Schema({
  totalSlots: Number,
  startTime: Number,
  endTime: Number,
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
