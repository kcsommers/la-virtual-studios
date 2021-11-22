import { ColorType } from '../../common';

export interface IAlertConfig {
  message: string;
  details?: string;
  icon?: string;
  colorType?: ColorType;
}
