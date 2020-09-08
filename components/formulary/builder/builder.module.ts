import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';

import { YueUiButtonModule } from '@joaopedro61/yue-ui/button';
import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';
import { YueUiSmartRenderModule } from '@joaopedro61/yue-ui/smart-render';
import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';

import { YueUiCustomColorpickerModule } from '@joaopedro61/yue-ui/formulary/custom/colorpicker';
import { YueUiCustomDatepickerModule } from '@joaopedro61/yue-ui/formulary/custom/datepicker';
import { YueUiCustomNumberModule } from '@joaopedro61/yue-ui/formulary/custom/number';
import { YueUiCustomSelectModule } from '@joaopedro61/yue-ui/formulary/custom/select';
import { YueUiCustomSwitchModule } from '@joaopedro61/yue-ui/formulary/custom/switch';
import { YueUiCustomTextModule } from '@joaopedro61/yue-ui/formulary/custom/text';
import { YueUiCustomPasswordModule } from '@joaopedro61/yue-ui/formulary/custom/password';
import { YueUiCustomTextareaModule } from '@joaopedro61/yue-ui/formulary/custom/textarea';

import { FormularyComponent } from './builder.component';
import { LabelComponent } from './extends/label.component';
import { WrapperComponent } from './extends/wrapper.component';
import { DescriptorComponent } from './extends/descriptor.component';

import { SwitchAbstractionComponent } from './abstract/switch.abstraction.component';
import { TextAbstractionComponent } from './abstract/text.abstraction.component';
import { NumberAbstractionComponent } from './abstract/number.abstraction.component';
import { SelectAbstractionComponent } from './abstract/select.abstraction.component';
import { TouchableAbstractionComponent } from './abstract/touchable.abstraction.component';


const logger = logging.getLogger('core.formulary.builder');



@NgModule({
  declarations: [
    FormularyComponent,

    LabelComponent,
    WrapperComponent,
    DescriptorComponent,

    SwitchAbstractionComponent,
    TextAbstractionComponent,
    NumberAbstractionComponent,
    SelectAbstractionComponent,
    TouchableAbstractionComponent,
  ],
  entryComponents: [
    FormularyComponent,

    LabelComponent,
    WrapperComponent,
    DescriptorComponent,

    SwitchAbstractionComponent,
    TextAbstractionComponent,
    NumberAbstractionComponent,
    SelectAbstractionComponent,
    TouchableAbstractionComponent,
  ],
  imports: [
    CommonModule,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule,

    YueUiCustomColorpickerModule,
    YueUiCustomDatepickerModule,
    YueUiCustomNumberModule,
    YueUiCustomSelectModule,
    YueUiCustomSwitchModule,
    YueUiCustomTextModule,
    YueUiCustomPasswordModule,
    YueUiCustomTextareaModule,

    YueUiSmartRenderModule,
    YueUiButtonModule,
    YueUiThematizationModule,
  ],
  providers: [ ],
  exports: [
    FormularyComponent,

    LabelComponent,
    WrapperComponent,
    DescriptorComponent,
  ]
})
export class YueUiBuilderFormularyModule {

  constructor() {
    logger.info(`YueUiBuilderFormularyModule on version: ${VERSION.full}`);
  }

}

