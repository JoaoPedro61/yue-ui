import { setHiddenProp } from '@JoaoPedro61/yue-ui/core/utils';

import {
  ModifiersFn,
  GeneratedFieldMetadata,
  GeneratedFieldMetadataFn,
  FieldStruct,
  Listener,
  YueSelectMode,
  YueSwitchModes
} from '../interfaces';
import { expect_parent, expect_type, expect_param, expect_allowed_field_type } from '../utils';
import { identifier as _identifier } from './../commons';
import { SpecificValidatorObjectFormation } from '../../../utils';
import { ParentTypes } from './../enums';




function identifier(value: GeneratedFieldMetadata['identifier']) {
  return _identifier(value);
}


function injectIn(value: GeneratedFieldMetadata['injectIn']): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [ParentTypes.Field]);
    expect_param(`injectIn`, value);
    expect_type(`value`, value, [`string`, `object`]);
    setHiddenProp(target, 'injectIn', value, true);
    return target;
  };
}

function enable(value: FieldStruct['enable'] = true): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [ParentTypes.Field]);
    expect_type(`value`, value, [`boolean`]);
    target.enable = value;
    return target;
  };
}

function defaultValue(value: FieldStruct['default']): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [ParentTypes.Field]);
    target.default = value;
    return target;
  };
}

function wrapper(value?: (GeneratedFieldMetadataFn | GeneratedFieldMetadataFn[])[]): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [ParentTypes.Field]);
    expect_type(`value`, value, [`array`, `undefined`, `null`]);
    if (!value || value.length === 0) {
      delete target.wrapper;
    } else {
      let _value: GeneratedFieldMetadataFn[] = [];
      for (let i = 0, l = value.length; i < l; i++) {
        _value = _value.concat((Array.isArray(value[i] as any) ? value[i] as any : [value[i] as any]));
      }
      const source: GeneratedFieldMetadata[] = [];
      for (const _child of _value) {
        if (`function` === typeof _child) {
          const returns = _child();
          if (returns) {
            if (`object` === typeof returns) {
              returns.type = 'child';
              returns.injectIn = 'parent';
              source.push(returns);
            }
          }
        }
      }
      target.wrapper = source;
    }
    return target;
  };
}

function type(value: FieldStruct['type']): ModifiersFn {

  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [ParentTypes.Field]);
    expect_param(`type`, value);
    expect_type(`value`, value, [`string`]);
    expect_allowed_field_type(value as string);
    target.type = value;
    return target;
  };
}

function width(value: FieldStruct['width']): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [ParentTypes.Field]);
    expect_param(`width`, value);
    expect_type(`value`, value, [`number`]);
    target.width = value;
    return target;
  };
}

function label(value?: FieldStruct['label']): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [ParentTypes.Field]);
    expect_type(`value`, value, [`function`, `undefined`, `null`, `string`, `object`]);
    if (value ? typeof value === `string` ? !value.length : true : true) {
      delete target.label;
    } else {
      target.label = value;
    }
    return target;
  };
}

function description(value: FieldStruct['description']): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [ParentTypes.Field]);
    expect_type(`value`, value, [`function`, `undefined`, `null`, `string`, `object`]);
    if (value ? typeof value === `string` ? !value.length : true : true) {
      delete target.description;
    } else {
      target.description = value;
    }
    return target;
  };
}

function template(value: FieldStruct['template']): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [ParentTypes.Field]);
    expect_type(`value`, value, [`function`, `undefined`, `null`, `string`, `object`]);
    if (value ? typeof value === `string` ? !value.length : true : true) {
      delete target.template;
    } else {
      target.template = value;
    }
    return target;
  };
}

function validators(value?: FieldStruct['validators']): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [ParentTypes.Field]);
    expect_type(`value`, value, [`array`, `undefined`, `null`]);
    if (!value || !value.length) {
      delete target.validators;
    } else {
      target.validators = value;
    }
    return target;
  };
}

function validator(value: SpecificValidatorObjectFormation): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [ParentTypes.Field]);
    expect_param(`validator`, value);
    expect_type(`value`, value, [`object`]);
    if (!target.hasOwnProperty(`validators`)) {
      target.validators = [];
    }
    target.validators.push(value);
    return target;
  };
}

