import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { YueUiButtonModule } from '@joaopedro61/yue-ui/button';
import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';
import { YueUiSmartRenderModule } from '@joaopedro61/yue-ui/smart-render';
import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';
import { YueUiIconModule } from '@joaopedro61/yue-ui/icon';

import { YueUiGridModule } from '@joaopedro61/yue-ui/grid';

import { YueUiFormularyNumberModule } from '@joaopedro61/yue-ui/formulary/number';
import { YueUiFormularySelectModule } from '@joaopedro61/yue-ui/formulary/select';
import { YueUiFormularySwitchModule } from '@joaopedro61/yue-ui/formulary/switch';
import { YueUiFormularyTextModule } from '@joaopedro61/yue-ui/formulary/text';
import { YueUiFormularyPasswordModule } from '@joaopedro61/yue-ui/formulary/password';
import { YueUiFormularyTextareaModule } from '@joaopedro61/yue-ui/formulary/textarea';

import { FormularyComponent } from './builder.component';
import { WrapperComponent } from './extends/wrapper.component';

import { SwitchAbstractionComponent } from './abstract/switch.abstraction.component';
import { TextAbstractionComponent } from './abstract/text.abstraction.component';
import { NumberAbstractionComponent } from './abstract/number.abstraction.component';
import { SelectAbstractionComponent } from './abstract/select.abstraction.component';
import { TouchableAbstractionComponent } from './abstract/touchable.abstraction.component';


const logger = logging.getLogger('core.formulary.builder');



@NgModule({
  declarations: [
    FormularyComponent,

    WrapperComponent,

    SwitchAbstractionComponent,
    TextAbstractionComponent,
    NumberAbstractionComponent,
    SelectAbstractionComponent,
    TouchableAbstractionComponent,
  ],
  entryComponents: [
    FormularyComponent,

    WrapperComponent,

    SwitchAbstractionComponent,
    TextAbstractionComponent,
    NumberAbstractionComponent,
    SelectAbstractionComponent,
    TouchableAbstractionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    YueUiFormularyNumberModule,
    YueUiFormularySelectModule,
    YueUiFormularySwitchModule,
    YueUiFormularyTextModule,
    YueUiFormularyPasswordModule,
    YueUiFormularyTextareaModule,

    YueUiGridModule,
    YueUiSmartRenderModule,
    YueUiButtonModule,
    YueUiThematizationModule,
    YueUiIconModule,
  ],
  providers: [ ],
  exports: [
    FormularyComponent,

    WrapperComponent,
  ]
})
export class YueUiFormularyBuilderModule {

  constructor() {
    logger.info(`YueUiFormularyBuilderModule on version: ${VERSION.full}`);
  }

}

