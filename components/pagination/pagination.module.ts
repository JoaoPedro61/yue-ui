import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';

import { YueUiI18nModule, YueUiI18nService } from '@joaopedro61/yue-ui/i18n';
import { YueUiFormularySelectModule } from '@joaopedro61/yue-ui/formulary/select';

import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';

import { YueUiPaginationComponent } from './components/pagination.component';

const logger = logging.getLogger('core.smart-render');



@NgModule({
  declarations: [
    YueUiPaginationComponent,
  ],
  entryComponents: [
    YueUiPaginationComponent,
  ],
  imports: [
    CommonModule,
    YueUiFormularySelectModule,
    YueUiI18nModule,
    YueUiThematizationModule,
  ],
  exports: [
    YueUiPaginationComponent,
  ]
})
export class YueUiPaginationModule {

  constructor(private readonly i18n: YueUiI18nService) {
    logger.info(`YueUiPaginationModule on version: ${VERSION.full}`);

    this.i18n
      .extendsComponentsDictionary({
        pagination: {
          total: `Total`,
          itemPerPage: `{count} / page`
        }
      });
  }

}
