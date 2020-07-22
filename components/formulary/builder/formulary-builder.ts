import { FormGroup, AbstractControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import {
  ArrayObjectManager,
  hash,
  setHiddenProps,
  getHiddenProp,
  serializeStringJsonPath,
  deserializeStringJsonPath
} from '@JoaoPedro61/yue-ui/core/utils';
import {
  GeneratedButtonMetadataFn,
  GeneratedFieldMetadataFn,
  GeneratedLinearFormularyMetadataFn,
  GeneratedStaircaseFormularyMetadataFn,
  ParentTypes,
  GeneratedStaircaseFormularyMetadata,
  GeneratedLinearFormularyMetadata,
  ModifiersFn,
  GeneratedFieldMetadata
} from './modifiers';
import { Modifiers } from './fix-ralacional';


function updateFragments(obj: any): void {
  obj.fragments = {};
  const t = serializeStringJsonPath(obj, true, `struct`);
  if (obj.metadataType === ParentTypes.StaircaseFormulary) {
    for (const key in t) {
      if (t.hasOwnProperty(key)) {
        if (!(/^struct$/.test(key))) {
          if (t[key].hasOwnProperty(`identifier`) && t[key].identifier) {
            obj.fragments[t[key].identifier] = key;
          }
        }
      }
    }
  } else if (obj.metadataType === ParentTypes.LinearFormulary) {
    for (const key in t) {
      if (t.hasOwnProperty(key)) {
        if (!(/^struct$/.test(key))) {
          if (t[key].hasOwnProperty(`identifier`) && t[key].identifier) {
            obj.fragments[t[key].identifier] = key;
          }
        }
      }
    }
  }
}

export class Formulary<_M = any> {

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
      name: `_step`,
      value: { [hash()]: 'activated' },
      readOnly: true
    },
    {
      name: `_step_ignore_validation`,
      value: { [hash()]: 'activated' },
      readOnly: true
    },

    /*
     * Observables
     */
    {
      name: `_model$`,
      value: { [hash()]: 'activated' },
      readOnly: true
    },
    {
      name: `_modelPure$`,
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
      getHiddenProp(this._ref, `_identifier`),
      hash()
    ],
    [
      getHiddenProp(this._ref, `_buttons_alignment`),
      'end'
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
      getHiddenProp(this._ref, `_step`),
      0
    ],
    [
      getHiddenProp(this._ref, `_step_ignore_validation`),
      false
    ],

    /*
     * Observables
     */
    [
      getHiddenProp(this._ref, `_model$`),
      new BehaviorSubject({})
    ],
    [
      getHiddenProp(this._ref, `_modelPure$`),
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
      getHiddenProp(this._ref, `_form$`),
      new FormGroup({})
    ],
    [
      getHiddenProp(this._ref, `_options$`),
      new BehaviorSubject({})
    ],
    [
      getHiddenProp(this._ref, `_buttons$`),
      new ArrayObjectManager([], 'identifier')
    ],
    [
      getHiddenProp(this._ref, `_unknown_changes$`),
      new BehaviorSubject(null)
    ]
  ]);

  public get identifier(): string {
    return this.____.get(getHiddenProp(this._ref, `_identifier`));
  }

  public get schematicFieldsChange$(): Observable<any> {
    const _current_scheme_ref$ = getHiddenProp(this._ref, `_current_scheme$`);
    const _current_scheme$ = this.____.get(_current_scheme_ref$) as BehaviorSubject<any>;

    return _current_scheme$.asObservable();
  }

  public get unknownChanges$(): Observable<any> {
    const _unknown_changes_ref$ = getHiddenProp(this._ref, `_unknown_changes$`);
    const _unknown_changes$ = this.____.get(_unknown_changes_ref$) as BehaviorSubject<any>;

    return _unknown_changes$.asObservable();
  }

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
        if (_step >= 0 && _step <= _value.struct.children.length - 1) {
          _current_scheme$.next(_value.struct.children[_step]);
        }
      } else {
        _current_scheme$.next(_value);
      }
    }
  }

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
          throw new Error(`Invalid form type!`);
        }
      } else {
        throw new Error(`No configuration passed!`);
      }
    }
    return this;
  }

  // @ts-ignore
  public staircase(): any {
    // @ts-ignore
    return {
      navigation: (scheme: 'standard' | 'custom' = `standard`): this => {
        const _ignore_validation_ref = getHiddenProp(this._ref, `_step_ignore_validation`);
        if (scheme === `custom`) {
          this.____.set(_ignore_validation_ref, true);
        } else {
          this.____.set(_ignore_validation_ref, false);
        }
        return this;
      },
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
          throw new Error(`You need to set the fields before calling this function!`);
        }
        return this;
      },
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
          throw new Error(`You need to set the fields before calling this function!`);
        }
        return this;
      },
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
          throw new Error(`You need to set the fields before calling this function!`);
        }
        return this;
      },
    };
  }

  public shouldHideLabels(hide: boolean = true): this {
    this.____.set(getHiddenProp(this._ref, `_hide_label`), hide);
    this.____.get(getHiddenProp(this._ref, `_unknown_changes$`)).next(hash());
    return this;
  }

  public shouldHideDescriptors(hide: boolean = true): this {
    this.____.set(getHiddenProp(this._ref, `_hide_descriptor`), hide);
    this.____.get(getHiddenProp(this._ref, `_unknown_changes$`)).next(hash());
    return this;
  }

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
    this.____.get(getHiddenProp(this._ref, `_unknown_changes$`)).next(hash());
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

  public insertField(field: GeneratedFieldMetadataFn, pos?: number, step?: number): this {
    const _formulary_ref$ = getHiddenProp(this._ref, `_formulary$`);
    const _formulary$ = this.____.get(_formulary_ref$) as BehaviorSubject<GeneratedLinearFormularyMetadata | GeneratedStaircaseFormularyMetadata>;
    const _formulary_value$ = _formulary$.getValue();
    if (!_formulary_value$) {
      throw new Error(`You must provide a form setting!`);
    }
    if (_formulary_value$.metadataType !== ParentTypes.StaircaseFormulary && _formulary_value$.metadataType !== ParentTypes.LinearFormulary) {
      throw new Error(`Type of form doesn't exist or is invalid!`);
    }
    const _field = field();
    if (_formulary_value$.metadataType === ParentTypes.LinearFormulary) {
      const _insertAt: number = typeof pos === `number`
        ? pos > _formulary_value$.struct.children.length - 1
          ? _formulary_value$.struct.children.length
          : pos
        : _formulary_value$.struct.children.length;
      _formulary_value$.struct.children.splice(_insertAt, 0, _field);
    } else if (_formulary_value$.metadataType === ParentTypes.StaircaseFormulary) {
      const _stepIdx: number = typeof step === `number`
        ? step > _formulary_value$.struct.children.length - 1
          ? _formulary_value$.struct.children.length
          : step
        : _formulary_value$.struct.children.length;
      if (_formulary_value$.struct.children[_stepIdx]) {
        const _insertAt: number = typeof pos === `number`
          ? pos > _formulary_value$.struct.children[_stepIdx].children.length - 1
            ? _formulary_value$.struct.children[_stepIdx].children.length - 1
            : pos
          : _formulary_value$.struct.children[_stepIdx].children.length - 1;
        _formulary_value$.struct.children[_stepIdx].children.splice(_insertAt, 0, _field);
      }
    }
    updateFragments(_formulary_value$);
    this.mountCurrentScheme();
    return this;
  }

  public removeField(identifier: string): this {
    const _formulary_ref$ = getHiddenProp(this._ref, `_formulary$`);
    const _formulary$ = this.____.get(_formulary_ref$) as BehaviorSubject<GeneratedLinearFormularyMetadata | GeneratedStaircaseFormularyMetadata>;
    const _formulary_value$ = _formulary$.getValue();
    if (!_formulary_value$) {
      throw new Error(`You must provide a form setting!`);
    }
    if (_formulary_value$.metadataType !== ParentTypes.StaircaseFormulary && _formulary_value$.metadataType !== ParentTypes.LinearFormulary) {
      throw new Error(`Type of form doesn't exist or is invalid!`);
    }
    if (_formulary_value$.metadataType === ParentTypes.LinearFormulary || _formulary_value$.metadataType === ParentTypes.StaircaseFormulary) {
      if (_formulary_value$.fragments.hasOwnProperty(identifier)) {
        let path: string | undefined = _formulary_value$.fragments[identifier];
        if (path) {
          path = path.replace(/\.identifier$/gm, ``);
          if (/\[(\d+)\]\.struct$/gm.test(path)) {
            const matched: RegExpMatchArray | null = path.match(/\[(\d+)\]\.struct$/);
            if (matched) {
              if (/^\d+$/gm.test(matched[1])) {
                const tpath: string = path.replace(/\[(\d+)\]\.struct$/gm, ``);
                const tindex: number = parseInt(matched[1], 10);
                const deserialized = deserializeStringJsonPath(tpath, _formulary_value$);
                if (deserialized && (deserialized as any).value) {
                  if (Array.isArray((deserialized as any).value)) {
                    if (tindex <= (deserialized as any).value.length - 1 || tindex > -1) {
                      (deserialized as any).value.splice(tindex, 1);
                    } else {
                      console.warn(`Index outside of the range array.`);
                    }
                  }
                }
              } else {
                console.error(`String number isn't valid.`);
              }
            }
          } else {
            console.warn(`Not valid path formation!`);
          }
        }
      }
    }
    updateFragments(_formulary_value$);
    this.mountCurrentScheme();
    return this;
  }

  public updateField(identifier: string, ...modifiers: (ModifiersFn | ModifiersFn[])[]): this {
    const _formulary_ref$ = getHiddenProp(this._ref, `_formulary$`);
    const _formulary$ = this.____.get(_formulary_ref$) as BehaviorSubject<GeneratedLinearFormularyMetadata | GeneratedStaircaseFormularyMetadata>;
    const _formulary_value$ = _formulary$.getValue();
    if (!_formulary_value$) {
      throw new Error(`You must provide a form setting!`);
    }
    if (_formulary_value$.metadataType !== ParentTypes.StaircaseFormulary && _formulary_value$.metadataType !== ParentTypes.LinearFormulary) {
      throw new Error(`Type of form doesn't exist or is invalid!`);
    }
    if (_formulary_value$.metadataType === ParentTypes.LinearFormulary || _formulary_value$.metadataType === ParentTypes.StaircaseFormulary) {
      const purePath: string | undefined = _formulary_value$.fragments[identifier];
      if (purePath) {
        const rootPath = purePath.replace(/\.struct\.identifier/, ``);
        const deserialized = deserializeStringJsonPath(rootPath, _formulary_value$);
        if (deserialized && deserialized.value) {
          const struct: GeneratedFieldMetadata = deserialized.value as GeneratedFieldMetadata;
          let _modifiers: ModifiersFn[] = [];
          for (let i = 0, l = modifiers.length; i < l; i++) {
            _modifiers = _modifiers.concat((Array.isArray(modifiers[i] as any) ? modifiers[i] as any : [modifiers[i] as any]));
          }
          for (const _modifier of _modifiers) {
            if (`function` === typeof _modifier) {
              _modifier(struct.metadataType, struct.struct);
            }
          }
          struct.dispatchChanges();
        } else {
          console.warn(`Field struct isn't found!`);
        }
      }
    }
    updateFragments(_formulary_value$);
    this.mountCurrentScheme();
    return this;
  }

  public registryControl(identifier: string, control: AbstractControl): this {
    const _ref$ = getHiddenProp(this._ref, `_form$`);
    const _value$ = this.____.get(_ref$) as FormGroup;
    if (identifier && control) {
      _value$.addControl(identifier, control);
    }
    return this;
  }

  public getControl(identifier: string): AbstractControl | null {
    const _ref$ = getHiddenProp(this._ref, `_form$`);
    const _value$ = this.____.get(_ref$) as FormGroup;
    if (identifier) {
      return _value$.controls[identifier] || null;
    }
    return null;
  }

  public getGroup(): FormGroup {
    const _ref$ = getHiddenProp(this._ref, `_form$`);
    return this.____.get(_ref$) as FormGroup;
  }

  public getPureModel(): { [x: string]: any } {
    const _ref$ = getHiddenProp(this._ref, `_modelPure$`);
    return (this.____.get(_ref$) as BehaviorSubject<{ [x: string]: any }>).getValue();
  }

  public getModel(): { [x: string]: any } {
    const _ref$ = getHiddenProp(this._ref, `_model$`);
    return (this.____.get(_ref$) as BehaviorSubject<{ [x: string]: any }>).getValue();
  }

  public getPureModel$(): Observable<{ [x: string]: any }> {
    const _ref$ = getHiddenProp(this._ref, `_modelPure$`);
    return (this.____.get(_ref$) as BehaviorSubject<{ [x: string]: any }>).asObservable();
  }

  public getModel$(): Observable<{ [x: string]: any }> {
    const _ref$ = getHiddenProp(this._ref, `_model$`);
    return (this.____.get(_ref$) as BehaviorSubject<{ [x: string]: any }>).asObservable();
  }

  public getOptions(): Modifiers.FormularyOptions {
    const _ref$ = getHiddenProp(this._ref, `_options$`);
    return (this.____.get(_ref$) as BehaviorSubject<Modifiers.FormularyOptions>).getValue();
  }

  public getOptions$(): Observable<Modifiers.FormularyOptions> {
    const _ref$ = getHiddenProp(this._ref, `_options$`);
    return (this.____.get(_ref$) as BehaviorSubject<Modifiers.FormularyOptions>).asObservable();
  }

  public setSyntheticModel(identifier: string, value: any): this {
    if (identifier) {
      const model = this.getModel();
      const newModel = deserializeStringJsonPath(identifier, model, value, false);
      if (newModel && newModel.source) {
        this.setModel(newModel.source as any);
      }
    }
    return this;
  }

  public setOptions(options: Modifiers.FormularyOptions): this {
    const _ref$ = getHiddenProp(this._ref, `_options$`);
    (this.____.get(_ref$) as BehaviorSubject<{ [x: string]: any }>).next(options);
    return this;
  }

  public setModel(values: { [s: string]: any }): this {
    const _ref$ = getHiddenProp(this._ref, `_model$`);
    (this.____.get(_ref$) as BehaviorSubject<{ [x: string]: any }>).next(values);
    const _refPure$ = getHiddenProp(this._ref, `_modelPure$`);
    const paths = serializeStringJsonPath(values);
    (this.____.get(_refPure$) as BehaviorSubject<{ [x: string]: any }>).next(paths);
    return this;
  }

  public applyValueOnEachControl(): this {
    const model = this.getPureModel();
    const group = this.getGroup();
    if (group && model) {
      if (group.controls) {
        for (const identifier in model) {
          if (identifier) {
            if (model.hasOwnProperty(identifier)) {
              if (group.controls.hasOwnProperty(identifier)) {
                const control = group.controls[identifier];
                if (control) {
                  control.setValue(model[identifier]);
                  control.updateValueAndValidity();
                }
              }
            }
          }
        }
      }
    }
    return this;
  }

  public applyValues(): this {
    const model = this.getPureModel();
    const group = this.getGroup();
    if (group && model) {
      if (group.controls) {
        const values: Partial<any> = {};
        for (const identifier in model) {
          if (identifier) {
            if (model.hasOwnProperty(identifier)) {
              if (group.controls.hasOwnProperty(identifier)) {
                values[identifier] = model[identifier];
              }
            }
          }
        }
        group.setValue(values);
      }
    }
    return this;
  }













  public shouldUpdateButton(): this {
    return this;
  }

  public setButtonsAlignment(): this {
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

  public destroy(): void { }

}
