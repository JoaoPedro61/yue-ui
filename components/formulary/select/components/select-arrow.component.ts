import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  OnDestroy,
  Input,
} from '@angular/core';




@Component({
  selector: 'yue-ui-formulary-select-arrow',
  template: `
    <i yueUiIcon yueUiIconType="down" *ngIf="!search"></i>
    <i yueUiIcon yueUiIconType="search" *ngIf="search"></i>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  exportAs: 'yueUiFormularySelectArrowRef',
  host: {
    '[class.yue-ui-formulary-select-arrow]': 'true',
  },
})
export class YueUiFormularySelectArrowComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('search')
  public search = false;

  constructor(public readonly cdr: ChangeDetectorRef) { }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
  }

  public ngOnDestroy(): void {
  }

}
