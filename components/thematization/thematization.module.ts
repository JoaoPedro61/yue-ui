import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { logging } from '@JoaoPedro61/yue-ui/core/utils';
import { VERSION } from '@JoaoPedro61/yue-ui/version';

import { YUE_UI_THEME_DEFAULT, YUE_UI_THEME } from './thematization.utils';

import { DEFAULT_LIGHT_THEME } from './thematization.themes';

import { YueUiThemeDefault, YueUiThemeConfig } from './thematization.interfaces';
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
      useValue: DEFAULT_LIGHT_THEME
    },
    {
      provide: YUE_UI_THEME,
      useValue: new BehaviorSubject<YueUiThemeConfig>(DEFAULT_LIGHT_THEME)
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
