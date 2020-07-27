import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VERSION } from '@JoaoPedro61/yue-ui/version';
import { logging } from '@JoaoPedro61/yue-ui/core/utils';

import { YueUiPopoverModule } from '@JoaoPedro61/yue-ui/popover';

import { YueUiMenuComponent } from './components/menu.component';
import { YueUiSubMenuComponent } from './components/sub-menu.component';

import { YueUiMenuItemDirective } from './directives/menu-item.directive';

const logger = logging.getLogger('core.button');


@NgModule({
  declarations: [
    YueUiMenuComponent,
    YueUiSubMenuComponent,
    YueUiMenuItemDirective,
  ],
  exports: [
    YueUiMenuComponent,
    YueUiSubMenuComponent,
    YueUiMenuItemDirective,
  ],
  imports: [
    CommonModule,
    YueUiPopoverModule,
  ]
})
export class YueUiMenuModule {

  constructor() {
    logger.info(`YueUiMenuModule on version: ${VERSION.full}`);
  }

}
