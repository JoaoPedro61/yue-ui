import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, Optional, Host, OnDestroy } from '@angular/core';
import { YueUiSelectComponent } from './select.component';



@Component({
  selector: 'yue-ui-select-option',
  template: `
  `,
  styleUrls: [
    './../styles/select-option.component.less'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YueUiSelectOptionComponent implements OnInit, AfterViewInit, OnDestroy {

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
