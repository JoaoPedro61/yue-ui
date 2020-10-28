import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';
import { PlatformModule } from '@angular/cdk/platform';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { YueUiOverlayModule } from '@joaopedro61/yue-ui/overlay';
import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';
import { YueUiSmartRenderModule } from '@joaopedro61/yue-ui/smart-render';
import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';
import { YueUiFormularyUtilsModule } from '@joaopedro61/yue-ui/formulary/utils';
import { YueUiI18nModule, YueUiI18nService } from '@joaopedro61/yue-ui/i18n';
import { YueUiFormularyMaskModule } from '@joaopedro61/yue-ui/formulary/mask';
import { YueUiIconModule } from '@joaopedro61/yue-ui/icon';

import { YueUiFormularySelectComponent } from './components/select.component';
import { YueUiFormularySelectSearchControlComponent } from './components/select-search-control.component';
import { YueUiFormularySelectSearchComponent } from './components/select-search.component'
import { YueUiFormularySelectSearchControlPlaceholderComponent } from './components/select-search-control-placeholder.component'
import { YueUiFormularySelectSearchControlItemComponent } from './components/select-search-control-item.component'
import { YueUiFormularySelectArrowComponent } from './components/select-arrow.component'
import { YueUiFormularySelectDropdownContainerComponent } from './components/select-dropdown-container.component';
import { YueUiFormularySelectOptionComponent } from './components/select-option.component';
import { YueUiFormularySelectDropdownItemComponent } from './components/select-dropdown-item.component';



const logger = logging.getLogger(`core.formulary.select`);



@NgModule({
  declarations: [
    YueUiFormularySelectComponent,
    YueUiFormularySelectSearchControlComponent,
    YueUiFormularySelectSearchComponent,
    YueUiFormularySelectSearchControlPlaceholderComponent,
    YueUiFormularySelectSearchControlItemComponent,
    YueUiFormularySelectArrowComponent,
    YueUiFormularySelectOptionComponent,
    YueUiFormularySelectDropdownContainerComponent,
    YueUiFormularySelectDropdownItemComponent,
  ],
  entryComponents: [
    YueUiFormularySelectComponent,
    YueUiFormularySelectSearchControlComponent,
    YueUiFormularySelectSearchComponent,
    YueUiFormularySelectSearchControlPlaceholderComponent,
    YueUiFormularySelectSearchControlItemComponent,
    YueUiFormularySelectArrowComponent,
    YueUiFormularySelectOptionComponent,
    YueUiFormularySelectDropdownContainerComponent,
    YueUiFormularySelectDropdownItemComponent,
  ],
  exports: [
    YueUiFormularySelectComponent,
    YueUiFormularySelectSearchControlComponent,
    YueUiFormularySelectSearchComponent,
    YueUiFormularySelectSearchControlPlaceholderComponent,
    YueUiFormularySelectSearchControlItemComponent,
    YueUiFormularySelectArrowComponent,
    YueUiFormularySelectOptionComponent,

    FormsModule,
    ReactiveFormsModule,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    A11yModule,
    PlatformModule,
    ScrollingModule,
    OverlayModule,
    CdkScrollableModule,

    YueUiSmartRenderModule,
    YueUiOverlayModule,
    YueUiThematizationModule,
    YueUiFormularyUtilsModule,
    YueUiI18nModule,
    YueUiFormularyMaskModule,
    YueUiIconModule,
  ]
})
export class YueUiFormularySelectModule {

  constructor(private readonly i18n: YueUiI18nService) {
    logger.info(`YueUiFormularySelectModule on version: ${VERSION.full}`);

    this.i18n
      .extendsComponentsDictionary({
        select: {
          noData: 'No data!'
        },
      });
  }

}
