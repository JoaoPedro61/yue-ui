import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';

import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';
import { YueUiSmartRenderModule } from '@joaopedro61/yue-ui/smart-render';
import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';

import { YueUiColorpickerComponent } from './components/colorpicker.component';

const logger = logging.getLogger(`core.formulary.custom.colorpicker`);



@NgModule({
  declarations: [
    YueUiColorpickerComponent,
  ],
  entryComponents: [
    YueUiColorpickerComponent,
  ],
  exports: [
    YueUiColorpickerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    YueUiSmartRenderModule,
    TextMaskModule,
    YueUiThematizationModule,
  ]
})
export class YueUiCustomColorpickerModule {

  constructor() {
    logger.info(`YueUiCustomColorpickerModule on version: ${VERSION.full}`);
  }

}
