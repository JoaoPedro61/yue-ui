import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';
import { YueUiSmartRenderModule } from '@joaopedro61/yue-ui/smart-render';
import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';

import { YueUiBreadcrumbComponent } from './components/breadcrumb.component';
import { YueUiBreadcrumbItemComponent } from './components/breadcrumb-item.component';

const logger = logging.getLogger('breadcrumb');



@NgModule({
  declarations: [
    YueUiBreadcrumbComponent,
    YueUiBreadcrumbItemComponent,
  ],
  entryComponents: [
    YueUiBreadcrumbComponent,
    YueUiBreadcrumbItemComponent,
  ],
  imports: [
    CommonModule,
    YueUiSmartRenderModule,
    RouterModule,
    YueUiThematizationModule,
  ],
  exports: [
    YueUiBreadcrumbComponent,
    YueUiBreadcrumbItemComponent,
  ]
})
export class YueUiBreadcrumbModule {

  constructor() {
    logger.info(`YueUiBreadcrumbModule on version: ${VERSION.full}`);
  }

}

