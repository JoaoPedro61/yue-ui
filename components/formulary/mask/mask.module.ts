import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';

import { YueUiFormularyMaskDirective } from './directives/mask.directive';

const logger = logging.getLogger('mask');


@NgModule({
  declarations: [
    YueUiFormularyMaskDirective,
  ],
  exports: [
    YueUiFormularyMaskDirective,
  ],
  providers: [
  ],
  imports: [
    CommonModule,
  ]
})
export class YueUiFormularyMaskModule {

  constructor() {
    logger.info(`YueUiFormularyMaskModule on version: ${VERSION.full}`);
  }

}
