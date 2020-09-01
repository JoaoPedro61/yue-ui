import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';

import { VERSION } from '@JoaoPedro61/yue-ui/version';
import { logging } from '@JoaoPedro61/yue-ui/core/utils';
import { YueUiSmartRenderModule } from '@JoaoPedro61/yue-ui/smart-render';

import { YueUiTextComponent } from './components/text.component';

const logger = logging.getLogger(`core.formulary.custom.text`);



@NgModule({
  declarations: [
    YueUiTextComponent,
  ],
  entryComponents: [
    YueUiTextComponent,
  ],
  exports: [
    YueUiTextComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    YueUiSmartRenderModule,
    TextMaskModule,
  ]
})
export class YueUiCustomTextModule {

  constructor() {
    logger.info(`YueUiCustomTextModule on version: ${VERSION.full}`);
  }

}
