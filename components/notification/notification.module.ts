import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';

import { YueUiIconModule } from '@joaopedro61/yue-ui/icon';
import { YueUiSmartRenderModule } from '@joaopedro61/yue-ui/smart-render';
import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';

import { YueUiNotificationContainerComponent } from './components/notification-container.component';
import { YueUiNotificationComponent } from './components/notification.component';
import { YueUiNotificationService } from './services/notification.service';

import {
  YUE_UI_NOTIFICATION_GLOBAL_OPTIONS,
  YUE_UI_NOTIFICATION_GLOBAL_OPTIONS_VALUE
} from './utils/token';


const logger = logging.getLogger('notification');



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
    {
      provide: YUE_UI_NOTIFICATION_GLOBAL_OPTIONS,
      useValue: YUE_UI_NOTIFICATION_GLOBAL_OPTIONS_VALUE,
    }
  ],
  imports: [
    CommonModule,
    YueUiIconModule,
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
