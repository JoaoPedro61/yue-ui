import { BehaviorSubject } from 'rxjs';



/**
 * Object of the definition theme configuration
 *
 * @exports
 */
export interface YueUiThemeConfig {
  /**
   * The name of theme
   *
   * @type {string}
   */
  name: string;

  /**
   * The name of theme that this theme will extend
   *
   * @type {('dark' | 'light')}
   */
  extends?: 'dark' | 'light';

  /**
   * The theme configuration
   */
  theme: Partial<any>;
}

/**
 * Options available to set a new theme
 *
 * @type {(string | YueUiThemeConfig)}
 * @exports
 */
export type YueUiThemeOptions = string | YueUiThemeConfig;

/**
 * The current type of behavior
 *
 * @type {BehaviorSubject<YueUiThemeOptions>}
 * @exports
 */
export type YueUiTheme = BehaviorSubject<YueUiThemeConfig>;

/**
 * The default type of theme behavior
 *
 * @type {YueUiThemeOptions}
 * @exports
 */
export type YueUiThemeDefault = YueUiThemeOptions;

