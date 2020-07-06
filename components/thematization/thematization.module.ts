import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { logging } from 'yue-ui/core/utils';
import { VERSION } from 'yue-ui/version';

import { YUE_UI_THEME_DEFAULT, YUE_UI_THEME } from './thematization.utils';

import { DEFAULT_LIGHT_THEME } from './thematization.themes';

import { YueUiThemeDefault, YueUiThemeConfig } from './thematization.interfaces';
import { YueUiThematizationService } from './thematization.service';



const logger = logging.getLogger('core.thematization');

/**
 * This module exports thematize services, and its tokens and type.
 *
 * @sageNotes
 * Import this module in your target module
 *
 * ```typescript
 * {
 *   imports: [
 *     YueUiThematizationModule
 *   ]
 * }
 * ```
 * You can set a default theme when starting a module using
 * the injection token "YUE_UI_THEME_DEFAULT". Example:
 *
 * ```typescript
 * {
 *   imports: [
 *     YueUiThematizationModule
 *   ],
 *   providers: [
 *     {
 *       provide: YUE_UI_THEME_DEFAULT,
 *       useValue: 'dark'
 *     }
 *   ]
 * }
 * ```
 *
 *
 * This class YueUiThematizationService are responsible for loading the styling of the
 * components or even the styling of your project, if you want to
 * use a custom theme, the use of this service is very simple but
 * its impact on "ALL" the components of this library or even your
 * project can be affected, because if not used wisely it can break
 * the loaded styles.
 *
 * With all its cons now comes its pros:
 *
 *  * Easy management of themes
 *  * Easy theme replacement
 *  * Variable sharing
 *
 * How to use:
 * Import this service on your components, or any other instance:
 *
 * ```typescript
 *   constructor(private readonly _thematization: YueUiThematizationService) { }
 * ```
 *
 * Easy to use:
 *
 * ```typescript
 * this._thematization.setTheme('dark');
 * ```
 *
 * To more info, see the docs of the YueUiThematizationService class methods.
 *
 * @class {YueUiThematizationModule} The thematize module
 * @exports
 */
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

  /**
   * Create an new instance of YueUiThematizationModule
   *
   * @param {YueUiThemeDefault} _default The default theme
   * @param {YueUiThematizationService} _service The thematize service
   */
  constructor(@Inject(YUE_UI_THEME_DEFAULT) private readonly _default: YueUiThemeDefault, private readonly _service: YueUiThematizationService) {
    logger.info(`YueUiThematizationModule on version: ${VERSION.full}`);    
    if (this._default !== 'light') {
      this._service.setTheme(this._default);
    }
  }

}
