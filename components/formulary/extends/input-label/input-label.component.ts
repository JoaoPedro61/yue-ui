import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Formulary } from '../../formulary';



@Component({
  template: `
    <ng-container *ngIf="show">
      <div class="input-label-container" [class.invalid]="isInvalid">
        <label class="input-label" *ngIf="label.length">
          <span [innerText]="label"></span>
          <ng-container *ngIf="isRequired">
            <span class="required-indicator">*</span>
          </ng-container>
        </label>
      </div>
    </ng-container>
  `,
  styleUrls: ['./input-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueInputLabelComponent<T = any> implements OnInit, OnDestroy {

  @Input() public formGroup!: FormGroup;

  @Input() public field!: any;

  @Input() public model!: Observable<any>;

  @Input() public options!: Observable<any>;

  @Input() public formulary!: Formulary<T>;

  @Input() public control!: FormControl;

  private subscription$!: Subscription;

  public get show(): boolean {
    if (this.formulary) {
      return true;
    }
    return true;
  }

  public get label(): string {
    if (this.field) {
      if ('function' === typeof this.field.label) {
        return this.field.label();
      } else {
        return this.field.label || '';
      }
    }
    return '';
  }

  public get isRequired(): boolean {
    if (this.field) {
      return !!(this.field as any).__required__;
    }
    return false;
  }

  public get isInvalid(): boolean {
    if (this.control) {
      return !this.control.valid;
    }
    return false;
  }

  constructor(private readonly detector: ChangeDetectorRef) { }

  public ngOnInit(): void {
    if (this.control) {
      this.subscription$ = this.control.valueChanges
        .subscribe(() => {
          this.detector.detectChanges();
        });
    }
  }

  public ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

}
