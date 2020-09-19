import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';

import { YueUiSmartRenderModule } from '@joaopedro61/yue-ui/smart-render';
import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';

import { YueUiNotificationContainerComponent } from './components/notification-container.component';
import { YueUiNotificationComponent } from './components/notification.component';
import { YueUiNotificationService } from './services/notification.service';



const logger = logging.getLogger('core.notification');



@NgModule({
  declarations: [
    YueUiNotificationComponent,
    YueUiNotificationContainerComponent,
  ],
  entryComponents: [
    YueUiNotificationComponent,
    YueUiNotificationContainerComponent,
  ],
  providers: [
    YueUiNotificationService,
  ],
  imports: [
    CommonModule,
    YueUiThematizationModule,
    YueUiSmartRenderModule,
    OverlayModule,
  ],
  exports: [
    YueUiNotificationComponent,
    YueUiNotificationContainerComponent,
  ]
})
export class YueUiNotificationModule {

  constructor() {
    logger.info(`YueUiNotificationModule on version: ${VERSION.full}`);
  }

}
