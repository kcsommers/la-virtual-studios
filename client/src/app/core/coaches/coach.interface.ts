import { IUser } from '../users/user.interface';

export interface ICoach extends IUser {
  blurb: string;
  bio: string;
}
