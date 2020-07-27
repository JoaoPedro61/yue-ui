import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';

import { YueUiButtonModule } from '@JoaoPedro61/yue-ui/button';
import { VERSION } from '@JoaoPedro61/yue-ui/version';
import { logging } from '@JoaoPedro61/yue-ui/core/utils';
import { YueUiSmartRenderModule } from '@JoaoPedro61/yue-ui/smart-render';
import { YueUiCustomInputsModule } from '@JoaoPedro61/yue-ui/formulary/custom';

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
    YueUiCustomInputsModule,

    YueUiSmartRenderModule,
    YueUiButtonModule
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

