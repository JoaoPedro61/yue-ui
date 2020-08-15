import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkScrollableModule } from '@angular/cdk/scrolling';

import { VERSION } from '@JoaoPedro61/yue-ui/version';
import { logging } from '@JoaoPedro61/yue-ui/core/utils';


import { YueUiTableComponent } from './components/table.component';
import { YueUiSmartRenderModule } from '@JoaoPedro61/yue-ui/smart-render';

const logger = logging.getLogger('core.button');


@NgModule({
  declarations: [
    YueUiTableComponent
  ],
  entryComponents: [
    YueUiTableComponent
  ],
  exports: [
    YueUiTableComponent
  ],
  imports: [
    CommonModule,
    YueUiSmartRenderModule,
    CdkScrollableModule,
  ]
})
export class YueUiTableModule {

  constructor() {
    logger.info(`YueUiTableModule on version: ${VERSION.full}`);
  }

}
