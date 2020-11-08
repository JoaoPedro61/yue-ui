import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';

import { YueUiTabsComponent } from './components/tabs.component';
import { YueUiTabComponent } from './components/tab.component';

const logger = logging.getLogger('tabs');



@NgModule({
  declarations: [
    YueUiTabsComponent,
    YueUiTabComponent,
  ],
  entryComponents: [
    YueUiTabsComponent,
    YueUiTabComponent,
  ],
  exports: [
    YueUiTabsComponent,
    YueUiTabComponent,
  ],
  imports: [
    CommonModule
  ],
  providers: []
})
export class YueUiTabsModule {

  constructor() {
    logger.info(`YueUiTabsModule on version: ${VERSION.full}`);
  }

}
