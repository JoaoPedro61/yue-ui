import { NgModule } from '@angular/core';

import { VERSION } from '@JoaoPedro61/yue-ui/version';
import { logging } from '@JoaoPedro61/yue-ui/core/utils';
import { YueUiCustomInputsModule } from '@JoaoPedro61/yue-ui/formulary/custom';
import { YueUiBuilderFormularyModule } from '@JoaoPedro61/yue-ui/formulary/builder';


const logger = logging.getLogger('core.formulary');

@NgModule({
  exports: [
    YueUiCustomInputsModule,
    YueUiBuilderFormularyModule,
  ]
})
export class YueUiFormularyModule {

  constructor() {
    logger.info(`YueUiFormularyModule on version: ${VERSION.full}`);
  }

}
