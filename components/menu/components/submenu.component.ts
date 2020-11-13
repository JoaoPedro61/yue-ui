import { CdkOverlayOrigin, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { getPlacementName, POSITION_MAP } from '@joaopedro61/yue-ui/overlay';
import { YueUiSmartRenderType } from '@joaopedro61/yue-ui/smart-render';
import { combineLatest, merge, Subject } from 'rxjs';
import { map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { YueUiMenuService } from '../services/menu.service';
import { IsMenuInsideDropDownToken } from '../utils/token';
import { YueUiMenuMode } from '../utils/types';

import { YueUiSubmenuService } from './../services/submenu.service';
import { YueUiMenuItemComponent } from './menu-item.component';


const listOfVerticalPositions = [
  POSITION_MAP.rightTop,
  POSITION_MAP.right,
  POSITION_MAP.rightBottom,
  POSITION_MAP.leftTop,
  POSITION_MAP.left,
  POSITION_MAP.leftBottom
];
const listOfHorizontalPositions = [POSITION_MAP.bottomLeft];

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-menu-submenu`,
  template: `
    <div
      yue-ui-submenu-title
      cdkOverlayOrigin
      #origin="cdkOverlayOrigin"
      [icon]="icon"
      [label]="label"
      [mode]="mode"
      [disabled]="yueUiMenuSubmenuDisabled"
      [selected]="isSelected"
      [isMenuInsideDropDown]="isMenuInsideDropDown"
      [paddingLeft]="yueUiMenuSubmenuPaddingLeft || inlinePaddingLeft"
      (subMenuMouseState)="setMouseEnterState($event)"
      (toggleSubMenu)="toggleSubMenu()"
    >
      <ng-content select="[title]" *ngIf="!label"></ng-content>
    </div>
    <div
      *ngIf="mode === 'inline'; else nonInlineTemplate"
      yue-ui-submenu-inline-child
      [mode]="mode"
      [open]="yueUiMenuSubmenuOpen"
      [templateOutlet]="subMenuTemplate"
    ></div>
    <ng-template #nonInlineTemplate>
      <ng-template
        cdkConnectedOverlay
        (positionChange)="onPositionChange($event)"
        [cdkConnectedOverlayPositions]="overlayPositions"
        [cdkConnectedOverlayOrigin]="origin"
        [cdkConnectedOverlayWidth]="triggerWidth!"
        [cdkConnectedOverlayOpen]="yueUiMenuSubmenuOpen"
        [cdkConnectedOverlayTransformOriginOn]="'.yue-ui-menu-submenu'"
      >
        <div
          yue-ui-submenu-none-inline-child
          [mode]="mode"
          [open]="yueUiMenuSubmenuOpen"
          [position]="position"
          [disabled]="yueUiMenuSubmenuDisabled"
          [isMenuInsideDropDown]="isMenuInsideDropDown"
          [templateOutlet]="subMenuTemplate"
          (subMenuMouseState)="setMouseEnterState($event)"
        ></div>
      </ng-template>
    </ng-template>
    <ng-template #subMenuTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.yue-ui-dropdown-menu-submenu]': `isMenuInsideDropDown`,
    '[class.yue-ui-dropdown-menu-submenu-disabled]': `isMenuInsideDropDown && yueUiMenuSubmenuDisabled`,
    '[class.yue-ui-dropdown-menu-submenu-open]': `isMenuInsideDropDown && yueUiMenuSubmenuOpen`,
    '[class.yue-ui-dropdown-menu-submenu-selected]': `isMenuInsideDropDown && isSelected`,
    '[class.yue-ui-dropdown-menu-submenu-vertical]': `isMenuInsideDropDown && mode === 'vertical'`,
    '[class.yue-ui-dropdown-menu-submenu-horizontal]': `isMenuInsideDropDown && mode === 'horizontal'`,
    '[class.yue-ui-dropdown-menu-submenu-inline]': `isMenuInsideDropDown && mode === 'inline'`,
    '[class.yue-ui-dropdown-menu-submenu-active]': `isMenuInsideDropDown && isActive`,
    '[class.yue-ui-menu-submenu]': `!isMenuInsideDropDown`,
    '[class.yue-ui-menu-submenu-disabled]': `!isMenuInsideDropDown && yueUiMenuSubmenuDisabled`,
    '[class.yue-ui-menu-submenu-open]': `!isMenuInsideDropDown && yueUiMenuSubmenuOpen`,
    '[class.yue-ui-menu-submenu-selected]': `!isMenuInsideDropDown && isSelected`,
    '[class.yue-ui-menu-submenu-vertical]': `!isMenuInsideDropDown && mode === 'vertical'`,
    '[class.yue-ui-menu-submenu-horizontal]': `!isMenuInsideDropDown && mode === 'horizontal'`,
    '[class.yue-ui-menu-submenu-inline]': `!isMenuInsideDropDown && mode === 'inline'`,
    '[class.yue-ui-menu-submenu-active]': `!isMenuInsideDropDown && isActive`
  },
  providers: [YueUiSubmenuService],
  preserveWhitespaces: false,
  exportAs: `yueUiMenuSubmenuRef`,
})
export class YueUiMenuSubmenuComponent implements OnInit, OnDestroy, OnChanges, AfterContentInit {

