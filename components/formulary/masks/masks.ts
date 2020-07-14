import { conformToMask } from 'angular2-text-mask';


interface TextMask {
  mask: any[] | ((...args: any[]) => any);
  guide?: boolean;
  placeholderChar?: string;
  keepCharPositions?: boolean;
  pipe?: ((...args: any[]) => any);
  showMask?: boolean;
}

interface TextMasks {
  [mask: string]: TextMask;
}

const MASKS: TextMasks = {
  ipaddress: {
    mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/],
    showMask: true,
    guide: false
  },
  ipaddressmanagement: {
    mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/],
    showMask: true,
    guide: false
  },
  macaddress: {
    mask: [/[0-9A-Fa-f]{2}/, ':', /[0-9A-Fa-f]{2}/, ':', /[0-9A-Fa-f]{2}/, ':', /[0-9A-Fa-f]{2}/, ':', /[0-9A-Fa-f]{2}/, ':', /[0-9A-Fa-f]{2}/],
    showMask: true,
    guide: false
  },
  brzipcode: {
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
    showMask: true,
    guide: false
  },
  cpf: {
    mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
    showMask: true,
    guide: false
  },
  cnpj: {
    mask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/],
    showMask: true,
    guide: false
  },
  sixdigitsauth: {
    mask: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
    showMask: true,
    guide: false
  },
  brphone: {
    mask(userInput: string) {
      const numbers = userInput.match(/\d/g);
      let numberLength = 0;
      if (numbers) {
        numberLength = numbers.join('').length;
      }
      if (numberLength > 10) {
        return ['(', /[1-9]/, /[1-9]/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
      } else {
        return ['(', /[1-9]/, /[1-9]/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
      }
    },
    showMask: true,
    guide: false
  },
  cpforcnpj: {
    mask(rawValue: string) {
      const length: number = !rawValue ? 0 : rawValue.toString().replace(/\.|_|-|\/\:/gim, '').length;
      if (length < 12) {
        return {
          mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
          showMask: true,
          guide: false
        };
      } else {
        return {
          mask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/],
          showMask: true,
          guide: false
        };
      }
    },
    showMask: true,
    guide: false
  },
};

function getMask(mask: string): TextMask | void {
  if (mask.length) {
    if (MASKS.hasOwnProperty(mask)) {
      const maskObject = MASKS[mask];
      if (maskObject) {
        return maskObject;
      }
    }
  }
}

function formatConformMask(relativeMask: string, value: string): string {
  const mask = getMask(relativeMask);
  if (mask) {
    const conformed = conformToMask(value, mask, { guide: false });
    if (conformed.conformedValue) {
      return conformed.conformedValue;
    }
    return value;
  }
  return value;
}

export {
  MASKS,
  TextMask,
  TextMasks,
  formatConformMask
};

export default getMask;
