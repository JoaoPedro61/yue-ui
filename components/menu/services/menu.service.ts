import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { YueUiMenuMode, YueUiMenuSafeAny } from './../utils/types';



@Injectable()
export class YueUiMenuService implements OnDestroy {

  public readonly descendantMenuItemClick$ = new Subject<YueUiMenuSafeAny>();

  public readonly childMenuItemClick$ = new Subject<YueUiMenuSafeAny>();

  public readonly mode$ = new BehaviorSubject<YueUiMenuMode>('vertical');

  public readonly inlineIndent$ = new BehaviorSubject<number>(24);

  public readonly isChildSubMenuOpen$ = new BehaviorSubject<boolean>(false);

  public onDescendantMenuItemClick(menu: YueUiMenuSafeAny): void {
    this.descendantMenuItemClick$.next(menu);
  }

  public onChildMenuItemClick(menu: YueUiMenuSafeAny): void {
    this.childMenuItemClick$.next(menu);
  }

  public setMode(mode: YueUiMenuMode): void {
    this.mode$.next(mode);
  }

  public setInlineIndent(indent: number): void {
    this.inlineIndent$.next(indent);
  }

  public ngOnDestroy(): void {
    this.descendantMenuItemClick$.complete();
    this.childMenuItemClick$.complete();
    this.mode$.complete();
    this.inlineIndent$.complete();
    this.isChildSubMenuOpen$.complete();
  }

}
