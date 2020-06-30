import { Directive, Input, OnChanges, SimpleChanges, AfterContentChecked, ElementRef, RendererFactory2, Renderer2, OnInit } from '@angular/core';

import { YueUiIconService } from './../services/icon.service';



@Directive({
  selector: '[yueUiIcon]',
  exportAs: 'iconRef'
})
export class YueUiIconDirective implements OnChanges, AfterContentChecked, OnInit {

  private el!: HTMLElement;

  private renderer!: Renderer2;

  private cacheClassName!: string;

  @Input()
  public yueUiIconType!: string;

  @Input()
  public yueUiIconRotate = 0;

  @Input()
  public yueUiIconSpin = false;

  constructor(
    private readonly hostEl: ElementRef,
    private readonly service: YueUiIconService,
    private readonly rendererFac: RendererFactory2
  ) {
    this.el = this.hostEl.nativeElement as HTMLElement;
    this.renderer = this.rendererFac.createRenderer(null, null);
  }

  public ngAfterContentChecked(): void {
    if (!this.yueUiIconType) {
      const children = this.el.children;
      let length = children.length;
      if (!this.yueUiIconType && children.length) {
        while (length--) {
          const child = children[length];
          if (child.tagName.toLowerCase() === 'svg') {
            this.service.normalizeSvgElement(child as SVGElement);
          }
        }
      }
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    const { yueUiIconSpin, yueUiIconRotate, yueUiIconType } = changes;
    if (yueUiIconType) {
      this.changeIcon();
    } else if (yueUiIconRotate) {
      this.handleRotate(this.el.firstChild as SVGElement);
    } else if (yueUiIconSpin) {
      this.handleSpin(this.el.firstChild as SVGElement);
    }
  }

  public ngOnInit(): void {
    this.renderer.setAttribute(this.el, 'class', `yue-ui-icon ${this.el.className}`.trim());
  }

  private changeIcon(): void {
    this.setClassName();
    this.service
      .createIcon(this.yueUiIconType, this.el)
        .then(svgOrRemove => {
          if (svgOrRemove) {
            this.setSVGData(svgOrRemove);
            this.handleSpin(svgOrRemove);
            this.handleRotate(svgOrRemove);
          }
        });
  }

  private handleSpin(svg: SVGElement): void {
    if (this.yueUiIconSpin) {
      this.renderer.addClass(svg, 'yue-ui-icon-spin');
    } else {
      this.renderer.removeClass(svg, 'yue-ui-icon-spin');
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
    this.cacheClassName = `${this.yueUiIconType}`;
    this.renderer.addClass(this.el, this.cacheClassName);
  }

  private setSVGData(svg: SVGElement): void {
    this.renderer.setAttribute(svg, 'data-icon', this.yueUiIconType as string);
    this.renderer.setAttribute(svg, 'aria-hidden', 'true');
  }

}
