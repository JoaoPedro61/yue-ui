import { Inject, Injectable, Self } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';

import { YueUiIconService } from './icon.service';

import { YUE_UI_ICONS_PATCH } from './../utils/token';



@Injectable()
export class YueUiIconPatchService {

  public patched = false;

  constructor(@Self() @Inject(YUE_UI_ICONS_PATCH) private extraIcons: IconDefinition[], private rootIconService: YueUiIconService) {}

  public doPatch(): void {
    if (this.patched) {
      return;
    }

    this.extraIcons.forEach(iconDefinition => this.rootIconService.addIcon(iconDefinition));
    this.patched = true;
  }

}
