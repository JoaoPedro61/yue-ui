import { serializeStringJsonPath } from './../../../commons/serialize-string-json-path';
import { getHiddenProp, setHiddenProp } from '../../../commons/get-set-hidden-prop';
import { defineScope } from '../../../commons/define-scope';
import { relative_exec } from '../utils';
import { ParentTypes } from '../enums';
import {
  ModifiersFn,
  GeneratedStaircaseFormularyMetadataFn,
  GeneratedStaircaseFormularyMetadata,
  StaircaseFormularyStruct,
  GeneratedLinearFormularyMetadataFn,
  GeneratedLinearFormularyMetadata,
  LinearFormularyStruct
} from './../interfaces';



/**
 *
 *
 * @export
 * @param {(...(ModifiersFn | ModifiersFn[])[])} modifiers
 * @returns {GeneratedStaircaseFormularyMetadataFn}
 */
export function staircaseFormulary(...modifiers: (ModifiersFn | ModifiersFn[])[]): GeneratedStaircaseFormularyMetadataFn {
  let _modifiers: ModifiersFn[] = [];

  for (let i = 0, l = modifiers.length; i < l; i++) {
    _modifiers = _modifiers.concat((Array.isArray(modifiers[i] as any) ? modifiers[i] as any : [modifiers[i] as any]));
  }

  let source: Partial<StaircaseFormularyStruct> = {};

  for (const _modifier of _modifiers) {
    if (`function` === typeof _modifier) {
      const returns = _modifier(ParentTypes.StaircaseFormulary, source);
      if (returns) {
        if (`object` === typeof returns) {
          source = {...returns, ...source};
        }
      }
    }
  }

  return (): GeneratedStaircaseFormularyMetadata => {
    if (!source.identifier) {
      throw new Error(`Staircase forms requires a "identifier" property.`);
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

    source.mode = ParentTypes.StaircaseFormulary;

    const finalStruct = {
      struct: source as StaircaseFormularyStruct,
      identifier: source.identifier,
      fragments,
      metadataType: ParentTypes.StaircaseFormulary
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

    return finalStruct as GeneratedStaircaseFormularyMetadata;
  };
}


/**
 *
 *
 * @export
 * @param {(...(ModifiersFn | ModifiersFn[])[])} modifiers
 * @returns {GeneratedLinearFormularyMetadataFn}
 */
export function linearFormulary(...modifiers: (ModifiersFn | ModifiersFn[])[]): GeneratedLinearFormularyMetadataFn {
  let _modifiers: ModifiersFn[] = [];

  for (let i = 0, l = modifiers.length; i < l; i++) {
    _modifiers = _modifiers.concat((Array.isArray(modifiers[i] as any) ? modifiers[i] as any : [modifiers[i] as any]));
  }

  let source: Partial<LinearFormularyStruct> = {};

  for (const _modifier of _modifiers) {
    if (`function` === typeof _modifier) {
      const returns = _modifier(ParentTypes.LinearFormulary, source);
      if (returns) {
        if (`object` === typeof returns) {
          source = {...returns, ...source};
        }
      }
    }
  }

  return (): GeneratedLinearFormularyMetadata => {
    if (!source.identifier) {
      throw new Error(`Linear forms requires a "identifier" property.`);
    }
    if (!source.children) {
      throw new Error(`Linear forms requires a "children" property.`);
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

    source.mode = ParentTypes.LinearFormulary;

    const finalStruct = {
      struct: source as LinearFormularyStruct,
      identifier: source.identifier,
      fragments,
      metadataType: ParentTypes.LinearFormulary
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

    return finalStruct as GeneratedLinearFormularyMetadata;
  };
}
