import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  ChangeDetectorRef,
  ViewChild,
  ViewContainerRef,
  Input,
  ComponentFactoryResolver,
  ComponentRef
} from '@angular/core';

import { differenceBy } from 'lodash';

import { WrapperComponent } from './extends/wrapper.component';

import { Formulary } from './formulary-builder';

import {
  writable,
  fieldLabel,
  fieldPlaceholder,
  fieldValidators,
  fieldIdentifier,
  formularyIdentifier,
  formularyFields,
  linearFormulary,
  staircaseFormulary,
  formularyStep,
  formularyStepName,
  GeneratedLinearFormularyMetadata,
  StaircaseFormularyStepStruct,
  GeneratedFieldMetadata,
  ParentTypes,
  fieldTemplate,
  fieldWrapper,
  fieldDescription,
} from './modifiers';



const linear = linearFormulary([
  formularyIdentifier(`dsfsd`),
  formularyFields([
    writable([
      fieldIdentifier(`my_name`),
      fieldLabel(`Your Name (my_name)`),
      fieldPlaceholder(`Type your name`),
      fieldValidators([`required`]),
      fieldDescription(`Simple field description`),
      fieldTemplate(`Simple template`),
      fieldWrapper([
        writable([
          fieldIdentifier(`sub`),
          fieldLabel(`Hello`),
          fieldTemplate(`Simple template`)
        ])
      ])
    ]),
  ])
]);

const staircase = staircaseFormulary([
  formularyIdentifier(`steps`),
  formularyStep([
    formularyIdentifier(`steps_1`),
    formularyStepName('This is my simple step'),
    formularyFields([
      writable([
        fieldIdentifier(`my_name`),
        fieldLabel(`Your Name`),
        fieldPlaceholder(`Type your name`),
        fieldValidators([`required`])
      ]),
    ])
  ]),
]);














@Component({
  selector: 'yue-ui-formulary',
  template: `
    <ng-container #fields></ng-container>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  preserveWhitespaces: false,
  exportAs: 'formularyRef',
  host: {
    '[class.yue-ui-formulary]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormularyComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  @ViewChild(`fields`, { static: false, read: ViewContainerRef })
  private _vcr!: ViewContainerRef;
  
  private _old: StaircaseFormularyStepStruct | GeneratedLinearFormularyMetadata = null as any;

  private _oldFields: GeneratedFieldMetadata[] = [];
  
  private _current: StaircaseFormularyStepStruct | GeneratedLinearFormularyMetadata = null as any;
  
  private _currentFields: GeneratedFieldMetadata[] = [];

  private _fieldComponentRefs: {[x: string]: ComponentRef<WrapperComponent>} = {};

  public get old(): any { return this._old; }

  public form = new Formulary();

  @Input()
  public s = true;

  constructor(private readonly _cdr: ChangeDetectorRef, private readonly _cfr: ComponentFactoryResolver) { }

  private _clearView(): void {
    this._vcr.clear();
    this._fieldComponentRefs = {};
  }

  private _findFields(): void {
    this._oldFields = this._currentFields.concat();
    if (this._current) {
      if (this._current.metadataType === ParentTypes.LinearFormulary) {
        this._currentFields = this._current.struct.children.concat();
      } else if (this._current.metadataType === ParentTypes.StaircaseFormulary) {
        this._currentFields = this._current.children.concat();
      } else {
        throw new Error(`Invalid formulary type!`);
      }
    } else {
      this._currentFields = [];
    }
  }

  private _createField(field: GeneratedFieldMetadata, index?: number): void {
    if (field.identifier) {
      const factory = this._cfr.resolveComponentFactory(WrapperComponent);
      const ref = this._vcr.createComponent(factory, typeof index === `number` ? index : undefined);
      ref.instance.formulary = this.form;
      ref.instance.struct = field;
      this._fieldComponentRefs[field.identifier] = ref;
      ref.changeDetectorRef.markForCheck();
    }
  }

  private _createFields(): void {
    this._clearView();
    for (let i = 0, l = this._currentFields.length; i < l; i++) {
      if (this._currentFields[i].identifier) {
        this._createField(this._currentFields[i]);
      }
    }
  }

  private _excludeFields(fields: string[]): void {
    for (let i = 0, l = fields.length; i < l; i++) {
      if (this._fieldComponentRefs.hasOwnProperty(fields[i])) {
        this._fieldComponentRefs[fields[i]].destroy();
        delete this._fieldComponentRefs[fields[i]];
      }
    }
  }

  private _addFields(fields: { index: number; field: GeneratedFieldMetadata; }[]): void {
    if (fields.length) {
      for (let i = 0, l = fields.length; i < l; i++) {
        if (fields[i].field.identifier) {
          this._createField(fields[i].field, fields[i].index);
        }
      }
    }
  }

  private _recreateFields(): void {
    const toAdd = differenceBy(this._currentFields, this._oldFields, `identifier`);
    const toRemove = differenceBy(this._oldFields, this._currentFields, `identifier`);
    const excludeFields: string[] = [];
    const addFields: { index: number; field: GeneratedFieldMetadata; }[] = [];
    for (let i = 0, l = toRemove.length; i < l; i++) {
      if (toRemove[i].identifier) {
        excludeFields.push(toRemove[i].identifier);
      }
    }
    if (toAdd.length) {
      for (let j = 0, k = toAdd.length; j < k; j++) {
        for (let i = 0, l = this._currentFields.length; i < l; i++) {
          if (this._currentFields[i].identifier) {
            if (toAdd[j].identifier) {
              if (this._currentFields[i].identifier === toAdd[j].identifier) {
                addFields.push({
                  index: i,
                  field: toAdd[j],
                });
                break;
              }
            }
          }
        }
      }
    }
    if (excludeFields.length) {
      this._excludeFields(excludeFields);
    }
    if (addFields.length) {
      this._addFields(addFields);
    }
    for (const component in this._fieldComponentRefs) {
      if (this._fieldComponentRefs.hasOwnProperty(component)) {
        if ((this._fieldComponentRefs as any)[component].instance) {
          (this._fieldComponentRefs as any)[component].instance.checkWrapperTree();
        }
      }
    }
  }

  private _should(): void {
    const shouldCreate = ( !this._old
      && !!this._current )
      || (
          ( !this._oldFields ||
            !this._oldFields.length )
          && ( this._oldFields
            && this._oldFields.length ) )
      || (
        !!this._old && !!this._current
          ? this._old.identifier !== this._current.identifier
          : false
        );
    if (shouldCreate) {
      this._findFields();
      this._createFields();
    } else {
      this._findFields();
      this._recreateFields();
    }
    this._old = Object.assign({}, { ...this._current });
    setTimeout(() => this._cdr.markForCheck());
  }

  public ngOnInit(): void {
    if (this.s) {
      this.form.setup(linear);
      return void 0;
      setTimeout(() => {
        this.form.removeField(`sub`);
      }, 5000);
    } else {
      this.form.setup(staircase);
    }
  }

  public ngAfterViewInit(): void {
    this.form
      .schematicFieldsChange$
        .subscribe({
          next: (currentScheme: StaircaseFormularyStepStruct | GeneratedLinearFormularyMetadata) => {
            this._current = currentScheme;
            this._should();
          }
        });
  }

  public ngOnChanges(): void {
  }

  public ngOnDestroy(): void {
  }

}
