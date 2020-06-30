import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';


import { VERSION } from 'yue-ui/version';
import { YueUiIconModule } from 'yue-ui/icon';

import { YueUiLayoutComponent } from './components/layout.component';
import { YueUiNavigationMenuComponent } from './components/navigation-menu.component';
import { YueUiNavigationMenuTopComponent } from './components/navigation-menu-top.component';
import { YueUiNavigationMenuBottomComponent } from './components/navigation-menu-bottom.component';
import { YueUiNavigationMenuSiderComponent } from './components/navigation-menu-sider.component';


@NgModule({
  imports: [
    CommonModule,

    LayoutModule,

    YueUiIconModule
  ],
  declarations: [
    YueUiLayoutComponent,
    YueUiNavigationMenuComponent,
    YueUiNavigationMenuTopComponent,
    YueUiNavigationMenuBottomComponent,
    YueUiNavigationMenuSiderComponent,
  ],
  exports: [
    YueUiLayoutComponent,
    YueUiNavigationMenuComponent,
    YueUiNavigationMenuTopComponent,
    YueUiNavigationMenuBottomComponent,
    YueUiNavigationMenuSiderComponent
  ]
})
export class YueUiLayoutModule {

  constructor() {
    console.log(`YueUiLayoutModule on version: ${VERSION.full}`);
  }

}
