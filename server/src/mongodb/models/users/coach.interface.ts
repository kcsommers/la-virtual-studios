import { IUser } from '@la/core';
import { model, Schema } from 'mongoose';

const coachSchema = new Schema({
  _id: Schema.Types.ObjectId,
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  blurb: String,
  bio: String,
});

export const CoachModel = model<IUser>('Coach', coachSchema);
