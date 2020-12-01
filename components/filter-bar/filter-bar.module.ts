import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { YueUiSmartRenderModule } from '@joaopedro61/yue-ui/smart-render';
import { YueUiOverlayModule } from '@joaopedro61/yue-ui/overlay';
import { YueUiPopoverModule } from '@joaopedro61/yue-ui/popover';
import { YueUiModalModule } from '@joaopedro61/yue-ui/modal';
import { YueUiButtonModule } from '@joaopedro61/yue-ui/button';
import { YueUiIconModule } from '@joaopedro61/yue-ui/icon';
import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';
import { YueUiFormularyBuilderModule } from '@joaopedro61/yue-ui/formulary/builder';
import { YueUiI18nModule, YueUiI18nService } from '@joaopedro61/yue-ui/i18n';
import { YueUiTooltipModule } from '@joaopedro61/yue-ui/tooltip';

import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';

import { YueUiFilterBarComponent } from './components/filter-bar.component';
import { YueUiFilterBarPopupComponent } from './components/filter-bar-popup.component';



const logger = logging.getLogger('filter-bar');


@NgModule({
  declarations: [
    YueUiFilterBarComponent,
    YueUiFilterBarPopupComponent,
  ],
  entryComponents: [
    YueUiFilterBarComponent,
    YueUiFilterBarPopupComponent,
  ],
  imports: [
    CommonModule,
    OverlayModule,

    YueUiSmartRenderModule,
    YueUiOverlayModule,
    YueUiPopoverModule,
    YueUiModalModule,
    YueUiButtonModule,
    YueUiIconModule,
    YueUiThematizationModule,
    YueUiFormularyBuilderModule,
    YueUiI18nModule,
    YueUiTooltipModule,
  ],
  exports: [
    YueUiFilterBarComponent,
  ]
})
export class YueUiFilterbarModule {

  constructor(private readonly i18n: YueUiI18nService) {
    logger.info(`YueUiFilterbarModule on version: ${VERSION.full}`);

    
    this.i18n
      .extendsComponentsDictionary({
        filterBar: {
          search: `Search`,
          moreFilters: `More filters`,
          clearFilters: `Clear filters`
        },
      });
  }

}
