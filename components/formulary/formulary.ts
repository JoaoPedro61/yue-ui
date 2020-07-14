import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { ArrayObjectManager, hash, setHiddenProps, getHiddenProp } from '@JoaoPedro61/yue-ui/core/utils';

import {
  GeneratedButtonMetadataFn,
  writable,
  fieldLabel,
  fieldPlaceholder,
  fieldValidators,
  fieldIdentifier,
  GeneratedLinearFormularyMetadataFn,
  GeneratedStaircaseFormularyMetadataFn,
  ParentTypes,
  staircaseFormulary,
  formularyIdentifier,
  formularyStep,
  formularyStepName,
  formularyFields,
  linearFormulary,
  GeneratedStaircaseFormularyMetadata,
  GeneratedLinearFormularyMetadata
} from './modifiers';



export class Formulary<M = any> {

  private readonly _ref = setHiddenProps({}, [
    {
      name: `_identifier`,
      value: { [hash()]: 'activated' },
      readOnly: true
    },
    {
      name: `_buttons_alignment`,
      value: { [hash()]: 'activated' },
      readOnly: true
    },
    {
      name: `_hide_descriptor`,
      value: { [hash()]: 'activated' },
      readOnly: true
    },
    {
      name: `_hide_label`,
      value: { [hash()]: 'activated' },
      readOnly: true
    },
    {
      name: `_buttons`,
      value: { [hash()]: 'activated' },
      readOnly: true
    },
    {
      name: `_model`,
      value: { [hash()]: 'activated' },
      readOnly: true
    },
    {
      name: `_formulary`,
      value: { [hash()]: 'activated' },
      readOnly: true
    },
    {
      name: `_footer$`,
      value: { [hash()]: 'activated' },
      readOnly: true
    },
    {
      name: `_model$`,
      value: { [hash()]: 'activated' },
      readOnly: true
    },
    {
      name: `_connect$`,
      value: { [hash()]: 'activated' },
      readOnly: true
    },
    {
      name: `_formulary$`,
      value: { [hash()]: 'activated' },
      readOnly: true
    },
    {
      name: `_current_scheme$`,
      value: { [hash()]: 'activated' },
      readOnly: true
    },
    {
      name: `_step`,
      value: { [hash()]: 'activated' },
      readOnly: true
    },
    {
      name: `_step_ignore_validation`,
      value: { [hash()]: 'activated' },
      readOnly: true
    },
    {
      name: `_header$`,
      value: { [hash()]: 'activated' },
      readOnly: true
    },
    {
      name: `_form$`,
      value: { [hash()]: 'activated' },
      readOnly: true
    },
    {
      name: `_options$`,
      value: { [hash()]: 'activated' },
      readOnly: true
    },
    {
      name: `_buttons$`,
      value: { [hash()]: 'activated' },
      readOnly: true
    },
    {
      name: `_unknown_changes$`,
      value: { [hash()]: 'activated' },
      readOnly: true
    }
  ]);

  private readonly ____ = new WeakMap<any, any>([
    [
      getHiddenProp(this._ref, `_footer$`),
      new BehaviorSubject(null)
    ],
    [
      getHiddenProp(this._ref, `_header$`),
      new BehaviorSubject(null)
    ],
    [
      getHiddenProp(this._ref, `_form$`),
      new FormGroup({})
    ],
    [
      getHiddenProp(this._ref, `_buttons$`),
      new ArrayObjectManager([], 'identifier')
    ],
    [
      getHiddenProp(this._ref, `_options$`),
      new BehaviorSubject({})
    ],
    [
      getHiddenProp(this._ref, `_formulary$`),
      new BehaviorSubject(null)
    ],
    [
      getHiddenProp(this._ref, `_current_scheme$`),
      new BehaviorSubject(null)
    ],
    [
      getHiddenProp(this._ref, `_connect$`),
      new BehaviorSubject(null)
    ],
    [
      getHiddenProp(this._ref, `_model$`),
      new BehaviorSubject({})
    ],
    [
      getHiddenProp(this._ref, `_unknown_changes$`),
      new BehaviorSubject(null)
    ],
    [
      getHiddenProp(this._ref, `_buttons`),
      []
    ],
    [
      getHiddenProp(this._ref, `_hide_descriptor`),
      false
    ],
    [
      getHiddenProp(this._ref, `_hide_label`),
      false
    ],
    [
      getHiddenProp(this._ref, `_buttons_alignment`),
      'end'
    ],
    [
      getHiddenProp(this._ref, `_model`),
      {}
    ],
    [
      getHiddenProp(this._ref, `_identifier`),
      hash()
    ],
    [
      getHiddenProp(this._ref, `_step`),
      0
    ],
    [
      getHiddenProp(this._ref, `_step_ignore_validation`),
      false
    ]
  ]);

