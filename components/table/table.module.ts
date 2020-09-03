import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CdkScrollableModule } from '@angular/cdk/scrolling';

import { VERSION } from '@JoaoPedro61/yue-ui/version';
import { logging } from '@JoaoPedro61/yue-ui/core/utils';
import { YueUiSmartRenderModule } from '@JoaoPedro61/yue-ui/smart-render';
import { YueUiPaginationModule } from '@JoaoPedro61/yue-ui/pagination';
import { YueUiI18nModule, YueUiI18nService } from '@JoaoPedro61/yue-ui/i18n';
import { YueUiButtonModule } from '@JoaoPedro61/yue-ui/button';
import { YueUiIconModule } from '@JoaoPedro61/yue-ui/icon';
import { YueUiPopoverModule } from '@JoaoPedro61/yue-ui/popover';
import { YueUiMenuModule } from '@JoaoPedro61/yue-ui/menu';
import { YueUiThematizationModule } from '@JoaoPedro61/yue-ui/thematization';

import { YueUiTableComponent } from './components/table.component';

import { YueUiTableActionsCellComponent } from './components/cells/actions-cell.component';
import { YueUiTableLinkCellComponent } from './components/cells/link-cell.component';

const logger = logging.getLogger('core.button');


@NgModule({
  declarations: [
    YueUiTableComponent,
    YueUiTableLinkCellComponent,
    YueUiTableActionsCellComponent,
  ],
  entryComponents: [
    YueUiTableComponent,
    YueUiTableLinkCellComponent,
    YueUiTableActionsCellComponent,
  ],
  exports: [
    YueUiTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    YueUiSmartRenderModule,
    YueUiPaginationModule,
    CdkScrollableModule,
    YueUiI18nModule,
    YueUiButtonModule,
    YueUiIconModule,
    YueUiPopoverModule,
    YueUiMenuModule,
    YueUiThematizationModule,
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
          actions: `Actions`,
        },
      });
  }

}
