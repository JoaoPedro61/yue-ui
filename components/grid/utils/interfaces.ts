export type IndexableObject = { [c: string]: any };

export type YueUiGridJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';

export type YueUiGridAlign = 'top' | 'middle' | 'bottom';

export type YueUiGridGutter = number | IndexableObject | [number, number] | [IndexableObject, IndexableObject] | null;

export interface YueUiGridEmbeddedProperty {
  span?: number;
  pull?: number;
  push?: number;
  offset?: number;
  order?: number;
}
