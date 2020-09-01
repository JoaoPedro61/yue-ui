import {
  Input,
  Component,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from 'rxjs';

import { YueUiSmartRenderType } from './../utils/interfaces';

import { Context } from '../utils/context';



@Component({
  selector: '[yueUiSmartRender], yue-ui-smart-render',
  template: `
    <ng-container *yueUiStringTemplateRefRender="yueUiSmartRender; context: yueUiSmartRenderContext">
      <span [innerText]="isAObservable ? ( ngSafeValue_yueUiSmartRender | async ) : yueUiSmartRender"></span>
    </ng-container>
  `,
  exportAs: 'yueUiSmartRenderRef',
  preserveWhitespaces: false,
  host: {
    '[class.yue-ui-smart-render]': `true`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YueUiSmartRenderComponent<_T = unknown> {

  @Input()
  public yueUiSmartRenderContext: any | null = null;

  @Input()
  public yueUiSmartRender: YueUiSmartRenderType = null;

  public get isAObservable(): boolean {
    return this.yueUiSmartRender instanceof Observable;
  }

  public get ngSafeValue_yueUiSmartRender(): any {
    return this.yueUiSmartRender;
  }

  /*
    Ivy render complement
   */
  public static ngTemplateContextGuard<T>(_dir: YueUiSmartRenderComponent<T>, _ctx: any): _ctx is Context {
    return true;
  }

  constructor() { }

}
