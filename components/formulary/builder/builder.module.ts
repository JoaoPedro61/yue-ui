import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';

import { YueUiButtonModule } from '@JoaoPedro61/yue-ui/button';
import { VERSION } from '@JoaoPedro61/yue-ui/version';
import { logging } from '@JoaoPedro61/yue-ui/core/utils';
import { YueUiStringTemplateRefRenderModule } from '@JoaoPedro61/yue-ui/string-template-ref-render';
import { YueUiCustomInputsModule } from '@JoaoPedro61/yue-ui/formulary/custom';

import { FormularyComponent } from './builder.component';
import { LabelComponent } from './extends/label.component';
import { WrapperComponent } from './extends/wrapper.component';
import { DescriptorComponent } from './extends/descriptor.component';

/* TESTS */
import { NoopComponent } from './abstract/noop.component';



const logger = logging.getLogger('core.formulary.builder');



@NgModule({
  declarations: [
    FormularyComponent,

    LabelComponent,
    WrapperComponent,
    DescriptorComponent,
    
    NoopComponent,
  ],
  entryComponents: [
    FormularyComponent,

    LabelComponent,
    WrapperComponent,
    DescriptorComponent,

    NoopComponent,
  ],
  imports: [
    CommonModule,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule,
    YueUiCustomInputsModule,

    YueUiStringTemplateRefRenderModule,
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

