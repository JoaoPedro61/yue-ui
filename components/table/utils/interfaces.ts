import { YueUiSmartRenderType, YueUiSmartRenderComponentType } from '@JoaoPedro61/yue-ui/smart-render';



export interface GeneratedColumnMetadata<T = any> extends Omit<TableDataColumnItem<T>, 'sorting' | 'order'> {
  [x: string]: any;
}

export type GeneratedColumnMetadataFn<T = any> = () => GeneratedColumnMetadata<T>;

export interface YueUiTableColumn<T = any> {
  allowSort: boolean;
  identifier: string;
  cellHeader?: YueUiSmartRenderType<{}>;
  cellColumn?: YueUiSmartRenderComponentType<TableDataRowItem<T>>;
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