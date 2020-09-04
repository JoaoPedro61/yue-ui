import { setHiddenProp } from '@joaopedro61/yue-ui/core/utils';

import {
  YueUiButtonType,
  YueUiButtonSize,
  ModifiersFn,
  GeneratedButtonMetadata,
  GeneratedButtonMetadataFn
} from '../interfaces';

import {
  identifier as _identifier
} from '../commons';

import { expect_parent } from '../utils';
import { ParentTypes } from './../enums';




function identifier(value: GeneratedButtonMetadata['identifier']) {
  return _identifier(value);
}

function injectIn(value: GeneratedButtonMetadata['injectIn']): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [
      ParentTypes.Button,
    ]);
    setHiddenProp(target, 'injectIn', value, true);
    return target;
  };
}

function dropdown(...children: (GeneratedButtonMetadataFn | GeneratedButtonMetadataFn[])[]): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    if (!Array.isArray(children)) {
      throw new Error(`Type passed to the "children" modifier does not match the expected.`);
    }
    expect_parent(parent, [
      ParentTypes.Button
    ]);
    if (children.length === 0) {
      delete target.dropdown;
    } else {

      let _children: GeneratedButtonMetadataFn[] = [];

      for (let i = 0, l = children.length; i < l; i++) {
        _children = _children.concat((Array.isArray(children[i] as any) ? children[i] as any : [children[i] as any]));
      }

      const source: GeneratedButtonMetadata[] = [];

      for (const _child of _children) {
        if (`function` === typeof _child) {
          const returns = _child();
          if (returns) {
            if (`object` === typeof returns) {
              source.push(returns);
            }
          }
        }
      }

      target.dropdown = source;
    }
    return target;
  };
}

function label(value: string): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    if (`string` !== typeof value) {
      throw new Error(`Type passed to the "label" modifier does not match the expected.`);
    } else if (!value.length) {
      throw new Error(`The "label" modifier cannot receive an empty string value.`);
    }
    expect_parent(parent, [
      ParentTypes.Button
    ]);
    target.label = value;
    return target;
  };
}

function ghost(value: boolean): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [
      ParentTypes.Button
    ]);
    target.ghost = !!value;
    return target;
  };
}

function block(value: boolean): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [
      ParentTypes.Button
    ]);
    target.block = !!value;
    return target;
  };
}

function dashed(value: boolean): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [
      ParentTypes.Button
    ]);
    target.dashed = !!value;
    return target;
  };
}

function disabled(value: boolean): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [
      ParentTypes.Button
    ]);
    target.disabled = !!value;
    return target;
  };
}

function rounded(value: boolean): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [
      ParentTypes.Button
    ]);
    target.disabled = !!value;
    return target;
  };
}

function type(value: YueUiButtonType): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    if (`string` !== typeof value) {
      throw new Error(`Type passed to the "type" modifier does not match the expected.`);
    }
    expect_parent(parent, [
      ParentTypes.Button
    ]);
    target.disabled = !!value;
    return target;
  };
}

function size(value: YueUiButtonSize): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    if (`string` !== typeof value) {
      throw new Error(`Type passed to the "size" modifier does not match the expected.`);
    }
    expect_parent(parent, [
      ParentTypes.Button
    ]);
    target.disabled = !!value;
    return target;
  };
}

function onStateChange(value: (...parameters: any[]) => void): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    if (`function` !== typeof value) {
      throw new Error(`Type passed to the "onStateChange" modifier does not match the expected.`);
    }
    expect_parent(parent, [
      ParentTypes.Button
    ]);
    target._onStateChange = value;
    target.onStateChange = (function(...parameters: any[]) {
      if (this._onStateChange) {
        this._onStateChange(...[...parameters, this]);
      }
    });
    return target;
  };
}

export {
  injectIn as buttonInjectIn,
  dropdown as buttonDropdown,
  label as buttonLabel,
  ghost as buttonGhost,
  block as buttonBlock,
  dashed as buttonDashed,
  disabled as buttonDisabled,
  rounded as buttonRounded,
  type as buttonType,
  size as buttonSize,
  onStateChange as buttonOnStateChange,
  identifier as buttonIdentifier
};
