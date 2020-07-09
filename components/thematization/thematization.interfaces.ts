import { BehaviorSubject } from 'rxjs';



export interface YueUiThemeConfig {
  name: string;
  extends?: 'dark' | 'light';
  theme: Partial<any>;
}

export type YueUiThemeOptions = string | YueUiThemeConfig;

export type YueUiTheme = BehaviorSubject<YueUiThemeConfig>;

export type YueUiThemeDefault = YueUiThemeOptions;

