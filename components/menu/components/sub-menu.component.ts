import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ContentChildren,
  QueryList,
  Inject,
  ChangeDetectorRef,
  OnInit,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  AfterContentInit
} from '@angular/core';
import { CdkOverlayOrigin, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { Subject, combineLatest, merge } from 'rxjs';
import { takeUntil, startWith, switchMap, map } from 'rxjs/operators';
import { Platform } from '@angular/cdk/platform';

import { getPlacementName } from '@JoaoPedro61/yue-ui/overlay';

import { IsMenuInsideDropDownToken } from '../utils/token';
import { OVERLAY_HORIZON_POS, OVERLAY_VERT_POS } from '../utils/pos';
import { YueUiMenuType } from '../utils/interfaces';
import { YueUiMenuItemComponent } from './menu-item.component';
import { YueUiMenuService } from './../services/menu.service';
import { YueUiSubMenuService } from './../services/sub-menu.service';




@Component({
  selector: 'yue-ui-submenu',
  template: `
    <yue-ui-submenu-title
      class="yue-ui-sub-menu-wrapper"
      cdkOverlayOrigin
      #origin="cdkOverlayOrigin"
      yue-ui-submenu-title
      [mode]="mode"
      [disabled]="yueUiSubMenuDisabled"
      [isMenuInsideDropDown]="isMenuInsideDropDown"
      [paddingLeft]="yueUiSubMenuPaddingLeft || inlinePaddingLeft"
      (subMenuMouseState)="setMouseEnterState($event)"
      (toggleSubMenu)="toggleSubMenu()"
    >
      <div class="yue-ui-sub-menu-title">
        <ng-content select="*:not(yue-ui-menu)"></ng-content>
      </div>
    </yue-ui-submenu-title>
    <ng-container *ngIf="mode === 'inline'; else nonInline">
      <yue-ui-submenu-inline-child
        [isMenuInsideDropDown]="isMenuInsideDropDown"
        [disabled]="yueUiSubMenuDisabled"
        [paddingLeft]="yueUiSubMenuPaddingLeft || inlinePaddingLeft"
        [open]="yueUiSubMenuOpen"
        [mode]="mode"
        (subMenuMouseState)="setMouseEnterState($event)"
      >
        <ng-container *ngTemplateOutlet="contentChild"></ng-container>
      </yue-ui-submenu-inline-child>
    </ng-container>
    <ng-template #nonInline>
      <ng-template
        #nonInlineDropDown
        cdkConnectedOverlay
        (positionChange)="onPositionChange($event)"
        [cdkConnectedOverlayPositions]="overlayPositions"
        [cdkConnectedOverlayOrigin]="origin"
        [cdkConnectedOverlayWidth]="triggerWidth!"
        [cdkConnectedOverlayOpen]="yueUiSubMenuOpen"
        [cdkConnectedOverlayTransformOriginOn]="'.yue-ui-menu-sub-menu'"
      >
        <yue-ui-submenu-none-inline-child
          [isMenuInsideDropDown]="isMenuInsideDropDown"
          [disabled]="yueUiSubMenuDisabled"
          [paddingLeft]="yueUiSubMenuPaddingLeft || inlinePaddingLeft"
          [open]="yueUiSubMenuOpen"
          [mode]="mode"
          (subMenuMouseState)="setMouseEnterState($event)"
        >
          <ng-container *ngTemplateOutlet="contentChild"></ng-container>
        </yue-ui-submenu-none-inline-child>
      </ng-template>
    </ng-template>
    <ng-template #contentChild>
      <ng-content select="yue-ui-menu"></ng-content>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.yue-ui-sub-menu]': 'true'
  },
  exportAs: 'yueUiSubMenuRef',
  providers: [YueUiSubMenuService],
})
export class YueUiSubMenuComponent implements AfterContentInit, OnInit, OnChanges, OnDestroy {

  private destroy$ = new Subject<void>();

  @Input()
  public yueUiSubMenuPaddingLeft: number | null = null;

  @Input()
  public yueUiSubMenuOpen = false;

  @Input()
  public yueUiSubMenuDisabled = false;

  @Output()
  public readonly yueUiSubMenuOpenChange: EventEmitter<boolean> = new EventEmitter();

  @ViewChild(CdkOverlayOrigin, { static: true, read: ElementRef })
  public cdkOverlayOrigin: ElementRef | null = null;

  @ContentChildren(YueUiSubMenuComponent, { descendants: true })
  public listOfYueUiSubMenuComponent: QueryList<YueUiSubMenuComponent> | null = null;

  @ContentChildren(YueUiMenuItemComponent, { descendants: true })
  public listOfYueUiMenuItemComponent: QueryList<YueUiMenuItemComponent> | null = null;

  public overlayPositions = OVERLAY_HORIZON_POS;

  public isSelected = false;

  public isActive = false;

  public position = 'right';

  private level = this.subMenuService.level;

  public triggerWidth: number | null = null;

  public mode: YueUiMenuType = 'vertical';

  public inlinePaddingLeft: number | null = null;

  constructor(
    public menuService: YueUiMenuService,
    private cdr: ChangeDetectorRef,
    public subMenuService: YueUiSubMenuService,
    private platform: Platform,
    @Inject(IsMenuInsideDropDownToken) public isMenuInsideDropDown: boolean
  ) { }

  public setOpenStateWithoutDebounce(open: boolean): void {
    this.subMenuService.setOpenStateWithoutDebounce(open);
  }

  toggleSubMenu(): void {
    this.setOpenStateWithoutDebounce(!this.yueUiSubMenuOpen);
  }

  setMouseEnterState(value: boolean): void {
    this.isActive = value;
    if (this.mode !== 'inline') {
      this.subMenuService.setMouseEnterTitleOrOverlayState(value);
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
    this.subMenuService.mode$.pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (mode) => {
          this.mode = mode;
          if (mode === 'horizontal') {
            this.overlayPositions = OVERLAY_HORIZON_POS;
          } else if (mode === 'vertical') {
            this.overlayPositions = OVERLAY_VERT_POS;
          }
          this.cdr.markForCheck();
        }
      });

    combineLatest([this.subMenuService.mode$, this.menuService.inlineIndent$])
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ([mode, inlineIndent]) => {
          this.inlinePaddingLeft = mode === 'inline' ? this.level * inlineIndent : null;
          this.cdr.markForCheck();
        }
      });

    this.subMenuService
      .isCurrentSubMenuOpen$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (open) => {
          this.isActive = open;
          if (open !== this.yueUiSubMenuOpen) {
            this.setTriggerWidth();
            this.yueUiSubMenuOpen = open;
            this.yueUiSubMenuOpenChange.emit(this.yueUiSubMenuOpen);
            this.cdr.markForCheck();
          }
        }
      });
  }

  public ngAfterContentInit(): void {
    this.setTriggerWidth();
    const listOfYueUiMenuItemComponent = this.listOfYueUiMenuItemComponent;
    const changes = listOfYueUiMenuItemComponent!.changes;
    const mergedObservable = merge(...[changes, ...listOfYueUiMenuItemComponent!.map(menu => menu.selected$).filter(menu => !!menu)]);
    changes
      .pipe(
        startWith(listOfYueUiMenuItemComponent),
        switchMap(() => mergedObservable),
        startWith(true),
        map(() => listOfYueUiMenuItemComponent!.some(e => e.yueUiMenuItemSelected)),
        takeUntil(this.destroy$)
      )
      .subscribe((selected: any) => {
        this.isSelected = selected;
        this.cdr.markForCheck();
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { yueUiSubMenuOpen } = changes;
    if (yueUiSubMenuOpen) {
      this.subMenuService.setOpenStateWithoutDebounce(this.yueUiSubMenuOpen);
      this.setTriggerWidth();
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
