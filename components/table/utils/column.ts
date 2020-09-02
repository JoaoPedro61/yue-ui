import { TableGeneratedColumnMetadataFn, TableModifiersFn, YueUiTableColumn } from './interfaces';

import { TABLE_COLUMN_CELL_TYPES } from './../components/cells/types';

import { expect_param, expect_parent } from './expect';



function headerCell(value: YueUiTableColumn['cellHeader']): TableModifiersFn {

  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [`column`]);
    expect_param(`cellHeader`, value);
    target.cellHeader = value;
    return target;
  };
}

function additionalParameters(value: YueUiTableColumn['additionalParameters'] = {}): TableModifiersFn {

  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [`column`]);
    expect_param(`additionalParameters`, value);
    target.additionalParameters = value;
    return target;
  };
}

function allowSort(value: YueUiTableColumn['allowSort'] = true): TableModifiersFn {

  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [`column`]);
    expect_param(`allowSort`, value);
    target.allowSort = value;
    return target;
  };
}

function columnCell(value: YueUiTableColumn['cellColumn'] | string): TableModifiersFn {

  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [`column`]);
    expect_param(`cellColumn`, value);
    if (typeof value === `string`) {
      if (TABLE_COLUMN_CELL_TYPES.hasOwnProperty(value)) {
        value = TABLE_COLUMN_CELL_TYPES[value as string];
      } else {
        throw new Error(`The property "cellColumn" has a incorrect type of cell component. Avaliable column cell: "${JSON.stringify(Object.keys(TABLE_COLUMN_CELL_TYPES))}."`);
      }
    }
    target.cellColumn = value;
    return target;
  };
}

function width(value: YueUiTableColumn['width']): TableModifiersFn {

  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [`column`]);
    expect_param(`width`, value);
    target.width = value;
    return target;
  };
}

function identifier(value: YueUiTableColumn['identifier']): TableModifiersFn {

  return (parent: string, target: Partial<any>) => {
    expect_parent(parent, [`column`]);
    expect_param(`identifier`, value);
    target.identifier = value;
    return target;
  };
}

function column<T = any>(...modifiers: (TableModifiersFn | TableModifiersFn[])[]): TableGeneratedColumnMetadataFn<T> {

  let _modifiers: TableModifiersFn[] = [];

  for (let i = 0, l = modifiers.length; i < l; i++) {
    _modifiers = _modifiers.concat((Array.isArray(modifiers[i] as any) ? modifiers[i] as any : [modifiers[i] as any]));
  }

  let source: Partial<YueUiTableColumn<T>> = { };

  for (const _modifier of _modifiers) {
    if (`function` === typeof _modifier) {
      const returns = _modifier(`column`, source);
      if (returns) {
        if (`object` === typeof returns) {
          source = {...returns, ...source};
        }
      }
    }
  }

  return () => {
    if (!source.identifier) {
      throw new Error(`Table column cells requires a "identifier" property.`);
    }
  
    return {
      allowSort: false,
      ...source,
    } as any;
  };
}

export {
  column as tableColumn,
  allowSort as tableColumnAllowSort,
  identifier as tableColumnIdentifier,
  columnCell as tableColumnType,
  headerCell as tableColumnLabel,
  additionalParameters as tableColumnAdditionalParameters,
  width as tableColumnWidth,
};
