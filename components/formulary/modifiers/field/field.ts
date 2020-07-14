import { serializeStringJsonPath } from '../../../commons/serialize-string-json-path';
import { getHiddenProp, setHiddenProp } from '../../../commons/get-set-hidden-prop';
import { defineScope } from '../../../commons/define-scope';

import { ModifiersFn, GeneratedFieldMetadataFn, FieldStruct, GeneratedFieldMetadata } from '../interfaces';
import { fieldType } from './commons';
import { ParentTypes } from '../enums';
import { relative_exec } from '../utils';



/**
 * Generate a new metadata for the all many fields.
 *
 * @usangeNotes
 *
 *
 * ```typescript
 *
 * const metadataProvider = generateField([
 *   identifier(`your_identifier`),
 *   label(`Some label`),
 *   placeholder(`Some placeholder`),
 *   ...
 * ]);
 *
 * // Yes, this generates a provider
 * const metadata = metadataProvider();
 *
 * // So, just consume the metadata
 * // Ex.: console.log(metadata.struct);
 *
 * ```
 *
 * @param {(...(ModifiersFn | ModifiersFn[])[])} modifiers An arrays os modifiers, or a linear arguments modifications
 * @returns {GeneratedFieldMetadataFn} Returns a provider of the metadata
 */
function generateField(...modifiers: (ModifiersFn | ModifiersFn[])[]): GeneratedFieldMetadataFn {
  let _modifiers: ModifiersFn[] = [];

  for (let i = 0, l = modifiers.length; i < l; i++) {
    _modifiers = _modifiers.concat((Array.isArray(modifiers[i] as any) ? modifiers[i] as any : [modifiers[i] as any]));
  }

  let source: Partial<FieldStruct> = { };

  for (const _modifier of _modifiers) {
    if (`function` === typeof _modifier) {
      const returns = _modifier(ParentTypes.Field, source);
      if (returns) {
        if (`object` === typeof returns) {
          source = {...returns, ...source};
        }
      }
    }
  }

  return (): GeneratedFieldMetadata => {
    if (!source.identifier) {
      throw new Error(`Forms fields requires a "identifier" property.`);
    }
    const fragments: Partial<any> = {};
    const _fragments = serializeStringJsonPath(source, true, 'identifier');
    const _fragments_keys = _fragments.keys();

    loop:
    for (let i = 0, l = _fragments_keys.length; i < l; i++) {
      if (/fragments/gm.test(_fragments_keys[i])) {
        continue loop;
      }
      if (/\]\.struct\.identifier/gm.test(_fragments_keys[i])) {
        if (fragments.hasOwnProperty(`${_fragments[_fragments_keys[i]]}`)) {
          throw new Error(`Hey hey, some field are using an identifier that is already being used.`);
        }
        fragments[`${_fragments[_fragments_keys[i]]}`] = `struct.${_fragments_keys[i]}`;
      } else {
        continue loop;
      }
    }

    setHiddenProp(source, `setChangeHandler`, defineScope(source, function(this: any, handler) {
      setHiddenProp(this, `___EVENT_HANDLERS___`, [
        ...(getHiddenProp(this, `___EVENT_HANDLERS___`) || []),
        handler
      ]);
    }));

    setHiddenProp(source, `dispatchChanges`, defineScope(source, function(this: any, changes) {
      const _HANDLERS = getHiddenProp(this, `___EVENT_HANDLERS___`);
      relative_exec(this, _HANDLERS || [], [changes]);
    }));

    const finalStruct = {
      struct: source as FieldStruct,
      identifier: source.identifier,
      fragments,
      metadataType: ParentTypes.Field
    };

    setHiddenProp(finalStruct, `setChangeHandler`, defineScope(finalStruct, function(this: any, handler) {
      setHiddenProp(this.struct, `___EVENT_HANDLERS___`, [
        ...(getHiddenProp(this.struct, `___EVENT_HANDLERS___`) || []),
        handler
      ]);
    }));

    setHiddenProp(finalStruct, `dispatchChanges`, defineScope(finalStruct, function(this: any, changes) {
      const _HANDLERS = getHiddenProp(this.struct, `___EVENT_HANDLERS___`);
      relative_exec(this, _HANDLERS || [], [changes]);
    }));

    return finalStruct as any;
  };
}

/**
 *
 *
 * @export
 * @param {(...(ModifiersFn | ModifiersFn[])[])} modifiers
 * @returns {GeneratedFieldMetadataFn}
 */
export function writable(...modifiers: (ModifiersFn | ModifiersFn[])[]): GeneratedFieldMetadataFn {
  return generateField([fieldType(`writable`)], ...modifiers);
}

/**
 *
 *
 * @export
 * @param {(...(ModifiersFn | ModifiersFn[])[])} modifiers
 * @returns {GeneratedFieldMetadataFn}
 */
export function enumerable(...modifiers: (ModifiersFn | ModifiersFn[])[]): GeneratedFieldMetadataFn {
  return generateField([fieldType(`enumerable`)], ...modifiers);
}

/**
 *
 *
 * @export
 * @param {(...(ModifiersFn | ModifiersFn[])[])} modifiers
 * @returns {GeneratedFieldMetadataFn}
 */
export function selectable(...modifiers: (ModifiersFn | ModifiersFn[])[]): GeneratedFieldMetadataFn {
  return generateField([fieldType(`selectable`)], ...modifiers);
}

/**
 *
 *
 * @export
 * @param {(...(ModifiersFn | ModifiersFn[])[])} modifiers
 * @returns {GeneratedFieldMetadataFn}
 */
export function checkable(...modifiers: (ModifiersFn | ModifiersFn[])[]): GeneratedFieldMetadataFn {
  return generateField([fieldType(`checkable`)], ...modifiers);
}

/**
 *
 *
 * @export
 * @param {(...(ModifiersFn | ModifiersFn[])[])} modifiers
 * @returns {GeneratedFieldMetadataFn}
 */
export function touchable(...modifiers: (ModifiersFn | ModifiersFn[])[]): GeneratedFieldMetadataFn {
  return generateField([fieldType(`touchable`)], ...modifiers);
}
