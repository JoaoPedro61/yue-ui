import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';

import { VERSION } from '@JoaoPedro61/yue-ui/version';
import { logging } from '@JoaoPedro61/yue-ui/core/utils';
import { YueUiSmartRenderModule } from '@JoaoPedro61/yue-ui/smart-render';

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
  ]
})
export class YueUiCustomColorpickerModule {

  constructor() {
    logger.info(`YueUiCustomColorpickerModule on version: ${VERSION.full}`);
  }

}