  private destroy$ = new Subject<void>();

  @Input(`yueUiMenuSubmenuLabel`)
  public label: YueUiSmartRenderType = ``;

  @Input(`yueUiMenuSubmenuIcon`)
  public icon!: string;

  @Input()
  public yueUiMenuSubmenuOpen = false;

  @Input()
  public yueUiMenuSubmenuPaddingLeft: number | null = null;

  @Input()
  public yueUiMenuSubmenuDisabled = false;

  @Output()
  public readonly yueUiMenuSubmenuOpenChange: EventEmitter<boolean> = new EventEmitter();

  @ViewChild(CdkOverlayOrigin, { static: true, read: ElementRef })
  public cdkOverlayOrigin: ElementRef | null = null;

  @ContentChildren(YueUiMenuSubmenuComponent, { descendants: true })
  public listOfYueUiMenuSubmenuComponent: QueryList<YueUiMenuSubmenuComponent> | null = null;

  @ContentChildren(YueUiMenuItemComponent, { descendants: true })
  public listOfYueUiMenuItemComponent: QueryList<YueUiMenuItemComponent> | null = null;

  private level = this.subservice.level;

  public position = 'right';

  public triggerWidth: number | null = null;

  public mode: YueUiMenuMode = 'vertical';

  public inlinePaddingLeft: number | null = null;

  public overlayPositions = listOfVerticalPositions;

  public isSelected = false;

  public isActive = false;

  constructor(
    public readonly service: YueUiMenuService,
    private readonly cdr: ChangeDetectorRef,
    public readonly subservice: YueUiSubmenuService,
    private readonly platform: Platform,
    @Inject(IsMenuInsideDropDownToken) public isMenuInsideDropDown: boolean
  ) {}

  public setOpenStateWithoutDebounce(open: boolean): void {
    this.subservice.setOpenStateWithoutDebounce(open);
  }

  public toggleSubMenu(): void {
    this.setOpenStateWithoutDebounce(!this.yueUiMenuSubmenuOpen);
  }

  public setMouseEnterState(value: boolean): void {
    this.isActive = value;
    if (this.mode !== 'inline') {
      this.subservice.setMouseEnterTitleOrOverlayState(value);
    }
  }

  public setTriggerWidth(): void {
    if (this.mode === 'horizontal' && this.platform.isBrowser && this.cdkOverlayOrigin) {
      this.triggerWidth = this.cdkOverlayOrigin!.nativeElement.getBoundingClientRect().width;
    }
  }

  public onPositionChange(position: ConnectedOverlayPositionChange): void {
    const placement = getPlacementName(position);
    if (placement === 'rightTop' || placement === 'rightBottom' || placement === 'right') {
      this.position = 'right';
    } else if (placement === 'leftTop' || placement === 'leftBottom' || placement === 'left') {
      this.position = 'left';
    }
    this.cdr.markForCheck();
  }

  public ngOnInit(): void {
    this.subservice.mode$.pipe(takeUntil(this.destroy$)).subscribe(mode => {
      this.mode = mode;
      if (mode === 'horizontal') {
        this.overlayPositions = listOfHorizontalPositions;
      } else if (mode === 'vertical') {
        this.overlayPositions = listOfVerticalPositions;
      }
      this.cdr.markForCheck();
    });
    combineLatest([this.subservice.mode$, this.service.inlineIndent$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([mode, inlineIndent]) => {
        this.inlinePaddingLeft = mode === 'inline' ? this.level * inlineIndent : null;
        this.cdr.markForCheck();
      });
    this.subservice.isCurrentSubMenuOpen$.pipe(takeUntil(this.destroy$)).subscribe(open => {
      this.isActive = open;
      if (open !== this.yueUiMenuSubmenuOpen) {
        this.setTriggerWidth();
        this.yueUiMenuSubmenuOpen = open;
        this.yueUiMenuSubmenuOpenChange.emit(this.yueUiMenuSubmenuOpen);
        this.cdr.markForCheck();
      }
    });
  }

  public ngAfterContentInit(): void {
    this.setTriggerWidth();
    const listOfYueUiMenuItemComponent = this.listOfYueUiMenuItemComponent;
    const changes = listOfYueUiMenuItemComponent!.changes;
    const mergedObservable = merge(...[changes, ...listOfYueUiMenuItemComponent!.map(menu => menu.selected$)]);
    changes
      .pipe(
        startWith(listOfYueUiMenuItemComponent),
        switchMap(() => mergedObservable),
        startWith(true),
        map(() => listOfYueUiMenuItemComponent!.some(e => e.yueUiMenuItemSelected)),
        takeUntil(this.destroy$)
      )
      .subscribe(selected => {
        this.isSelected = selected;
        this.cdr.markForCheck();
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { yueUiMenuSubmenuOpen } = changes;
    if (yueUiMenuSubmenuOpen) {
      this.subservice.setOpenStateWithoutDebounce(this.yueUiMenuSubmenuOpen);
      this.setTriggerWidth();
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
