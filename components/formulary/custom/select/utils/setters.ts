import { YueUiInputSelectOption, YueUiInputSelectInternOption } from './interfaces';



export const addGettersOnOptions = (option: YueUiInputSelectOption, propLabel: string | null | false = null, propValue: string | null | false = null) => {
  Object.defineProperties(option, {
    propValue: {
      value: propValue,
      enumerable: false,
      writable: false
    },
    propLabel: {
      value: propLabel,
      enumerable: false,
      writable: false
    },
    valueProped: {
      get() {
        if (this.propValue === false) {
          return this;
        } else {
          if (this.propValue === null) {
            return this;
          } else {
            return this[this.propValue];
          }
        }
      },
      enumerable: false,
    },
    labelProped: {
      get() {
        if (this.propLabel === false) {
          return this;
        } else {
          if (this.propLabel === null) {
            return this;
          } else {
            return this[this.propLabel];
          }
        }
      },
      enumerable: false,
    }
  });
  return option as unknown as YueUiInputSelectInternOption;
};

export const addSelectedGetter = (option: YueUiInputSelectOption, value: boolean = false) => {
  Object.defineProperties(option, {
    selected: {
      value,
      enumerable: false,
      writable: false
    }
  });
  return option as unknown as YueUiInputSelectInternOption;
};
