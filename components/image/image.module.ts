import { NgModule } from '@angular/core';

import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';
import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';


import { YueUiImageComponent } from './components/image.component';


const logger = logging.getLogger('image');




@NgModule({
  imports: [
    YueUiThematizationModule,
  ],
  entryComponents: [
    YueUiImageComponent
  ],
  declarations: [
    YueUiImageComponent
  ],
  exports: [
    YueUiImageComponent
  ],
})
export class YueUiImageModule {

  constructor() {
    logger.info(`YueUiImageModule on version: ${VERSION.full}`);
  }

}
