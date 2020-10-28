import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';




@Component({
  selector: 'yue-ui-formulary-select-search-control-item',
  template: `
    <yue-ui-smart-render class="yue-ui-formulary-select-search-control-item-content" [yueUiSmartRender]="label"></yue-ui-smart-render>
    <span *ngIf="deletable && !disabled" class="yue-ui-formulary-select-search-control-item-remove" (click)="onDelete($event)">
      <i yueUiIcon yueUiIconType="close"></i>
    </span>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  exportAs: 'yueUiFormularySelectSearchControlItemRef',
  host: {
    '[attr.title]': 'label',
    '[class.yue-ui-formulary-select-search-control-item]': 'true',
    '[class.yue-ui-formulary-select-search-control-item-disabled]': 'disabled',
  },
})
export class YueUiFormularySelectSearchControlItemComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('disabled')
  public disabled = false;

  @Input('label')
  public label: string | null | undefined = null;

  @Input('deletable')
  public deletable = false;

  @Output('delete')
  public readonly delete = new EventEmitter<MouseEvent>();

  constructor(public readonly cdr: ChangeDetectorRef) { }

  public onDelete(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    if (!this.disabled) {
      this.delete.next(e);
    }
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
  }

  public ngOnDestroy(): void {
  }

}
