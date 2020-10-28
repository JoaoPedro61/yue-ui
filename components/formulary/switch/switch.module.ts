import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';
import { YueUiSmartRenderModule } from '@joaopedro61/yue-ui/smart-render';
import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';
import { YueUiFormularyUtilsModule } from '@joaopedro61/yue-ui/formulary/utils';
import { YueUiI18nModule, YueUiI18nService } from '@joaopedro61/yue-ui/i18n';

import { YueUiFormularySwitchComponent } from './components/switch.component';
import { YueUiFormularySwitchOptionComponent } from './components/switch-option.component';

const logger = logging.getLogger(`core.formulary.switch`);



@NgModule({
  declarations: [
    YueUiFormularySwitchComponent,
    YueUiFormularySwitchOptionComponent,
  ],
  entryComponents: [
    YueUiFormularySwitchComponent,
    YueUiFormularySwitchOptionComponent,
  ],
  exports: [
    YueUiFormularySwitchComponent,
    YueUiFormularySwitchOptionComponent,
    YueUiFormularyUtilsModule,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    YueUiSmartRenderModule,
    YueUiFormularyUtilsModule,
    YueUiI18nModule,

    FormsModule,
    ReactiveFormsModule,
    YueUiThematizationModule,
  ]
})
export class YueUiFormularySwitchModule {

  constructor(private readonly i18n: YueUiI18nService) {
    logger.info(`YueUiFormularySwitchModule on version: ${VERSION.full}`);

    this.i18n
      .extendsComponentsDictionary({
        swicth: {
          offLabel: `Off`,
          onLabel: `On`,
        },
      });
  }


}
