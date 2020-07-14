import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'yue-switch',
  template: `
    <div class="checker-wrapper">
      <ng-container *ngIf="type === 'normal'">
        <div class="normal-checker" [class.focusing]="isfocusing" [class.disabled]="isDisabled">
          <ng-container *ngIf="!isAbstract">
            <input class="switch" type="checkbox" (focus)="isfocusing = true;" (blur)="isfocusing = false;"
              (change)="changed()" [value]="modelValue">
          </ng-container>
          <ng-container *ngIf="isAbstract">
            <input class="switch" type="checkbox" (focus)="isfocusing = true;" (blur)="isfocusing = false;"
              [formControl]="abstractControl">
          </ng-container>
          <span class="labels">
            <span class="active" [innerHTML]="activeLabel"></span>
            <span class="unactive" [innerHTML]="unactiveLabel"></span>
          </span>
          <span class="handler"></span>
        </div>
      </ng-container>
      <ng-container *ngIf="type === 'indeterminate'">
        <div class="indeterminate-checker" [class.indeterminate]="isIndeterminated" [class.focusing]="isfocusing"
          [class.disabled]="isDisabled">
          <ng-container *ngIf="!isAbstract">
            <input class="switch" type="checkbox" (focus)="isfocusing = true;" (blur)="isfocusing = false;"
              (change)="changed()" [value]="modelValue">
          </ng-container>
          <ng-container *ngIf="isAbstract">
            <input class="switch" type="checkbox" (focus)="isfocusing = true;" (blur)="isfocusing = false;"
              [formControl]="abstractControl" (change)="changed()">
          </ng-container>
          <span class="labels">
            <span class="active" [innerHTML]="activeLabel"></span>
            <span class="unactive" [innerHTML]="unactiveLabel"></span>
          </span>
          <span class="handler"></span>
        </div>
      </ng-container>
    </div>
  `,
  styleUrls: ['./input-switch.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueInputSwitchComponent implements OnInit {

  private model$!: boolean | null;

  private oldValue: any;

  public isfocusing = false;

  @Output() public modelChange: EventEmitter<boolean | null> = new EventEmitter();

  @Input() public abstractControl!: FormControl;

  @Input() public disabled!: boolean;

  @Input() public onLabel!: string;

  @Input() public offLabel!: string;

  @Input()
  public get model() {
    return this.model$;
  }

  public set model(val: boolean | null) {
    this.model$ = val;
    this.modelChange.emit(this.model$);
  }

  @Input() public type: 'normal' | 'indeterminate' | 'radio' = 'normal';

  public get modelValue(): any {
    if (this.abstractControl) {
      if (`string` === typeof this.abstractControl.value) {
        if (this.abstractControl.value === `true`) {
          return true;
        }
        return false;
      }
      return this.abstractControl.value;
    } else {
      return this.model;
    }
  }

  public get isDisabled(): boolean {
    if (this.abstractControl) {
      return this.abstractControl.disabled;
    } else {
      return !!this.isDisabled;
    }
  }

  public get isAbstract(): boolean {
    return !!this.abstractControl;
  }

  public get activeLabel(): string {
    return this.onLabel || '';
  }

  public get unactiveLabel(): string {
    return this.offLabel || '';
  }

  public get isIndeterminated(): boolean {
    return this.oldValue === null;
  }

  constructor(private readonly detector: ChangeDetectorRef) { }

  public changed(): void {
    if (this.type === 'indeterminate') {
      if (this.abstractControl) {
        if (typeof this.oldValue === 'boolean') {
          if (!this.oldValue) {
            this.abstractControl.setValue(null);
            this.oldValue = null;
          } else {
            this.abstractControl.setValue(false);
            this.oldValue = false;
          }
        } else {
          if (this.oldValue === null) {
            this.abstractControl.setValue(true);
            this.oldValue = true;
          }
        }
      }
    } else {
      if (!this.abstractControl) {
        /* TODO: Unique component */
      }
    }
    this.detector.detectChanges();
  }

  public ngOnInit(): void {
    if (this.abstractControl) {
      this.oldValue = this.abstractControl.value;
    }
  }

}
