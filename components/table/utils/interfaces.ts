import { YueUiSmartRenderType, YueUiSmartRenderComponentType } from '@JoaoPedro61/yue-ui/smart-render';
import { ComponentType } from '@angular/cdk/portal';



export interface TableGeneratedColumnMetadata<T = any> extends Omit<YueUiTableColumn<T>, 'sorting' | 'order'> {
  [x: string]: any;
}

export type TableGeneratedColumnMetadataFn<T = any> = () => TableGeneratedColumnMetadata<T>;

export interface TableGeneratedActionMetadata extends YueUiTableAction {
  [x: string]: any;
}

export type TableGeneratedActionMetadataFn = () => TableGeneratedActionMetadata;

export type TableModifiersFn<R = any> = (parent: string, target: Partial<R>) => Partial<R>;

export interface YueUiTableAction {
  [x: string]: any;
  identifier: string;
  label: YueUiSmartRenderType<any>;

  condition?: (data: any) => boolean;
  icon?: string;
  prefix?: YueUiSmartRenderType<any>;
  sufix?: YueUiSmartRenderType<any>;
}

export type YueUiTableActions = YueUiTableAction[];

export interface YueUiTableColumn<T = any> {
  allowSort: boolean;
  identifier: string;
  cellHeader?: YueUiSmartRenderType<{}>;
  cellColumn?: YueUiSmartRenderComponentType<TableDataRowItem<T>>;
  additionalParameters?: Partial<any>;
  width?: string | number;
}

export type YueUiTableColumns<T = any> = YueUiTableColumn<T>[];

export interface TableDataColumnItem<T = any> extends YueUiTableColumn<T> {
  [x: string]: any;
  sorting: null | 'asc' | 'desc';
  order: boolean;
}

export interface TableDataRowItem<T = any> {
  [x: string]: any;
  new: T;
  old: T | null;
  identifier: string;
  value: any;
  cell?: YueUiSmartRenderComponentType<TableDataRowItem<T>>;
  header: TableDataColumnItem;
  full: any;
}

export interface TableColumnCellTypes {
  [type: string]: ComponentType<any>;
}
