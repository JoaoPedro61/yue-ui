import { Directive, Input, OnChanges, SimpleChanges, AfterContentChecked, ElementRef, Renderer2, OnInit } from '@angular/core';

import { Optional } from '@angular/core';
import { IconDirective, ThemeType } from '@ant-design/icons-angular';

import { YueUiIconService } from './../services/icon.service';
import { YueUiIconPatchService } from './../services/patch.service';





@Directive({
  selector: '[yueUiIcon]',
  exportAs: 'yueUiIconRef',
  host: {
    '[class.anticon]': 'true'
  }
})
export class YueUiIconDirective extends IconDirective implements OnInit, OnChanges, AfterContentChecked {

  cacheClassName: string | null = null;

  @Input()
  public set yueUiIconSpin(value: boolean) {
    this.spin = value;
  }

  @Input() yueUiIconRotate: number = 0;

  @Input()
  public set yueUiIconType(value: string) {
    this.type = value;
  }

  @Input()
  public set yueUiIcon(value: string) {
    this.type = value;
  }

  @Input()
  public set yueUiIconTheme(value: ThemeType) {
    this.theme = value;
  }

  @Input()
  public set yueUiIconTwotoneColor(value: string) {
    this.twoToneColor = value;
  }

  @Input()
  public set yueUiIconIconfont(value: string) {
    this.iconfont = value;
  }

  public hostClass?: string;

  private readonly el: HTMLElement;

  private iconfont?: string;

  private spin: boolean = false;

  constructor(
    elementRef: ElementRef,
    public iconService: YueUiIconService,
    public renderer: Renderer2,
    @Optional() iconPatch: YueUiIconPatchService
  ) {
    super(iconService, elementRef, renderer);

    if (iconPatch) {
      iconPatch.doPatch();
    }

    this.el = elementRef.nativeElement;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { yueUiIconType, yueUiIconTwotoneColor, yueUiIconSpin, yueUiIconTheme, yueUiIconRotate } = changes;

    if (yueUiIconType || yueUiIconTwotoneColor || yueUiIconSpin || yueUiIconTheme) {
      this.changeIcon2();
    } else if (yueUiIconRotate) {
      this.handleRotate(this.el.firstChild as SVGElement);
    } else {
      this._setSVGElement(this.iconService.createIconfontIcon(`#${this.iconfont}`));
    }
  }

  public ngOnInit(): void {
    this.renderer.setAttribute(this.el, 'class', `anticon ${this.el.className}`.trim());
  }

  public ngAfterContentChecked(): void {
    if (!this.type) {
      const children = this.el.children;
      let length = children.length;
      if (!this.type && children.length) {
        while (length--) {
          const child = children[length];
          if (child.tagName.toLowerCase() === 'svg') {
            this.iconService.normalizeSvgElement(child as SVGElement);
          }
        }
      }
    }
  }

  private changeIcon2(): void {
    this.setClassName();
    this._changeIcon().then(svgOrRemove => {
      if (svgOrRemove) {
        this.setSVGData(svgOrRemove);
        this.handleSpin(svgOrRemove);
        this.handleRotate(svgOrRemove);
      }
    });
  }

  private handleSpin(svg: SVGElement): void {
    if (this.spin || this.type === 'loading') {
      this.renderer.addClass(svg, 'anticon-spin');
    } else {
      this.renderer.removeClass(svg, 'anticon-spin');
    }
  }

  private handleRotate(svg: SVGElement): void {
    if (this.yueUiIconRotate) {
      this.renderer.setAttribute(svg, 'style', `transform: rotate(${this.yueUiIconRotate}deg)`);
    } else {
      this.renderer.removeAttribute(svg, 'style');
    }
  }

  private setClassName(): void {
    if (this.cacheClassName) {
      this.renderer.removeClass(this.el, this.cacheClassName);
    }
    this.cacheClassName = `anticon-${this.type}`;
    this.renderer.addClass(this.el, this.cacheClassName);
  }

  private setSVGData(svg: SVGElement): void {
    this.renderer.setAttribute(svg, 'data-icon', this.type as string);
    this.renderer.setAttribute(svg, 'aria-hidden', 'true');
  }

}