function placeholder(value?: FieldStruct['placeholder']): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [ParentTypes.Field]);
    expect_type(`value`, value, [`string`, `function`, `null`, `undefined`]);

    if (value ? typeof value === `string` ? !value.length : false : true) {
      delete target.placeholder;
    } else {
      target.placeholder = value;
    }
    return target;
  };
}

function listeners(value?: FieldStruct['listeners']): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [ParentTypes.Field]);
    expect_type(`value`, value, [`object`, `null`, `undefined`]);
    if (value ? !Object.keys(value).length : true) {
      delete target.listeners;
    } else {
      target.listeners = value;
    }
    return target;
  };
}

function listener(value: keyof FieldStruct['listeners'], listener_fn?: Listener): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [ParentTypes.Field]);
    expect_param(`value`, value);
    expect_type(`value`, value, [`string`]);
    expect_type(`listener`, listener_fn, [`null`, `undefined`, `object`, `function`]);
    if (!listener_fn) {
      if (target.hasOwnProperty(`listeners`)) {
        if (target.listeners.hasOwnProperty(value)) {
          delete target.listeners[value];
        }
      }
    } else {
      if (!target.hasOwnProperty(`listeners`)) {
        target.listeners = {};
      }
      target.listeners[value] = listener_fn;
    }
    return target;
  };
}

function options(value: FieldStruct['options']): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [ParentTypes.Field]);
    expect_param(`value`, value);
    expect_type(`value`, value, [`array`, `object`, `function`]);
    target.options = value;
    return target;
  };
}

function properties(value: FieldStruct['properties']): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [ParentTypes.Field]);
    expect_param(`value`, value);
    expect_type(`value`, value, [`object`]);
    target.properties = value;
    return target;
  };
}

function property(prop: keyof FieldStruct['properties'], value: FieldStruct['properties'][keyof FieldStruct['properties']]): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [ParentTypes.Field]);
    expect_param(`property`, prop);
    expect_type(`property`, prop, [`string`]);
    expect_param(`value`, value);
    expect_type(`value`, value, [`string`, `boolean`]);
    if (!target.hasOwnProperty(`properties`)) {
      target.properties = {};
    }
    target.properties[prop] = value;
    return target;
  };
}

function mask(value?: FieldStruct['mask']): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [ParentTypes.Field]);
    expect_type(`value`, value, [`string`, `function`, `null`, `undefined`]);
    if (value ? typeof value === `string` ? !value.length : false : true) {
      delete target.mask;
    } else {
      target.mask = value;
    }
    return target;
  };
}

function vstype(value?: FieldStruct['vstype']): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [ParentTypes.Field]);
    expect_type(`value`, value, [`string`, `null`, `undefined`]);
    if (!value || !value.length) {
      delete target.vstype;
    } else {
      target.vstype = value;
    }
    return target;
  };
}

function selectMode(value: YueSelectMode): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [ParentTypes.Field]);
    expect_param(`value`, value);
    expect_type(`value`, value, [`string`]);
    target.mode = value;
    return target;
  };
}

function switchMode(value: YueSwitchModes): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [ParentTypes.Field]);
    expect_param(`value`, value);
    expect_type(`value`, value, [`string`]);
    target.mode = value;
    return target;
  };
}

export {
  identifier as fieldIdentifier,
  injectIn as fieldInjectIn,
  enable as fieldEnable,
  defaultValue as fieldDefaultValue,
  wrapper as fieldWrapper,
  type as fieldType,
  width as fieldWidth,
  label as fieldLabel,
  description as fieldDescription,
  template as fieldTemplate,
  validators as fieldValidators,
  validator as fieldValidator,
  placeholder as fieldPlaceholder,
  listeners as fieldListeners,
  listener as fieldListener,
  options as fieldOptions,
  properties as fieldProperties,
  property as fieldProperty,
  mask as fieldMask,
  vstype as fieldVstype,
  selectMode as fieldSelectMode,
  switchMode as fieldSwitchMode,
};
