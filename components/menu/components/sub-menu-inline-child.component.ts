import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { COLLAPSE_MOTION } from '@JoaoPedro61/yue-ui/core/animations';


import { YueUiMenuType } from './../utils/interfaces';



@Component({
  selector: 'yue-ui-submenu-inline-child',
  exportAs: 'yueUiSubMenuInlineChildRef',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '(mouseenter)': 'setMouseState(true)',
    '(mouseleave)': 'setMouseState(false)',

    '[class.yue-ui-collapse-cdk]': 'true',
    '[class.yue-ui-collapse-cdk-opened]': 'open',
    '[class.yue-ui-collapse-cdk-closed]': '!open',
    '[attr.tabIndex]': '!open ? -1 : tabIndex === null ? null : tabIndex',

    '[@COLLAPSE_MOTION]': 'open',
  },
  styles: [`
    :host {
      display: block;
      position: relative;
      overflow: hidden;
    }
  `],
  animations: [
    COLLAPSE_MOTION
  ]
})
export class YueUiSubMenuInlineChildComponent {

  @Input()
  public isMenuInsideDropDown = false;

  @Input()
  public disabled = false;

  @Input()
  public paddingLeft: number | null = null;

  @Input()
  public open = false;

  @Input()
  public mode: YueUiMenuType = 'vertical';

  @Output()
  public readonly subMenuMouseState = new EventEmitter<boolean>();

  public setMouseState(state: boolean): void {
    if (!this.disabled) {
      this.subMenuMouseState.next(state);
    }
  }

}
