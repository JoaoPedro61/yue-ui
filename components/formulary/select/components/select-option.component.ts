import {
  Component,
  ChangeDetectionStrategy,
  OnChanges,
  Input,
  OnDestroy,
  ViewEncapsulation,
  ViewChild,
  TemplateRef
} from '@angular/core';
import { YueUiSmartRenderType } from '@joaopedro61/yue-ui/smart-render';
import { Subject } from 'rxjs';

import { YueUiFormularySelectSafeValue } from '../utils/interfaces';



@Component({
  selector: 'yue-ui-formulary-select-option',
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'yueUiFormularySelectOptionRef',
  host: {
    '[class.yue-ui-formulary-select-option]': `true`,
  }
})
export class YueUiFormularySelectOptionComponent implements OnChanges, OnDestroy {
  
  private readonly destroy$ = new Subject<void>();

  public readonly changes = new Subject<void>();

  @Input('yueUiFormularySelectOptionLabel')
  public label: YueUiSmartRenderType = null;

  @Input('yueUiFormularySelectOptionValue')
  public value: YueUiFormularySelectSafeValue | null = null;

  @Input('yueUiFormularySelectOptionDisabled')
  public disabled = false;

  @Input('yueUiFormularySelectOptionCustomContent')
  public customContent = false;

  @ViewChild(TemplateRef, { static: true })
  public template!: TemplateRef<YueUiFormularySelectSafeValue>;
  
  constructor() { }

  public ngOnChanges(): void {
    this.changes.next();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    this.changes.complete();
  }

}
