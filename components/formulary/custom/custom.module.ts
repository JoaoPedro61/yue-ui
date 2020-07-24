import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VERSION } from '@JoaoPedro61/yue-ui/version';
import { logging } from '@JoaoPedro61/yue-ui/core/utils';

import { YueUiSwitchComponent } from './components/switch.component';



const logger = logging.getLogger(`core.formulary.custom`);


@NgModule({
  declarations: [
    YueUiSwitchComponent,
  ],
  entryComponents: [
    YueUiSwitchComponent,
  ],
  exports: [
    YueUiSwitchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class YueUiCustomInputsModule {

  constructor() {
    logger.info(`YueUiCustomInputsModule on version: ${VERSION.full}`);
  }

}
