import { Injectable, Inject, RendererFactory2, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { serializeStringJsonPath, logging } from '@joaopedro61/yue-ui/core/utils';

import { YueUiThemeOptions, YueUiTheme, YueUiThemeConfig } from './thematization.interfaces';
import { YUE_UI_THEME } from './thematization.utils';
import { DEFAULT_DARK_THEME, DEFAULT_LIGHT_THEME } from './thematization.themes';


const logger = logging.getLogger('core.thematizationService');



@Injectable()
export class YueUiThematizationService {

  private static extrasAlreadyCreated = false;

  private _r2: Renderer2;

  constructor(@Inject(DOCUMENT) private readonly _document: any, @Inject(YUE_UI_THEME) private readonly _theme: YueUiTheme, private readonly _rf2: RendererFactory2) {
    this._r2 = this._rf2.createRenderer(null, null);
  }

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

