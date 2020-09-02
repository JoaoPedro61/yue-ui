import { TableModifiersFn, YueUiTableAction, TableGeneratedActionMetadataFn } from './interfaces';


import { expect_param, expect_parent } from './expect';



function identifier(value: YueUiTableAction['identifier']): TableModifiersFn {

  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [`action`]);
    expect_param(`identifier`, value);
    target.identifier = value;
    return target;
  };
}

function label(value: YueUiTableAction['label']): TableModifiersFn {

  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [`action`]);
    expect_param(`label`, value);
    target.label = value;
    return target;
  };
}

function icon(value: YueUiTableAction['icon']): TableModifiersFn {

  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [`action`]);
    expect_param(`icon`, value);
    target.icon = value;
    return target;
  };
}

function condition(value: YueUiTableAction['condition']): TableModifiersFn {

  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [`action`]);
    expect_param(`condition`, value);
    target.condition = value;
    return target;
  };
}

function prefix(value: YueUiTableAction['prefix']): TableModifiersFn {

  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [`action`]);
    expect_param(`prefix`, value);
    target.prefix = value;
    return target;
  };
}

function sufix(value: YueUiTableAction['sufix']): TableModifiersFn {

  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [`action`]);
    expect_param(`sufix`, value);
    target.sufix = value;
    return target;
  };
}


function action(...modifiers: (TableModifiersFn | TableModifiersFn[])[]): TableGeneratedActionMetadataFn {

  let _modifiers: TableModifiersFn[] = [];

  for (let i = 0, l = modifiers.length; i < l; i++) {
    _modifiers = _modifiers.concat((Array.isArray(modifiers[i] as any) ? modifiers[i] as any : [modifiers[i] as any]));
  }

  let source: Partial<YueUiTableAction> = { };

  for (const _modifier of _modifiers) {
    if (`function` === typeof _modifier) {
      const returns = _modifier(`action`, source);
      if (returns) {
        if (`object` === typeof returns) {
          source = {...returns, ...source};
        }
      }
    }
  }

  return () => {
    if (!source.identifier) {
      throw new Error(`Table actions itens requires a "identifier" property.`);
    }
  
    return {
      ...source,
    } as any;
  };
}

export {
  action as tableAction,
  identifier as tableActionIdentifier,
  label as tableActionLabel,
  icon as tableActionIcon,
  condition as tableActionCondition,
  prefix as tableActionPrefix,
  sufix as tableActionSufix,
};
