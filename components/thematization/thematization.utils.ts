import { InjectionToken } from '@angular/core';

import { YueUiTheme, YueUiThemeDefault } from './thematization.interfaces';


export const YUE_UI_THEME: InjectionToken<YueUiTheme> = new InjectionToken(`YUE_UI_THEME`);

export const YUE_UI_THEME_DEFAULT: InjectionToken<YueUiThemeDefault> = new InjectionToken(`YUE_UI_THEME_DEFAULT`);
