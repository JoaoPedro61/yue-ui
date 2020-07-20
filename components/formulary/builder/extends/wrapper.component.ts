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
  ViewChild
} from '@angular/core';

import {
  Formulary,
  Modifiers
} from './../fix-ralacional';
import { LabelComponent } from './label.component';
import { DescriptorComponent } from './descriptor.component';
import { Subject } from 'rxjs';
import { differenceBy } from 'lodash';
import { INTERNALS } from './../abstract/internals';



@Component({
  template: `
    <ng-container *ngIf="struct && struct.struct.template">
      <div class="field-template">
        <ng-container *yueUiStringTemplateRefRender="struct.struct.template">{{ struct.struct.template }}</ng-container>
      </div>
    </ng-container>
    <ng-container #vcr></ng-container>
  `,
  styleUrls: ['./../styles/wrapper.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.wrapper]': 'true'
  }
})
export class WrapperComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(`vcr`, { static: false, read: ViewContainerRef })
  private readonly vcr!: ViewContainerRef;

  private readonly untilDestroy$: Subject<any> = new Subject();

  private old!: Modifiers.GeneratedFieldMetadata;

  public formulary!: Formulary;

  public struct!: Modifiers.GeneratedFieldMetadata;

  private componenetsRefs: {
    label?: ComponentRef<LabelComponent>;
    descriptor?: ComponentRef<DescriptorComponent>;
    field?: ComponentRef<Type<any>>;
    wrappers: {[k: string]: ComponentRef<WrapperComponent>};
  } = {
    wrappers: {},
  };

  constructor(private readonly cfr: ComponentFactoryResolver) {
  }

  private checkLabelProps(): void {
    const labelRef = this.componenetsRefs.label;
    if (labelRef) {
    }
  }

  private checkDescriptorProps(): void {
  }

  private createLabelComponent(): void {
    const ref = this.vcr.createComponent(this.cfr.resolveComponentFactory(LabelComponent), 0);
    this.componenetsRefs.label = ref;
    this.checkLabelProps();
    ref.changeDetectorRef.markForCheck();
    ref.changeDetectorRef.detectChanges();
  }

  private createDescriptor(): void {
    const insertAt: number = Object.keys(this.componenetsRefs).length - 1;
    const ref = this.vcr.createComponent(this.cfr.resolveComponentFactory(DescriptorComponent), insertAt);
    this.componenetsRefs.descriptor = ref;
    this.checkDescriptorProps();
    ref.changeDetectorRef.markForCheck();
    ref.changeDetectorRef.detectChanges();
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
          const ref = this.vcr.createComponent(this.cfr.resolveComponentFactory(field), insertAt);
          this.componenetsRefs.field = ref;
          ref.changeDetectorRef.markForCheck();
          ref.changeDetectorRef.detectChanges();
        }
      }
    }
  }

  private should(): void {
    this.createLabelComponent();
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
    const old: Modifiers.GeneratedFieldMetadata[] = this.old.struct.wrapper || [];

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

  public checkWrapperTree(): void {
    for (const component in this.componenetsRefs.wrappers) {
      if (this.componenetsRefs.wrappers[component].instance) {
        this.componenetsRefs.wrappers[component].instance.checkWrapperTree();
      }
    }
    this.selfCheck();
  }

  public ngOnInit(): void {
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
  }

  public ngAfterViewInit(): void {
    this.should();
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
  }

}
