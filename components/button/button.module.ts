import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YueUiIconModule } from '@joaopedro61/yue-ui/icon';
import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';
import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';

import { YueUiButtonComponent } from './components/button.component';
import { YueUiButtonGroupComponent } from './components/button-group.component';


const logger = logging.getLogger('button');


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
    YueUiIconModule,
    YueUiThematizationModule,
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
