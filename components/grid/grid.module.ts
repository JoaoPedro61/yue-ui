import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformModule } from '@angular/cdk/platform';

import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';

import { YueUiGridDirective } from './directives/grid.directive';
import { YueUiColDirective } from './directives/col.directive';


const logger = logging.getLogger('core.grid');



@NgModule({
  declarations: [
    YueUiGridDirective,
    YueUiColDirective,
  ],
  exports: [
    YueUiGridDirective,
    YueUiColDirective,
  ],
  imports: [
    CommonModule,
    PlatformModule,
  ]
})
export class YueUiGridModule {
  
  constructor() {
    logger.info(`YueUiGridModule on version: ${VERSION.full}`);
  }

}
