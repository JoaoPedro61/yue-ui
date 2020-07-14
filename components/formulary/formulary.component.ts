import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, OnDestroy, OnChanges, ChangeDetectorRef, ViewChild, ViewContainerRef, Input } from '@angular/core';

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

  private _current: StaircaseFormularyStepStruct | GeneratedLinearFormularyMetadata = null as any;

  public get old(): any { return this._old; }

  public form = new Formulary();

  @Input()
  public s = true;

  constructor(private readonly cdr: ChangeDetectorRef) { }

  private _clearView(): void {
    this._vcr.clear();
  }

  private _createFields(): void {
    this._clearView();

    console.log('Create this scheme: ', this._current);
  }

  private _should(): void {
    this._createFields();
    this._old = Object.assign({}, this._current);
    setTimeout(() => this.cdr.markForCheck());
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
