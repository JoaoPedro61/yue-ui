import { ModifiersFn, GeneratedButtonMetadataFn, ButtonStruct, GeneratedButtonMetadata, ChangeHandler } from '../interfaces';
import {
  defineScope,
  serializeStringJsonPath,
  setHiddenProp,
  getHiddenProp
} from '@joaopedro61/yue-ui/core/utils';

import { relative_exec } from '../utils';
import { ParentTypes } from '../enums';




const mergeDefaults = (target: Partial<ButtonStruct>): Partial<ButtonStruct> => {
  const defaults: Partial<ButtonStruct> = {
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


export function generateButton(...modifiers: (ModifiersFn | ModifiersFn[])[]): GeneratedButtonMetadataFn {
  let _modifiers: ModifiersFn[] = [];

  for (let i = 0, l = modifiers.length; i < l; i++) {
    _modifiers = _modifiers.concat((Array.isArray(modifiers[i] as any) ? modifiers[i] as any : [modifiers[i] as any]));
  }

  let source: Partial<ButtonStruct> = { };

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

    setHiddenProp(source, `setChangeHandler`, defineScope(source, function(this: ButtonStruct, alias: string, handler: ChangeHandler) {
      setHiddenProp(this, `___EVENT_HANDLERS___`, [
        ...(getHiddenProp(this, `___EVENT_HANDLERS___`) || []),
        { alias, handler }
      ]);
    }));

    setHiddenProp(source, `removeChangeHandler`, defineScope(source, function(this: ButtonStruct, alias: string) {
      setHiddenProp(this, `___EVENT_HANDLERS___`, [
        ...(getHiddenProp(this, `___EVENT_HANDLERS___`) || [])
          .filter((e: any) => e !== alias)
      ]);
    }));

    setHiddenProp(source, `dispatchChanges`, defineScope(source, function(this: ButtonStruct) {
      const _HANDLERS = (getHiddenProp(this, `___EVENT_HANDLERS___`) || []).map((e: any) => e.handler);
      relative_exec(this, _HANDLERS || [], [this.getChanges()]);
      this.clearChanges();
    }));

    setHiddenProp(source, `getChanges`, defineScope(source, function(this: ButtonStruct) {
      const _CHANGES = Object.assign({}, getHiddenProp(this, `___CHANGES___`) || {});
      return _CHANGES;
    }));

    setHiddenProp(source, `clearChanges`, defineScope(source, function(this: ButtonStruct) {
      (this as any).___CHANGES___ = Object.assign({}, {});
    }));

    const finalStruct = {
      struct: source,
      identifier: source.identifier,
      fragments,
      metadataType: ParentTypes.Button
    };

    setHiddenProp(finalStruct, `setChangeHandler`, defineScope(finalStruct, function(this: GeneratedButtonMetadata, alias: string, handler: ChangeHandler) {
      this.struct.setChangeHandler(alias, handler);
    }));

    setHiddenProp(finalStruct, `dispatchChanges`, defineScope(finalStruct, function(this: GeneratedButtonMetadata) {
      this.struct.dispatchChanges();
    }));

    setHiddenProp(finalStruct, `getChanges`, defineScope(finalStruct, function(this: GeneratedButtonMetadata) {
      return this.struct.getChanges();
    }));

    setHiddenProp(finalStruct, `clearChanges`, defineScope(finalStruct, function(this: GeneratedButtonMetadata) {
      this.struct.clearChanges();
    }));

    setHiddenProp(finalStruct, `removeChangeHandler`, defineScope(finalStruct, function(this: GeneratedButtonMetadata, alias: string) {
      this.struct.removeChangeHandler(alias);
    }));
    
    // Clear all changes, because this is a first creating time
    (finalStruct as GeneratedButtonMetadata).clearChanges();
    return finalStruct as GeneratedButtonMetadata;
  };
}
