import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkScrollableModule } from '@angular/cdk/scrolling';

import { VERSION } from '@JoaoPedro61/yue-ui/version';
import { logging } from '@JoaoPedro61/yue-ui/core/utils';
import { YueUiSmartRenderModule } from '@JoaoPedro61/yue-ui/smart-render';
import { YueUiPaginationModule } from '@JoaoPedro61/yue-ui/pagination';
import { YueUiI18nModule, YueUiI18nService } from '@JoaoPedro61/yue-ui/i18n';


import { YueUiTableComponent } from './components/table.component';

const logger = logging.getLogger('core.button');


@NgModule({
  declarations: [
    YueUiTableComponent
  ],
  entryComponents: [
    YueUiTableComponent
  ],
  exports: [
    YueUiTableComponent
  ],
  imports: [
    CommonModule,
    YueUiSmartRenderModule,
    YueUiPaginationModule,
    CdkScrollableModule,
    YueUiI18nModule,
  ]
})
export class YueUiTableModule {

  constructor(private readonly i18n: YueUiI18nService) {
    logger.info(`YueUiTableModule on version: ${VERSION.full}`);

    this.i18n
      .extendsComponentsDictionary({
        table: {
          noColumns: `No columns!`,
          noData: `No data!`,
          noSource: `No source!`,
        },
      });
  }

}
