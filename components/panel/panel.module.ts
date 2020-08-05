import { NgModule } from '@angular/core';

import { VERSION } from '@JoaoPedro61/yue-ui/version';
import { logging } from '@JoaoPedro61/yue-ui/core/utils';


import { YueUiPanelComponent } from './components/panel.component';
import { YueUiPanelHeaderComponent } from './components/header.component';
import { YueUiPanelContentComponent } from './components/content.component';
import { YueUiPanelSlotComponent } from './components/slot.component';



const logger = logging.getLogger('core.popover');


@NgModule({
  declarations: [
    YueUiPanelComponent,
    YueUiPanelHeaderComponent,
    YueUiPanelContentComponent,
    YueUiPanelSlotComponent,
  ],
  entryComponents: [
    YueUiPanelComponent,
    YueUiPanelHeaderComponent,
    YueUiPanelContentComponent,
    YueUiPanelSlotComponent,
  ],
  exports: [
    YueUiPanelComponent,
    YueUiPanelHeaderComponent,
    YueUiPanelContentComponent,
    YueUiPanelSlotComponent,
  ],
  imports: [
  ],
})
export class YueUiPanelModule {

  constructor() {
    logger.info(`YueUiPanelModule on version: ${VERSION.full}`);
  }

}

