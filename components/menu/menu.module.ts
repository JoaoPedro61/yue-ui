import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';


import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';
import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';
import { YueUiSmartRenderModule } from '@joaopedro61/yue-ui/smart-render';
import { YueUiIconModule } from '@joaopedro61/yue-ui/icon';
import { YueUiOverlayModule } from '@joaopedro61/yue-ui/overlay';

import { YueUiMenuComponent } from './components/menu.component';
import { YueUiMenuSubmenuComponent } from './components/submenu.component';
import { YueUiMenuItemComponent } from './components/menu-item.component';
import { YueUiMenuGroupComponent } from './components/menu-group.component';
import { YueUiMenuDividerComponent } from './components/menu-divider.component';
import { YueUiSubmenuInlineChildComponent } from './components/submenu-inline-child.component';
import { YueUiSubmenuNoneInlineChildComponent } from './components/submenu-non-inline-child.component';
import { YueUiSubMenuTitleComponent } from './components/submenu-title.component';



const logger = logging.getLogger('menu');



@NgModule({
  declarations: [
    YueUiMenuComponent,
    YueUiMenuSubmenuComponent,
    YueUiMenuItemComponent,
    YueUiMenuGroupComponent,
    YueUiMenuDividerComponent,
    YueUiSubmenuInlineChildComponent,
    YueUiSubmenuNoneInlineChildComponent,
    YueUiSubMenuTitleComponent,
  ],
  entryComponents: [
    YueUiMenuComponent,
    YueUiMenuSubmenuComponent,
    YueUiMenuItemComponent,
    YueUiMenuGroupComponent,
    YueUiMenuDividerComponent,
    YueUiSubmenuInlineChildComponent,
    YueUiSubmenuNoneInlineChildComponent,
    YueUiSubMenuTitleComponent,
  ],
  exports: [
    YueUiMenuComponent,
    YueUiMenuSubmenuComponent,
    YueUiMenuItemComponent,
    YueUiMenuGroupComponent,
    YueUiMenuDividerComponent,
  ],
  imports: [
    CommonModule,
    OverlayModule,
    YueUiThematizationModule,
    YueUiSmartRenderModule,
    YueUiIconModule,
    YueUiOverlayModule,
    OverlayModule,
  ]
})
export class YueUiMenuModule {

  constructor() {
    logger.info(`YueUiMenuModule on version: ${VERSION.full}`);
  }

}
