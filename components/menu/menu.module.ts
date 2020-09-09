import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';
import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';

import { YueUiMenuComponent } from './components/menu.component';
import { YueUiSubMenuComponent } from './components/sub-menu.component';
import { YueUiSubMenuTitleComponent } from './components/sub-menu-title.component';
import { YueUiSubMenuInlineChildComponent } from './components/sub-menu-inline-child.component';
import { YueUiSubMenuNoneInlineChildComponent } from './components/sub-menu-none-inline-child.component';
import { YueUiMenuItemComponent } from './components/menu-item.component';
import { YueUiMenuDividerComponent } from './components/menu-divider.component';


const logger = logging.getLogger('core.button');


@NgModule({
  declarations: [
    YueUiMenuComponent,
    YueUiSubMenuComponent,
    YueUiSubMenuTitleComponent,
    YueUiMenuItemComponent,
    YueUiSubMenuInlineChildComponent,
    YueUiSubMenuNoneInlineChildComponent,
    YueUiMenuDividerComponent
  ],
  exports: [
    YueUiMenuComponent,
    YueUiSubMenuComponent,
    YueUiSubMenuTitleComponent,
    YueUiMenuItemComponent,
    YueUiSubMenuInlineChildComponent,
    YueUiSubMenuNoneInlineChildComponent,
    YueUiMenuDividerComponent
  ],
  imports: [
    CommonModule,
    OverlayModule,
    YueUiThematizationModule,
  ]
})
export class YueUiMenuModule {

  constructor() {
    logger.info(`YueUiMenuModule on version: ${VERSION.full}`);
  }

}
