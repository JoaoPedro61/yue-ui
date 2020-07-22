import { hash, getHiddenProp } from '@JoaoPedro61/yue-ui/core/utils';

import { expect_parent } from './utils';

import { ModifiersFn } from './interfaces';
import { ParentTypes } from './enums';


export function registryChange<T = Partial<any>>(target: T, prop: string, newValue: any, oldValue: any): T {
  if (target && prop) {
    const changesRegistry = getHiddenProp(target, `___CHANGES___`) || {};
    changesRegistry[prop] = {
      current: newValue,
      old: oldValue,
    };
    (target as any)[`___CHANGES___`] = changesRegistry;
  }
  return target;
}

export function identifier(value: string = hash()): ModifiersFn {
  return (parent: string, target: Partial<any>) => {
    if (`string` !== typeof value) {
      throw new Error(`Type passed to the "identifier" modifier does not match the expected.`);
    } else if (!value.length) {
      throw new Error(`The "identifier" modifier cannot receive an empty string value.`);
    }
    expect_parent(parent, [
      ParentTypes.Button,
      ParentTypes.Field,
      ParentTypes.LinearFormulary,
      ParentTypes.StaircaseFormulary,
      ParentTypes.StaircaseStepFormulary
    ]);
    target.identifier = value;
    return target;
  };
}
