import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VERSION } from '@JoaoPedro61/yue-ui/version';
import { logging } from '@JoaoPedro61/yue-ui/core/utils';


import { YueUiIconService } from './services/icon.service';
import { YueUiIconDirective } from './directives/icon.directive';
import { YUE_UI_ICONS } from './utils/token';

const logger = logging.getLogger('core.icon');


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
    logger.info(`YueUiIconModule on version: ${VERSION.full}`);
  }

}
