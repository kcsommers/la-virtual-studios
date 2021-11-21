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
