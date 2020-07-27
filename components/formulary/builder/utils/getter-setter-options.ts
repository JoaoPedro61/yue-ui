export const AddGettersOnOptions = (option: {[x: string]: any}, propLabel: string | null | false = null, propValue: string | null | false = null) => {
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
  return option as any;
};
