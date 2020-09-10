import { setHiddenProp } from '@joaopedro61/yue-ui/core/utils';

import {
  ModifiersFn,
  GeneratedButtonMetadata,
  ButtonStruct
} from '../interfaces';

import {
  identifier as _identifier, registryChange
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

function label(value: ButtonStruct['label']): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    if (`string` !== typeof value) {
      throw new Error(`Type passed to the "label" modifier does not match the expected.`);
    } else if (!value.length) {
      throw new Error(`The "label" modifier cannot receive an empty string value.`);
    }
    expect_parent(parent, [
      ParentTypes.Button
    ]);
    registryChange(target, `label`, value, target.label);
    target.label = value;
    return target;
  };
}

function ghost(value: ButtonStruct['ghost']): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [
      ParentTypes.Button
    ]);
    registryChange(target, `ghost`, value, target.ghost);
    target.ghost = value;
    return target;
  };
}

function block(value: ButtonStruct['block']): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [
      ParentTypes.Button
    ]);
    registryChange(target, `block`, value, target.block);
    target.block = value;
    return target;
  };
}

function dashed(value: ButtonStruct['dashed']): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [
      ParentTypes.Button
    ]);
    registryChange(target, `dashed`, value, target.dashed);
    target.dashed = value;
    return target;
  };
}

function disabled(value: ButtonStruct['disabled']): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [
      ParentTypes.Button
    ]);
    registryChange(target, `disabled`, value, target.disabled);
    target.disabled = value;
    return target;
  };
}

function rounded(value: ButtonStruct['rounded']): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [
      ParentTypes.Button
    ]);
    registryChange(target, `rounded`, value, target.rounded);
    target.rounded = value;
    return target;
  };
}

function type(value: ButtonStruct['type']): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    if (`string` !== typeof value) {
      throw new Error(`Type passed to the "type" modifier does not match the expected.`);
    }
    expect_parent(parent, [
      ParentTypes.Button
    ]);
    registryChange(target, `type`, value, target.type);
    target.type = value;
    return target;
  };
}

function size(value: ButtonStruct['size']): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    if (`string` !== typeof value) {
      throw new Error(`Type passed to the "size" modifier does not match the expected.`);
    }
    expect_parent(parent, [
      ParentTypes.Button
    ]);
    registryChange(target, `size`, value, target.size);
    target.size = value;
    return target;
  };
}

function loading(value: ButtonStruct['loading']): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    if (`string` !== typeof value) {
      throw new Error(`Type passed to the "loading" modifier does not match the expected.`);
    }
    expect_parent(parent, [
      ParentTypes.Button
    ]);
    registryChange(target, `loading`, value, target.loading);
    target.loading = value;
    return target;
  };
}

function click(value: ButtonStruct['click']): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    if (`string` !== typeof value) {
      throw new Error(`Type passed to the "click" modifier does not match the expected.`);
    }
    expect_parent(parent, [
      ParentTypes.Button
    ]);
    registryChange(target, `click`, value, target.click);
    target.click = value;
    return target;
  };
}



export {
  injectIn as buttonInjectIn,
  label as buttonLabel,
  ghost as buttonGhost,
  block as buttonBlock,
  dashed as buttonDashed,
  disabled as buttonDisabled,
  rounded as buttonRounded,
  type as buttonType,
  size as buttonSize,
  identifier as buttonIdentifier,
  loading as buttonLoading,
  click as buttonClick,
};
