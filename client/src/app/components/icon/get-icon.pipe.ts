import { Pipe, PipeTransform } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { IconService } from './icon.service';

@Pipe({
  name: 'getIcon',
  pure: true,
})
export class GetIconPipe implements PipeTransform {
  constructor(private _iconService: IconService) {}

  public transform(_iconName: string): IconDefinition {
    return this._iconService.getIcon(_iconName);
  }
}
