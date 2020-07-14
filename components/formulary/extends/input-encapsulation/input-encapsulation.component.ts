import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, OnDestroy, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit, Inject, ComponentFactory, ComponentRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import getvalidators, { ValidatorObjectFormation } from './../../validators/validators';
import { YueInputLabelComponent } from './../input-label/input-label.component';
import { YueInputDescriptorComponent } from './../input-descriptor/input-descriptor.component';
import { Observable } from 'rxjs';
import { FORMULARY_COMPONENTS_TOKEN } from './../../formulary.tokens';
import { serializeStringJsonPath } from './../../../commons/serialize-string-json-path';

import Interfaces from './../../fix-ralacional';



@Component({
  template: `
    <div class="encapsulation-wrapper">
      <ng-container #viewRefLabel></ng-container>
      <ng-container #viewRefInput></ng-container>
      <ng-container #viewRefDescriptor></ng-container>
    </div>
  `,
  styleUrls: ['./input-encapsulation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YueInputEncapsulationComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('viewRefLabel', { read: ViewContainerRef, static: false }) private viewRefLabel!: ViewContainerRef;

  @ViewChild('viewRefInput', { read: ViewContainerRef, static: false }) private viewRefInput!: ViewContainerRef;

  @ViewChild('viewRefDescriptor', { read: ViewContainerRef, static: false }) private viewRefDescriptor!: ViewContainerRef;

  @Input() public formGroup!: FormGroup;

  @Input() public field!: any;

  @Input() public model!: Observable<any>;

  @Input() public options!: Observable<any>;

  @Input() public formulary!: any;

  private control!: FormControl;

  private componentLabelFactory!: ComponentFactory<YueInputLabelComponent>;

  private componentLabelRef!: ComponentRef<YueInputLabelComponent>;

  private componentInputFactory!: ComponentFactory<any>;

  private componentInputRef!: ComponentRef<any>;

  private componentDescriptorFactory!: ComponentFactory<YueInputDescriptorComponent>;

  private componentDescriptorRef!: ComponentRef<YueInputDescriptorComponent>;

  constructor(@Inject(FORMULARY_COMPONENTS_TOKEN) private readonly inputs: Interfaces.ComponentsInjection, private readonly detector: ChangeDetectorRef, private readonly cfr: ComponentFactoryResolver) { }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void {
    if (this.field.key) {
      const contains = this.formGroup.contains(this.field.key);
      if (contains) {
        const control = this.formGroup.controls[this.field.key] as any;
        if (control) {
          control.clearValidators();
          let validators = [];
          if (this.field.validators) {
            (this.field as any).__required__ = /required\$\$/.test(this.field.validators.join('$$'));
            validators = getvalidators(this.field.validators).map((item: ValidatorObjectFormation) => item.validator);
          }
          control.setValidators(validators);
          this.control = control;
          if (this.field.key) {
            const modelSerialized = serializeStringJsonPath(this.formulary.snapshotModel);
            if (modelSerialized) {
              if (modelSerialized.hasOwnProperty(this.field.key)) {
                const value = modelSerialized[this.field.key];
                if (value !== undefined && value !== null) {
                  this.control.setValue(value);
                }
              }
            }
          }
        }
      } else {
        const control: FormControl = new FormControl();
        let validators = [];
        if (this.field.validators) {
          (this.field as any).__required__ = /required\$\$/.test(this.field.validators.join('$$') + '$$');
          validators = getvalidators(this.field.validators).map((item: ValidatorObjectFormation) => item.validator);
        }
        control.setValidators(validators);
        this.formGroup.setControl(this.field.key, control);
        this.control = control;
        if (this.field.key) {
          const modelSerialized = serializeStringJsonPath(this.formulary.snapshotModel);
          if (modelSerialized) {
            if (modelSerialized.hasOwnProperty(this.field.key)) {
              const value = modelSerialized[this.field.key];
              if (value !== undefined && value !== null) {
                this.control.setValue(value);
              }
            }
          }
        }
      }
    }
    this.componentLabelFactory = this.cfr.resolveComponentFactory(YueInputLabelComponent);
    this.componentLabelRef = this.viewRefLabel.createComponent(this.componentLabelFactory);
    this.componentLabelRef.instance.field = this.field;
    this.componentLabelRef.instance.model = this.model;
    this.componentLabelRef.instance.options = this.options;
    this.componentLabelRef.instance.formGroup = this.formGroup;
    this.componentLabelRef.instance.formulary = this.formulary;
    this.componentLabelRef.instance.control = this.control;
    this.componentLabelRef.changeDetectorRef.markForCheck();
    this.componentLabelRef.changeDetectorRef.detectChanges();
    if (this.field.type) {
      if (!this.inputs.hasOwnProperty(this.field.type)) {
        throw new Error(`Sorry, but the type "${this.field.type}" don't exist in the inputs schemes. You can create it and import your input component in the injection token "FORMULARY_COMPONENTS_TOKEN".`);
      } else {
        this.componentInputFactory = this.cfr.resolveComponentFactory(this.inputs[this.field.type]);
        this.componentInputRef = this.viewRefInput.createComponent(this.componentInputFactory);
        this.componentInputRef.instance.field = this.field;
        this.componentInputRef.instance.model$ = this.model;
        this.componentInputRef.instance.options$ = this.options;
        this.componentInputRef.instance.control = this.control;
        this.componentInputRef.instance.formGroup = this.formGroup;
        this.componentInputRef.instance.formulary = this.formulary;
        this.componentInputRef.instance.detector = this.componentInputRef.changeDetectorRef;
        this.componentInputRef.changeDetectorRef.markForCheck();
        if ('function' === typeof this.componentInputRef.instance.init) {
          this.componentInputRef.instance.init();
        }
        this.componentInputRef.changeDetectorRef.detectChanges();
      }
    } else {
      throw new Error(`Sorry, but you can only create a input if her type exists.`);
    }
    this.componentDescriptorFactory = this.cfr.resolveComponentFactory(YueInputDescriptorComponent);
    this.componentDescriptorRef = this.viewRefDescriptor.createComponent(this.componentDescriptorFactory);
    this.componentDescriptorRef.instance.field = this.field;
    this.componentDescriptorRef.instance.model = this.model;
    this.componentDescriptorRef.instance.options = this.options;
    this.componentDescriptorRef.instance.formGroup = this.formGroup;
    this.componentDescriptorRef.instance.formulary = this.formulary;
    this.componentDescriptorRef.instance.control = this.control;
    this.componentDescriptorRef.changeDetectorRef.markForCheck();
    this.componentDescriptorRef.changeDetectorRef.detectChanges();
  }

  public ngOnDestroy(): void {
    if (this.field.key) {
      if (this.formGroup.contains(this.field.key)) {
        this.formGroup.removeControl(this.field.key);
      }
    }
  }

}
