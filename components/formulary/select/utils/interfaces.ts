import { YueUiSmartRenderType } from '@joaopedro61/yue-ui/smart-render';
import { Observable } from 'rxjs';



export interface YueUiFormularySelectItem {
  propValue: YueUiFormularySelectProperties['value'];
  propLabel: YueUiFormularySelectProperties['label'];
  selected: boolean;
  disabled: boolean;

  data: any;

  template?: YueUiSmartRenderType;
  customContent?: boolean;

  readonly value: any;
  readonly label: any;
}

export interface YueUiFormularySelectOption extends Omit<YueUiFormularySelectItem, 'selected' | 'propLabel' | 'propValue' | 'data' | 'value' | 'label'> {
  label: YueUiSmartRenderType;
  value: any;
}

export interface YueUiFormularySelectProperties {
  value?: string | false;
  label?: string | false;
}

export type YueUiFormularySelectMode = 'single' | 'multiple' | 'tags';

export interface YueUiSelectSearchChange {
  valueWithoutAccents: string;
  value: string;
}

export type Placeholder = Observable<string> | string | null;

export type YueUiFormularySelectSafeValue = any;

export type YueUiFormularySelectFilter = (value: string, item: YueUiFormularySelectItem) => boolean;
