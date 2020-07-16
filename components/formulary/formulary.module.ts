import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';

import { YueUiButtonModule } from '@JoaoPedro61/yue-ui/button';
import { VERSION } from '@JoaoPedro61/yue-ui/version';
import { logging } from '@JoaoPedro61/yue-ui/core/utils';

import { WrapperComponent } from './extends/wrapper.component';

import { FormularyComponent } from './formulary.component';



const logger = logging.getLogger('core.formulary');

@NgModule({
  declarations: [
    FormularyComponent,

    WrapperComponent,
  ],
  entryComponents: [
    FormularyComponent,

    WrapperComponent,
  ],
  imports: [
    CommonModule,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule,

    YueUiButtonModule
  ],
  providers: [ ],
  exports: [
    FormularyComponent
  ]
})
export class YueUiFormularyModule {

  constructor() {
    logger.info(`YueUiFormularyModule on version: ${VERSION.full}`);
  }

}
