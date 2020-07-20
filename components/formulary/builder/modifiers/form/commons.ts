import {
  FormulariesCommons,
  ModifiersFn,
  GeneratedFieldMetadataFn,
  GeneratedFieldMetadata,
  StaircaseFormularyStepStruct
} from '../interfaces';
import { identifier as _identifier } from './../commons';
import { expect_parent, expect_param, expect_type } from '../utils';
import { ParentTypes } from '../enums';




function identifier(value: FormulariesCommons['identifier']): ModifiersFn {
  return _identifier(value);
}

function fields(...providers: (GeneratedFieldMetadataFn | GeneratedFieldMetadataFn[])[]): ModifiersFn {
  return (parent: string, target: Partial<any>): Partial<any> => {
    expect_parent(parent, [ParentTypes.StaircaseStepFormulary, ParentTypes.LinearFormulary]);
    expect_param(`type`, providers);
    expect_type(`value`, providers, [`array`]);
    let _providers: GeneratedFieldMetadataFn[] = [];
    let _fields: GeneratedFieldMetadata[] = [];
    for (let i = 0, l = providers.length; i < l; i++) {
      _providers = _providers.concat((Array.isArray(providers[i] as any) ? providers[i] as any : [providers[i] as any]));
    }
    for (let _field of _providers) {
      if (`function` === typeof _field) {
        const returns = _field();
        if (returns) {
          if (`object` === typeof returns) {
            _fields.push(returns);
          }
        }
      }
    }
    target.children = _fields;
    return target;
  }
}

function name(value: StaircaseFormularyStepStruct['name']): ModifiersFn {
  return (parent: string, target: Partial<any>): Partial<any> => {
    expect_parent(parent, [ParentTypes.StaircaseStepFormulary]);
    expect_type(`value`, value, [`string`, `undefined`, `null`]);
    if (!value || !value.length) {
      delete target.name;
    } else {
      target.name = value;
    }
    return target;
  }
}

function step(...modifiers: (ModifiersFn | ModifiersFn[])[]): ModifiersFn {
  return (parent: string, target: Partial<any>): Partial<any> => {
    expect_parent(parent, [ParentTypes.StaircaseFormulary]);
    expect_type(`modifiers`, modifiers, [`array`]);
    let _modifiers: ModifiersFn[] = [];
    for (let i = 0, l = modifiers.length; i < l; i++) {
      _modifiers = _modifiers.concat((Array.isArray(modifiers[i] as any) ? modifiers[i] as any : [modifiers[i] as any]));
    }
    let source: Partial<StaircaseFormularyStepStruct> = {};
    for (let _modifier of _modifiers) {
      if (`function` === typeof _modifier) {
        const returns = _modifier(ParentTypes.StaircaseStepFormulary, source);
        if (returns) {
          if (`object` === typeof returns) {
            source = {...returns, ...source};
          }
        }
      }
    }
    if (!target.hasOwnProperty(`children`)) {
      target.children = [];
    }
    target.children.push(source);
    return target;
  };
}

export {
  identifier as formularyIdentifier,
  fields as formularyFields,
  name as formularyStepName,
  step as formularyStep,
}
