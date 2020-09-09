import { Directive, ElementRef, Input, NgZone, Renderer2, SimpleChanges } from "@angular/core";
import { MediaMatcher } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';

import { takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';

import { gridResponsiveMap, YueUiBreakpointKey, YueUiBreakpointsService } from '@joaopedro61/yue-ui/core/services';

import { YueUiGridAlign, YueUiGridGutter, YueUiGridJustify } from '../utils/interfaces';





@Directive({
  selector: `[yueUiGrid]`,
  exportAs: `yueUiGridRef`,
  host: {
    '[class.yue-ui-grid]': `true`,
    '[class.yue-ui-grid-top]': `yueUiGridAlign === 'top'`,
    '[class.yue-ui-grid-middle]': `yueUiGridAlign === 'middle'`,
    '[class.yue-ui-grid-bottom]': `yueUiGridAlign === 'bottom'`,
    '[class.yue-ui-grid-start]': `yueUiGridJustify === 'start'`,
    '[class.yue-ui-grid-end]': `yueUiGridJustify === 'end'`,
    '[class.yue-ui-grid-center]': `yueUiGridJustify === 'center'`,
    '[class.yue-ui-grid-space-around]': `yueUiGridJustify === 'space-around'`,
    '[class.yue-ui-grid-space-between]': `yueUiGridJustify === 'space-between'`
  }
})
export class YueUiGridDirective {

  @Input()
  public yueUiGridAlign: YueUiGridAlign | null = null;

  @Input()
  public yueUiGridJustify: YueUiGridJustify | null = null;

  @Input()
  public yueUiGridGutter: YueUiGridGutter = null;

  public readonly actualGutter$ = new ReplaySubject<[number | null, number | null]>(1);

  private readonly destroy$ = new Subject<void>();

  public getGutter(): [number | null, number | null] {
    const results: [number | null, number | null] = [null, null];
    const gutter = this.yueUiGridGutter || 0;
    const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, null];
    normalizedGutter.forEach((g, index) => {
      if (typeof g === 'object' && g !== null) {
        results[index] = null;
        Object.keys(gridResponsiveMap).map((screen: string) => {
          const bp = screen as YueUiBreakpointKey;
          if (this.mediaMatcher.matchMedia(gridResponsiveMap[bp]).matches && g[bp]) {
            results[index] = g![bp] as number;
          }
        });
      } else {
        results[index] = g || null;
      }
    });
    return results;
  }

  public setGutterStyle(): void {
    const [horizontalGutter, verticalGutter] = this.getGutter();
    this.actualGutter$.next([horizontalGutter, verticalGutter]);
    const renderGutter = (name: string, gutter: number | null) => {
      const nativeElement = this.elementRef.nativeElement;
      if (gutter !== null) {
        this.renderer.setStyle(nativeElement, name, `-${gutter / 2}px`);
      }
    };
    renderGutter('margin-left', horizontalGutter);
    renderGutter('margin-right', horizontalGutter);
    renderGutter('margin-top', verticalGutter);
    renderGutter('margin-bottom', verticalGutter);
  }

  constructor(
    public readonly elementRef: ElementRef,
    public readonly renderer: Renderer2,
    public readonly mediaMatcher: MediaMatcher,
    public readonly ngZone: NgZone,
    public readonly platform: Platform,
    private readonly service: YueUiBreakpointsService
  ) {}

  public ngOnInit(): void {
    this.setGutterStyle();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.yueUiGridGutter) {
      this.setGutterStyle();
    }
  }

  public ngAfterViewInit(): void {
    if (this.platform.isBrowser) {
      this.service
        .subscribe(gridResponsiveMap)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.setGutterStyle();
        });
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
