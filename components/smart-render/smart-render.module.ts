import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';

import { YueUiSmartRenderComponent } from './components/smart-render.component';
import { YueUiStringTemplateRefRenderDirective } from './directives/string-template-ref-render.directive';


const logger = logging.getLogger('smart-render');


@NgModule({
  declarations: [
    YueUiSmartRenderComponent,
    YueUiStringTemplateRefRenderDirective
  ],
  exports: [
    YueUiSmartRenderComponent,
    YueUiStringTemplateRefRenderDirective
  ],
  providers: [],
  imports: [
    CommonModule
  ]
})
export class YueUiSmartRenderModule {

  constructor() {
    logger.info(`YueUiSmartRenderModule on version: ${VERSION.full}`);
  }

}
