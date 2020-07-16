import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, OnDestroy, OnChanges, ChangeDetectorRef, ViewChild, ViewContainerRef, Input, ComponentFactoryResolver, ComponentRef } from '@angular/core';

import { WrapperComponent } from './extends/wrapper.component';

import { Formulary } from './formulary';

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
} from './modifiers';



const linear = linearFormulary([
  formularyIdentifier(`dsfsd`),
  formularyFields([
    writable([
      fieldIdentifier(`my_name`),
      fieldLabel(`Your Name`),
      fieldPlaceholder(`Type your name`),
      fieldValidators([`required`])
    ]),
    writable([
      fieldIdentifier(`your_name`),
      fieldLabel(`Your Name`),
      fieldPlaceholder(`Type your name`),
      fieldValidators([`required`, `min:3`])
    ])
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
      writable([
        fieldIdentifier(`your_name`),
        fieldLabel(`Your Name`),
        fieldPlaceholder(`Type your name`),
        fieldValidators([`required`])
      ])
    ])
  ]),
  formularyStep([
    formularyIdentifier(`steps_2`),
    formularyStepName('This is my simple step'),
    formularyFields([
      writable([
        fieldIdentifier(`my_name2`),
        fieldLabel(`Your Name`),
        fieldPlaceholder(`Type your name`),
        fieldValidators([`required`])
      ]),
      writable([
        fieldIdentifier(`your_name2`),
        fieldLabel(`Your Name`),
        fieldPlaceholder(`Type your name`),
        fieldValidators([`required`])
      ])
    ])
  ])
]);














@Component({
  selector: 'yue-ui-formulary',
  template: `
    <ng-container #fields></ng-container>
    <pre>{{old | json}}</pre>
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
    this._oldFields = this._currentFields;
    if (this._current) {
      if (this._current.metadataType === ParentTypes.LinearFormulary) {
        this._currentFields = this._current.struct.children;
      } else if (this._current.metadataType === ParentTypes.StaircaseFormulary) {
        this._currentFields = this._current.children;
      } else {
        throw new Error(`Invalid formulary type!`);
      }
    } else {
      this._currentFields = [];
    }
  }

  private _createFields(): void {
    this._clearView();
    for (let i = 0, l = this._currentFields.length; i < l; i++) {
      if (this._currentFields[i].identifier) {
        const factory = this._cfr.resolveComponentFactory(WrapperComponent);
        const ref = this._vcr.createComponent(factory);
        ref.instance.formulary = this.form;
        ref.instance.struct = this._currentFields[i];
        this._fieldComponentRefs[this._currentFields[i].identifier] = ref;
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

    console.log(this._current);

    if (shouldCreate) {
      this._findFields();
      this._createFields();
    } else {
      /* TODO: Recreate views */
    }
    this._old = Object.assign({}, this._current);
    setTimeout(() => this._cdr.markForCheck());
  }

  public ngOnInit(): void {
    if (this.s) {
      this.form.setup(staircase);
    } else {
      this.form.setup(linear);
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
