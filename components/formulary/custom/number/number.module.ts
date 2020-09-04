import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';

import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';
import { YueUiSmartRenderModule } from '@joaopedro61/yue-ui/smart-render';
import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';

import { YueUiNumberComponent } from './components/number.component';

const logger = logging.getLogger(`core.formulary.custom.number`);



@NgModule({
  declarations: [
    YueUiNumberComponent,
  ],
  entryComponents: [
    YueUiNumberComponent,
  ],
  exports: [
    YueUiNumberComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    YueUiSmartRenderModule,
    TextMaskModule,

    FormsModule,
    ReactiveFormsModule,
    YueUiThematizationModule,
  ]
})
export class YueUiCustomNumberModule {

  constructor() {
    logger.info(`YueUiCustomNumberModule on version: ${VERSION.full}`);
  }

}
