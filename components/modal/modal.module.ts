import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';

import { VERSION } from '@JoaoPedro61/yue-ui/version';
import { logging } from '@JoaoPedro61/yue-ui/core/utils';
import { YueUiStringTemplateRefRenderModule } from '@JoaoPedro61/yue-ui/string-template-ref-render';
import { YueUiIconModule } from '@JoaoPedro61/yue-ui/icon';
import { YueUiButtonModule } from '@JoaoPedro61/yue-ui/button';


const logger = logging.getLogger('core.model');

import { YueUiModalService } from './services/modal.service';

import { YueUiContainerComponent } from './components/container.component';
import { YueUiContainerComfirmComponent } from './components/container-corfirm.component';

import { YueUiModalHeaderDirective } from './directives/header.component';
import { YueUiModalFooterDirective } from './directives/footer.component';



@NgModule({
  providers: [
    YueUiModalService,
  ],
  declarations: [
    YueUiContainerComponent,
    YueUiContainerComfirmComponent,

    YueUiModalHeaderDirective,
    YueUiModalFooterDirective,
  ],
  imports: [
    OverlayModule,
    PortalModule,
    CommonModule,

    YueUiStringTemplateRefRenderModule,
    YueUiIconModule,
    YueUiButtonModule,
  ],
  exports: [
    YueUiModalHeaderDirective,
    YueUiModalFooterDirective,
  ]
})
export class YueUiModalModule {

  constructor() {
    logger.info(`YueUiModalModule on version: ${VERSION.full}`);
  }

}
