import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VERSION } from '@JoaoPedro61/yue-ui/version';
import { logging } from '@JoaoPedro61/yue-ui/core/utils';
import { YueUiSmartRenderModule } from '@JoaoPedro61/yue-ui/smart-render';

import { YueUiSwitchComponent } from './components/switch.component';
import { YueUiSwitchOptionComponent } from './components/switch-option.component';

const logger = logging.getLogger(`core.formulary.custom.switch`);



@NgModule({
  declarations: [
    YueUiSwitchComponent,
    YueUiSwitchOptionComponent,
  ],
  entryComponents: [
    YueUiSwitchComponent,
    YueUiSwitchOptionComponent,
  ],
  exports: [
    YueUiSwitchComponent,
    YueUiSwitchOptionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    YueUiSmartRenderModule,
  ]
})
export class YueUiCustomSwitchModule {

  constructor() {
    logger.info(`YueUiCustomSwitchModule on version: ${VERSION.full}`);
  }

}
