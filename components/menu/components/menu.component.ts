import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Inject,
  Input,
  Optional,
  Output,
  QueryList,
  SimpleChanges,
  SkipSelf,
  ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { YueUiMenuService, } from './../services/menu.service';
import {
  IsMenuInsideDropDownToken,
  MenuServiceLocalToken,
  YueUiMenuServiceFactory,
  MenuDropDownTokenFactory,
} from './../utils/token';
import { YueUiMenuMode } from './../utils/types';
import { YueUiMenuItemComponent } from './menu-item.component';
import { YueUiMenuSubmenuComponent } from './submenu.component';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-menu`,
  template: `<ng-content select="yue-ui-menu-item, [yueUiMenuItem], yue-ui-menu-submenu, yue-ui-menu-divider, yue-ui-menu-group"></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  host: {
    '[class.yue-ui-dropdown-menu]': `isMenuInsideDropDown`,
    '[class.yue-ui-dropdown-menu-root]': `isMenuInsideDropDown`,
    '[class.yue-ui-dropdown-menu-vertical]': `isMenuInsideDropDown && actualMode === 'vertical'`,
    '[class.yue-ui-dropdown-menu-horizontal]': `isMenuInsideDropDown && actualMode === 'horizontal'`,
    '[class.yue-ui-dropdown-menu-inline]': `isMenuInsideDropDown && actualMode === 'inline'`,
    '[class.yue-ui-dropdown-menu-inline-collapsed]': `isMenuInsideDropDown && yueUiMenuInlineCollapsed`,
    '[class.yue-ui-menu]': `!isMenuInsideDropDown`,
    '[class.yue-ui-menu-root]': `!isMenuInsideDropDown`,
    '[class.yue-ui-menu-vertical]': `!isMenuInsideDropDown && actualMode === 'vertical'`,
    '[class.yue-ui-menu-horizontal]': `!isMenuInsideDropDown && actualMode === 'horizontal'`,
    '[class.yue-ui-menu-inline]': `!isMenuInsideDropDown && actualMode === 'inline'`,
    '[class.yue-ui-menu-inline-collapsed]': `!isMenuInsideDropDown && yueUiMenuInlineCollapsed`
  },
  preserveWhitespaces: false,
  exportAs: `yueUiMenuRef`,
})
export class YueUiMenuComponent {

  private destroy$ = new Subject<void>();

  @ContentChildren(YueUiMenuItemComponent, { descendants: true })
  public listOfYueUiMenuItemComponent!: QueryList<YueUiMenuItemComponent>;
  
  @ContentChildren(YueUiMenuSubmenuComponent, { descendants: true })
  public listOfYueUiMenuSubmenuComponent!: QueryList<YueUiMenuSubmenuComponent>;

  @Input()
  public yueUiMenuInlineIndent = 24;

  @Input()
  public yueUiMenuMode: YueUiMenuMode = 'vertical';

  @Input()
  public yueUiMenuInlineCollapsed = false;

  @Input()
  public yueUiMenuSelectable = !this.isMenuInsideDropDown;

  @Output() readonly yueUiMenuClick = new EventEmitter<YueUiMenuItemComponent>();

  public actualMode: YueUiMenuMode = 'vertical';

  private inlineCollapsed$ = new BehaviorSubject<boolean>(this.yueUiMenuInlineCollapsed);

  private mode$ = new BehaviorSubject<YueUiMenuMode>(this.yueUiMenuMode);

  private listOfOpenedYueUiMenuSubmenuComponent: YueUiMenuSubmenuComponent[] = [];

  constructor(
    private readonly service: YueUiMenuService,
    @Inject(IsMenuInsideDropDownToken) public readonly isMenuInsideDropDown: boolean,
    private readonly cdr: ChangeDetectorRef
  ) {
    console.log(this);
  }

  public setInlineCollapsed(inlineCollapsed: boolean): void {
    this.yueUiMenuInlineCollapsed = inlineCollapsed;
    this.inlineCollapsed$.next(inlineCollapsed);
  }

  public updateInlineCollapse(): void {
    if (this.listOfYueUiMenuItemComponent) {
      if (this.yueUiMenuInlineCollapsed) {
        this.listOfOpenedYueUiMenuSubmenuComponent = this.listOfYueUiMenuSubmenuComponent.filter(submenu => submenu.yueUiMenuSubmenuOpen);
        this.listOfYueUiMenuSubmenuComponent.forEach(submenu => submenu.setOpenStateWithoutDebounce(false));
      } else {
        this.listOfOpenedYueUiMenuSubmenuComponent.forEach(submenu => submenu.setOpenStateWithoutDebounce(true));
        this.listOfOpenedYueUiMenuSubmenuComponent = [];
      }
    }
  }

  public ngOnInit(): void {
    combineLatest([this.inlineCollapsed$, this.mode$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([inlineCollapsed, mode]) => {
        this.actualMode = inlineCollapsed ? 'vertical' : mode;
        this.service.setMode(this.actualMode);
        this.cdr.markForCheck();
      });
    this.service.descendantMenuItemClick$.pipe(takeUntil(this.destroy$)).subscribe(menu => {
      this.yueUiMenuClick.emit(menu);
      if (this.yueUiMenuSelectable && !menu.nzMatchRouter) {
        this.listOfYueUiMenuItemComponent.forEach(item => item.setSelectedState(item === menu));
      }
    });
  }

  public ngAfterContentInit(): void {
    this.inlineCollapsed$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
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
      this.service.setInlineIndent(this.yueUiMenuInlineIndent);
    }
    if (yueUiMenuMode) {
      this.mode$.next(this.yueUiMenuMode);
      if (!changes.yueUiMenuMode.isFirstChange() && this.listOfYueUiMenuSubmenuComponent) {
        this.listOfYueUiMenuSubmenuComponent.forEach(submenu => submenu.setOpenStateWithoutDebounce(false));
      }
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.inlineCollapsed$.complete();
    this.mode$.complete();
  }

}
