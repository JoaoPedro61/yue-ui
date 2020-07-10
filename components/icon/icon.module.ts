import { NgModule } from '@angular/core';

import { VERSION } from '@JoaoPedro61/yue-ui/version';


import { YueUiIconService } from './services/icon.service';
import { YueUiIconDirective } from './directives/icon.directive';
import { YUE_UI_ICONS } from './utils/token';
import { CommonModule } from '@angular/common';



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
  ],
  imports: [
    CommonModule
  ]
})
export class YueUiIconModule {

  constructor() {
    console.log(`YueUiIconModule on version: ${VERSION.full}`);
  }

}
