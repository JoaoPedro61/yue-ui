import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YueUiSmartRenderModule } from '@joaopedro61/yue-ui/smart-render';

import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';
import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';

import { YueUiCardComponent } from './components/card.component';
import { YueUiCardMetadataComponent } from './components/metadata.component';
import { YueUiCardActionsComponent } from './components/actions.component';
import { YueUiCardContentComponent } from './components/content.component';
import { YueUiCardCoverComponent } from './components/cover.component';
import { YueUiCardFooterComponent } from './components/footer.component';
import { YueUiCardHeaderComponent } from './components/header.component';
import { YueUiCardActionComponent } from './components/action.component';


const logger = logging.getLogger('card');



@NgModule({
  declarations: [
    YueUiCardComponent,
    YueUiCardMetadataComponent,
    YueUiCardActionsComponent,
    YueUiCardContentComponent,
    YueUiCardCoverComponent,
    YueUiCardFooterComponent,
    YueUiCardHeaderComponent,
    YueUiCardActionComponent,
  ],
  providers: [],
  imports: [
    CommonModule,
    YueUiSmartRenderModule,
    YueUiThematizationModule,
  ],
  exports: [
    YueUiCardComponent,
    YueUiCardMetadataComponent,
    YueUiCardActionsComponent,
    YueUiCardContentComponent,
    YueUiCardCoverComponent,
    YueUiCardFooterComponent,
    YueUiCardHeaderComponent,
    YueUiCardActionComponent,
  ],
})
export class YueUiCardModule {

  constructor() {
    logger.info(`YueUiCardModule on version: ${VERSION.full}`);
  }

}
