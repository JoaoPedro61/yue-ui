import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { InputField } from './../../extends/input-field';



@Component({
  template: `
    <ng-container *ngIf="isReady">
      <yue-button [disabled]="disabled" [type]="vstype" (touched)="clicked($event);">
        <span [innerText]="placeholder"></span>
      </yue-button>
    </ng-container>
  `,
  styleUrls: ['./input-touchable.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputTouchableComponent extends InputField implements OnInit {

  public get placeholder(): string {
    if (this.field) {
      if ('function' === typeof this.field.placeholder) {
        return this.field.placeholder();
      } else {
        return this.field.placeholder || 'caralho';
      }
    }
    return '';
  }

  public get vstype(): string {
    if (this.field) {
      return this.field.vstype || 'default';
    }
    return '';
  }

  public get disabled(): boolean {
    return this.control.disabled;
  }

  constructor(public readonly detector: ChangeDetectorRef) {
    super();
  }

  public clicked($event: MouseEvent) {
    if (!this.control.disabled) {
      this.execListnner('tap', true, [$event]);
    }
    this.detector.detectChanges();
  }

  public ngOnInit(): void {
    this.isReady = true;
    this.detector.detectChanges();
  }

}
