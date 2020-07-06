import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { logging } from 'yue-ui/core/utils';
import { VERSION } from 'yue-ui/version';

import { YueUiCollapseCDKComponent } from './components/collapse-cdk.component';


const logger = logging.getLogger('core.collapse');


@NgModule({
  declarations: [
    YueUiCollapseCDKComponent
  ],
  entryComponents: [
    YueUiCollapseCDKComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    YueUiCollapseCDKComponent
  ]
})
export class YueUiCollapseModule {

  constructor() {
    logger.info(`YueUiCollapseModule on version: ${VERSION.full}`);    
  }

}
