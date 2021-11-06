import { ICoach } from '../coaches/coach.interface';

export interface IClass {
  name: string;
  blurb: string;
  description: string;
  coverImage: string;
  images: string[];
  slots: number;
  coach: ICoach;
}
