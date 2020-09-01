import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';

import { VERSION } from '@JoaoPedro61/yue-ui/version';
import { logging } from '@JoaoPedro61/yue-ui/core/utils';
import { YueUiSmartRenderModule } from '@JoaoPedro61/yue-ui/smart-render';

import { YueUiNumberComponent } from './components/number.component';

const logger = logging.getLogger(`core.formulary.custom.number`);



@NgModule({
  declarations: [
    YueUiNumberComponent,
  ],
  entryComponents: [
    YueUiNumberComponent,
  ],
  exports: [
    YueUiNumberComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    YueUiSmartRenderModule,
    TextMaskModule,
  ]
})
export class YueUiCustomNumberModule {

  constructor() {
    logger.info(`YueUiCustomNumberModule on version: ${VERSION.full}`);
  }

}
