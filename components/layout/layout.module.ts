import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';


import { logging } from '@joaopedro61/yue-ui/core/utils';
import { VERSION } from '@joaopedro61/yue-ui/version';
import { YueUiIconModule } from '@joaopedro61/yue-ui/icon';
import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';

import {
  YueUiLayoutComponent,
  YueUiNavigationMenuComponent,
  YueUiNavigationMenuTopComponent,
  YueUiNavigationMenuBottomComponent,
  YueUiNavigationMenuSiderComponent,
} from './components';


const logger = logging.getLogger('layout');

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,

    YueUiIconModule,
    YueUiThematizationModule,
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
    logger.info(`YueUiLayoutModule on version: ${VERSION.full}`);
  }

}
