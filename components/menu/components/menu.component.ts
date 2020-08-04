import {
  SkipSelf,
  Optional,
  SimpleChanges,
  ChangeDetectorRef,
  Inject,
  AfterContentInit,
  OnInit,
  OnChanges,
  OnDestroy,
  ContentChildren,
  Input,
  Output,
  QueryList,
  EventEmitter,
  Component,
  ChangeDetectionStrategy
} from '@angular/core';
import { takeUntil, take } from 'rxjs/operators';
import { combineLatest, Subject, BehaviorSubject } from 'rxjs';
import { YueUiMenuService } from '../services/menu.service';
import { IsMenuInsideDropDownToken, MenuServiceLocalToken } from '../utils/token';
import { MenuDropDownTokenFactory, YueUiMenuServiceFactory } from '../utils/factories';
import { YueUiSubMenuComponent } from '../components/sub-menu.component';
import { YueUiMenuType, SafeAny } from '../utils/interfaces';
import { YueUiMenuItemComponent } from './menu-item.component';



@Component({
  selector: 'yue-ui-menu',
  host: {
    '[class.yue-ui-menu]': 'true',
    '[class.yue-ui-menu-horizontal]': `actualMode === 'horizontal'`,
    '[class.yue-ui-menu-vertical]': `actualMode === 'vertical'`,
    '[class.yue-ui-menu-inline]': `actualMode === 'inline'`,
  },
  providers: [
    {
      provide: MenuServiceLocalToken,
      useClass: YueUiMenuService
    },
    {
      provide: YueUiMenuService,
      useFactory: YueUiMenuServiceFactory,
      deps: [[new SkipSelf(), new Optional(), YueUiMenuService], MenuServiceLocalToken]
    },
    {
      provide: IsMenuInsideDropDownToken,
      useFactory: MenuDropDownTokenFactory,
      deps: [[new SkipSelf(), new Optional(), IsMenuInsideDropDownToken]]
    }
  ],
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: [
    `./../styles/menu.component.less`,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  exportAs: 'yueUiMenuRef',
})
export class YueUiMenuComponent implements AfterContentInit, OnInit, OnChanges, OnDestroy {

  @ContentChildren(YueUiMenuItemComponent, { descendants: true })
  public listOfYueUiMenuItemComponent!: QueryList<YueUiMenuItemComponent>;

  @ContentChildren(YueUiSubMenuComponent, { descendants: true })
  public listOfYueUiSubMenuComponent!: QueryList<YueUiSubMenuComponent>;

  @Input()
  public yueUiMenuInlineIndent = 24;

  @Input()
  public yueUiMenuMode: YueUiMenuType = this.menuService.mode$.getValue() || `vertical`;

  @Input()
  public yueUiMenuInlineCollapsed = false;

  @Input()
  public yueUiMenuSelectable = !this.isMenuInsideDropDown;

  @Output()
  public readonly yueUiMenuClick = new EventEmitter<YueUiMenuItemComponent>();

  @Output()
  public readonly yueUiMenuSomeChildIsOpened = new EventEmitter<SafeAny>();

  private destroy$ = new Subject<void>();

  private inlineCollapsed$ = new BehaviorSubject<boolean>(this.yueUiMenuInlineCollapsed);

  private mode$ = new BehaviorSubject<YueUiMenuType>(this.yueUiMenuMode);

  private listOfOpenedYueUiSubMenuComponent: YueUiSubMenuComponent[] = [];

  public actualMode: YueUiMenuType = this.mode$.getValue() || `vertical`;

  public setInlineCollapsed(inlineCollapsed: boolean): void {
    this.yueUiMenuInlineCollapsed = inlineCollapsed;
    this.inlineCollapsed$.next(inlineCollapsed);
  }

  public updateInlineCollapse(): void {
    if (this.listOfYueUiMenuItemComponent) {
      if (this.yueUiMenuInlineCollapsed) {
        this.listOfOpenedYueUiSubMenuComponent = this.listOfYueUiSubMenuComponent.filter(submenu => submenu.yueUiSubMenuOpen);
        this.listOfYueUiSubMenuComponent.forEach(submenu => submenu.setOpenStateWithoutDebounce(false));
      } else {
        this.listOfOpenedYueUiSubMenuComponent.forEach(submenu => submenu.setOpenStateWithoutDebounce(true));
        this.listOfOpenedYueUiSubMenuComponent = [];
      }
    }
  }

  constructor(private menuService: YueUiMenuService, @Inject(IsMenuInsideDropDownToken) public isMenuInsideDropDown: boolean, private cdr: ChangeDetectorRef) { }

  public ngOnInit(): void {
    combineLatest([this.inlineCollapsed$, this.mode$])
      .pipe(takeUntil(this.destroy$), take(1))
      .subscribe({
        next: ([inlineCollapsed, mode]) => {
          this.actualMode = inlineCollapsed ? 'vertical' : mode;
          this.menuService.setMode(this.actualMode);
          this.mode$.next(this.actualMode);
          this.cdr.markForCheck();
        },
      });

    this.menuService.descendantMenuItemClick$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: menu => {
          this.yueUiMenuClick.emit(menu);
          if (this.yueUiMenuSelectable && !menu.yueUiMatchRouter) {
            this.listOfYueUiMenuItemComponent.forEach(item => item.setSelectedState(item === menu));
          }
        }
      });

    this.menuService
      .isChildSubMenuOpen$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (v) => this.yueUiMenuSomeChildIsOpened.emit(v),
      })
  }

  public ngAfterContentInit(): void {
    this.inlineCollapsed$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updateInlineCollapse();
      this.cdr.markForCheck();
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { yueUiMenuInlineCollapsed, yueUiMenuInlineIndent, yueUiMenuMode } = changes;
    if (yueUiMenuInlineCollapsed) {
      this.inlineCollapsed$.next(this.yueUiMenuInlineCollapsed);
    }
    if (yueUiMenuInlineIndent) {
      this.menuService.setInlineIndent(this.yueUiMenuInlineIndent);
    }
    if (yueUiMenuMode) {
      this.mode$.next(this.yueUiMenuMode);
      this.menuService.setMode(this.yueUiMenuMode);
      if (!changes.yueUiMenuMode.isFirstChange() && this.listOfYueUiSubMenuComponent) {
        this.listOfYueUiSubMenuComponent.forEach(submenu => submenu.setOpenStateWithoutDebounce(false));
      }
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
