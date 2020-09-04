import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';
import { YueUiOverlayModule } from '@joaopedro61/yue-ui/overlay';
import { YueUiSmartRenderModule } from '@joaopedro61/yue-ui/smart-render';

import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';


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

    YueUiSmartRenderModule,
    YueUiOverlayModule,
    YueUiThematizationModule,
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
