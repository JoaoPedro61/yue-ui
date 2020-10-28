import { Injectable, Optional, Inject, RendererFactory2 } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { HttpBackend } from '@angular/common/http';

import { IconDefinition, IconService } from '@ant-design/icons-angular';


import { YueUiIconfontOption, YueUiIconSafeAny } from '../utils/interfaces';
import { YUE_UI_ICONS } from './../utils/token';
import { YUE_UI_ICONS_INTERNAL_USES } from './../utils/icons-internal-uses';
import { DEFAULT_TWOTONE_COLOR } from '../utils/consts';



@Injectable({
  providedIn: 'root'
})
export class YueUiIconService extends IconService {

  private iconfontCache = new Set<string>();

  public normalizeSvgElement(svg: SVGElement): void {
    if (!svg.getAttribute('viewBox')) {
      this._renderer.setAttribute(svg, 'viewBox', '0 0 1024 1024');
    }
    if (!svg.getAttribute('width') || !svg.getAttribute('height')) {
      this._renderer.setAttribute(svg, 'width', '1em');
      this._renderer.setAttribute(svg, 'height', '1em');
    }
    if (!svg.getAttribute('fill')) {
      this._renderer.setAttribute(svg, 'fill', 'currentColor');
    }
  }

  public fetchFromIconfont(opt: YueUiIconfontOption): void {
    const { scriptUrl } = opt;
    if (this._document && !this.iconfontCache.has(scriptUrl)) {
      const script = this._renderer.createElement('script');
      this._renderer.setAttribute(script, 'src', scriptUrl);
      this._renderer.setAttribute(script, 'data-namespace', scriptUrl.replace(/^(https?|http):/g, ''));
      this._renderer.appendChild(this._document.body, script);
      this.iconfontCache.add(scriptUrl);
    }
  }

  public createIconfontIcon(type: string): SVGElement {
    return this._createSVGElementFromString(`<svg><use xlink:href="${type}"></svg>`);
  }

  constructor(
    rendererFactory: RendererFactory2,
    sanitizer: DomSanitizer,
    @Optional() handler: HttpBackend,
    @Optional() @Inject(DOCUMENT) _document: YueUiIconSafeAny,
    @Optional() @Inject(YUE_UI_ICONS) icons?: IconDefinition[]
  ) {
    super(rendererFactory, handler, _document, sanitizer);

    this.addIcon(...YUE_UI_ICONS_INTERNAL_USES, ...(icons || []));
    this.configDefaultTwotoneColor();
    this.configDefaultTheme();
  }

  private configDefaultTheme(): void {
    this.defaultTheme = 'outline';
  }

  private configDefaultTwotoneColor(): void {
    const defaultTwotoneColor = DEFAULT_TWOTONE_COLOR;

    let primaryColor = DEFAULT_TWOTONE_COLOR;

    if (defaultTwotoneColor) {
      if (defaultTwotoneColor.startsWith('#')) {
        primaryColor = defaultTwotoneColor;
      } else {
        console.warn('Twotone color must be a hex color!');
      }
    }

    this.twoToneColor = { primaryColor };
  }

}
