import { Inject, Injectable, OnDestroy, Optional, SkipSelf } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, Observable, Subject } from 'rxjs';
import { auditTime, distinctUntilChanged, filter, map, mapTo, mergeMap } from 'rxjs/operators';

import { YueUiMenuService } from './../services/menu.service';
import { IsMenuInsideDropDownToken } from '../utils/token';
import { YueUiMenuMode, YueUiMenuSafeAny } from './../utils/types';



@Injectable()
export class YueUiSubmenuService implements OnDestroy {

  public readonly mode$: Observable<YueUiMenuMode> = this.service.mode$.pipe(
    map(mode => {
      if (mode === 'inline') {
        return 'inline';
      } else if (mode === 'vertical' || this.selfHost) {
        return 'vertical';
      } else {
        return 'horizontal';
      }
    })
  );

  public readonly isCurrentSubMenuOpen$ = new BehaviorSubject<boolean>(false);

  private readonly isChildSubMenuOpen$ = new BehaviorSubject<boolean>(false);

  private readonly isMouseEnterTitleOrOverlay$ = new Subject<boolean>();

  private readonly childMenuItemClick$ = new Subject<YueUiMenuSafeAny>();

  public level = 1;

  constructor(@SkipSelf() @Optional() private readonly selfHost: YueUiSubmenuService, public readonly service: YueUiMenuService, @Inject(IsMenuInsideDropDownToken) public readonly isMenuInsideDropDown: boolean) {
    if (this.selfHost) {
      this.level = this.selfHost.level + 1;
    }
    const isClosedByMenuItemClick = this.childMenuItemClick$.pipe(
      mergeMap(() => this.mode$),
      filter(mode => mode !== 'inline' || this.isMenuInsideDropDown),
      mapTo(false)
    );
    const isCurrentSubmenuOpen$ = merge(this.isMouseEnterTitleOrOverlay$, isClosedByMenuItemClick);
    const isSubMenuOpenWithDebounce$ = combineLatest([this.isChildSubMenuOpen$, isCurrentSubmenuOpen$]).pipe(
      map(([isChildSubMenuOpen, isCurrentSubmenuOpen]) => isChildSubMenuOpen || isCurrentSubmenuOpen),
      auditTime(150),
      distinctUntilChanged()
    );
    isSubMenuOpenWithDebounce$.pipe(distinctUntilChanged()).subscribe(data => {
      this.setOpenStateWithoutDebounce(data);
      if (this.selfHost) {
        this.selfHost.isChildSubMenuOpen$.next(data);
      } else {
        this.service.isChildSubMenuOpen$.next(data);
      }
    });
  }

  public onChildMenuItemClick(menu: YueUiMenuSafeAny): void {
    this.childMenuItemClick$.next(menu);
  }

  public setOpenStateWithoutDebounce(value: boolean): void {
    this.isCurrentSubMenuOpen$.next(value);
  }

  public setMouseEnterTitleOrOverlayState(value: boolean): void {
    this.isMouseEnterTitleOrOverlay$.next(value);
  }

  public ngOnDestroy(): void {
    this.isCurrentSubMenuOpen$.complete();
    this.isChildSubMenuOpen$.complete();
    this.isMouseEnterTitleOrOverlay$.complete();
    this.childMenuItemClick$.complete();
  }

}
