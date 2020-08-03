import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { SafeAny, YueUiMenuType } from './../utils/interfaces';



@Injectable()
export class YueUiMenuService {

  public descendantMenuItemClick$ = new Subject<SafeAny>();

  public childMenuItemClick$ = new Subject<SafeAny>();

  public mode$ = new BehaviorSubject<YueUiMenuType>('vertical');

  public inlineIndent$ = new BehaviorSubject<number>(24);

  public isChildSubMenuOpen$ = new BehaviorSubject<boolean>(false);

  public onDescendantMenuItemClick(menu: SafeAny): void {
    this.descendantMenuItemClick$.next(menu);
  }

  public onChildMenuItemClick(menu: SafeAny): void {
    this.childMenuItemClick$.next(menu);
  }

  public setMode(mode: YueUiMenuType): void {
    this.mode$.next(mode);
  }

  public setInlineIndent(indent: number): void {
    this.inlineIndent$.next(indent);
  }

}
