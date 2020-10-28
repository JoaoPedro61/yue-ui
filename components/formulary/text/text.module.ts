import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';
import { YueUiSmartRenderModule } from '@joaopedro61/yue-ui/smart-render';
import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';
import { YueUiFormularyMaskModule } from '@joaopedro61/yue-ui/formulary/mask';
import { YueUiFormularyUtilsModule } from '@joaopedro61/yue-ui/formulary/utils';

import { YueUiFormularyTextComponent } from './components/text.component';

const logger = logging.getLogger(`core.formulary.text`);



@NgModule({
  declarations: [
    YueUiFormularyTextComponent,
  ],
  entryComponents: [
    YueUiFormularyTextComponent,
  ],
  exports: [
    YueUiFormularyTextComponent,
    YueUiFormularyUtilsModule,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    YueUiSmartRenderModule,
    YueUiFormularyMaskModule,
    YueUiFormularyUtilsModule,

    FormsModule,
    ReactiveFormsModule,
    YueUiThematizationModule,
  ]
})
export class YueUiFormularyTextModule {

  constructor() {
    logger.info(`YueUiFormularyTextModule on version: ${VERSION.full}`);
  }

}