  /**
   * Return this identifier
   *
   * @readonly
   * @type {string}
   * @memberof Formulary
   */
  public get identifier(): string {
    return this.____.get(getHiddenProp(this._ref, `_identifier`));
  }

  /**
   *
   *
   * @private
   * @returns {Observable<any>}
   * @memberof Formulary
   */
  private schematicFieldsChange(): Observable<any> {
    const _current_scheme_ref$ = getHiddenProp(this._ref, `_current_scheme$`);
    const _current_scheme$ = this.____.get(_current_scheme_ref$) as BehaviorSubject<any>;

    return _current_scheme$.asObservable();
  }

  /**
   *
   *
   * @private
   * @memberof Formulary
   */
  private mountCurrentScheme(): void {
    const _formulary_ref$ = getHiddenProp(this._ref, `_formulary$`);
    const _formulary$ = this.____.get(_formulary_ref$) as BehaviorSubject<GeneratedLinearFormularyMetadata | GeneratedStaircaseFormularyMetadata>;
    const _current_scheme_ref$ = getHiddenProp(this._ref, `_current_scheme$`);
    const _current_scheme$ = this.____.get(_current_scheme_ref$) as BehaviorSubject<any>;
    const _value = _formulary$.value;
    if (_value) {
      if (_value.metadataType === ParentTypes.StaircaseFormulary) {
        const _step_ref = getHiddenProp(this._ref, `_step`);
        const _step = this.____.get(_step_ref) as number;
        if (_step >= 0 && _step < _value.struct.children.length - 1) {
          _current_scheme$.next(_value.struct.children[_step]);
        }
      } else {
        _current_scheme$.next(_value);
      }
    }
  }

  /**
   * Set a formulary metadata
   *
   * @param {(GeneratedLinearFormularyMetadataFn | GeneratedStaircaseFormularyMetadataFn)} provider
   * @returns {this}
   * @memberof Formulary
   */
  public setup(provider: GeneratedLinearFormularyMetadataFn | GeneratedStaircaseFormularyMetadataFn): this {
    if (`function` === typeof provider) {
      const metadata = provider();
      if (metadata) {
        if (metadata.metadataType === ParentTypes.StaircaseFormulary || metadata.metadataType === ParentTypes.LinearFormulary) {
          const _formulary_ref$ = getHiddenProp(this._ref, `_formulary$`);
          const _formulary$ = this.____.get(_formulary_ref$) as BehaviorSubject<GeneratedLinearFormularyMetadata | GeneratedStaircaseFormularyMetadata>;
          _formulary$.next(metadata);
          this.mountCurrentScheme();
        } else {
          throw new Error(`Opa tipo invalido patrao`);
        }
      } else {
        throw new Error(`Opa patrao passa uma configuracao ai vai!`);
      }
    }
    return this;
  }

