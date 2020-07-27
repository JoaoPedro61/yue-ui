import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VERSION } from '@JoaoPedro61/yue-ui/version';
import { logging } from '@JoaoPedro61/yue-ui/core/utils';
import { YueUiSmartRenderModule } from '@JoaoPedro61/yue-ui/smart-render';

import { YueUiSwitchComponent } from './components/switch.component';
import { YueUiSwitchOptionComponent } from './components/switch-option.component';
import { YueUiNumberComponent } from './components/number.component';
import { YueUiSelectComponent } from './components/select.component';
import { YueUiTextComponent } from './components/text.component';
import { YueUiColorpickerComponent } from './components/colorpicker.component';
import { YueUiDatepickerComponent } from './components/datepicker.component';


const logger = logging.getLogger(`core.formulary.custom`);



@NgModule({
  declarations: [
    YueUiSwitchComponent,
    YueUiSwitchOptionComponent,
    YueUiNumberComponent,
    YueUiSelectComponent,
    YueUiTextComponent,
    YueUiColorpickerComponent,
    YueUiDatepickerComponent,
  ],
  entryComponents: [
    YueUiSwitchComponent,
    YueUiSwitchOptionComponent,
    YueUiNumberComponent,
    YueUiSelectComponent,
    YueUiTextComponent,
    YueUiColorpickerComponent,
    YueUiDatepickerComponent,
  ],
  exports: [
    YueUiSwitchComponent,
    YueUiSwitchOptionComponent,
    YueUiNumberComponent,
    YueUiSelectComponent,
    YueUiTextComponent,
    YueUiColorpickerComponent,
    YueUiDatepickerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    YueUiSmartRenderModule,
  ]
})
export class YueUiCustomInputsModule {

  constructor() {
    logger.info(`YueUiCustomInputsModule on version: ${VERSION.full}`);
  }

}
