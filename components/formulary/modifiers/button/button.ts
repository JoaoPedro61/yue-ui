import { ModifiersFn, GeneratedButtonMetadataFn, CustomButtonStruct, GeneratedButtonMetadata } from '../interfaces';
import { serializeStringJsonPath } from '../../../commons/serialize-string-json-path';
import { setHiddenProp, getHiddenProp } from '../../../commons/get-set-hidden-prop';
import { defineScope } from '../../../commons/define-scope';
import { relative_exec } from '../utils';
import { ParentTypes } from '../enums';



/**
 *
 *
 * @param {Partial<CustomButtonStruct>} target
 * @returns {Partial<CustomButtonStruct>}
 */
const mergeDefaults = (target: Partial<CustomButtonStruct>): Partial<CustomButtonStruct> => {
  const defaults: Partial<CustomButtonStruct> = {
    ghost: false,
    block: false,
    dashed: false,
    disabled: false,
    rounded: false,
    type: 'default',
    size: 'default',
  };
  for (const key in defaults) {
    if (defaults.hasOwnProperty(key)) {
      if (!target.hasOwnProperty(key)) {
        (target as any)[key] = (defaults as any)[key];
      }
    }
  }
  return target;
};

/**
 *
 *
 * @export
 * @param {(...(ModifiersFn | ModifiersFn[])[])} modifiers
 * @returns {GeneratedButtonMetadataFn}
 */
export function generateButton(...modifiers: (ModifiersFn | ModifiersFn[])[]): GeneratedButtonMetadataFn {
  let _modifiers: ModifiersFn[] = [];

  for (let i = 0, l = modifiers.length; i < l; i++) {
    _modifiers = _modifiers.concat((Array.isArray(modifiers[i] as any) ? modifiers[i] as any : [modifiers[i] as any]));
  }

  let source: Partial<CustomButtonStruct> = { };

  for (const _modifier of _modifiers) {
    if (`function` === typeof _modifier) {
      const returns = _modifier('button', source);
      if (returns) {
        if (`object` === typeof returns) {
          source = {...returns, ...source};
        }
      }
    }
  }

  source = mergeDefaults(source);

  return (): GeneratedButtonMetadata => {
    if (!source.identifier) {
      throw new Error(`Forms buttons requires a "identifier" property.`);
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
          throw new Error(`Hey hey, some button are using an identifier that is already being used.`);
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
      struct: source,
      identifier: source.identifier,
      fragments,
      metadataType: ParentTypes.Button
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

    return finalStruct as GeneratedButtonMetadata;
  };
}
