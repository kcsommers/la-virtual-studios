import { ILoginCredentials } from '@la/core';

export interface ISignupCredentials extends ILoginCredentials {
  firstName: string;
  lastName: string;
}
