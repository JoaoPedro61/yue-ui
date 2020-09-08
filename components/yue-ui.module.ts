import { NgModule } from '@angular/core';

import { logging } from '@joaopedro61/yue-ui/core/utils';
import { VERSION } from '@joaopedro61/yue-ui/version';



const logger = logging.getLogger('core');


@NgModule({ })
export class YueUiModule {

  constructor() {
    logger.info(`YueUiCoreModule on version: ${VERSION.full}`);
    logger.warn(`This module serves only as an input resource for the compilation, please import the desired modules using your abstract paths. Ex .: import { YueUiCoreModule } from "@joaopedro61/yue-ui/core";`);
  }

}
