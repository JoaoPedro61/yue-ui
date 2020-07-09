import { Component, ChangeDetectionStrategy, OnDestroy, HostBinding, ChangeDetectorRef, ContentChildren, QueryList, HostListener, Output, Input, EventEmitter } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BREAKPOINTS } from './../utils/breakpoints';

import { YueUiNavigationMenuSiderComponent } from './navigation-menu-sider.component';



let timerCheckToggle: any = null;

let timerCheckHover: any = null;



@Component({
  selector: `yue-ui-navigation-menu`,
  template: `
    <div class="yue-ui-navigation-menu-wrapper">
      <div class="yue-ui-navigation-menu-fix-flexing">
        <div class="yue-ui-navigation-menu-handled-menu">
          <div class="yue-ui-navigation-menu-sipl">
            <div class="yue-ui-navigation-menu-static-menu-bar">
              <div class="yue-ui-navigation-menu-fixing-inner-overlay"></div>
              <span class="yue-ui-navigation-menu-inner-container-wrapper">
                <div class="yue-ui-navigation-menu-inner-container-top">
                  <ng-container *ngIf="listOfNavMenuSiderComponent.length > 0">
                    <div class="yue-ui-navigation-menu-open-handler-out-wrapper">
                      <span class="yue-ui-navigation-menu-open-handler-out-wrapper-inner" (click)="toggle();">
                        <i yueUiIcon [yueUiIconType]="isLikeMobile ? 'yue-ui-gg-menu' : 'yue-ui-gg-pin-alt'" [yueUiIconRotate]="!yueUiNavigationMenuOpened && !isLikeMobile ? 45 : 0"></i>
                      </span>
                    </div>
                  </ng-container>
                  <div class="yue-ui-navigation-menu-top-wrapper-out" [style.marginTop]="!isLikeMobile && listOfNavMenuSiderComponent.length > 0 ? '10px' : 0">
                    <ng-content select="yue-ui-navigation-menu-top"></ng-content>
                  </div>
                </div>
                <div class="yue-ui-navigation-menu-inner-container-bottom">
                  <ng-content select="yue-ui-navigation-menu-bottom"></ng-content>
                </div>
              </span>
            </div>
            <ng-container *ngIf="listOfNavMenuSiderComponent.length > 0">
              <div class="yue-ui-navigation-menu-dynamic-bar-wrapper">
                <div class="yue-ui-navigation-menu-wrapper-dyn" data-contextual-menu="on">
                  <div class="yue-ui-navigation-menu-dynamic-bar">
                    <div class="yue-ui-navigation-menu-fixed-content">
                      <div class="yue-ui-navigation-menu-menu-content-dynamic">
                        <ng-content select="yue-ui-navigation-menu-sider"></ng-content>
                      </div>
                    </div>
                  </div>
                </div>
                <span class="yue-ui-navigation-menu-closed-tag" data-close-tag="on"></span>
              </div>
            </ng-container>
          </div>
        </div>
        <div class="yue-ui-navigation-menu-fixing-padding">
          <div class="yue-ui-navigation-menu-fixer"></div>
        </div>
      </div>
    </div>
  `,
  styleUrls: [
    `./../styles/navigation-menu.component.less`
  ],
  preserveWhitespaces: false,
  exportAs: 'navMenuRef',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueUiNavigationMenuComponent implements OnDestroy {

  private readonly _untilDestroy: Subject<void> = new Subject();

  private _showLikeMobile = false;

  private _yueUiNaigationvMenuOpened = false;

  private _hovering = false;

  @ContentChildren(YueUiNavigationMenuSiderComponent)
  public listOfNavMenuSiderComponent!: QueryList<YueUiNavigationMenuSiderComponent>;

  @HostBinding(`class.is-hovering-on-navigation`)
  public get hovering(): boolean {
    return this._hovering && this.listOfNavMenuSiderComponent.length > 0;
  }

  @Input()
  @HostBinding(`class.is-yue-u-navigation-menu-opened-navigation`)
  public get yueUiNavigationMenuOpened(): boolean {
    return this._yueUiNaigationvMenuOpened && this.listOfNavMenuSiderComponent.length > 0;
  }

  public set yueUiNavigationMenuOpened(v: boolean) {
    this._yueUiNaigationvMenuOpened = v;

    this.yueUiNavigationMenuOpenedChange.emit(v);
  }

  @Output()
  public yueUiNavigationMenuOpenedChange: EventEmitter<boolean> = new EventEmitter();

  constructor(private readonly _breakpointObserve: BreakpointObserver, private _changeDetectorRef: ChangeDetectorRef) {
    this._breakpointObserve
      .observe(BREAKPOINTS)
      .pipe(takeUntil(this._untilDestroy))
      .subscribe({
        next: (result) => {
          this._showLikeMobile = result.matches;
          this._changeDetectorRef.markForCheck();
        }
      });
  }

  @HostBinding(`class.yue-ui-navigation-menu-as-header`)
  public get isLikeMobile(): boolean {
    return this._showLikeMobile;
  }

  @HostListener('document:click', ['$event'])
  public hoverOutDetect(event: MouseEvent): void {
    if ((!this.isLikeMobile && !this._yueUiNaigationvMenuOpened) || !this.listOfNavMenuSiderComponent.length) {
      return void 0;
    }
    if ((event as any).path && (event as any).path.length) {
      const path: (HTMLElement | Window)[] = (event as any).path;
      for (let index = 0, length = path.length; index < length; index++) {
        if ((path[index] instanceof HTMLElement)) {
          if ((path[index] as HTMLElement).hasAttribute(`data-close-tag`)) {
            this.close();
            return void 0;
          }
        }
      }
    }
    this.hoverOn(false);
  }

  @HostListener('document:mousemove', ['$event'])
  public clickOutDetect(event: MouseEvent): void {
    if (!this.listOfNavMenuSiderComponent || !this.listOfNavMenuSiderComponent.length) {
      return void 0;
    }
    if (timerCheckHover) {
      clearTimeout(timerCheckHover);
    }
    timerCheckHover = setTimeout((): any => {
      if ((event as any).path && (event as any).path.length) {
        const path: (HTMLElement | Window)[] = (event as any).path;
        for (let index = 0, length = path.length; index < length; index++) {
          if ((path[index] instanceof HTMLElement)) {
            if ((path[index] as HTMLElement).hasAttribute('data-contextual-menu') || (path[index] as HTMLElement).hasAttribute(`data-contextual-toggler-menu`)) {
              this.hoverOn(true);
              return void 0;
            }
          }
        }
      }
      this.hoverOn(false);
      timerCheckHover = null;
    }, 50);
  }

  public toggle(): void {
    this._yueUiNaigationvMenuOpened = !this._yueUiNaigationvMenuOpened;

    this._changeDetectorRef.markForCheck();
  }

  public close(): void {
    this._yueUiNaigationvMenuOpened = false;

    this._changeDetectorRef.markForCheck();
  }

  public open(): void {
    this._yueUiNaigationvMenuOpened = true;

    this._changeDetectorRef.markForCheck();
  }

  private hoverOn(isHovering: boolean = false): void {
    if (timerCheckToggle) {
      clearTimeout(timerCheckToggle);
    }
    timerCheckToggle = setTimeout(() => {
      this._hovering = isHovering;
      this._changeDetectorRef.markForCheck();
      timerCheckToggle = null;
      setTimeout(() => {
        this._changeDetectorRef.markForCheck();
      }, 300);
    }, isHovering ? 150 : 10);
  }

  public ngOnDestroy(): void {
    this._untilDestroy.next();
    this._untilDestroy.complete();
  }

}