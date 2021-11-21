import { IUser } from '../user.interface';

export interface ICoach extends IUser {
  blurb: string;
  bio: string;
}
