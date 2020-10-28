import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, Input, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { YueUiSmartRenderType } from '@joaopedro61/yue-ui/smart-render';

import { yueUiFormularyGetValidatorsMessages } from './../validators';




@Component({
  selector: 'yue-ui-formulary-descriptor',
  template: `
    <div class="yue-ui-formulary-field-descriptor-wrapper">
      <div *ngIf="message" class="invalid-message">
        <span [innerText]="message"></span>
      </div>
      <ng-container *ngIf="description && !message">
        <div class="yue-ui-formulary-field-descriptor-wrapper-inner">
          <div class="yue-ui-formulary-field-descriptor-wrapper-inner-template">
            <yue-ui-smart-render [yueUiSmartRender]="description" [yueUiSmartRenderContext]="context"></yue-ui-smart-render>
          </div>
        </div>
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  providers: [ ],
  host: {
    '[class.yue-ui-formulary-field-descriptor]': `true`,
    '[class.yue-ui-formulary-field-descriptor-invalid]': `!!message`,
    '[class.yue-ui-formulary-descriptor]': `true`,
  },
  exportAs: 'yueUiFormularyDescriptorRef'
})
export class YueUiFormularyDescriptorComponent implements OnInit, AfterViewInit {

  @Input(`yueUiFormularyDescriptorDescription`)
  public description!: YueUiSmartRenderType;

  @Input(`yueUiFormularyDescriptorRenderContext`)
  public context: Partial<any> = {};

  @Input(`yueUiFormularyDescriptorErrors`)
  public errors!: string | FormControl | AbstractControl | Partial<any> | null;

  constructor(public readonly cdr: ChangeDetectorRef) { }

  public get message(): string | Observable<string> | null {
    if (this.errors) {
      if (this.errors instanceof FormControl || this.errors instanceof AbstractControl) {
        const message = yueUiFormularyGetValidatorsMessages(Object.keys(this.errors.errors || {})).shift();
        if (message instanceof Observable) {
          return message;
        } else if (typeof message === 'function') {
          return message();
        } else {
          return message || null;
        }
      } else if (!Array.isArray(this.errors) && typeof this.errors === 'object') {
        const message = yueUiFormularyGetValidatorsMessages(Object.keys(this.errors || {})).shift();
        if (message instanceof Observable) {
          return message;
        } else if (typeof message === 'function') {
          return message();
        } else {
          return message || null;
        }
      } else if (typeof this.errors === 'string') {
        return this.errors;
      }
    }
    return null;
  }
  
  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
  }

}
