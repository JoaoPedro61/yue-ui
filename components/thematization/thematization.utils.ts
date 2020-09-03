import { InjectionToken } from '@angular/core';

import { YueUiTheme, YueUiThemeDefault } from './thematization.interfaces';
import { BehaviorSubject } from 'rxjs';
import { DEFAULT_LIGHT_THEME } from './thematization.themes';


export const YUE_UI_THEME: InjectionToken<YueUiTheme> = new InjectionToken(`YUE_UI_THEME`);

export const YUE_UI_THEME_DEFAULT: InjectionToken<YueUiThemeDefault> = new InjectionToken(`YUE_UI_THEME_DEFAULT`);

export const YUE_UI_THEME_BEHAVIOR: YueUiTheme = new BehaviorSubject(DEFAULT_LIGHT_THEME);
