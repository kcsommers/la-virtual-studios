import { ILoginCredentials } from './login-credentials.interface';

export interface ISignupCredentials extends ILoginCredentials {
  firstName: string;
  lastName: string;
}
