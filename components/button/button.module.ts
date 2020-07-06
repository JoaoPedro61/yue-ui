import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YueUiIconModule } from 'yue-ui/icon';
import { VERSION } from 'yue-ui/version';
import { logging } from 'yue-ui/core/utils';

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
