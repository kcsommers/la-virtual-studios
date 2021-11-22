import { IUser } from '@la/core';
import { model, Schema } from 'mongoose';

const userSchema = new Schema({
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
});

export const UserModel = model<IUser>('User', userSchema);
