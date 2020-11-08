import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';


import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';
import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';
import { YueUiSmartRenderModule } from '@joaopedro61/yue-ui/smart-render';
import { YueUiIconModule } from '@joaopedro61/yue-ui/icon';

import { YueUiMenuComponent } from './components/menu.component';
import { YueUiMenuSubmenuComponent } from './components/submenu.component';
import { YueUiMenuItemComponent } from './components/menu-item.component';
import { YueUiMenuGroupComponent } from './components/menu-group.component';
import { YueUiMenuDividerComponent } from './components/menu-divider.component';
import { YueUiMenuItemLinkComponent } from './components/menu-item-link.component';



const logger = logging.getLogger('menu');



@NgModule({
  declarations: [
    YueUiMenuComponent,
    YueUiMenuSubmenuComponent,
    YueUiMenuItemComponent,
    YueUiMenuGroupComponent,
    YueUiMenuDividerComponent,
    YueUiMenuItemLinkComponent,
  ],
  entryComponents: [
    YueUiMenuComponent,
    YueUiMenuSubmenuComponent,
    YueUiMenuItemComponent,
    YueUiMenuGroupComponent,
    YueUiMenuDividerComponent,
    YueUiMenuItemLinkComponent,
  ],
  exports: [
    YueUiMenuComponent,
    YueUiMenuSubmenuComponent,
    YueUiMenuItemComponent,
    YueUiMenuGroupComponent,
    YueUiMenuDividerComponent,
    YueUiMenuItemLinkComponent,
  ],
  imports: [
    CommonModule,
    OverlayModule,
    YueUiThematizationModule,
    YueUiSmartRenderModule,
    YueUiIconModule,
  ]
})
export class YueUiMenuModule {

  constructor() {
    logger.info(`YueUiMenuModule on version: ${VERSION.full}`);
  }

}
