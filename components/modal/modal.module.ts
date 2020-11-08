import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';

import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';
import { YueUiSmartRenderModule } from '@joaopedro61/yue-ui/smart-render';
import { YueUiIconModule } from '@joaopedro61/yue-ui/icon';
import { YueUiButtonModule } from '@joaopedro61/yue-ui/button';

import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';

const logger = logging.getLogger('model');

import { YueUiModalService } from './services/modal.service';

import { YueUiContainerComponent } from './components/container.component';
import { YueUiContainerComfirmComponent } from './components/container-corfirm.component';

import { YueUiModalHeaderComponent } from './components/header.component';
import { YueUiModalFooterComponent } from './components/footer.component';
import { YueUiModalFooterDirective } from './directives/modal-footer.directive';



@NgModule({
  providers: [
    YueUiModalService,
  ],
  declarations: [
    YueUiContainerComponent,
    YueUiContainerComfirmComponent,

    YueUiModalHeaderComponent,
    YueUiModalFooterComponent,
    YueUiModalFooterDirective,
  ],
  imports: [
    OverlayModule,
    PortalModule,
    CommonModule,

    YueUiSmartRenderModule,
    YueUiIconModule,
    YueUiButtonModule,
    YueUiThematizationModule,
  ],
  exports: [
    YueUiModalHeaderComponent,
    YueUiModalFooterComponent,
    YueUiModalFooterDirective,
  ]
})
export class YueUiModalModule {

  constructor() {
    logger.info(`YueUiModalModule on version: ${VERSION.full}`);
  }

}
