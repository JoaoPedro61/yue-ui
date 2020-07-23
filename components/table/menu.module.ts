import { NgModule } from '@angular/core';

import { VERSION } from '@JoaoPedro61/yue-ui/version';
import { logging } from '@JoaoPedro61/yue-ui/core/utils';


const logger = logging.getLogger('core.button');


@NgModule({

})
export class YueUiMenuModule {

  constructor() {
    logger.info(`YueUiMenuModule on version: ${VERSION.full}`);
  }

}
