import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  Input,
  Renderer2,
  OnChanges,
  ChangeDetectorRef,
  RendererFactory2,
  NgZone,
  ViewEncapsulation
} from '@angular/core';

import { transformImageToBase64 } from '@joaopedro61/yue-ui/core/utils';





@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-image`,
  template: `
    <div class="image-viewer-wrapper" [class.loading]="loading">
      <div class="loader">
        <div class="loader--">
          <div class="loader-anim">
            <div></div>
          </div>
        </div>
      </div>
      <div class="image-wrapper" #wrapperImage>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.yue-ui-iamge]': 'true'
  },
  exportAs: `yueUiImageRef`,
})
export class YueUiImageComponent implements OnInit, OnChanges {

  @ViewChild('wrapperImage', { read: ElementRef }) private containerRef_!: ElementRef<HTMLDivElement>;

  private preventLoop: number | null = null;

  private imageEl_!: HTMLImageElement;

  private renderer_!: Renderer2;

  private src_!: string;

  @Input()
  public set yueUiImageSrc(v: string) {
    this.src_ = v;
  }

  private elseSrc_!: string;

  @Input()
  public set yueUiImageElseSrc(v: string) {
    this.elseSrc_ = v;
  }

  private alt_!: string;

  @Input()
  public set yueUiImageAlt(v: string) {
    this.alt_ = v;
  }

  private background_ = '#FFF';

  @Input()
  public set yueUiImageBackground(v: string) {
    this.background_ = v;
  }

  private color_ = 'rgba(0, 0, 0, .3)';

  @Input()
  public set yueUiImageColor(v: string) {
    this.color_ = v;
  }

  private text_ = '?';

  @Input()
  public set yueUiImageText(v: string) {
    this.text_ = v;
  }

  private fontSize_ = 50;

  @Input()
  public set yueUiImageFontSize(v: number) {
    this.fontSize_ = v;
  }

  private fontWeight_ = 'bold';

  @Input()
  public set yueUiImageFontWeight(v: string) {
    this.fontWeight_ = v;
  }
  public loading = true;

  constructor(
    private readonly changeDetectionRef_: ChangeDetectorRef,
    private readonly renderFactory_: RendererFactory2,
    private readonly zone: NgZone,
  ) {
    this.renderer_ = this.renderFactory_.createRenderer(null, null);
  }

  private renderBase64(base64: string): void {
    if (!this.imageEl_) {
      this.imageEl_ = this.renderer_.createElement('img');
      this.renderer_.appendChild(this.containerRef_.nativeElement, this.imageEl_);
    }
    this.renderer_.setAttribute(this.imageEl_, 'src', base64);
    if (this.alt_ || (this.text_ && this.text_.length)) {
      this.renderer_.setAttribute(this.imageEl_, 'alt', (this.alt_ || this.text_));
    }
    this.renderer_.setAttribute(this.imageEl_, 'style', `
          width         : 100%;
          height        : 100%;
          display       : block;
          position      : relative;
          border-radius : inherit;
        `);
    this.loading = false;
    this.changeDetectionRef_.detectChanges();
  }

  private render(): void {
    this.zone.runOutsideAngular(() => {
      this.loading = true;
      if (this.src_ && this.elseSrc_) {
        transformImageToBase64(this.src_, this.text_, this.background_, this.color_, this.fontSize_, this.fontWeight_, true)
          .then((base64: string) => this.renderBase64(base64))
          .catch(() => {
            transformImageToBase64(this.elseSrc_, this.text_, this.background_, this.color_, this.fontSize_, this.fontWeight_)
              .then((base64: string) => this.renderBase64(base64));
          });
      }
      if (this.src_) {
        transformImageToBase64(this.src_, this.text_, this.background_, this.color_, this.fontSize_, this.fontWeight_)
          .then((base64: string) => this.renderBase64(base64));
      } else if (this.elseSrc_) {
        transformImageToBase64(this.elseSrc_, this.text_, this.background_, this.color_, this.fontSize_, this.fontWeight_)
          .then((base64: string) => this.renderBase64(base64));
      } else {
        transformImageToBase64('', this.text_, this.background_, this.color_, this.fontSize_, this.fontWeight_)
          .then((base64: string) => this.renderBase64(base64));
      }
    });
  }

  public ngOnInit(): void {
    if (!this.preventLoop) {
      this.preventLoop = setTimeout(() => {
        this.render();
        this.preventLoop = null;
      });
    }
  }

  public ngOnChanges(): void {
    if (!this.preventLoop) {
      this.preventLoop = setTimeout(() => {
        this.render();
        this.preventLoop = null;
      });
    }
  }

}
