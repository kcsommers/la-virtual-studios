import { Injectable } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
  faCamera,
  faCameraRetro,
  faFilm,
  faQuestion,
  faStar,
  faVideo,
  faUser,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';

@Injectable()
export class IconService {
  private _iconMap = new Map([
    ['faQuestion', faQuestion],
    ['faCamera', faCamera],
    ['faCameraRetro', faCameraRetro],
    ['faVideo', faVideo],
    ['faFilm', faFilm],
    ['faStar', faStar],
    ['faUser', faUser],
    ['faAngleDown', faAngleDown],
    ['faFacebook', faFacebook],
    ['faInstagram', faInstagram],
  ]);

  public getIcon(_iconName: string): IconDefinition {
    const _icon: IconDefinition = this._iconMap.get(_iconName) || faQuestion;
    return _icon;
  }
}
