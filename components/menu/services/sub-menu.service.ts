import { Inject, Injectable, Optional, SkipSelf } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, Observable, Subject } from 'rxjs';
import { auditTime, distinctUntilChanged, filter, flatMap, map, mapTo } from 'rxjs/operators';

import { YueUiMenuService } from './menu.service';
import { IsMenuInsideDropDownToken } from './../utils/token';

import { SafeAny, YueUiMenuType } from './../utils/interfaces';



@Injectable()
export class YueUiSubMenuService {

  public mode$: Observable<YueUiMenuType> = this.menuService.mode$.pipe(
    distinctUntilChanged(),
    map(mode => {
      if (mode === 'inline') {
        return 'inline';
      } else if (mode === 'vertical' || this.hostYueUiSubMenuService) {
        return 'vertical';
      } else {
        return 'horizontal';
      }
    })
  );

  public level = 1;

  public isCurrentSubMenuOpen$ = new BehaviorSubject<boolean>(false);

  private isChildSubMenuOpen$ = new BehaviorSubject<boolean>(false);

  private isMouseEnterTitleOrOverlay$ = new Subject<boolean>();

  private childMenuItemClick$ = new Subject<SafeAny>();

  public onChildMenuItemClick(menu: SafeAny): void {
    this.childMenuItemClick$.next(menu);
  }

  public setOpenStateWithoutDebounce(value: boolean): void {
    this.isCurrentSubMenuOpen$.next(value);
  }

  public setMouseEnterTitleOrOverlayState(value: boolean): void {
    this.menuService.childMenuOpened$.next(value);
    this.isMouseEnterTitleOrOverlay$.next(value);
  }

  constructor(@SkipSelf() @Optional() private hostYueUiSubMenuService: YueUiSubMenuService, public menuService: YueUiMenuService, @Inject(IsMenuInsideDropDownToken) public isMenuInsideDropDown: boolean) {
    if (this.hostYueUiSubMenuService) {
      this.level = this.hostYueUiSubMenuService.level + 1;
    }
    const isClosedByMenuItemClick = this.childMenuItemClick$.pipe(
      flatMap(() => this.mode$),
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
      if (this.hostYueUiSubMenuService) {
        this.hostYueUiSubMenuService.isChildSubMenuOpen$.next(data);
      } else {
        this.menuService.isChildSubMenuOpen$.next(data);
      }
    });
  }

}
