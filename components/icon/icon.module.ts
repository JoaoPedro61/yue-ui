import { NgModule } from '@angular/core';

import { VERSION } from 'yue-ui/version';


import { YueUiIconService } from './services/icon.service';
import { YueUiIconDirective } from './directives/icon.directive';
import { YUE_UI_ICONS } from './utils/token';



@NgModule({
  declarations: [
    YueUiIconDirective
  ],
  exports: [
    YueUiIconDirective
  ],
  providers: [
    {
      provide: YUE_UI_ICONS,
      useValue: []
    },

    YueUiIconService
  ]
})
export class YueUiIconModule {

  constructor() {
    console.log(`YueUiIconModule on version: ${VERSION.full}`);
  }

}