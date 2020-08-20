import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, Optional, Host, OnDestroy, Input } from '@angular/core';

import { YueUiSelectComponent } from './select.component';
import { YueUiSelectOptionComponent } from './select-option.component';



@Component({
  selector: 'yue-ui-select-option-renderer',
  template: `
    {{yueUiSelectOptionRendererOption}}
  `,
  styleUrls: [
    './../styles/select-option-renderer.component.less'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YueUiSelectOptionRendererComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  public yueUiSelectOptionRendererOption!: YueUiSelectOptionComponent;

  constructor(public readonly cdr: ChangeDetectorRef, @Optional() @Host() private readonly host?: YueUiSelectComponent) { }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void { }

  public ngOnDestroy(): void {
  }

}
