import { hash } from './../../commons/hash';

import { expect_parent } from './utils';

import { ModifiersFn } from './interfaces';
import { ParentTypes } from './enums';



/**
 *
 *
 * @export
 * @param {string} [value=hash()]
 * @returns {ModifiersFn}
 */
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
