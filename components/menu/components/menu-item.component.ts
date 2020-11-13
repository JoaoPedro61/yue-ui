import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, QueryList, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkWithHref } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import { YueUiMenuService } from './../services/menu.service';
import { YueUiSubmenuService } from './../services/submenu.service';
import { IsMenuInsideDropDownToken } from './../utils/token';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `a[yueUiMenuItem], yue-ui-menu-item`,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.yue-ui-menu-dropdown-item]': `isMenuInsideDropDown`,
    '[class.yue-ui-menu-dropdown-item-selected]': `isMenuInsideDropDown && yueUiMenuItemSelected`,
    '[class.yue-ui-menu-dropdown-item-disabled]': `isMenuInsideDropDown && yueUiMenuItemDisabled`,
    '[class.yue-ui-menu-item]': `!isMenuInsideDropDown`,
    '[class.yue-ui-menu-item-selected]': `!isMenuInsideDropDown && yueUiMenuItemSelected`,
    '[class.yue-ui-menu-item-disabled]': `!isMenuInsideDropDown && yueUiMenuItemDisabled`,
    '[style.paddingLeft.px]': 'yueUiMenuItemPaddingLeft || inlinePaddingLeft',
    '(click)': 'clickMenuItem($event)'
  },
  preserveWhitespaces: false,
  exportAs: `yueUiMenuItemRef`,
})
export class YueUiMenuItemComponent implements OnDestroy, OnChanges, AfterContentInit, OnInit {
  
  private readonly destroy$ = new Subject<void>();

  public level = this.subservice ? this.subservice.level + 1 : 1;

  public selected$ = new Subject<boolean>();

  inlinePaddingLeft: number | null = null;

  @Input()
  public yueUiMenuItemPaddingLeft?: number;

  @Input()
  public yueUiMenuItemDisabled = false;

  @Input()
  public yueUiMenuItemSelected = false;

  @Input()
  public yueUiMenuItemMatchRouterExact = false;

  @Input()
  public yueUiMenuItemMatchRouter = false;

  @ContentChildren(RouterLink, { descendants: true })
  public listOfRouterLink!: QueryList<RouterLink>;

  @ContentChildren(RouterLinkWithHref, { descendants: true })
  public listOfRouterLinkWithHref!: QueryList<RouterLinkWithHref>;

  constructor(
    private readonly service: YueUiMenuService,
    private readonly cdr: ChangeDetectorRef,
    @Optional() private subservice: YueUiSubmenuService,
    @Inject(IsMenuInsideDropDownToken) public isMenuInsideDropDown: boolean,
    @Optional() private routerLink?: RouterLink,
    @Optional() private routerLinkWithHref?: RouterLinkWithHref,
    @Optional() private router?: Router
  ) {
    if (router) {
      this.router!.events.pipe(takeUntil(this.destroy$),filter(e => e instanceof NavigationEnd))
        .subscribe(() => {
          this.updateRouterActive();
        });
    }
  }

  private isLinkActive(router: Router): (link: RouterLink | RouterLinkWithHref) => boolean {
    return (link: RouterLink | RouterLinkWithHref) => router.isActive(link.urlTree, this.yueUiMenuItemMatchRouterExact);
  }

  private hasActiveLinks(): boolean {
    const isActiveCheckFn = this.isLinkActive(this.router!);
    return (
      (this.routerLink && isActiveCheckFn(this.routerLink)) ||
      (this.routerLinkWithHref && isActiveCheckFn(this.routerLinkWithHref)) ||
      this.listOfRouterLink.some(isActiveCheckFn) ||
      this.listOfRouterLinkWithHref.some(isActiveCheckFn)
    );
  }

  private updateRouterActive(): void {
    if (!this.listOfRouterLink || !this.listOfRouterLinkWithHref || !this.router || !this.router.navigated || !this.yueUiMenuItemMatchRouter) {
      return;
    }
    Promise.resolve().then(() => {
      const hasActiveLinks = this.hasActiveLinks();
      if (this.yueUiMenuItemSelected !== hasActiveLinks) {
        this.yueUiMenuItemSelected = hasActiveLinks;
        this.setSelectedState(this.yueUiMenuItemSelected);
        this.cdr.markForCheck();
      }
    });
  }

  public clickMenuItem(e: MouseEvent): void {
    if (this.yueUiMenuItemDisabled) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      this.service.onDescendantMenuItemClick(this);
      if (this.subservice) {
        this.subservice.onChildMenuItemClick(this);
      } else {
        this.service.onChildMenuItemClick(this);
      }
    }
  }

  public setSelectedState(value: boolean): void {
    this.yueUiMenuItemSelected = value;
    this.selected$.next(value);
  }

  public ngOnInit(): void {
    combineLatest([this.service.mode$, this.service.inlineIndent$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([mode, inlineIndent]) => {
        this.inlinePaddingLeft = mode === 'inline' ? this.level * inlineIndent : null;
      });
  }

  public ngAfterContentInit(): void {
    this.listOfRouterLink.changes.pipe(takeUntil(this.destroy$)).subscribe(() => this.updateRouterActive());
    this.listOfRouterLinkWithHref.changes.pipe(takeUntil(this.destroy$)).subscribe(() => this.updateRouterActive());
    this.updateRouterActive();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.yueUiMenuItemSelected) {
      this.setSelectedState(this.yueUiMenuItemSelected);
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.selected$.complete();
  }

}
