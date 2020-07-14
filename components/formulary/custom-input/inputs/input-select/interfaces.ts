export interface InputSelectOption {
  [x: string]: any;
}

export interface InputSelectInternOption {
  readonly propValue: string;
  readonly propLabel: string;
  readonly selected: boolean;
  readonly valueProped: any;
  readonly labelProped: any;
}

export interface YueSelectProperties {
  value?: string | false;
  label?: string | false;
}

export type YueSelectMode = 'single' | 'multiple';
