import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { YueUiOverlayModule } from 'yue-ui/overlay';

import { VERSION } from 'yue-ui/version';
import { logging } from 'yue-ui/core/utils';


import { YueUiTooltipComponent } from './components/tooltip.component';
import { YueUiTooltipDirective } from './directives/tooltip.directive';

const logger = logging.getLogger('core.tooltip');


@NgModule({
  declarations: [
    YueUiTooltipComponent,
    YueUiTooltipDirective,
  ],
  entryComponents: [
    YueUiTooltipComponent,
  ],
  imports: [
    CommonModule,
    OverlayModule,

    YueUiOverlayModule
  ],
  exports: [
    YueUiTooltipComponent,
    YueUiTooltipDirective,
  ]
})
export class YueUiTooltipModule {

  constructor() {
    logger.info(`YueUiTooltipModule on version: ${VERSION.full}`);
  }

}
