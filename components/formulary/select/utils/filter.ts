import { removeAccents } from '@joaopedro61/yue-ui/core/utils';

import { YueUiFormularySelectFilter, YueUiFormularySelectItem } from './interfaces';


export const defaultFilter: YueUiFormularySelectFilter = (input: string, item: YueUiFormularySelectItem): boolean => {
  if (item && item.label && typeof item.label === 'string') {
    return removeAccents(item.label || ``).toLowerCase().indexOf(removeAccents(input || ``).toLowerCase()) > -1;
  } else {
    return false;
  }
};
