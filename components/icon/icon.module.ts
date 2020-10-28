import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VERSION } from '@joaopedro61/yue-ui/version';
import { logging } from '@joaopedro61/yue-ui/core/utils';

import { YueUiThematizationModule } from '@joaopedro61/yue-ui/thematization';

import { YueUiIconDirective } from './directives/icon.directive';
import { YUE_UI_ICONS, YUE_UI_ICONS_PATCH } from './utils/token';
import { PlatformModule } from '@angular/cdk/platform';
import { IconDefinition } from '@ant-design/icons-angular';
import { YueUiIconPatchService } from './services/patch.service';

const logger = logging.getLogger('core.icon');


@NgModule({
  declarations: [
    YueUiIconDirective
  ],
  exports: [
    YueUiIconDirective
  ],
  providers: [ ],
  imports: [
    CommonModule,
    PlatformModule,
    YueUiThematizationModule,
  ]
})
export class YueUiIconModule {

  static forRoot(icons: IconDefinition[]): ModuleWithProviders<YueUiIconModule> {
    return {
      ngModule: YueUiIconModule,
      providers: [
        {
          provide: YUE_UI_ICONS,
          useValue: icons
        }
      ]
    };
  }

  static forChild(icons: IconDefinition[]): ModuleWithProviders<YueUiIconModule> {
    return {
      ngModule: YueUiIconModule,
      providers: [
        YueUiIconPatchService,
        {
          provide: YUE_UI_ICONS_PATCH,
          useValue: icons
        }
      ]
    };
  }

  constructor() {
    logger.info(`YueUiIconModule on version: ${VERSION.full}`);
  }

}
