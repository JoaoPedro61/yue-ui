import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  OnDestroy,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';




@Component({
  selector: 'yue-ui-formulary-select-search-control-placeholder',
  template: `<yue-ui-smart-render *ngIf="placeholder" [yueUiSmartRender]="placeholder" [yueUiSmartRenderContext]="placeholderContext"></yue-ui-smart-render>`,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  exportAs: 'yueUiFormularySelectSearchControlPlaceholderRef',
  host: {
    '[class.yue-ui-formulary-select-search-control-placeholder]': 'true',
  },
})
export class YueUiFormularySelectSearchControlPlaceholderComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('placeholder')
  public placeholder: Observable<string> | string | null = '';

  @Input('placeholderContext')
  public placeholderContext: Partial<any> = {};

  constructor(public readonly cdr: ChangeDetectorRef) { }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void { }

  public ngOnDestroy(): void { }

}
