import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';

import { VERSION } from '@JoaoPedro61/yue-ui/version';
import { logging } from '@JoaoPedro61/yue-ui/core/utils';
import { YueUiSmartRenderModule } from '@JoaoPedro61/yue-ui/smart-render';
import { YueUiThematizationModule } from '@JoaoPedro61/yue-ui/thematization';

import { YueUiDatepickerComponent } from './components/datepicker.component';

const logger = logging.getLogger(`core.formulary.custom.datepicker`);



@NgModule({
  declarations: [
    YueUiDatepickerComponent,
  ],
  entryComponents: [
    YueUiDatepickerComponent,
  ],
  exports: [
    YueUiDatepickerComponent,
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
export class YueUiCustomDatepickerModule {

  constructor() {
    logger.info(`YueUiCustomDatepickerModule on version: ${VERSION.full}`);
  }

}
