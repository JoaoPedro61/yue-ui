import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';

import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';
import { YueUiSmartRenderModule } from '@joaopedro61/yue-ui/smart-render';
import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';

import { YueUiPasswordComponent } from './components/password.component';

const logger = logging.getLogger(`core.formulary.custom.text`);



@NgModule({
  declarations: [
    YueUiPasswordComponent,
  ],
  entryComponents: [
    YueUiPasswordComponent,
  ],
  exports: [
    YueUiPasswordComponent,
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
export class YueUiCustomPasswordModule {

  constructor() {
    logger.info(`YueUiCustomPasswordModule on version: ${VERSION.full}`);
  }

}
