import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';

import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';
import { YueUiSmartRenderModule } from '@joaopedro61/yue-ui/smart-render';
import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';

import { YueUiTextareaComponent } from './components/textarea.component';

const logger = logging.getLogger(`core.formulary.custom.textarea`);



@NgModule({
  declarations: [
    YueUiTextareaComponent,
  ],
  entryComponents: [
    YueUiTextareaComponent,
  ],
  exports: [
    YueUiTextareaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    YueUiSmartRenderModule,
    TextMaskModule,

    FormsModule,
    ReactiveFormsModule,
    YueUiThematizationModule,
  ]
})
export class YueUiCustomTextareaModule {

  constructor() {
    logger.info(`YueUiCustomTextareaModule on version: ${VERSION.full}`);
  }

}
