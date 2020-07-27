export interface YueUiInputSelectOption {
  [x: string]: any;
}

export interface YueUiInputSelectInternOption {
  readonly propValue: string;
  readonly propLabel: string;
  readonly selected: boolean;
  readonly valueProped: any;
  readonly labelProped: any;
}

export interface YueUiSelectProperties {
  value?: string | false;
  label?: string | false;
}

export type YueUiSelectMode = 'single' | 'multiple';
