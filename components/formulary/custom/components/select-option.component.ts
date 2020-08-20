import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  Optional,
  Host,
  OnDestroy,
  Input
} from '@angular/core';

import { YueUiSmartRenderType } from '@JoaoPedro61/yue-ui/smart-render';

import { YueUiSelectComponent } from './select.component';




@Component({
  selector: 'yue-ui-select-option',
  template: ``,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  exportAs: 'yueUiSelectOptionRef',
  host: {
    '[class.yue-ui-select-option]': 'true',
  }
})
export class YueUiSelectOptionComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  public yueUiSelectOptionValue!: any;

  @Input()
  public yueUiSelectOptionLabel!: YueUiSmartRenderType<any>;

  constructor(public readonly cdr: ChangeDetectorRef, @Optional() @Host() private readonly host?: YueUiSelectComponent) { }

  public ngOnInit(): void {
    if (this.host) {
      this.host.addOption(this);
    }
  }

  public ngAfterViewInit(): void { }

  public ngOnDestroy(): void {
    if (this.host) {
      this.host.removeOption(this);
    }
  }

}
