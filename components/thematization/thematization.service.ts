import { Injectable, Inject, RendererFactory2, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { serializeStringJsonPath, logging } from 'yue-ui/core/utils';

import { YueUiThemeOptions, YueUiTheme, YueUiThemeConfig } from './thematization.interfaces';
import { YUE_UI_THEME } from './thematization.utils';
import { DEFAULT_DARK_THEME, DEFAULT_LIGHT_THEME } from './thematization.themes';


const logger = logging.getLogger('core.thematizationService');


/**
 * Class used in thematic components.
 *
 * @usageNotes
 * This are class and responsible for loading the styling of the
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
 * To more info, see the docs of the this class methods.
 *
 *
 * @class YueUiThematizationService Class used in thematic components
 * @exports
 */
@Injectable()
export class YueUiThematizationService {

  /**
   * Indicates if the extras styles already injected in your DOM
   *
   * @static
   * @type {boolean}
   */
  private static extrasAlreadyCreated = false;

  /**
   * Storage to the renderer
   *
   * @type {Renderer2}
   */
  private _r2: Renderer2;

  /**
   * Create an new instance of YueUiThematizationService
   *
   * @param {Document} _document The global document object
   * @param {YueUiTheme} _theme The current behavior theme
   * @param {RendererFactory2} _rf2 The factory of renderers
   */
  constructor(@Inject(DOCUMENT) private readonly _document: any, @Inject(YUE_UI_THEME) private readonly _theme: YueUiTheme, private readonly _rf2: RendererFactory2) {
    this._r2 = this._rf2.createRenderer(null, null);
  }

  /**
   * Inject extras styles in your DOM
   *
   * @param {boolean} [force=false] Force re-inject styles
   *
   * @internal
   * @memberof YueUiThematizationService
   * @returns {void} Void 0
   */
  private injectExtras(force: boolean = false): void {
    if (!YueUiThematizationService.extrasAlreadyCreated || force) {
      let style_el: HTMLStyleElement = this._document.querySelector(`.thematization-extras-css`);
      if (!style_el) {
        style_el = this._r2.createElement(`style`);
        this._r2.addClass(style_el, `thematization-extras-css`);
        this._r2.appendChild(this._document.head, style_el);
      }
      if (style_el.childNodes) {
        (style_el.childNodes as any).forEach((child: HTMLElement): void => {
          this._r2.removeChild(style_el, child);
        });
      }
      YueUiThematizationService.extrasAlreadyCreated = true;
    }
  }

  /**
   * Build and attach the current theme on your DOM Element
   *
   * @param {YueUiThemeConfig} theme The theme that will be attached on your current DOM Element
   *
   * @internal
   * @memberof YueUiThematizationService
   * @returns {void} Void 0
   */
  private buildStylesheet(theme: YueUiThemeConfig): void {
    const theme_vars = serializeStringJsonPath(theme.theme);
    const vars = theme_vars.keys();
    if (!vars.length) {
      throw new Error(`Sorry, but we can't set a empty theme`);
    }
    let formated_styles = `:root {`;
    vars.forEach((key: string) => {
      formated_styles += `--${key.replace(/\./gm, `-`)}: ${theme_vars[key]};`;
    });
    formated_styles += `}`;
    let style_el: HTMLStyleElement = this._document.querySelector(`.thematization-style-el`);
    if (!style_el) {
      style_el = this._r2.createElement(`style`);
      this._r2.addClass(style_el, `thematization-style-el`);
      this._r2.appendChild(this._document.head, style_el);
    }
    if (style_el.childNodes) {
      (style_el.childNodes as any).forEach((child: HTMLElement) => {
        this._r2.removeChild(style_el, child);
      });
    }
    this._r2.appendChild(style_el, this._r2.createText(formated_styles));
    this.injectExtras();
  }

  /**
   * Set a new JSON theme in your current DOM
   *
   * @usageNotes
   * Import this service on your components.
   *
   * Usage is basic, if you set any theme that is of the "string"
   * type and is different from the standard buid-in themes, which
   * are "light" to "dark", the service will look for the same in
   * the themes folder within your assets is set to the same.
   *
   * If the past theme is of the "object" type, the service will
   * validate it and consequently will create a new style sheet for them
   *
   * Injecting a service
   * ```typescript
   *   constructor(private readonly _thematization: YueUiThematizationService) { }
   * ```
   *
   * Example setting a default theme:
   * ```typescript
   * this._thematization.setTheme('light');
   * ```
   *
   * Example setting a theme that is contained in your assets:
   * Theme location: 'assets/themes/deep-purple.json'
   * ```typescript
   * this._thematization.setTheme('deep-purple');
   * ```
   *
   * Extending a loaded theme from your assets:
   * Theme location: 'assets/themes/deep-purple.json'
   * ```typescript
   * this._thematization.setTheme('deep-purple', 'light');
   * ```
   *
   * @param {YueUiThemeOptions} theme The theme that will be setted on current DOM
   * @param {('light' | 'dark')} extendsOf The name of the theme que will be extended
   *
   * @memberof YueUiThematizationService
   * @returns {void} Void 0
   */
  public setTheme(theme: YueUiThemeOptions, extendsOf?: 'light' | 'dark'): void {
    if (`string` === typeof theme) {
      if (theme === 'dark') {
        theme = DEFAULT_DARK_THEME;
        this._theme.next(theme);
        this.buildStylesheet(theme);
      } else if (theme === 'light') {
        theme = DEFAULT_LIGHT_THEME;
        this._theme.next(theme);
        this.buildStylesheet(theme);
      } else {
        this.setFileThemeJSON(theme, extendsOf);
      }
    } else {
      if (!theme.hasOwnProperty(`name`)) {
        logger.warn(`We recommend that you add the "name" property to your current theme json.`);
      }
      this._theme.next(theme);
      this.buildStylesheet(theme);
    }
  }

  /**
   * Get a JSON theme in your assets folder.
   *
   * @usageNotes
   * Import this service on your components.
   *
   * ```typescript
   *   constructor(private readonly _thematization: YueUiThematizationService) { }
   * ```
   *
   * Now, wherever you want to change your theme do this:
   * ```typescript
   * this._thematization.setFileThemeJSON('deep-purple');
   * ```
   *
   * You can also set some theme properties, and extend
   * others of the default themes which are "light" and "dark"
   * ```typescript
   * this._thematization.setFileThemeJSON('light-green', 'light');
   * ```
   *
   * @param {string} file The name of the file that is inside the themes folder in the assets
   * @param {[('light' | 'dark')]} [extendsOf='light'] The name of the theme that the current theme will use as its extension
   *
   * @memberof YueUiThematizationService
   * @returns {Promise<(YueUiThemeConfig | void)>} Returns the current JSON theme
   */
  public async setFileThemeJSON(file: string, extendsOf: 'dark' | 'light' = 'light'): Promise<YueUiThemeConfig | void> {
    return fetch(`assets/themes/${file}.json`)
      .then(res => res.json())
      .then((theme: YueUiThemeConfig) => {
        if (extendsOf) {
          theme.extends = extendsOf;
        } else {
          theme.extends = 'light';
        }
        if (!theme.name) {
          theme.name = file;
        }
        this.setTheme(theme);
        return theme;
      })
      .catch(() => {
        logger.error(`The theme file was not found, check if the following file exists in your "assets" folder: "assets/themes/${file}.json"`);
      });
  }

}

