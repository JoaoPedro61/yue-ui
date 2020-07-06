import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { logging } from 'yue-ui/core/utils';
import { VERSION } from 'yue-ui/version';
import { YueUiIconModule } from 'yue-ui/icon';

import { YueUiCollapseCDKComponent } from './components/collapse-cdk.component';
import { YueUiCollapseComponent } from './components/collapse.component';
import { YueUiCollapsePanelComponent } from './components/collapse-panel.component';
import { YueUiCollpaseHeaderComponent } from './components/collapse-header.componen';


const logger = logging.getLogger('core.collapse');


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
