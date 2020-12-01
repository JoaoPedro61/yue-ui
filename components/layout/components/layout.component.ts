import { Component, ChangeDetectionStrategy, ContentChildren, QueryList, OnDestroy, ChangeDetectorRef, HostBinding, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { YUE_UI_SMALL_LAYOUT_BREAKPOINTS } from '@joaopedro61/yue-ui/core/services';


import { YueUiNavigationMenuComponent } from './navigation-menu.component';



@Component({
  encapsulation: ViewEncapsulation.None,
  selector: `yue-ui-layout`,
  template: `
    <div class="yue-ui-layout-wrapper">
      <ng-container *ngIf="listOfNavMenuComponent.length > 0">
        <div class="yue-ui-layout-navigation-menu-wrapper">
          <ng-content select="yue-ui-navigation-menu"></ng-content>
        </div>
      </ng-container>
      <div class="yue-ui-layout-content-wrapper">
        <ng-content select=":not(yue-ui-navigation-menu)"></ng-content>
      </div>
    </div>
  `,
  host: {
    '[class.has-navigation-menu]': `listOfNavMenuComponent.length > 0`,
    '[class.yue-ui-layout]': `true`
  },
  exportAs: 'yueUiLayoutRef',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueUiLayoutComponent implements OnDestroy {

  private readonly _untilDestroy: Subject<void> = new Subject();

  private _smallScreen = false;

  @ContentChildren(YueUiNavigationMenuComponent)
  public listOfNavMenuComponent!: QueryList<YueUiNavigationMenuComponent>;

  constructor(private readonly _breadpointObserver: BreakpointObserver, private readonly _changeDetectorRef: ChangeDetectorRef) {
    this._breadpointObserver
      .observe(YUE_UI_SMALL_LAYOUT_BREAKPOINTS)
      .pipe(takeUntil(this._untilDestroy))
      .subscribe({
        next: (result) => {
          this._smallScreen = result.matches;
          this._changeDetectorRef.markForCheck();
        }
      });
  }

  @HostBinding(`class.yue-ui-layout-is-small-screen`)
  public get isSmallScreen(): boolean {
    return this._smallScreen;
  }

  public ngOnDestroy(): void {
    this._untilDestroy.next();
    this._untilDestroy.complete();
  }

}
