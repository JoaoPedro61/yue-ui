import { YueUiFormularySelectFilter, YueUiFormularySelectItem } from './interfaces';


export const defaultFilter: YueUiFormularySelectFilter = (input: string, item: YueUiFormularySelectItem): boolean => {
  if (item && item.label && typeof item.label === 'string') {
    return item.label.toLowerCase().indexOf(input.toLowerCase()) > -1;
  } else {
    return false;
  }
};
