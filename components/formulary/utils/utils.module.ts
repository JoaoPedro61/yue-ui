import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';
import { YueUiSmartRenderModule } from '@joaopedro61/yue-ui/smart-render';
import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';
import { YueUiIconModule } from '@joaopedro61/yue-ui/icon';

import { YueUiFormularyLabelComponent } from './components/label.component';
import { YueUiFormularyDescriptorComponent } from './components/descriptor.component';
import { YueUiFormularyClearComponent } from './components/clear.component';
import { YueUiFormularyFieldWrapperComponent } from './components/field-wrapper.component';
import { YueUiFormularyUtilsValidationsService } from './services/validations.service';

const logger = logging.getLogger(`core.formulary.utils`);



@NgModule({
  declarations: [
    YueUiFormularyLabelComponent,
    YueUiFormularyDescriptorComponent,
    YueUiFormularyClearComponent,
    YueUiFormularyFieldWrapperComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    YueUiSmartRenderModule,
    YueUiThematizationModule,
    YueUiIconModule,
  ],
  providers: [
    YueUiFormularyUtilsValidationsService,
  ],
  exports: [
    YueUiFormularyLabelComponent,
    YueUiFormularyDescriptorComponent,
    YueUiFormularyClearComponent,
    YueUiFormularyFieldWrapperComponent,
  ]
})
export class YueUiFormularyUtilsModule {

  constructor() {
    logger.info(`YueUiFormularyUtilsModule on version: ${VERSION.full}`);
  }

}