  /**
   *
   *
   * @returns
   * @memberof Formulary
   */
  public staircase() {
    return {
      /**
       *
       */
      navigation: (scheme: 'standard' | 'custom' = `standard`): this => {
        const _ignore_validation_ref = getHiddenProp(this._ref, `_step_ignore_validation`);
        if (scheme === `custom`) {
          this.____.set(_ignore_validation_ref, true);
        } else {
          this.____.set(_ignore_validation_ref, false);
        }
        return this;
      },
      /**
       *
       */
      next: (force: boolean = false): this => {
        const _form_ref = getHiddenProp(this._ref, `_form$`);
        const _form = this.____.get(_form_ref) as FormGroup;
        const _ignore_validation_ref = getHiddenProp(this._ref, `_step_ignore_validation`);
        const _ignore_validation = this.____.get(_ignore_validation_ref) as boolean;
        const _step_ref = getHiddenProp(this._ref, `_step`);
        const _step = this.____.get(_step_ref) as number;
        const _formulary_ref$ = getHiddenProp(this._ref, `_formulary$`);
        const _formulary$ = this.____.get(_formulary_ref$) as BehaviorSubject<GeneratedStaircaseFormularyMetadata>;
        const _value = _formulary$.value;
        if (_value) {
          if (_value.metadataType === ParentTypes.StaircaseFormulary) {
            const length = _value.struct.children.length;
            if (_step < length - 1) {
              if (!_form.invalid || force || _ignore_validation) {
                this.____.set(_step_ref, _step + 1);
                this.mountCurrentScheme();
              }
            }
          }
        } else {
          throw new Error(`Ai patrao, tu precisa setar os campos antes de chamar essa bagaca!`);
        }
        return this;
      },
      /**
       *
       */
      previews: (force: boolean = false): this => {
        const _form_ref = getHiddenProp(this._ref, `_form$`);
        const _form = this.____.get(_form_ref) as FormGroup;
        const _ignore_validation_ref = getHiddenProp(this._ref, `_step_ignore_validation`);
        const _ignore_validation = this.____.get(_ignore_validation_ref) as boolean;
        const _step_ref = getHiddenProp(this._ref, `_step`);
        const _step = this.____.get(_step_ref) as number;
        const _formulary_ref$ = getHiddenProp(this._ref, `_formulary$`);
        const _formulary$ = this.____.get(_formulary_ref$) as BehaviorSubject<GeneratedStaircaseFormularyMetadata>;
        const _value = _formulary$.value;
        if (_value) {
          if (_value.metadataType === ParentTypes.StaircaseFormulary) {
            const length = _value.struct.children.length;
            if (_step > length - 1) {
              if (!_form.invalid || force || _ignore_validation) {
                this.____.set(_step_ref, _step - 1);
                this.mountCurrentScheme();
              }
            }
          }
        } else {
          throw new Error(`Ai patrao, tu precisa setar os campos antes de chamar essa bagaca!`);
        }
        return this;
      },
      /**
       *
       */
      step: (index: number = 0, force: boolean = false): this => {
        const _form_ref = getHiddenProp(this._ref, `_form$`);
        const _form = this.____.get(_form_ref) as FormGroup;
        const _ignore_validation_ref = getHiddenProp(this._ref, `_step_ignore_validation`);
        const _ignore_validation = this.____.get(_ignore_validation_ref) as boolean;
        const _step_ref = getHiddenProp(this._ref, `_step`);
        const _formulary_ref$ = getHiddenProp(this._ref, `_formulary$`);
        const _formulary$ = this.____.get(_formulary_ref$) as BehaviorSubject<GeneratedStaircaseFormularyMetadata>;
        const _value = _formulary$.value;
        if (_value) {
          if (_value.metadataType === ParentTypes.StaircaseFormulary) {
            const length = _value.struct.children.length;
            if (index >= 0 && index < length - 1) {
              if (!_form.invalid || force || _ignore_validation) {
                this.____.set(_step_ref, index);
                this.mountCurrentScheme();
              }
            }
          }
        } else {
          throw new Error(`Ai patrao, tu precisa setar os campos antes de chamar essa bagaca!`);
        }
        return this;
      },
    };
  }

  /**
   * Hide all input labels of form
   *
   * @param {boolean} [hide=true] Should hide
   * @returns {this} Formulary instance
   * @memberof Formulary
   */
  public shouldHideLabels(hide: boolean = true): this {
    this.____.set(getHiddenProp(this._ref, `_hide_label`), hide);
    this.____.get(getHiddenProp(this._ref, `_unknown_changes$`)).next(hash());
    return this;
  }

  /**
   * Hide all input descriptors of form
   *
   * @param {boolean} [hide=true] Should hide
   * @returns {this} Formulary instance
   * @memberof Formulary
   */
  public shouldHideDescriptors(hide: boolean = true): this {
    this.____.set(getHiddenProp(this._ref, `_hide_descriptor`), hide);
    this.____.get(getHiddenProp(this._ref, `_unknown_changes$`)).next(hash());
    return this;
  }

  /**
   * Hide specified buttons
   *
   * @param {(...(string | string[])[])} identifiers An array of identifiers
   * @returns {this} Formulary instance
   * @memberof Formulary
   */
  public shouldHideButtons(...identifiers: (string | string[])[]): this {
    let _identifiers: string[] = [];
    for (let i = 0, l = identifiers.length; i < l; i++) {
      if (Array.isArray(identifiers[i])) {
        _identifiers = [...identifiers[i]];
      } else {
        _identifiers.push(identifiers[i] as string);
      }
    }
    this.____.get(getHiddenProp(this._ref, '_buttons$')).hide(..._identifiers);
    return this;
  }

  /**
   * Show specified buttons
   *
   * @param {(...(string | string[])[])} identifiers An array of identifiers
   * @returns {this} Formulary instance
   * @memberof Formulary
   */
  public shouldShowButtons(...identifiers: (string | string[])[]): this {
    let _identifiers: string[] = [];
    for (let i = 0, l = identifiers.length; i < l; i++) {
      if (Array.isArray(identifiers[i])) {
        _identifiers = [...identifiers[i]];
      } else {
        _identifiers.push(identifiers[i] as string);
      }
    }
    this.____.get(getHiddenProp(this._ref, '_buttons$')).show(..._identifiers);
    return this;
  }

