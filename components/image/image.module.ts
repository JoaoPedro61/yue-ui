import { NgModule } from '@angular/core';

import { VERSION } from '@JoaoPedro61/yue-ui/version';
import { logging } from '@JoaoPedro61/yue-ui/core/utils';


import { YueUiImageComponent } from './components/image.component';


const logger = logging.getLogger('core.image');




@NgModule({
  imports: [ ],
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
