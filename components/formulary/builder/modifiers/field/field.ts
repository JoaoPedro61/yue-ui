import {
  defineScope,
  serializeStringJsonPath,
  getHiddenProp,
  setHiddenProp
} from '@JoaoPedro61/yue-ui/core/utils';

import {
  ModifiersFn,
  GeneratedFieldMetadataFn,
  FieldStruct,
  GeneratedFieldMetadata,
  BasicFn
} from '../interfaces';
import { fieldType } from './commons';
import { ParentTypes } from '../enums';
import { relative_exec } from '../utils';




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

    setHiddenProp(source, `setChangeHandler`, defineScope(source, function(this: any, alias: string, handler: BasicFn) {
      setHiddenProp(this, `___EVENT_HANDLERS___`, [
        ...(getHiddenProp(this, `___EVENT_HANDLERS___`) || []),
        { alias, handler }
      ]);
    }));

    setHiddenProp(source, `removeChangeHandler`, defineScope(source, function(this: any, alias: string) {
      setHiddenProp(this, `___EVENT_HANDLERS___`, [
        ...(getHiddenProp(this, `___EVENT_HANDLERS___`) || [])
          .filter((e: any) => e !== alias)
      ]);
    }));

    setHiddenProp(source, `dispatchChanges`, defineScope(source, function(this: any, changes: any) {
      const _HANDLERS = getHiddenProp(this, `___EVENT_HANDLERS___`).map((e: any) => e.handler);
      relative_exec(this, _HANDLERS || [], [changes]);
    }));

    const finalStruct = {
      struct: source as FieldStruct,
      identifier: source.identifier,
      fragments,
      metadataType: ParentTypes.Field
    };

    setHiddenProp(finalStruct, `setChangeHandler`, defineScope(finalStruct, function(this: any, alias: string, handler: BasicFn) {
      setHiddenProp(this.struct, `___EVENT_HANDLERS___`, [
        ...(getHiddenProp(this.struct, `___EVENT_HANDLERS___`) || []),
        {handler, alias}
      ]);
    }));

    setHiddenProp(finalStruct, `dispatchChanges`, defineScope(finalStruct, function(this: any, changes: any) {
      const _HANDLERS = getHiddenProp(this, `___EVENT_HANDLERS___`).map((e: any) => e.handler);
      relative_exec(this, _HANDLERS || [], [changes]);
    }));

    setHiddenProp(finalStruct, `removeChangeHandler`, defineScope(source, function(this: any, alias: string) {
      setHiddenProp(this.struct, `___EVENT_HANDLERS___`, [
        ...(getHiddenProp(this.struct, `___EVENT_HANDLERS___`) || [])
          .filter((e: any) => e !== alias)
      ]);
    }));

    return finalStruct as any;
  };
}

export function writable(...modifiers: (ModifiersFn | ModifiersFn[])[]): GeneratedFieldMetadataFn {
  return generateField([fieldType(`writable`)], ...modifiers);
}

export function enumerable(...modifiers: (ModifiersFn | ModifiersFn[])[]): GeneratedFieldMetadataFn {
  return generateField([fieldType(`enumerable`)], ...modifiers);
}

export function selectable(...modifiers: (ModifiersFn | ModifiersFn[])[]): GeneratedFieldMetadataFn {
  return generateField([fieldType(`selectable`)], ...modifiers);
}

export function checkable(...modifiers: (ModifiersFn | ModifiersFn[])[]): GeneratedFieldMetadataFn {
  return generateField([fieldType(`checkable`)], ...modifiers);
}

export function touchable(...modifiers: (ModifiersFn | ModifiersFn[])[]): GeneratedFieldMetadataFn {
  return generateField([fieldType(`touchable`)], ...modifiers);
}
