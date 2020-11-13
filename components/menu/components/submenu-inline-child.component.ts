import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { COLLAPSE_MOTION } from '@joaopedro61/yue-ui/core/animations';
import { YueUiSmartRenderType } from '@joaopedro61/yue-ui/smart-render';

import { YueUiMenuMode } from './../utils/types';



@Component({
  selector: '[yue-ui-submenu-inline-child]',
  animations: [COLLAPSE_MOTION],
  exportAs: 'yueUiSubmenuInlineChildRef',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <yue-ui-smart-render [yueUiSmartRender]="templateOutlet"></yue-ui-smart-render> `,
  host: {
    '[class.yue-ui-menu]': 'true',
    '[class.yue-ui-menu-inline]': 'true',
    '[class.yue-ui-menu-sub]': 'true',
    '[@COLLAPSE_MOTION]': 'expandState'
  }
})
export class YueUiSubmenuInlineChildComponent implements OnInit, OnChanges {

  @Input()
  public templateOutlet: YueUiSmartRenderType = null;

  @Input()
  public mode: YueUiMenuMode = 'vertical';

  @Input()
  public open = false;

  public expandState = false;

  constructor() {}

  public calcMotionState(): void {
    if (this.open) {
      this.expandState = true;
    } else {
      this.expandState = false;
    }
  }

  public ngOnInit(): void {
    this.calcMotionState();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { mode, open } = changes;
    if (mode || open) {
      this.calcMotionState();
    }
  }

}
