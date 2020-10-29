import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { logging } from '@joaopedro61/yue-ui/core/utils';
import { VERSION } from '@joaopedro61/yue-ui/version';

import { YUE_UI_THEME_DEFAULT, YUE_UI_THEME, YUE_UI_THEME_BEHAVIOR } from './thematization.utils';


import { LIGHT_THEME } from './themes/light';

import { YueUiThemeDefault } from './thematization.interfaces';
import { YueUiThematizationService } from './thematization.service';



const logger = logging.getLogger('core.thematization');



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: YUE_UI_THEME_DEFAULT,
      useValue: LIGHT_THEME
    },
    {
      provide: YUE_UI_THEME,
      useValue: YUE_UI_THEME_BEHAVIOR,
    },
    YueUiThematizationService
  ]
})
export class YueUiThematizationModule {

  constructor(@Inject(YUE_UI_THEME_DEFAULT) private readonly _default: YueUiThemeDefault, private readonly _service: YueUiThematizationService) {
    logger.info(`YueUiThematizationModule on version: ${VERSION.full}`);

    if (this._default !== 'light') {
      this._service.setTheme(this._default);
    }
  }

}