  public removeButtons(...identifiers: (string | string[])[]): this {
    const _buttons_ref = getHiddenProp(this._ref, `_buttons`);
    const _stepped_buttons_ref = getHiddenProp(this._ref, `_stepped_buttons`);
    const _buttons = this.____.get(_buttons_ref);
    const _stepped_buttons = this.____.get(_stepped_buttons_ref);
    let _identifiers: string[] = [];
    for (let i = 0, l = identifiers.length; i < l; i++) {
      if (Array.isArray(identifiers[i])) {
        _identifiers = [...identifiers[i]];
      } else {
        _identifiers.push(identifiers[i] as string);
      }
    }
    for (let i = 0, l = _identifiers.length; i < l; i++) {
      loop1:
      for (let o = 0, u = _buttons.length; o < u; o++) {
        if (_buttons[o].identifier === _identifiers[i]) {
          _buttons.splice(o, 1);
          break loop1;
        }
      }
      loop2:
      for (let p = 0, k = _stepped_buttons.length; p < k; p++) {
        if (_stepped_buttons[p].identifier === _identifiers[i]) {
          _stepped_buttons.splice(p, 1);
          break loop2;
        }
      }
    }
    this.____.set(_buttons_ref, _buttons);
    this.____.set(_stepped_buttons_ref, _stepped_buttons);
    return this;
  }

  public insertButtons(...providers: (GeneratedButtonMetadataFn | GeneratedButtonMetadataFn[])[]): this {
    let _providers: GeneratedButtonMetadataFn[] = [];
    for (let i = 0, l = providers.length; i < l; i++) {
      if (Array.isArray(providers[i])) {
        _providers = _providers.concat(providers[i]);
      } else {
        _providers.push(providers[i] as GeneratedButtonMetadataFn);
      }
    }
    return this;
  }

  public shouldUpdateButton(): this {
    return this;
  }

  public shouldDisabledButton(): this {
    return this;
  }

  public shouldUndisabledButton(): this {
    return this;
  }

  public setButtonsAlignment(): this {
    return this;
  }

  public setModel(): this {
    return this;
  }

  public setOptions(): this {
    return this;
  }

  public get isStepped(): boolean {
    return false;
  }

  public subscribe(): this {
    return this;
  }

  public unsubscribe(): this {
    return this;
  }

  public destroy(): void {}

}




/* 
const createForm = (formularyIdentifierName,  formularyStepNameName,  fieldIdentifierName,  fieldLabelName,  fieldPlaceholderName,  fieldValidatorsArr,  aditionalParams?) => {
  return [
    formularyIdentifier(formularyIdentifierName),
    formularyStepName(formularyStepNameName),
    formularyFields([
      writable([
        fieldIdentifier(fieldIdentifierName),
        fieldLabel(fieldLabelName),
        fieldPlaceholder(fieldPlaceholderName),
        fieldValidators(fieldValidatorsArr)
      ])
    ]),
    ...(aditionalParams ? aditionalParams : [])
  ]
}
const staircase = staircaseFormulary(
  createForm(`steps`, `This is my simple step`, `my_name`, `Your Name`, `Type your name`, [`required`])
);

const linear = linearFormulary([
  formularyIdentifier(`steps`),
  formularyFields([
    writable([
      fieldIdentifier(`my_name`),
      fieldLabel(`Your Name`),
      fieldPlaceholder(`Type your name`),
      fieldValidators([`required`])
    ])
  ])
]);



const staircase = staircaseFormulary([
  formularyIdentifier(`steps`),
  formularyStep([
    formularyIdentifier(`step_1`),
    formularyStepName(`This is my simple step`),
    formularyFields([
      writable([
        fieldIdentifier(`my_name`),
        fieldLabel(`Your Name`),
        fieldPlaceholder(`Type your name`),
        fieldValidators([`required`])
      ])
    ])
  ])
]);

const linear = linearFormulary([
  formularyIdentifier(`steps`),
  formularyFields([
    writable([
      fieldIdentifier(`my_name`),
      fieldLabel(`Your Name`),
      fieldPlaceholder(`Type your name`),
      fieldValidators([`required`])
    ])
  ])
]);


console.log(staircase());

console.log(linear());

*/




const form = new Formulary();

form.setup(linearFormulary([
  formularyIdentifier(`steps`),
  formularyFields([
    writable([
      fieldIdentifier(`my_name`),
      fieldLabel(`Your Name`),
      fieldPlaceholder(`Type your name`),
      fieldValidators([`require`])
    ])
  ])
]))
.staircase()
  .step(1);

console.log(form);

(<any>window).any = form;
