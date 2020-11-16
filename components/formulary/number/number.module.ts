import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';
import { YueUiSmartRenderModule } from '@joaopedro61/yue-ui/smart-render';
import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';
import { YueUiFormularyUtilsModule } from '@joaopedro61/yue-ui/formulary/utils';


import { YueUiFormularyNumberComponent } from './components/number.component';

const logger = logging.getLogger(`formulary.number`);



@NgModule({
  declarations: [
    YueUiFormularyNumberComponent,
  ],
  entryComponents: [
    YueUiFormularyNumberComponent,
  ],
  exports: [
    YueUiFormularyNumberComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    YueUiSmartRenderModule,
    YueUiFormularyUtilsModule,

    FormsModule,
    ReactiveFormsModule,
    YueUiThematizationModule,
  ]
})
export class YueUiFormularyNumberModule {

  constructor() {
    logger.info(`YueUiFormularyNumberModule on version: ${VERSION.full}`);
  }

}
