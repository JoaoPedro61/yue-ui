import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { YueUiOverlayModule } from '@joaopedro61/yue-ui/overlay';
import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';
import { YueUiSmartRenderModule } from '@joaopedro61/yue-ui/smart-render';
import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';

import { YueUiSelectComponent } from './components/select.component';
import { YueUiSelectOptionComponent } from './components/select-option.component';
import { YueUiSelectOptionRendererComponent } from './components/select-option-renderer.component';


const logger = logging.getLogger(`core.formulary.custom.select`);



@NgModule({
  declarations: [
    YueUiSelectComponent,
    YueUiSelectOptionComponent,
    YueUiSelectOptionRendererComponent,
  ],
  entryComponents: [
    YueUiSelectComponent,
    YueUiSelectOptionComponent,
    YueUiSelectOptionRendererComponent,
  ],
  exports: [
    YueUiSelectComponent,
    YueUiSelectOptionComponent,
    YueUiSelectOptionRendererComponent,

    FormsModule,
    ReactiveFormsModule,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    YueUiSmartRenderModule,
    OverlayModule,
    CdkScrollableModule,
    YueUiOverlayModule,
    YueUiThematizationModule,
  ]
})
export class YueUiCustomSelectModule {

  constructor() {
    logger.info(`YueUiCustomSelectModule on version: ${VERSION.full}`);
  }

}
