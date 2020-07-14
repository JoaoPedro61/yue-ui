import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { InputField } from './../../extends/input-field';



@Component({
  template: `
    <ng-container *ngIf="isReady">
      <div class="field-text-wrapper" [class.hovering]="hovering">
        <ng-container *ngIf="mask">
          <input [formControl]="control" [textMask]="mask" (mouseover)="hovering = true;" (mouseout)="hovering = false;">
        </ng-container>
        <ng-container *ngIf="!mask">
          <input [formControl]="control" [placeholder]="placeholder" (mouseover)="hovering = true;" (mouseout)="hovering = false;">
        </ng-container>
        <div class="input-clear" (mouseover)="hovering = true;" (mouseout)="hovering = false;">
          <ng-container *ngIf="!disabled && hasValue">
            <span class="input-clear-wrapper">
              <span class="input-clear-handler" (click)="clear();">
                <svg width="12" height="12" viewBox="0 0 24 24" focusable="false" role="presentation">
                  <path
                    d="M13 11V3.993A.997.997 0 0 0 12 3c-.556 0-1 .445-1 .993V11H3.993A.997.997 0 0 0 3 12c0 .557.445 1 .993 1H11v7.007c0 .548.448.993 1 .993.556 0 1-.445 1-.993V13h7.007A.997.997 0 0 0 21 12c0-.556-.445-1-.993-1H13z"
                    fill="currentColor" fill-rule="evenodd"></path>
                </svg>
              </span>
            </span>
          </ng-container>
        </div>
      </div>
    </ng-container>
  `,
  styleUrls: ['./input-writable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputWritableComponent extends InputField implements OnInit {

  public hovering = false;

  public get placeholder(): string {
    if (this.field.placeholder) {
      if ('function' === typeof this.field.placeholder) {
        return this.field.placeholder();
      } else {
        return this.field.placeholder;
      }
    }
    return '';
  }

  public get hasValue(): boolean {
    if (this.control) {
      return !!this.control.value;
    }
    return false;
  }

  public get disabled(): boolean {
    if (this.control) {
      return this.control.disabled;
    }
    return false;
  }

  constructor(public readonly detector: ChangeDetectorRef) {
    super();
  }

  public ngOnInit(): void {
    this.isReady = true;
  }

}
