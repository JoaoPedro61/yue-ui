import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';


import { VERSION } from '@JoaoPedro61/yue-ui/version';
import { YueUiIconModule } from '@JoaoPedro61/yue-ui/icon';

import {
  YueUiLayoutComponent,
  YueUiNavigationMenuComponent,
  YueUiNavigationMenuTopComponent,
  YueUiNavigationMenuBottomComponent,
  YueUiNavigationMenuSiderComponent,
} from './components';


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
