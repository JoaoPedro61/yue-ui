import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';


import { VERSION } from '@JoaoPedro61/yue-ui/version';
import { logging } from '@JoaoPedro61/yue-ui/core/utils';


import { YueUiOverlayDirective } from './directives/overlay.directive';

const logger = logging.getLogger('core.overlay');


@NgModule({
  declarations: [
    YueUiOverlayDirective,
  ],
  entryComponents: [ ],
  imports: [
    OverlayModule,
  ],
  exports: [
    YueUiOverlayDirective,
  ]
})
export class YueUiOverlayModule {

  constructor() {
    logger.info(`YueUiOverlayModule on version: ${VERSION.full}`);
  }

}
