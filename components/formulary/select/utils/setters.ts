import { YueUiFormularySelectItem } from './interfaces';



export const createOption = (value: Omit<YueUiFormularySelectItem, 'value' | 'label'>): YueUiFormularySelectItem => {
  return Object.defineProperties({
    ...value,
  }, {
    label: {
      get() {
        if (this.propLabel === false) {
          return this.data;
        } else {
          if (this.propLabel === null) {
            return this.data;
          } else {
            if (typeof this.data === 'object') {
              return this.data[this.propLabel];
            } else {
              return this.data;
            }
          }
        }
      },
      enumerable: false,
    },
    value: {
      get() {
        if (this.propValue === false) {
          return this.data;
        } else {
          if (this.propValue === null) {
            return this.data;
          } else {
            if (typeof this.data === 'object') {
              return this.data[this.propValue];
            } else {
              return this.data;
            }
          }
        }
      },
      enumerable: false,
    }
  }) as unknown as YueUiFormularySelectItem;
};
