import { InjectionToken } from '@angular/core';

import { YueUiTheme, YueUiThemeDefault } from './thematization.interfaces';


/**
 * Token of injection of the YUE_UI_THEME behavior
 *
 * @exports
 * @type {InjectionToken<YueUiTheme>}
 */
export const YUE_UI_THEME: InjectionToken<YueUiTheme> = new InjectionToken(`YUE_UI_THEME`);

/**
 * Token of injection of the YUE_UI_THEME_DEFAULT behavior
 *
 * @exports
 * @type {InjectionToken<YueUiThemeDefault>}
 */
export const YUE_UI_THEME_DEFAULT: InjectionToken<YueUiThemeDefault> = new InjectionToken(`YUE_UI_THEME_DEFAULT`);
