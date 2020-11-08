import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';
import { YueUiBreadcrumbModule } from '@joaopedro61/yue-ui/breadcrumb';
import { YueUiSmartRenderModule } from '@joaopedro61/yue-ui/smart-render';

import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';

import { YueUiPanelComponent } from './components/panel.component';
import { YueUiPanelHeaderComponent } from './components/header.component';
import { YueUiPanelContentComponent } from './components/content.component';
import { YueUiPanelSlotComponent } from './components/slot.component';
import { YueUiPanelPresentComponent } from './components/present.component';



const logger = logging.getLogger('popover');


@NgModule({
  declarations: [
    YueUiPanelComponent,
    YueUiPanelHeaderComponent,
    YueUiPanelContentComponent,
    YueUiPanelSlotComponent,
    YueUiPanelPresentComponent,
  ],
  entryComponents: [
    YueUiPanelComponent,
    YueUiPanelHeaderComponent,
    YueUiPanelContentComponent,
    YueUiPanelSlotComponent,
    YueUiPanelPresentComponent,
  ],
  exports: [
    YueUiPanelComponent,
    YueUiPanelHeaderComponent,
    YueUiPanelContentComponent,
    YueUiPanelSlotComponent,
    YueUiPanelPresentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    YueUiBreadcrumbModule,
    YueUiSmartRenderModule,
    YueUiThematizationModule,
  ],
})
export class YueUiPanelModule {

  constructor() {
    logger.info(`YueUiPanelModule on version: ${VERSION.full}`);
  }

}

