import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { logging } from '@joaopedro61/yue-ui/core/utils';
import { VERSION } from '@joaopedro61/yue-ui/version';
import { YueUiIconModule } from '@joaopedro61/yue-ui/icon';
import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';

import { YueUiCollapseCDKComponent } from './components/collapse-cdk.component';
import { YueUiCollapseComponent } from './components/collapse.component';
import { YueUiCollapsePanelComponent } from './components/collapse-panel.component';
import { YueUiCollpaseHeaderComponent } from './components/collapse-header.componen';


const logger = logging.getLogger('collapse');


@NgModule({
  declarations: [
    YueUiCollapseCDKComponent,
    YueUiCollapseComponent,
    YueUiCollapsePanelComponent,
    YueUiCollpaseHeaderComponent,
  ],
  entryComponents: [
    YueUiCollapseCDKComponent,
    YueUiCollapseComponent,
    YueUiCollapsePanelComponent,
    YueUiCollpaseHeaderComponent,
  ],
  imports: [
    CommonModule,
    YueUiIconModule,
    YueUiThematizationModule,
  ],
  exports: [
    YueUiCollapseCDKComponent,
    YueUiCollapseComponent,
    YueUiCollapsePanelComponent,
    YueUiCollpaseHeaderComponent,
  ]
})
export class YueUiCollapseModule {

  constructor() {
    logger.info(`YueUiCollapseModule on version: ${VERSION.full}`);    
  }

}
