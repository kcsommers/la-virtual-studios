import { IAddress } from './address.interface';

export interface ILocation {
  name: string;
  address: IAddress;
  _id?: string;
}
