import { OnInit, OnChanges, OnDestroy, AfterContentInit, Input, Optional, Inject, Component, ChangeDetectionStrategy, ViewEncapsulation } from "@angular/core";
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { YueUiMenuService } from '../services/menu.service';
import { YueUiSubMenuService } from '../services/sub-menu.service';
import { IsMenuInsideDropDownToken } from '../utils/token';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-menu-divider`,
  host: {
    '[class.yue-ui-menu-divider]': 'true',
    '[style.paddingLeft.px]': 'yueUiMenuDividerPaddingLeft || inlinePaddingLeft'
  },
  template: `
    <div class="wrapper-inner">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: [
    `./../styles/menu-divider.component.less`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  exportAs: 'yueUiMenuDividerRef',
})
export class YueUiMenuDividerComponent implements OnInit, OnChanges, OnDestroy, AfterContentInit {

  private destroy$ = new Subject<void>();

  public level = this.yueUiSubmenuService ? this.yueUiSubmenuService.level : 0;

  public inlinePaddingLeft: number | null = null;

  @Input()
  public yueUiMenuDividerPaddingLeft?: number;

  constructor(
    private yueUiMenuService: YueUiMenuService,
    @Optional() private yueUiSubmenuService: YueUiSubMenuService,
    @Inject(IsMenuInsideDropDownToken) public isMenuInsideDropDown: boolean,
  ) { }

  public ngOnInit(): void {
    combineLatest([this.yueUiMenuService.mode$, this.yueUiMenuService.inlineIndent$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([mode, inlineIndent]) => {
        this.inlinePaddingLeft = mode === 'inline' ? this.level * inlineIndent : null;
      });
  }

  public ngAfterContentInit(): void { }

  public ngOnChanges(): void { }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
