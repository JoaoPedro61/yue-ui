import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VERSION } from '@JoaoPedro61/yue-ui/version';
import { logging } from '@JoaoPedro61/yue-ui/core/utils';

import { YueUiStringTemplateRefRenderDirective } from './directives/string-template-ref-render.directive';


const logger = logging.getLogger('core.icon');


@NgModule({
  declarations: [
    YueUiStringTemplateRefRenderDirective
  ],
  exports: [
    YueUiStringTemplateRefRenderDirective
  ],
  providers: [],
  imports: [
    CommonModule
  ]
})
export class YueUiStringTemplateRefRenderModule {

  constructor() {
    logger.info(`YueUiStringTemplateRefRenderModule on version: ${VERSION.full}`);
  }

}
