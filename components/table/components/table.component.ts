import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, AfterViewInit, Input } from '@angular/core';
import { Subject } from 'rxjs';

import { TableSource } from './../table-source';



@Component({
  selector: 'yue-ui-table',
  template: `
    <div class="yue-ui-table-wrapper">
    </div>
  `,
  styleUrls: [
    `./../styles/table.component.less`,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: `yueUiTableRef`,
  preserveWhitespaces: false,
  host: {
    '[class.yue-ui-table]': 'true'
  }
})
export class YueUiTableComponent implements OnInit, OnDestroy, AfterViewInit {

  public destroy$: Subject<void> = new Subject();

  @Input()
  public source!: TableSource;

  constructor() { }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    console.log(this.source);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
