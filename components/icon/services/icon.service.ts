import { Injectable, Optional, Inject, RendererFactory2, Renderer2 } from '@angular/core';

import { YUE_UI_ICONS } from './../utils/token';
import { YUE_UI_ICONS_INTERNAL_USES } from './../utils/icons-internal-uses';
import { YueUiIcons } from '../utils/type';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';



@Injectable()
export class YueUiIconService {

  private _renderer!: Renderer2;

  constructor(
    private readonly _rendererFac: RendererFactory2,
    private readonly _sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private readonly _document: Document,
    @Optional() @Inject(YUE_UI_ICONS) private readonly icons: YueUiIcons
  ) {
    this._renderer = this._rendererFac.createRenderer(null, null);
  }

  private getCacheIcon(name: string): string | null {
    let result: string | null = null;
    for (let i = 0, l = YUE_UI_ICONS_INTERNAL_USES.length; i < l; i++) {
      if (YUE_UI_ICONS_INTERNAL_USES[i].name === name) {
        result = YUE_UI_ICONS_INTERNAL_USES[i].icon;
        break;
      }
    }
    if (!result) {
      if (this.icons && Array.isArray(this.icons) && this.icons.length) {
        for (let i = 0, l = this.icons.length; i < l; i++) {
          if (this.icons[i].name === name) {
            result = this.icons[i].icon;
            break;
          }
        }
      }
    }
    return result;
  }

  protected _createSVGElementFromString(str: string): SVGElement {
    const div = this._document.createElement('div');
    div.innerHTML = str;
    const svg: SVGElement | null = div.querySelector('svg');
    if (!svg) {
      throw new Error('Not SVG tag');
    }
    return svg;
  }

  public createIcon(name: string, el: HTMLElement): Promise<SVGElement> {
    return new Promise((resolver) => {
      const svgElString: string | null = this.getCacheIcon(name);
      while (el.firstChild) {
        this._renderer.removeChild(el, el.firstChild);
      }
      if (svgElString) {
        const sanitized: SafeHtml = this._sanitizer.bypassSecurityTrustHtml(svgElString);
        const svg: SVGElement = this._createSVGElementFromString((sanitized as any).changingThisBreaksApplicationSecurity);
        this._renderer.appendChild(el, svg);
        resolver(svg);
      } else if (name) {
        resolver(null as any);
        throw new Error(`[ICON]: "${name}" icon is not imported...`);
      }
    });
  }

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

}

