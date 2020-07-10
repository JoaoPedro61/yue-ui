import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YueUiIconModule } from '@JoaoPedro61/yue-ui/icon';
import { VERSION } from '@JoaoPedro61/yue-ui/version';
import { logging } from '@JoaoPedro61/yue-ui/core/utils';

import { YueUiButtonComponent } from './components/button.component';
import { YueUiButtonGroupComponent } from './components/button-group.component';


const logger = logging.getLogger('core.button');


@NgModule({
  declarations: [
    YueUiButtonComponent,
    YueUiButtonGroupComponent,
  ],
  entryComponents: [
    YueUiButtonComponent,
    YueUiButtonGroupComponent,
  ],
  imports: [
    CommonModule,
    YueUiIconModule
  ],
  exports: [
    YueUiButtonComponent,
    YueUiButtonGroupComponent,
  ]
})
export class YueUiButtonModule {

  constructor() {
    logger.info(`YueUiI18nModule on version: ${VERSION.full}`);
  }

}
