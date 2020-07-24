import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { YueUiOverlayModule } from '@JoaoPedro61/yue-ui/overlay';
import { YueUiSmartRenderModule } from '@JoaoPedro61/yue-ui/smart-render';

import { VERSION } from '@JoaoPedro61/yue-ui/version';
import { logging } from '@JoaoPedro61/yue-ui/core/utils';


import { YueUiPopoverComponent } from './components/popover.component';
import { YueUiPopoverDirective } from './directives/popover.directive';

const logger = logging.getLogger('core.popover');


@NgModule({
  declarations: [
    YueUiPopoverComponent,
    YueUiPopoverDirective,
  ],
  entryComponents: [
    YueUiPopoverComponent,
  ],
  imports: [
    CommonModule,
    OverlayModule,

    YueUiSmartRenderModule,
    YueUiOverlayModule
  ],
  exports: [
    YueUiPopoverComponent,
    YueUiPopoverDirective,
  ]
})
export class YueUiPopoverModule {

  constructor() {
    logger.info(`YueUiPopoverModule on version: ${VERSION.full}`);
  }

}
