import { AfterViewInit, Directive, ElementRef, Host, Input, OnChanges, OnDestroy, OnInit, Optional, Renderer2 } from "@angular/core";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { YueUiGridDirective } from './grid.directive';

import { isNotNil } from '../utils/not-nil';
import { YueUiGridEmbeddedProperty } from '../utils/interfaces';






@Directive({
  selector: `[yueUiGridCol]`,
  exportAs: `yueUiGridColRef`,
  host: {}
})
export class YueUiColDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  private classMap: { [key: string]: boolean } = {};

  private destroy$ = new Subject<void>();

  @Input()
  public yueUiGridColFlex: string | number | null = null;

  @Input()
  public yueUiGridColSpan: string | number | null = null;

  @Input()
  public yueUiGridColOrder: string | number | null = null;

  @Input()
  public yueUiGridColOffset: string | number | null = null;

  @Input()
  public yueUiGridColPush: string | number | null = null;

  @Input()
  public yueUiGridColPull: string | number | null = null;

  @Input()
  public yueUiGridColXs: string | number | YueUiGridEmbeddedProperty | null = null;

  @Input()
  public yueUiGridColSm: string | number | YueUiGridEmbeddedProperty | null = null;

  @Input()
  public yueUiGridColMd: string | number | YueUiGridEmbeddedProperty | null = null;

  @Input()
  public yueUiGridColLg: string | number | YueUiGridEmbeddedProperty | null = null;

  @Input()
  public yueUiGridColXl: string | number | YueUiGridEmbeddedProperty | null = null;

  @Input()
  public yueUiGridColXXl: string | number | YueUiGridEmbeddedProperty | null = null;

  public setHostClassMap(): void {
    const hostClassMap = {
      ['yue-ui-grid-col']: true,
      [`yue-ui-grid-col-${this.yueUiGridColSpan}`]: isNotNil(this.yueUiGridColSpan),
      [`yue-ui-grid-col-order-${this.yueUiGridColOrder}`]: isNotNil(this.yueUiGridColOrder),
      [`yue-ui-grid-col-offset-${this.yueUiGridColOffset}`]: isNotNil(this.yueUiGridColOffset),
      [`yue-ui-grid-col-pull-${this.yueUiGridColPull}`]: isNotNil(this.yueUiGridColPull),
      [`yue-ui-grid-col-push-${this.yueUiGridColPush}`]: isNotNil(this.yueUiGridColPush),
      ...this.generateClass()
    };
    for (const i in this.classMap) {
      if (this.classMap.hasOwnProperty(i)) {
        this.renderer.removeClass(this.elementRef.nativeElement, i);
      }
    }
    this.classMap = { ...hostClassMap };
    for (const i in this.classMap) {
      if (this.classMap.hasOwnProperty(i) && this.classMap[i]) {
        this.renderer.addClass(this.elementRef.nativeElement, i);
      }
    }
  }

  public generateClass(): object {
    const listOfSizeInputName: Array<keyof YueUiColDirective> = ['yueUiGridColXs', 'yueUiGridColSm', 'yueUiGridColMd', 'yueUiGridColLg', 'yueUiGridColXl', 'yueUiGridColXXl'];
    const listClassMap: Partial<any> = {};
    listOfSizeInputName.forEach(name => {
      const sizeName = name.replace('yueUiGridCol', '').toLowerCase();
      if (isNotNil(this[name])) {
        if (typeof this[name] === 'number' || typeof this[name] === 'string') {
          listClassMap[`yue-ui-grid-col-${sizeName}-${this[name]}`] = true;
        } else {
          const embedded = this[name] as YueUiGridEmbeddedProperty;
          const prefixArray: Array<keyof YueUiGridEmbeddedProperty> = ['span', 'pull', 'push', 'offset', 'order'];
          prefixArray.forEach(prefix => {
            const prefixClass = prefix === 'span' ? '-' : `-${prefix}-`;
            listClassMap[`yue-ui-grid-col-${sizeName}${prefixClass}${embedded[prefix]}`] = embedded && isNotNil(embedded[prefix]);
          });
        }
      }
    });
    return listClassMap;
  }

  constructor(private readonly elementRef: ElementRef, @Optional() @Host() public readonly grid: YueUiGridDirective, public readonly renderer: Renderer2) {}

  public ngOnInit(): void {
    this.setHostClassMap();
  }

  public ngOnChanges(): void {
    this.setHostClassMap();
  }

  public ngAfterViewInit(): void {
    if (this.grid) {
      this.grid.actualGutter$
        .pipe(takeUntil(this.destroy$))
        .subscribe(([horizontalGutter, verticalGutter]) => {
          const renderGutter = (name: string, gutter: number | null) => {
            const nativeElement = this.elementRef.nativeElement;
            if (gutter !== null) {
              this.renderer.setStyle(nativeElement, name, `${gutter / 2}px`);
            }
          };
          renderGutter('padding-left', horizontalGutter);
          renderGutter('padding-right', horizontalGutter);
          renderGutter('padding-top', verticalGutter);
          renderGutter('padding-bottom', verticalGutter);
        });
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
