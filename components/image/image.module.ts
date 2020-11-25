import { NgModule } from '@angular/core';

import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';
import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';


import { YueUiImageComponent } from './components/image.component';
import { YueUiImageLazyLoadingDirective } from './directives/lazy-loading.directive';

const logger = logging.getLogger('image');




@NgModule({
  imports: [
    YueUiThematizationModule,
  ],
  entryComponents: [
    YueUiImageComponent
  ],
  declarations: [
    YueUiImageComponent,
    YueUiImageLazyLoadingDirective,
  ],
  exports: [
    YueUiImageComponent,
    YueUiImageLazyLoadingDirective,
  ],
})
export class YueUiImageModule {

  constructor() {
    logger.info(`YueUiImageModule on version: ${VERSION.full}`);
  }

}
