import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { getMessages, ValidatorsMessages, ValidatorMessage } from '../../validators/validators';



@Component({
  template: `
    <ng-container *ngIf="show">
      <div class="input-descriptor-wrapper" [class.invalid]="isInvalid">
        <div class="input-descriptor-error">
          <span [innerText]="validation"></span>
        </div>
        <div class="input-descriptor-container" *ngIf="description.length">
          <p class="input-descriptor">
            <span [innerText]="description"></span>
          </p>
        </div>
      </div>
    </ng-container>
  `,
  styleUrls: ['./input-descriptor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueInputDescriptorComponent<T = any> implements OnInit, OnDestroy {

  @Input() public formGroup!: FormGroup;

  @Input() public field!: any;

  @Input() public model!: Observable<any>;

  @Input() public options!: Observable<any>;

  @Input() public formulary!: any;

  @Input() public control!: FormControl;

  private subscription$!: Subscription;

  private currentValidationMessage!: ValidatorMessage | null;

  private allValidatorsMessages!: ValidatorsMessages | null;

  public get show(): boolean {
    if (this.formulary) {
      return this.formulary.descriptors;
    }
    return true;
  }

  public get description(): string {
    if (this.field) {
      if ('function' === typeof this.field.description) {
        return this.field.description();
      } else {
        return this.field.description || '';
      }
    }
    return '';
  }

  public get isInvalid(): boolean {
    if (this.control) {
      return !this.control.valid;
    }
    return false;
  }

  public get validation(): string {
    if (this.currentValidationMessage) {
      if ('function' === typeof this.currentValidationMessage) {
        this.currentValidationMessage();
      } else {
        if ('string' === typeof this.currentValidationMessage) {
          return this.currentValidationMessage;
        } else {
          return 'Validation error';
        }
      }
    }
    return '';
  }

  constructor(private readonly detector: ChangeDetectorRef) { }

  private checkErrors(): void {
    if (this.control.errors) {
      const errors: string[] = Object.keys(this.control.errors);
      if (errors.length) {
        const allErrors = getMessages(errors);
        if (allErrors.length) {
          this.currentValidationMessage = allErrors[0];
          this.allValidatorsMessages = allErrors;
        }
      }
    } else {
      this.currentValidationMessage = null;
      this.allValidatorsMessages = [];
    }
    this.detector.detectChanges();
  }

  public ngOnInit(): void {
    this.checkErrors();
    if (this.control) {
      this.subscription$ = this.control.valueChanges
        .subscribe(() => {
          this.checkErrors();
        });
    }
  }

  public ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

}
