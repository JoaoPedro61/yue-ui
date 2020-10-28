import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'yue-ui-formulary-clear',
  template: `
    <ng-container *ngIf="!disabled && !isEmpty">
      <div class="yue-ui-formulary-field-clear-wrapper" (mouseover)="setMouseInOut(true);" (mouseout)="setMouseInOut(false);">
        <span class="yue-ui-formulary-field-clear-wrapper-inner">
          <span class="yue-ui-formulary-field-clear-wrapper-inner-handler" (click)="clear();">
            <i yueUiIcon yueUiIconType="close"></i>
          </span>
        </span>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.yue-ui-formulary-field-clear]': `true`,
    '[class.yue-ui-formulary-clear]': `true`
  },
  providers: [ ],
  exportAs: `yueUiFormularyClearRef`
})
export class YueUiFormularyClearComponent implements OnInit, AfterViewInit {

  public hovering = false;
  
  @Input(`yueUiFormularyClearDisabled`)
  public disabled = false;

  @Input(`yueUiFormularyClearIsEmpty`)
  public isEmpty = false;

  @Output(`yueUiFormularyClearOn`)
  public onClear: EventEmitter<void> = new EventEmitter();

  @Output(`yueUiFormularyClearOnMouseInOut`)
  public onMouseInOut: EventEmitter<boolean> = new EventEmitter();

  public ngOnInit(): void { }

  public setMouseInOut(value: boolean): void {
    if (this.hovering !== value) {
      this.hovering = value;
      this.onMouseInOut.emit(value);
    }
  }

  public clear(): void {
    this.onClear.emit();
  }

  public ngAfterViewInit(): void { }

}
