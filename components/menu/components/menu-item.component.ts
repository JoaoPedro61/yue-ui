import { SimpleChanges, OnInit, OnChanges, OnDestroy, AfterContentInit, Input, ContentChildren, QueryList, ChangeDetectorRef, Optional, Inject, Component, ChangeDetectionStrategy, ViewEncapsulation } from "@angular/core";
import { RouterLink, RouterLinkWithHref, Router, NavigationEnd } from '@angular/router';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import { YueUiMenuService } from '../services/menu.service';
import { YueUiSubMenuService } from '../services/sub-menu.service';
import { IsMenuInsideDropDownToken } from '../utils/token';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-menu-item`,
  host: {
    '[class.yue-ui-menu-item]': 'true',
    '[class.yue-ui-menu-item-selected]': 'yueUiMenuItemSelected',
    '[class.yue-ui-menu-item-disabled]': 'yueUiMenuItemDisabled',
    '[style.paddingLeft.px]': 'yueUiMenuItemPaddingLeft || inlinePaddingLeft',
    '(click)': `clickMenuItem($event)`
  },
  template: `
    <div class="wrapper-inner">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: [
    `./../styles/menu-item.component.less`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  exportAs: 'yueUiMenuItemRef',
})
export class YueUiMenuItemComponent implements OnInit, OnChanges, OnDestroy, AfterContentInit {

  private destroy$ = new Subject<void>();

  public level = this.yueUiSubmenuService ? this.yueUiSubmenuService.level : 0;

  public selected$ = new Subject<boolean>();

  public inlinePaddingLeft: number | null = null;

  @Input()
  public yueUiMenuItemPaddingLeft?: number;

  @Input()
  public yueUiMenuItemDisabled = false;

  @Input()
  public yueUiMenuItemSelected = false;

  @Input()
  public yueUiMenuItemMatchRouterExact = false;

  @Input() yueUiMenuItemMatchRouter = false;

  @ContentChildren(RouterLink, { descendants: true })
  public listOfRouterLink!: QueryList<RouterLink>;

  @ContentChildren(RouterLinkWithHref, { descendants: true })
  public listOfRouterLinkWithHref!: QueryList<RouterLinkWithHref>;

  clickMenuItem(e: MouseEvent): void {
    if (this.yueUiMenuItemDisabled) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      this.yueUiMenuService.onDescendantMenuItemClick(this);
      if (this.yueUiSubmenuService) {
        this.yueUiSubmenuService.onChildMenuItemClick(this);
      } else {
        this.yueUiMenuService.onChildMenuItemClick(this);
      }
    }
  }

  setSelectedState(value: boolean): void {
    this.yueUiMenuItemSelected = value;
    this.selected$.next(value);
  }

  private updateRouterActive(): void {
    if (!this.listOfRouterLink || !this.listOfRouterLinkWithHref || !this.router || !this.router.navigated || !this.yueUiMenuItemMatchRouter) {
      return void 0;
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

  private hasActiveLinks(): boolean {
    const isActiveCheckFn = this.isLinkActive(this.router!);
    return (
      (this.routerLink && isActiveCheckFn(this.routerLink)) ||
      (this.routerLinkWithHref && isActiveCheckFn(this.routerLinkWithHref)) ||
      this.listOfRouterLink.some(isActiveCheckFn) ||
      this.listOfRouterLinkWithHref.some(isActiveCheckFn)
    );
  }

  private isLinkActive(router: Router): (link: RouterLink | RouterLinkWithHref) => boolean {
    return (link: RouterLink | RouterLinkWithHref) => router.isActive(link.urlTree, this.yueUiMenuItemMatchRouterExact);
  }

  constructor(
    private yueUiMenuService: YueUiMenuService,
    private cdr: ChangeDetectorRef,
    @Optional() private yueUiSubmenuService: YueUiSubMenuService,
    @Inject(IsMenuInsideDropDownToken) public isMenuInsideDropDown: boolean,
    @Optional() private routerLink?: RouterLink,
    @Optional() private routerLinkWithHref?: RouterLinkWithHref,
    @Optional() private router?: Router
  ) {
    if (router) {
      this.router!.events.pipe(
        takeUntil(this.destroy$),
        filter(e => e instanceof NavigationEnd)
      ).subscribe(() => {
        this.updateRouterActive();
      });
    }
  }

  public ngOnInit(): void {
    combineLatest([this.yueUiMenuService.mode$, this.yueUiMenuService.inlineIndent$])
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
  }

}
