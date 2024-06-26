import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  Type,
  ViewChild,
  ElementRef,
  Optional,
  Host,
  Renderer2,
  OnChanges,
} from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { differenceBy } from 'lodash';

import { YueUiColDirective, YueUiGridDirective, YueUiGridEmbeddedProperty } from '@joaopedro61/yue-ui/grid';

import { equals, setHiddenProp } from '@joaopedro61/yue-ui/core/utils';
import {
  yueUiFormularyAddValidator,
  yueUiFormularyGetValidators,
  yueUiFormularyGetValidatorsMessages,
  YueUiFormularyUtilsValidator,
  YueUiFormularyDescriptorComponent,
  YueUiFormularyLabelComponent
} from '@joaopedro61/yue-ui/formulary/utils';


import {
  FormularySource,
  Modifiers,
  FormularyComponent
} from './../fix-ralacional';

import { INTERNALS } from './../abstract/internals';
import { FieldAbstraction } from './../abstract/abstraction';




@Component({
  template: `
    <ng-container *ngIf="struct && struct.struct.template">
      <div class="field-template">
        <yue-ui-smart-render [yueUiSmartRender]="struct.struct.template" [yueUiSmartRenderContext]="context"></yue-ui-smart-render>
      </div>
    </ng-container>
    <ng-container #vcr></ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.wrapper]': 'true',
    '[class.yue-ui-formulary-builder-content-wrapper]': 'true',
  }
})
export class WrapperComponent extends YueUiColDirective implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @ViewChild(`vcr`, { static: false, read: ViewContainerRef })
  private readonly vcr!: ViewContainerRef;

  private readonly untilDestroy$: Subject<any> = new Subject();

  private old!: Modifiers.GeneratedFieldMetadata;

  private abstractControl!: AbstractControl;

  public readonly parent!: FormularyComponent;

  public formulary!: FormularySource;

  public struct!: Modifiers.GeneratedFieldMetadata;

  public firstMountControl = true;

  public valuesChangesCounter = 0;

  public get context(): {[x: string]: any} {
    return this.generateContextProps();
  }

  private componenetsRefs: {
    label?: ComponentRef<YueUiFormularyLabelComponent>;
    descriptor?: ComponentRef<YueUiFormularyDescriptorComponent>;
    field?: ComponentRef<FieldAbstraction>;
    wrappers: {[k: string]: ComponentRef<WrapperComponent>};
  } = {
    wrappers: {},
  };

  constructor(
    elementRef: ElementRef,
    @Optional() @Host() grid: YueUiGridDirective,
    renderer: Renderer2,
    private readonly cfr: ComponentFactoryResolver
  ) {
    super(elementRef, grid, renderer);
  }

  private generateContextProps(): {[x: string]: any} {
    return {
      field: this.struct.struct,
      formulary: this.formulary,
    };
  }

  private isRequired(): boolean {
    return this.struct.struct.indicators
      && `required` in this.struct.struct.indicators
        ? !!this.struct.struct.indicators[`required`]
        : false;
  }

  private isInvalid(): boolean {
    return this.abstractControl.invalid;
  }

  private getErrorsMessages(): {[x: string]: string} {
    if (this.isInvalid()) {
      const errors: {[c: string]: string} | null = this.abstractControl.errors;
      if (errors) {
        const keys: string[] = Object.keys(errors);
        if (keys.length) {
          const messages: {[s: string]: string} = {};
          const msgs: (string | ((...args: any[]) => string))[] = yueUiFormularyGetValidatorsMessages(keys) as any;
          for (let i = 0, l = msgs.length; i < l; i++) {
            if (typeof msgs[i] === `function`) {
              messages[keys[i]] = (msgs[i] as any)() as unknown as any;
            } else {
              messages[keys[i]] = msgs[i] as any;
            }
          }
          return messages;
        } else {
          return {};
        }
      }
    }
    return {};
  }

  private checkLabelProps(shouldForceEmitChanges: boolean = false): void {
    const ref = this.componenetsRefs.label;
    let executeDetectChanges = false;
    if (ref) {
      const field = this.struct.struct;
      ref.instance.context = this.generateContextProps();
      if (ref.instance.label !== field.label) {
        ref.instance.label = field.label;
        executeDetectChanges = true;
      }
      const isInvalid: boolean = this.isInvalid();
      if (isInvalid !== ref.instance.isInvalid) {
        ref.instance.invalid = isInvalid;
        executeDetectChanges = true;
      }
      const isRequired: boolean = this.isRequired();
      if (isRequired !== ref.instance.isRequired) {
        ref.instance.required = isRequired;
        executeDetectChanges = true;
      }
      if (executeDetectChanges || shouldForceEmitChanges) {
        ref.changeDetectorRef.markForCheck();
        ref.changeDetectorRef.detectChanges();
        ref.instance.cdr.markForCheck();
        ref.instance.cdr.detectChanges();
      }
    }
  }

  private checkDescriptorProps(shouldForceEmitChanges: boolean = false): void {
    const ref = this.componenetsRefs.descriptor;
    let executeDetectChanges = false;
    if (ref) {
      const field = this.struct.struct;
      ref.instance.context = this.generateContextProps();
      if (field.description !== ref.instance.description) {
        ref.instance.description = field.description;
        executeDetectChanges = true;
      }
      if (this.isInvalid()) {
        const old = ref.instance.errors;
        const messages = this.getErrorsMessages();
        const firstKey = Object.keys(messages).shift();
        let message: {[x: string]: string} | null;
        if (firstKey) {
          message = { [firstKey as string]: messages[firstKey] };
        } else {
          message = null;
        }
        if (!old) {
          ref.instance.errors = message;
          executeDetectChanges = true;
        } else {
          const firstKeyOld = Object.keys(old).shift();
          if (firstKeyOld) {
            if (!messages.hasOwnProperty(firstKeyOld)) {
              ref.instance.errors = message;
              executeDetectChanges = true;
            }
          } else {
            ref.instance.errors = message;
            executeDetectChanges = true;
          }
        }
      } else {
        if (ref.instance.errors !== null) {
          ref.instance.errors = null;
          executeDetectChanges = true;
        }
      }
      if (executeDetectChanges || shouldForceEmitChanges) {
        setTimeout(() => {
          ref.instance.cdr.markForCheck();
          ref.instance.cdr.detectChanges();
        });
      }
    }
  }

  private checkFieldProps(shouldForceEmitChanges: boolean = false): void {
    const field = this.struct.struct;
    const ref = this.componenetsRefs.field;
    let executeDetectChanges = false;
    if (ref) {
      if (ref.instance.field !== field) {
        if (!ref.instance.field) {
          setHiddenProp(ref.instance, `field`, field, true);
          executeDetectChanges = true;
        }
      }
      if (ref.instance.formulary !== this.formulary) {
        if (!ref.instance.formulary) {
          setHiddenProp(ref.instance, `formulary`, this.formulary, true);
          executeDetectChanges = true;
        }
      }
      if (ref.instance.parent !== this) {
        if (!ref.instance.parent) {
          setHiddenProp(ref.instance, `parent`, this, true);
          executeDetectChanges = true;
        }
      }
      if (ref.instance.identifier !== field.identifier) {
        setHiddenProp(ref.instance, `identifier`, field.identifier, true);
        executeDetectChanges = true;
      }
      if (executeDetectChanges || shouldForceEmitChanges) {
        ref.changeDetectorRef.markForCheck();
        ref.changeDetectorRef.detectChanges();
      }
    }
  }

  public checkAllProps(forceEmitChanges: boolean = false): void {
    this.checkLabelProps(forceEmitChanges);
    this.checkDescriptorProps(forceEmitChanges);
    this.checkFieldProps(forceEmitChanges);
  }

  private createLabel(): void {
    if (this.formulary && !this.formulary.isHiddenLabel) {
      const ref = this.vcr.createComponent(this.cfr.resolveComponentFactory(YueUiFormularyLabelComponent), 0);
      this.componenetsRefs.label = ref;
      this.checkLabelProps();
      setTimeout(() => this.checkLabelProps());
    }
  }

  private destroyLabel(): void {
    if (this.componenetsRefs.label) {
      this.componenetsRefs.label.destroy();
      delete this.componenetsRefs.label;
    }
  }

  private gotoStateOfLabel(destroy: boolean): void {
    if (destroy) {
      if (this.componenetsRefs.label) {
        this.destroyLabel()
      }
    } else {
      if (!this.componenetsRefs.label) {
        this.createLabel()
      }
    }
  }

  private createDescriptor(): void {
    if (this.formulary && !this.formulary.isHiddenDescriptor) {
      const insertAt: number = Object.keys(this.componenetsRefs).length - 1;
      const ref = this.vcr.createComponent(this.cfr.resolveComponentFactory(YueUiFormularyDescriptorComponent), insertAt);
      this.componenetsRefs.descriptor = ref;
      this.checkDescriptorProps();
      setTimeout(() => this.checkDescriptorProps());
    }
  }

  private destroyDescriptor(): void {
    if (this.componenetsRefs.descriptor) {
      this.componenetsRefs.descriptor.destroy();
      delete this.componenetsRefs.descriptor;
    }
  }

  private gotoStateOfDescriptor(destroy: boolean): void {
    if (destroy) {
      if (this.componenetsRefs.descriptor) {
        this.destroyDescriptor()
      }
    } else {
      if (!this.componenetsRefs.descriptor) {
        this.createDescriptor()
      }
    }
  }

  private createWrapper(): void {
    if (this.struct.struct.wrapper) {
      const wrapper = this.struct.struct.wrapper;
      if (wrapper.length) {
        if (wrapper) {
          for (let i = 0, l = wrapper.length; i < l; i++) {
            if (wrapper[i].identifier) {
              const ref = this.vcr.createComponent(this.cfr.resolveComponentFactory(WrapperComponent));
              this.componenetsRefs.wrappers[wrapper[i].identifier] = ref;
              ref.instance.struct = wrapper[i];
              ref.instance.formulary = this.formulary;
              ref.changeDetectorRef.markForCheck();
              ref.changeDetectorRef.detectChanges();
            }
          }
        }
      }
    }
  }

  private createField(): void {
    if (this.struct.struct.type) {
      const type: string = this.struct.struct.type;
      if (type) {
        const field: Type<any> | undefined = INTERNALS[type];
        if (field) {
          const insertAt: number = this.componenetsRefs.label
            ? 1
            : 0;
          const ref: ComponentRef<FieldAbstraction> =
              this.vcr.createComponent(this.cfr.resolveComponentFactory(field), insertAt);
          this.componenetsRefs.field = ref;
          this.checkFieldProps();
        }
      }
    }
  }

  private should(): void {
    this.createLabel();
    this.createField();
    this.createDescriptor();
    this.createWrapper();
  }

  private createWrapperSingle(wrapper: Modifiers.GeneratedFieldMetadata, index?: number): void {
    if (wrapper.identifier) {
      const factory = this.cfr.resolveComponentFactory(WrapperComponent);
      const ref = this.vcr.createComponent(factory, typeof index === `number` ? index : undefined);
      ref.instance.formulary = this.formulary;
      ref.instance.struct = wrapper;
      this.componenetsRefs.wrappers[wrapper.identifier] = ref;
      ref.changeDetectorRef.markForCheck();
    }
  }

  private excludeWrappers(wrappers: string[]): void {
    for (let i = 0, l = wrappers.length; i < l; i++) {
      if (this.componenetsRefs.wrappers.hasOwnProperty(wrappers[i])) {
        this.componenetsRefs.wrappers[wrappers[i]].destroy();
        delete this.componenetsRefs.wrappers[wrappers[i]];
      }
    }
  }

  private addWrappers(wrappers: { index: number; wrapper: Modifiers.GeneratedFieldMetadata; }[]): void {
    if (wrappers.length) {
      for (let i = 0, l = wrappers.length; i < l; i++) {
        if (wrappers[i].wrapper.identifier) {
          this.createWrapperSingle(wrappers[i].wrapper, wrappers[i].index);
        }
      }
    }
  }

  private selfCheck(): void {
    const current: Modifiers.GeneratedFieldMetadata[] = this.struct.struct.wrapper || [];
    const old: Modifiers.GeneratedFieldMetadata[] = !this.old || !this.old.struct ? [] : this.old.struct.wrapper || [];

    const toAdd = differenceBy(current, old, `identifier`);
    const toRemove = differenceBy(old, current, `identifier`);
    const excludeFields: string[] = [];
    const addFields: { index: number; wrapper: Modifiers.GeneratedFieldMetadata; }[] = [];
    for (let i = 0, l = toRemove.length; i < l; i++) {
      if (toRemove[i].identifier) {
        excludeFields.push(toRemove[i].identifier);
      }
    }
    if (toAdd.length) {
      for (let j = 0, k = toAdd.length; j < k; j++) {
        for (let i = 0, l = current.length; i < l; i++) {
          if (current[i].identifier) {
            if (toAdd[j].identifier) {
              if (current[i].identifier === toAdd[j].identifier) {
                addFields.push({
                  index: i,
                  wrapper: toAdd[j],
                });
                break;
              }
            }
          }
        }
      }
    }
    if (excludeFields.length) {
      this.excludeWrappers(excludeFields);
    }
    if (addFields.length) {
      this.addWrappers(addFields);
    }
  }

  private updateSyntheticValue(value: any): void {
    const field = this.struct.struct;
    if (field) {
      if (field.identifier) {
        this.formulary.setSyntheticModel(field.identifier, value);
        this.checkAllProps();
      }
    }
  }

  private registryControlValueChanger(): void {
    const field = this.struct.struct;
    let control!: AbstractControl;
    if (this.abstractControl) {
      control = this.abstractControl;
    } else {
      if (field.identifier) {
        const cached = this.formulary.getControl(field.identifier);
        if (cached) {
          control = cached;
        }
      } else {
        console.warn(`Field identifier isn't found!`);
      }
    }
    if (control) {
      if (this.valuesChangesCounter) {
        this.valuesChangesCounter++;
        return void 0;
      }
      control
        .valueChanges
        .pipe(takeUntil(this.untilDestroy$), distinctUntilChanged(equals))
        .subscribe({
          next: (v: any) => this.updateSyntheticValue(v),
        });

      this.valuesChangesCounter++;
    }
  }

  private assignValidations(): void {
    const field = this.struct.struct;
    let control!: AbstractControl;
    if (this.abstractControl) {
      control = this.abstractControl;
    } else {
      if (field.identifier) {
        const cached = this.formulary.getControl(field.identifier);
        if (cached) {
          control = cached;
        }
      } else {
        console.warn(`Field identifier isn't found!`);
      }
    }
    if (control) {
      control.clearValidators();
      const validators: any = [];
      if (field.validators && field.validators.length) {
        const existent: string[] = field.validators.filter(i => typeof i === 'string') as string[];
        field.validators
          .filter(i => typeof i === 'object')
          .forEach((i: any) => {
            yueUiFormularyAddValidator((i as YueUiFormularyUtilsValidator));
            existent.push((i as YueUiFormularyUtilsValidator).name);
          });
        const vals = yueUiFormularyGetValidators(existent);
        if (Array.isArray(vals)) {
          for (let i = 0, l = vals.length; i < l; i++) {
            if (vals[i]) {
              validators.push(vals[i]);
            }
          }
        }
      }
      if (validators.length) {
        control.setValidators(validators);
      }
    }
  }

  private registryControl(): void {
    const field = this.struct.struct;
    if (field.identifier && field.type) {
      const cached: AbstractControl | null = this.formulary.getControl(field.identifier);
      this.firstMountControl = !cached;
      let control!: AbstractControl;
      if (cached) {
        control = cached;
      } else {
        control = new FormControl();
      }
      this.abstractControl = control;
      if (typeof field.enable === `boolean` && !field.enable) {
        this.abstractControl.disable({
          onlySelf: true,
          emitEvent: true
        });
      }
      this.registryControlValueChanger();
      if (!cached) {
        this.formulary.registryControl(field.identifier, control);
      }
      if (this.firstMountControl) {
        this.assignValidations();
        const model: any = this.formulary.getPureModel();
        if (model.hasOwnProperty(field.identifier)) {
          const value: any = model[field.identifier];
          if (value !== undefined && value !== null) {
            control.setValue(value);
            control.markAsDirty();
            control.updateValueAndValidity();
          }
        } else if (field.default !== undefined && field.default !== null) {
          control.setValue(field.default);
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      }
    }
  }

  private checkDefsProps(changes: Modifiers.HistoryChanges): void {
    const {
      label,
      description,
      width,
      enabled
    } = changes;
    if (label) {
      this.checkLabelProps();
    }
    if (description) {
      this.checkDescriptorProps();
    }
    if (width) {
      this.configureWidth();
    }
    if (this.abstractControl) {
      if (typeof enabled === `boolean` && !enabled) {
        if (this.abstractControl.enabled) {
          this.abstractControl.disable({
            onlySelf: true,
            emitEvent: true
          });
        }
      } else {
        if (this.abstractControl.disabled) {
          this.abstractControl.enable({
            onlySelf: true,
            emitEvent: true
          });
        }
      }
    }
  }

  private registryChangesHandler(): void {
    const meta = this.struct;
    if (meta) {
      if (meta.setChangeHandler) {
        meta.setChangeHandler(`wrapper`, this.checkDefsProps.bind(this));
      }
    }
  }

  private configureWidth(): void {
    if (this.formulary.useGridSystem) {
      const defaults: YueUiGridEmbeddedProperty = {
        span: 24,
        pull: 0,
        push: 0,
        offset: 0
      };
  
      if (this.struct && this.struct.struct) {
        if (typeof this.struct.struct.width === `number`) {
          defaults.span = this.struct.struct.width;
        }
      }
  
      const getConfig = (from: 'lg' | 'md' | 'xs' | 'sm' | 'xl' | 'xxl'): YueUiGridEmbeddedProperty => {
        if (this.struct && this.struct.struct) {
          if (typeof this.struct.struct.width === `number`) {
            defaults.span = this.struct.struct.width;
          } else if (typeof this.struct.struct.width === `object` && from in this.struct.struct.width) {
            return (this.struct.struct.width as Partial<any>)[from];
          }
        }
        return defaults;
      };
  
      const generateEmbbed = (from: 'lg' | 'md' | 'xs' | 'sm' | 'xl' | 'xxl'): YueUiGridEmbeddedProperty => {
        return Object.assign({}, defaults, getConfig(from));
      };
  
      this.yueUiGridColLg = generateEmbbed(`lg`);
      this.yueUiGridColMd = generateEmbbed(`md`);
      this.yueUiGridColXs = generateEmbbed(`xs`);
      this.yueUiGridColSm = generateEmbbed(`sm`);
      this.yueUiGridColXl = generateEmbbed(`xl`);
      this.yueUiGridColXXl = generateEmbbed(`xxl`);

    } else {
      this.yueUiGridColLg = null;
      this.yueUiGridColMd = null;
      this.yueUiGridColXs = null;
      this.yueUiGridColSm = null;
      this.yueUiGridColXl = null;
      this.yueUiGridColXXl = null;
    }

    super.setHostClassMap();
  }

  public checkWrapperTree(): void {
    for (const component in this.componenetsRefs.wrappers) {
      if (this.componenetsRefs.wrappers[component].instance) {
        this.componenetsRefs.wrappers[component].instance.checkWrapperTree();
      }
    }
    this.selfCheck();
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.configureWidth();
    this.old = JSON.parse(JSON.stringify(Object.assign({}, {...this.struct})));
    if (!this.struct.identifier && (!this.struct.struct.wrapper && !this.struct.struct.template)) {
      throw new Error('Sorry, but the inputs that haven\'t the property "key", must be have the property "wrapper" or "template".');
    }
    if (this.struct.struct.identifier && !this.struct.struct.type) {
      throw new Error('Sorry, but the inputs that have a property "key", must be have the property "type".');
    }
    if (this.struct.struct.type && !this.struct.struct.identifier) {
      throw new Error('Sorry, but the inputs that have a property "type", must be have the property "key".');
    }
    this.registryChangesHandler();
    this.registryControl();
  }

  public ngAfterViewInit(): void {
    this.should();
    super.ngAfterViewInit();

    if (this.formulary) {
      this.formulary
        .unknownChanges$
        .pipe(takeUntil(this.untilDestroy$))
        .subscribe({
          next: (e) => {
            if (e && typeof e === `object` && !Array.isArray(e)) {
              const { hideLabels, hideDescriptors } = e;
              if (hideLabels) {
                this.gotoStateOfLabel(hideLabels);
              }
              if (hideDescriptors) {
                this.gotoStateOfDescriptor(hideDescriptors);
              }
              if ('useGridSystem' in e) {
                this.configureWidth();
              }
            }
          }
        });
    }
  }

  public ngOnChanges(): void {
    super.ngOnChanges();
  }

  public ngOnDestroy(): void {
    for (const component in this.componenetsRefs) {
      if (this.componenetsRefs.hasOwnProperty(component)) {
        if ((this.componenetsRefs as any)[component] instanceof ComponentRef) {
          (this.componenetsRefs as any)[component as any].destroy();
        } else if (Array.isArray((this.componenetsRefs as any)[component])) {
          for (let i = 0, l = (this.componenetsRefs as any)[component].length; i < l; i++) {
            if ((this.componenetsRefs as any)[component][i] instanceof ComponentRef) {
              (this.componenetsRefs as any)[component][i].destroy();
            }
          }
        } else if (typeof (this.componenetsRefs as any)[component] === `object`) {
          for (const component_1 in (this.componenetsRefs as any)[component]) {
            if ((this.componenetsRefs as any)[component][component_1].instance) {
              (this.componenetsRefs as any)[component][component_1].instance.checkWrapperTree();
            }
          }
        }
      }
    }
    this.untilDestroy$.next();
    this.untilDestroy$.complete();

    super.ngOnDestroy();
  }

}
