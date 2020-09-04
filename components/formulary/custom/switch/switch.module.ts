import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';
import { YueUiSmartRenderModule } from '@joaopedro61/yue-ui/smart-render';
import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';

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

    FormsModule,
    ReactiveFormsModule,
    YueUiThematizationModule,
  ]
})
export class YueUiCustomSwitchModule {

  constructor() {
    logger.info(`YueUiCustomSwitchModule on version: ${VERSION.full}`);
  }

}
