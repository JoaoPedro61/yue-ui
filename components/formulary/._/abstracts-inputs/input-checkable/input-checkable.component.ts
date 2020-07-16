import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { InputField } from './../../extends/input-field';



@Component({
  template: `
    <ng-container *ngIf="isReady">
      <yue-switch [abstractControl]="control" [type]="vsType"></yue-switch>
    </ng-container>
  `,
  styleUrls: ['./input-checkable.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class InputCheckableComponent extends InputField implements OnInit {

  public get vsType(): 'normal' | 'indeterminate' {
    if (this.field) {
      if (this.field.mode) {
        if (this.field.mode === 'normal' || this.field.mode === 'indeterminate') {
          return this.field.mode;
        }
      }
    }
    return 'normal';
  }

  constructor(public readonly detector: ChangeDetectorRef) {
    super();
  }

  public ngOnInit(): void {
    this.isReady = true;
  }

}
